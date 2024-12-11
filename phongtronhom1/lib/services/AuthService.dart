import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import "package:jwt_decode/jwt_decode.dart";

class AuthService {
  final String baseUrl = 'http://192.168.100.243:3000/api/auth';
  final storage = FlutterSecureStorage();

  Future<void> register(
      String name, String email, String password, String phone) async {
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

  Future<void> resendVerificationCode() async {
    final email = await _getUserEmail();
    if (email == null) {
      throw Exception("Không có email để gửi lại mã xác thực");
    }

    final url = Uri.parse('$baseUrl/resend');
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

      } else {
        _handleError(response);
      }
    } catch (e) {
      throw Exception('Gửi lại mã xác thực thất bại: $e');
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

      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(bodyData),
      );

      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);

        if (responseData != null &&
            responseData['_id'] != null) {
          final String userId = responseData['_id'];
          final String token = responseData['accessToken'];

          final prefs = await SharedPreferences.getInstance();
          await prefs.setString('accessToken', token);
          await prefs.setString('userId', userId);

          await _saveToken(token);
        } else {
          throw Exception('Phản hồi không chứa thông tin người dùng hợp lệ.');
        }
      } else {
        _handleError(response);
      }
    } catch (e) {
      throw Exception('Đăng nhập thất bại: $e');
    }
  }

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

  Future<void> _saveToken(String token) async {
    await storage.write(key: 'authToken', value: token);
  }

  Future<void> _saveUserEmail(String email) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('email', email);
  }

  Future<String?> _getUserEmail() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('email');
  }

  Future<void> _clearUserEmail() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('email');
  }

  Future<String?> getToken() async {
    return await storage.read(key: 'authToken');
  }

  Future<void> logout() async {
    await storage.delete(key: 'authToken');
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('accessToken');
    await prefs.remove('userId');
  }

  Future<void> refreshToken() async {
    final url = Uri.parse('$baseUrl/refresh-token');
    final connectivityResult = await Connectivity().checkConnectivity();

    if (connectivityResult == ConnectivityResult.none) {
      throw Exception('Không có kết nối mạng');
    }

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        final String newToken = responseData['accessToken'];

        await _saveToken(newToken);

      } else {
        _handleError(response);
      }
    } catch (e) {
      throw Exception('Làm mới token thất bại: $e');
    }

  }

  Future<bool> checkTokenExpiration() async {
    final token = await getToken();
    if (token == null) {
      throw Exception('Không tìm thấy token');
    }

    bool isExpired = Jwt.isExpired(token);

    if (isExpired) {
      try {
        await refreshToken();
        return true; // Token was expired, but successfully refreshed
      } catch (e) {
        await logout();
        throw Exception('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
      }
    }

    return true;
  }


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
