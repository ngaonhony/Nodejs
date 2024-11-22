import '../pages/login.dart';
import 'package:flutter/material.dart';
import '../services/auth_service.dart';

class VerifyEmailScreen extends StatefulWidget {
  final String email;

  VerifyEmailScreen({required this.email});

  @override
  _VerifyEmailScreenState createState() => _VerifyEmailScreenState();
}

class _VerifyEmailScreenState extends State<VerifyEmailScreen> {
  final AuthService _authService = AuthService();
  final TextEditingController _verificationCodeController =
      TextEditingController();
  bool _isLoading = false;
  bool _isResending = false;

  void _verifyEmail() async {
    if (_verificationCodeController.text.isEmpty) {
      _showMessage('Vui lòng nhập mã xác thực');
      return;
    }

    setState(() => _isLoading = true);

    try {
      await _authService.verifyEmail(_verificationCodeController.text.trim());
      _showMessage('Xác thực thành công và đăng nhập tự động!');

      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (context) => LoginPage()),
        (route) => false,
      );
    } catch (e) {
      _showMessage('Xác thực thất bại: ${e.toString()}');
    } finally {
      setState(() => _isLoading = false);
    }
  }

  void _resendVerificationCode() async {
    setState(() => _isResending = true);

    try {
      await _authService.resendVerificationCode();
      _showMessage('Mã xác thực mới đã được gửi!');
    } catch (e) {
      _showMessage('Gửi lại mã xác thực thất bại: ${e.toString()}');
    } finally {
      setState(() => _isResending = false);
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
        title: Text('Xác thực Email', style: TextStyle(color: Colors.black)),
        backgroundColor: Colors.white,
        iconTheme: IconThemeData(color: Colors.black),
        elevation: 1,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
                'Vui lòng nhập mã xác thực đã được gửi tới email ${widget.email}.'),
            SizedBox(height: 24),
            TextField(
              controller: _verificationCodeController,
              decoration: InputDecoration(
                labelText: 'Mã xác thực',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
            ),
            SizedBox(height: 24),
            ElevatedButton(
              onPressed: _isLoading ? null : _verifyEmail,
              style: ElevatedButton.styleFrom(
                padding: EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                backgroundColor: Colors.blue, // Màu nền cho nút "Xác thực"
                foregroundColor: Colors.white, // Màu chữ cho nút "Xác thực"
              ),
              child: _isLoading
                  ? CircularProgressIndicator(color: Colors.white)
                  : Text('Xác thực', style: TextStyle(fontSize: 16)),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: _isResending ? null : _resendVerificationCode,
              style: ElevatedButton.styleFrom(
                padding: EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                  side: BorderSide(
                      color: Colors.grey), // Viền cho nút "Gửi lại mã"
                ),
                backgroundColor: Colors.white, // Màu nền cho nút "Gửi lại mã"
                foregroundColor: Colors.blue, // Màu chữ cho nút "Gửi lại mã"
              ),
              child: _isResending
                  ? CircularProgressIndicator(color: Colors.blue)
                  : Text('Gửi lại mã xác thực', style: TextStyle(fontSize: 16)),
            ),
          ],
        ),
      ),
    );
  }
}
