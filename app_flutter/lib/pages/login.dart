import 'package:flutter/material.dart';
import './register.dart';
import './home.dart';
import '../services/auth_service.dart';
import '../screens/ForgotPass.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final AuthService _authService = AuthService();
  final TextEditingController emailOrPhone = TextEditingController();
  final TextEditingController password = TextEditingController();

  bool _isLoading = false;
  bool _obscurePassword = true;
  void _login() async {
    final emailOrPhoneText = emailOrPhone.text.trim();
    final passwordText = password.text.trim();

    if (emailOrPhoneText.isEmpty || passwordText.isEmpty) {
      _showMessage('Vui lòng nhập email hoặc số điện thoại và mật khẩu');
      return;
    }

    setState(() => _isLoading = true);

    try {
      await _authService.login(emailOrPhoneText, passwordText);

      _showMessage('Đăng nhập thành công');

      if (mounted) {
        Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => Home()),
          (route) => false,
        );
      }
    } catch (e) {
      if (e.toString().contains('401')) {
        _showMessage('Thông tin đăng nhập không chính xác');
      } else if (e.toString().contains('Tài khoản chưa được xác thực')) {
        _showMessage('Tài khoản chưa được xác thực. Vui lòng kiểm tra email.');
      } else {
        _showMessage('Đăng nhập thất bại: ${e.toString()}');
      }
    } finally {
      setState(() => _isLoading = false);
    }
  }

  void _showMessage(String message) {
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text(message)));
  }

  // Hàm tạo ô nhập liệu
  Widget _buildTextField({
    required String label,
    required TextEditingController controller,
    bool obscureText = false,
    VoidCallback? togglePasswordVisibility,
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
        suffixIcon: togglePasswordVisibility != null
            ? IconButton(
                icon: Icon(
                  obscureText ? Icons.visibility : Icons.visibility_off,
                ),
                onPressed: togglePasswordVisibility,
              )
            : null,
      ),
    );
  }

  Widget _buildCustomerSupport() {
    return Container(
      color: Colors.blue[800],
      padding: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Hỗ trợ khách hàng',
            style: TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
              fontSize: 16,
            ),
          ),
          SizedBox(height: 8),
          Row(
            children: [
              Icon(Icons.phone, color: Colors.green, size: 16),
              SizedBox(width: 8),
              Text('0909316890', style: TextStyle(color: Colors.white)),
            ],
          ),
          SizedBox(height: 8),
          Row(
            children: [
              Icon(Icons.phone, color: Colors.green, size: 16),
              SizedBox(width: 8),
              Text('0374905975', style: TextStyle(color: Colors.white)),
            ],
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Đăng nhập', style: TextStyle(color: Colors.black)),
        backgroundColor: Colors.white,
        iconTheme: IconThemeData(color: Colors.black),
        elevation: 1,
        actions: [
          IconButton(
            icon: Icon(Icons.home, color: Colors.black),
            onPressed: () {
              Navigator.of(context).pushAndRemoveUntil(
                MaterialPageRoute(builder: (context) => Home()),
                (route) => false,
              );
            },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SizedBox(height: 16),
            _buildTextField(
              label: 'EMAIL / SỐ ĐIỆN THOẠI',
              controller: emailOrPhone,
            ),
            SizedBox(height: 16),
            _buildTextField(
              label: 'MẬT KHẨU',
              controller: password,
              obscureText: _obscurePassword,
              togglePasswordVisibility: () {
                setState(() {
                  _obscurePassword = !_obscurePassword;
                });
              },
            ),
            SizedBox(height: 24),
            ElevatedButton(
              onPressed: _isLoading ? null : _login,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blue,
                padding: EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              child: _isLoading
                  ? CircularProgressIndicator(color: Colors.white)
                  : Text(
                      'Đăng nhập',
                      style: TextStyle(color: Colors.white, fontSize: 16),
                    ),
            ),
            SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => ForgotPasswordPage()),
                    );
                  },
                  child: Text('Bạn quên mật khẩu?'),
                ),
                TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => Register()),
                    );
                  },
                  child: Text('Tạo tài khoản mới'),
                ),
              ],
            ),
            Spacer(),
            _buildCustomerSupport(),
          ],
        ),
      ),
    );
  }
}
