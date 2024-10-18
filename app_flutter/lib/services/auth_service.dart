import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:connectivity_plus/connectivity_plus.dart';

class AuthService {
  final String baseUrl = 'http://localhost:3000/api/auth';
  final storage = FlutterSecureStorage();

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
        await _saveUserInfo(username); // Lưu username khi đăng ký thành công
      } else {
        _handleError(response);
      }
    } catch (e) {
      print("Exception: $e");
      throw Exception('Đăng ký thất bại: $e');
    }
  }

  // Đăng nhập
  Future<void> login(String phone, String password) async {
    final connectivityResult = await Connectivity().checkConnectivity();
    if (connectivityResult == ConnectivityResult.none) {
      throw Exception('Không có kết nối mạng');
    }

    final url = Uri.parse('$baseUrl/login');
    try {
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
        final username = responseData['username']; // Lấy username từ phản hồi

        await _saveToken(token);
        await _saveUserInfo(username); // Lưu username khi đăng nhập thành công
        print("Đăng nhập thành công");
      } else {
        _handleError(response);
      }
    } catch (e) {
      print("Exception: $e");
      throw Exception('Đăng nhập thất bại: $e');
    }
  }

  // Lưu token vào Secure Storage
  Future<void> _saveToken(String token) async {
    await storage.write(key: 'authToken', value: token);
  }

  // Lưu username vào SharedPreferences
  Future<void> _saveUserInfo(String username) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('username', username);
  }

  // Kiểm tra trạng thái đăng nhập
  Future<bool> isLoggedIn() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs
        .containsKey('username'); // Kiểm tra username trong SharedPreferences
  }

  // Lấy token từ Secure Storage
  Future<String?> getToken() async {
    return await storage.read(key: 'authToken');
  }

  // Đăng xuất
  Future<void> logout() async {
    await storage.delete(key: 'authToken');
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('username'); // Xóa username khỏi SharedPreferences
    print("Đăng xuất thành công");
  }

  // Yêu cầu HTTP với xác thực tự động
  Future<http.Response> authenticatedRequest(Uri url, String method,
      {Map<String, String>? headers, dynamic body}) async {
    final token = await getToken();
    final authHeaders = {
      ...?headers,
      'Authorization': 'Bearer $token',
    };

    switch (method) {
      case 'POST':
        return http.post(url, headers: authHeaders, body: jsonEncode(body));
      case 'GET':
      default:
        return http.get(url, headers: authHeaders);
    }
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
    final errorData = jsonDecode(response.body);
    final message = errorData['message'] ?? 'Lỗi không xác định';

    switch (response.statusCode) {
      case 400:
        throw Exception('Yêu cầu không hợp lệ: $message');
      case 401:
        throw Exception('Không có quyền truy cập: $message');
      case 500:
        throw Exception('Lỗi từ server: $message');
      default:
        throw Exception('Lỗi: $message');
    }
  }

  // Kiểm tra định dạng email
  bool validateEmail(String email) {
    final emailRegex = RegExp(r'^[^@]+@[^@]+\.[^@]+');
    return emailRegex.hasMatch(email);
  }
}
