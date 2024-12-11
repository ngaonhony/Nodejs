import 'package:flutter/material.dart';
import '../services/AuthService.dart';
import './ResetPass.dart';

class ForgotPasswordPage extends StatefulWidget {
  @override
  _ForgotPasswordPageState createState() => _ForgotPasswordPageState();
}

class _ForgotPasswordPageState extends State<ForgotPasswordPage> {
  final AuthService _authService = AuthService();
  final TextEditingController _emailController = TextEditingController();
  bool _isLoading = false;

  void _forgotPassword() async {
    if (_emailController.text.isEmpty) {
      _showMessage('Vui lòng nhập địa chỉ email của bạn.');
      return;
    }

    setState(() => _isLoading = true);

    try {
      await _authService.forgotPassword(_emailController.text.trim());
      _showMessage(
          'Mã xác thực đã được gửi. Vui lòng kiểm tra email để tiếp tục.');
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => ResetPasswordPage()),
      );
    } catch (e) {
      _showMessage(_getErrorMessage(e.toString()));
    } finally {
      setState(() => _isLoading = false);
    }
  }

  // Xử lý thông báo lỗi dựa trên loại lỗi
  String _getErrorMessage(String error) {
    if (error.contains('Email không tồn tại')) {
      return 'Email này không tồn tại trong hệ thống. Vui lòng kiểm tra lại.';
    } else if (error.contains('Tài khoản chưa được xác thực')) {
      return 'Tài khoản của bạn chưa được xác thực. Vui lòng kiểm tra email để xác thực tài khoản trước.';
    } else if (error.contains('Không có kết nối mạng')) {
      return 'Không có kết nối mạng. Vui lòng kiểm tra kết nối internet của bạn.';
    } else {
      return 'Có lỗi xảy ra. Vui lòng thử lại sau.';
    }
  }

  void _showMessage(String message) {
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text(message)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Quên mật khẩu', style: TextStyle(color: Colors.black)),
        backgroundColor: Colors.white,
        iconTheme: IconThemeData(color: Colors.black),
        elevation: 1,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SizedBox(height: 16),
            TextField(
              controller: _emailController,
              decoration: InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
            ),
            SizedBox(height: 24),
            ElevatedButton(
              onPressed: _isLoading ? null : _forgotPassword,
              style: ElevatedButton.styleFrom(
                padding: EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                backgroundColor: Colors.blue,
              ),
              child: _isLoading
                  ? CircularProgressIndicator(color: Colors.white)
                  : Text('Gửi mã xác thực',
                      style: TextStyle(color: Colors.white, fontSize: 16)),
            ),
          ],
        ),
      ),
    );
  }
}
