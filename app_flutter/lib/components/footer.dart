import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../pages/login.dart';
import '../pages/register.dart';
import '../pages/home.dart';

class Footer extends StatefulWidget {
  @override
  _FooterState createState() => _FooterState();
}

class _FooterState extends State<Footer> {
  bool isLoggedIn = false;

  @override
  void initState() {
    super.initState();
    _checkLoginStatus();
  }

  Future<void> _checkLoginStatus() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      isLoggedIn =
          prefs.containsKey('username'); // Kiểm tra có tên người dùng không
    });
  }

  @override
  Widget build(BuildContext context) {
    return BottomAppBar(
      shape: CircularNotchedRectangle(),
      notchMargin: 8.0,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            IconButton(
              icon: Icon(Icons.home),
              onPressed: () {
                Navigator.of(context).pushAndRemoveUntil(
                  MaterialPageRoute(builder: (context) => Home()),
                  (Route<dynamic> route) => false,
                );
              },
              tooltip: 'Trang chủ',
            ),
            IconButton(
              icon: Icon(Icons.favorite_border),
              onPressed: () {},
              tooltip: 'Yêu thích',
            ),
            const SizedBox(width: 48), // Khoảng trống để FloatingActionButton
            if (!isLoggedIn) ...[
              IconButton(
                icon: Icon(Icons.login),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => LoginPage()),
                  );
                },
                tooltip: 'Đăng nhập',
              ),
              IconButton(
                icon: Icon(Icons.person_add),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => Register()),
                  );
                },
                tooltip: 'Đăng ký',
              ),
            ] else ...[
              IconButton(
                icon: Icon(Icons.list_alt), // Icon Quản lý tin
                onPressed: () {
                  // Điều hướng đến trang Quản lý tin
                },
                tooltip: 'Quản lý tin',
              ),
              IconButton(
                icon: Icon(Icons.person), // Icon Cá nhân
                onPressed: () {
                  // Điều hướng đến trang Cá nhân
                },
                tooltip: 'Cá nhân',
              ),
            ],
          ],
        ),
      ),
    );
  }
}
