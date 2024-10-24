import 'package:app_flutter/pages/login.dart';
import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import '../pages/home.dart';

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
                'Vui lòng nhập mã xác thực đã được gửi tới email ${widget.email} ,  .'),
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
              ),
              child: _isLoading
                  ? CircularProgressIndicator(
                      color: const Color.fromARGB(255, 0, 0, 0))
                  : Text('Xác thực',
                      style: TextStyle(color: Colors.white, fontSize: 16)),
            ),
          ],
        ),
      ),
    );
  }
}
