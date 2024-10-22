import 'package:app_flutter/pages/login.dart';
import 'package:flutter/material.dart';
import '../screens/verify_email.dart'; // Màn hình xác thực email
import '../services/auth_service.dart';

class Register extends StatefulWidget {
  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  final AuthService _authService = AuthService();
  final TextEditingController name = TextEditingController();
  final TextEditingController email = TextEditingController();
  final TextEditingController password = TextEditingController();
  final TextEditingController phone = TextEditingController();
  final TextEditingController address = TextEditingController();
  bool _isLoading = false;
  bool _obscurePassword = true;

  // Hàm đăng ký
  void _register() async {
    if (_isFormValid()) {
      setState(() => _isLoading = true);

      try {
        // Thực hiện đăng ký
        await _authService.register(
          name.text.trim(),
          email.text.trim(),
          password.text.trim(),
          phone.text.trim(),
          address.text.trim(),
          "tenant", // role mặc định là 'tenant'
        );

        _showMessage(
            'Đăng ký thành công. Vui lòng kiểm tra email để xác thực.');

        Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(
            builder: (context) => VerifyEmailScreen(
              email: email.text.trim(),
              password: password.text.trim(),
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

  // Kiểm tra tính hợp lệ của form đăng ký
  bool _isFormValid() {
    if (name.text.isEmpty ||
        email.text.isEmpty ||
        password.text.isEmpty ||
        phone.text.isEmpty ||
        address.text.isEmpty) {
      _showMessage('Vui lòng điền đầy đủ thông tin');
      return false;
    }
    if (!email.text.contains('@')) {
      _showMessage('Email không hợp lệ');
      return false;
    }
    if (password.text.length < 6) {
      _showMessage('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }
    return true;
  }

  // Hiển thị tin nhắn thông báo
  void _showMessage(String message) {
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text(message)));
  }

  // Xây dựng giao diện trường nhập liệu
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
            _buildTextField(label: 'HỌ VÀ TÊN', controller: name),
            SizedBox(height: 16),
            _buildTextField(label: 'EMAIL', controller: email),
            SizedBox(height: 16),
            _buildTextField(label: 'SỐ ĐIỆN THOẠI', controller: phone),
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
            SizedBox(height: 16),
            _buildTextField(label: 'ĐỊA CHỈ', controller: address),
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
            SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => LoginPage()),
                    );
                  },
                  child: Text('Đăng Nhập'),
                ),
              ],
            ),
            SizedBox(height: 32),
            _buildCustomerSupport(),
          ],
        ),
      ),
    );
  }

  // Xây dựng mục hỗ trợ khách hàng
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
}
