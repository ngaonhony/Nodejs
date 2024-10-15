import 'package:flutter/material.dart';

class AuthInfo extends StatelessWidget {
  final String username;
  final int balance;

  const AuthInfo({required this.username, this.balance = 0, Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
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
            'Bạn đang có $balance VNĐ trong tài khoản đăng tin.',
            style: const TextStyle(color: Colors.white, fontSize: 16),
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              TextButton(
                onPressed: () {
                  // Điều hướng đến trang Đăng tin
                },
                child: const Text(
                  'Đăng tin',
                  style: TextStyle(
                      color: Colors.white,
                      decoration: TextDecoration.underline),
                ),
              ),
              const SizedBox(width: 8),
              TextButton(
                onPressed: () {
                  // Điều hướng đến trang Quản lí tài khoản
                },
                child: const Text(
                  'Quản lí tài khoản',
                  style: TextStyle(
                      color: Colors.white,
                      decoration: TextDecoration.underline),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
