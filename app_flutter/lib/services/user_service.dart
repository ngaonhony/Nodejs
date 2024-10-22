import 'dart:convert';
import 'dart:math';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'auth_service.dart';

class UserService {
  final String baseUrl = 'http://localhost:3000/api/users';
  final AuthService _authService = AuthService();

  // Lấy thông tin người dùng hiện tại từ API và tạo mã thành viên nếu chưa có
  Future<Map<String, dynamic>> getCurrentUser() async {
    final prefs = await SharedPreferences.getInstance();
    final userId = prefs.getString('userId');
    final token = prefs.getString('token');

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

        // Kiểm tra xem mã thành viên đã tồn tại chưa
        String? memberId = prefs.getString('memberId');
        if (memberId == null) {
          // Tạo mã thành viên ngẫu nhiên gồm 6 chữ số nếu chưa có
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

  // Hàm tạo mã thành viên ngẫu nhiên gồm 6 chữ số
  String _generateMemberId() {
    final random = Random();
    return (random.nextInt(900000) + 100000)
        .toString(); // Tạo số ngẫu nhiên trong khoảng 100000 - 999999
  }

  // Hàm xử lý lỗi từ API
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
}
