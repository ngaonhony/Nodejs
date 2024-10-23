import 'package:flutter/material.dart';
import '../../services/user_service.dart';

class AuthInfo extends StatefulWidget {
  const AuthInfo({Key? key}) : super(key: key);

  @override
  _AuthInfoState createState() => _AuthInfoState();
}

class _AuthInfoState extends State<AuthInfo> {
  final UserService _userService = UserService();
  late Future<Map<String, dynamic>> _userData;

  @override
  void initState() {
    super.initState();
    _userData = _userService.getCurrentUser(); // Lấy thông tin người dùng
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>>(
      future: _userData,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Center(child: Text('Lỗi: ${snapshot.error}'));
        } else if (snapshot.hasData) {
          // Kiểm tra name từ API có trả về hay không
          final String username = snapshot.data?['name'] ?? 'Người dùng';
          final int balance = snapshot.data?['balance'] ?? 0;

          return Container(
            padding: const EdgeInsets.all(30),
            decoration: BoxDecoration(
              color: Colors.blue,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    CircleAvatar(
                      radius: 24,
                      backgroundColor: Colors.white,
                      child: Icon(Icons.person, color: Colors.blue, size: 32),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      'Xin chào, $username!',
                      style: const TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  'Số dư của bạn: $balance VNĐ',
                  style: const TextStyle(color: Colors.white, fontSize: 16),
                ),
              ],
            ),
          );
        } else {
          return const Center(
              child: Text('Không tìm thấy thông tin người dùng'));
        }
      },
    );
  }
}
