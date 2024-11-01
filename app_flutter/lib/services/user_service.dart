import 'dart:convert';
import 'dart:math';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'auth_service.dart';
import 'package:connectivity_plus/connectivity_plus.dart';

class UserService {
  final String baseUrl = 'http://localhost:3000/api/users';
  final AuthService _authService = AuthService();

  // Fetching current user details
  Future<Map<String, dynamic>> getCurrentUser() async {
    final prefs = await SharedPreferences.getInstance();
    final userId = prefs.getString('userId');
    final token = prefs.getString('accessToken');

    if (userId == null || token == null) {
      throw Exception('Không tìm thấy thông tin người dùng hoặc token');
    }

    final url = Uri.parse('$baseUrl/$userId');

    try {
      final response = await http.get(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        final user = responseData['data']['user'];

        String? memberId = prefs.getString('memberId');
        if (memberId == null) {
          memberId = _generateMemberId();
          await prefs.setString('memberId', memberId);
        }

        return {
          'name': user['name'],
          'balance': user['balance'] ?? 0,
          'memberId': memberId,
          "phone": user['phone'],
        };
      } else {
        _handleError(response);
      }
    } catch (e) {
      throw Exception('Không thể lấy thông tin người dùng: $e');
    }

    return {};
  }

  // Generate a random member ID
  String _generateMemberId() {
    final random = Random();
    return (random.nextInt(900000) + 100000).toString();
  }

  // Handle errors from API responses
  void _handleError(http.Response response) {
    final errorData = jsonDecode(response.body);
    final message = errorData['message'] ?? 'Lỗi không xác định';

    switch (response.statusCode) {
      case 400:
        throw Exception('Yêu cầu không hợp lệ: $message');
      case 401:
        throw Exception('Không có quyền truy cập: $message');
      case 403:
        throw Exception('Bạn không có quyền để thực hiện thao tác này.');
      case 404:
        throw Exception('Không tìm thấy người dùng.');
      case 500:
        throw Exception('Lỗi từ server: $message');
      default:
        throw Exception('Lỗi: $message');
    }
  }

  Future<void> updateUser(String userId, Map<String, String> updates) async {
    final url = Uri.parse('$baseUrl/$userId');
    final connectivityResult = await Connectivity().checkConnectivity();

    if (connectivityResult == ConnectivityResult.none) {
      throw Exception('Không có kết nối mạng');
    }

    try {
      final response = await http.patch(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${await _authService.getToken()}',
        },
        body: jsonEncode(updates),
      );

      if (response.statusCode == 200) {
        print("Cập nhật thông tin thành công.");
      } else {
        _handleError(response);
      }
    } catch (e) {
      throw Exception('Cập nhật thất bại: $e');
    }
  }
}
