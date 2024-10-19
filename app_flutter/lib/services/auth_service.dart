import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:connectivity_plus/connectivity_plus.dart';

class AuthService {
  final String baseUrl = 'http://localhost:3000/api/auth';
  final storage = FlutterSecureStorage();

  Future<void> register(String name, String email, String password,
      String phone, String address, String role) async {
    final url = Uri.parse('$baseUrl/register');
    final connectivityResult = await Connectivity().checkConnectivity();

    if (connectivityResult == ConnectivityResult.none) {
      throw Exception('Không có kết nối mạng');
    }

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'name': name,
          'email': email,
          'password': password,
          'phone': phone,
          'address': address,
          'role': role,
        }),
      );

      if (response.statusCode == 201) {
        await _saveUserEmail(email);
      } else {
        _handleError(response);
      }
    } catch (e) {
      throw Exception('Đăng ký thất bại: $e');
    }
  }

  Future<void> verifyEmail(String verificationCode) async {
    final email = await _getUserEmail();
    if (email == null) {
      throw Exception("Không có email để xác thực");
    }

    final url = Uri.parse('$baseUrl/verify');
    final connectivityResult = await Connectivity().checkConnectivity();

    if (connectivityResult == ConnectivityResult.none) {
      throw Exception('Không có kết nối mạng');
    }

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'verificationCode': verificationCode,
          'email': email,
        }),
      );

      if (response.statusCode == 200) {
        await _clearUserEmail();
      } else {
        _handleError(response);
      }
    } catch (e) {
      throw Exception('Xác thực thất bại: $e');
    }
  }

  Future<void> login(String emailOrPhone, String password) async {
    final connectivityResult = await Connectivity().checkConnectivity();
    if (connectivityResult == ConnectivityResult.none) {
      throw Exception('Không có kết nối mạng');
    }

    if (emailOrPhone.isEmpty) {
      throw Exception('Email hoặc số điện thoại phải được nhập');
    }

    if (password.isEmpty) {
      throw Exception('Mật khẩu không được để trống');
    }

    final url = Uri.parse('$baseUrl/login');

    try {
      final bodyData = {
        'password': password,
        if (_isValidEmail(emailOrPhone))
          'email': emailOrPhone
        else
          'phone': emailOrPhone
      };

      // Gửi yêu cầu POST đến API
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(bodyData),
      );

      print('Phản hồi từ API: ${response.body}');

      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);

        if (responseData['user'] != null &&
            responseData['user']['_id'] != null) {
          final String userId = responseData['user']['_id'];
          final String token = responseData['token'];

          // Lưu token và userId vào SharedPreferences
          final prefs = await SharedPreferences.getInstance();
          await prefs.setString('token', token);
          await prefs.setString('userId', userId);

          print("Đăng nhập thành công với userId: $userId và token: $token");
          await _saveToken(token);
        } else {
          throw Exception('Phản hồi không chứa thông tin người dùng hợp lệ.');
        }
      } else {
        _handleError(response);
      }
    } catch (e) {
      print("Exception: $e");
      throw Exception('Đăng nhập thất bại: $e');
    }
  }

// Hàm kiểm tra định dạng email
  bool _isValidEmail(String input) {
    final emailRegex = RegExp(r"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$");
    return emailRegex.hasMatch(input);
  }

  Future<void> forgotPassword(String email) async {
    final url = Uri.parse('$baseUrl/forgot-password');
    final connectivityResult = await Connectivity().checkConnectivity();

    if (connectivityResult == ConnectivityResult.none) {
      throw Exception('Không có kết nối mạng');
    }

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email}),
      );

      if (response.statusCode == 200) {
        await _saveUserEmail(email);
      } else {
        _handleError(response);
      }
    } catch (e) {
      throw Exception('Quên mật khẩu thất bại: $e');
    }
  }

  // Đặt lại mật khẩu
  Future<void> resetPassword(
      String verificationCode, String newPassword) async {
    final email = await _getUserEmail();
    if (email == null) {
      throw Exception("Không có email để đặt lại mật khẩu");
    }

    final url = Uri.parse('$baseUrl/reset-password');
    final connectivityResult = await Connectivity().checkConnectivity();

    if (connectivityResult == ConnectivityResult.none) {
      throw Exception('Không có kết nối mạng');
    }

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'verificationCode': verificationCode,
          'password': newPassword,
        }),
      );

      if (response.statusCode == 200) {
        await _clearUserEmail();
      } else {
        _handleError(response);
      }
    } catch (e) {
      throw Exception('Đặt lại mật khẩu thất bại: $e');
    }
  }

  // Cập nhật thông tin người dùng
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
          'Authorization': 'Bearer ${await getToken()}'
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

  // Lưu token vào FlutterSecureStorage
  Future<void> _saveToken(String token) async {
    await storage.write(key: 'authToken', value: token);
  }

  // Lưu email người dùng để xác thực hoặc đặt lại mật khẩu
  Future<void> _saveUserEmail(String email) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('email', email);
  }

  // Lấy email đã lưu từ SharedPreferences
  Future<String?> _getUserEmail() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('email');
  }

  // Xóa email khỏi SharedPreferences sau khi đặt lại mật khẩu hoặc xác thực xong
  Future<void> _clearUserEmail() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('email');
  }

  // Lấy token đã lưu từ FlutterSecureStorage
  Future<String?> getToken() async {
    return await storage.read(key: 'authToken');
  }

  // Đăng xuất và xóa thông tin token
  Future<void> logout() async {
    await storage.delete(key: 'authToken');
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('name');
  }

  // Xử lý lỗi từ API
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
}
