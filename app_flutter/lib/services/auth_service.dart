import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  final String baseUrl = 'http://localhost:3000/api/auth';

  // Đăng ký
  Future<void> register(String username, String email, String password,
      String phone, String address, String role) async {
    final url = Uri.parse('$baseUrl/register');

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'username': username,
          'email': email,
          'password': password,
          'phone': phone,
          'address': address,
          'role': role,
        }),
      );

      if (response.statusCode == 201) {
        print("Đăng ký thành công");
      } else {
        final responseData = jsonDecode(response.body);
        final error = responseData['message'] ?? 'Unknown error';
        print("Lỗi đăng ký: $error");
        print("Mã trạng thái: ${response.statusCode}");
        throw Exception('Failed to register: $error');
      }
    } catch (e) {
      print("Exception: $e");
      throw Exception('Đăng ký thất bại: $e');
    }
  }

  // Đăng nhập
  Future<void> login(String phone, String password) async {
    final url = Uri.parse('$baseUrl/login');
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'phone': phone,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      final responseData = jsonDecode(response.body);
      final token = responseData['token'];
      await _saveToken(token);
      print("Đăng nhập thành công");
    } else {
      _handleError(response);
    }
  }

  // Lưu token vào SharedPreferences
  Future<void> _saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('authToken', token);
  }

  // Kiểm tra trạng thái đăng nhập
  Future<bool> isLoggedIn() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.containsKey('authToken');
  }

  // Lấy token từ SharedPreferences
  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('authToken');
  }

  // Đăng xuất
  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('authToken');
    print("Đăng xuất thành công");
  }

  // Xử lý phản hồi thành công
  void _handleResponse(http.Response response, String successMessage) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      print(successMessage);
    } else {
      _handleError(response);
    }
  }

  // Xử lý lỗi từ phản hồi
  void _handleError(http.Response response) {
    final error = jsonDecode(response.body)['message'] ?? 'Unknown error';
    throw Exception(error);
  }
}
