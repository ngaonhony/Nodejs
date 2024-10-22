import 'package:flutter/material.dart';
import '../screens/verify_email.dart'; // Màn hình xác thực email
import '../services/auth_service.dart';

class Register extends StatefulWidget {
  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  final AuthService _authService = AuthService();
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _addressController = TextEditingController();
  bool _isLoading = false;

  void _register() async {
    if (_isFormValid()) {
      setState(() => _isLoading = true);

      try {
        await _authService.register(
          _usernameController.text.trim(),
          _emailController.text.trim(),
          _passwordController.text.trim(),
          _phoneController.text.trim(),
          _addressController.text.trim(),
          "tenant",
        );

        _showMessage(
            'Đăng ký thành công. Vui lòng kiểm tra email để xác thực.');

        // Chuyển người dùng đến màn hình xác thực email
        Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(
            builder: (context) => VerifyEmailScreen(
              email: _emailController.text.trim(),
            ),
          ),
          (route) => false,
        );
      } catch (e) {
        _showMessage('Đăng ký thất bại: ${e.toString()}');
      } finally {
        setState(() => _isLoading = false);
      }
    }
  }

  // Kiểm tra hợp lệ form
  bool _isFormValid() {
    if (_usernameController.text.isEmpty ||
        _emailController.text.isEmpty ||
        _passwordController.text.isEmpty ||
        _phoneController.text.isEmpty ||
        _addressController.text.isEmpty) {
      _showMessage('Vui lòng điền đầy đủ thông tin');
      return false;
    }
    if (!_emailController.text.contains('@')) {
      _showMessage('Email không hợp lệ');
      return false;
    }
    if (_passwordController.text.length < 6) {
      _showMessage('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }
    return true;
  }

  void _showMessage(String message) {
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text(message)));
  }

  Widget _buildTextField({
    required String label,
    required TextEditingController controller,
    bool obscureText = false,
  }) {
    return TextField(
      controller: controller,
      obscureText: obscureText,
      decoration: InputDecoration(
        labelText: label,
        labelStyle: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        filled: true,
        fillColor: Colors.grey[200],
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide.none,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Đăng ký', style: TextStyle(color: Colors.black)),
        backgroundColor: Colors.white,
        iconTheme: IconThemeData(color: Colors.black),
        elevation: 1,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SizedBox(height: 16),
            _buildTextField(
                label: 'HỌ VÀ TÊN', controller: _usernameController),
            SizedBox(height: 16),
            _buildTextField(label: 'EMAIL', controller: _emailController),
            SizedBox(height: 16),
            _buildTextField(
                label: 'SỐ ĐIỆN THOẠI', controller: _phoneController),
            SizedBox(height: 16),
            _buildTextField(
              label: 'MẬT KHẨU',
              controller: _passwordController,
              obscureText: true,
            ),
            SizedBox(height: 16),
            _buildTextField(label: 'ĐỊA CHỈ', controller: _addressController),
            SizedBox(height: 16),
            SizedBox(height: 24),
            ElevatedButton(
              onPressed: _isLoading ? null : _register,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blue,
                padding: EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              child: _isLoading
                  ? CircularProgressIndicator(color: Colors.white)
                  : Text('Đăng ký',
                      style: TextStyle(color: Colors.white, fontSize: 16)),
            ),
          ],
        ),
      ),
    );
  }
}
