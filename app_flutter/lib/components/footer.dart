import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../pages/Profile.dart';
import '../pages/login.dart';
import '../pages/register.dart';
import '../pages/home.dart';
import '../pages/Post.dart'; // Import PostScreen for navigation

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
      isLoggedIn = prefs.containsKey('accessToken');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        BottomAppBar(
          shape: const CircularNotchedRectangle(),
          notchMargin: 8.0,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // Nút Trang chủ
                IconButton(
                  icon: const Icon(Icons.home),
                  onPressed: () {
                    Navigator.of(context).pushAndRemoveUntil(
                      MaterialPageRoute(builder: (context) => Home()),
                      (Route<dynamic> route) => false,
                    );
                  },
                  tooltip: 'Trang chủ',
                ),
                // Nút Yêu thích (để trống)
                IconButton(
                  icon: const Icon(Icons.favorite_border),
                  onPressed: () {
                    // Điều hướng đến trang yêu thích (nếu có)
                  },
                  tooltip: 'Yêu thích',
                ),
                // Khoảng trống cho FloatingActionButton
                const SizedBox(width: 48),
                // Các nút tùy chọn dựa trên trạng thái đăng nhập
                if (!isLoggedIn) ...[
                  // Nếu chưa đăng nhập: Đăng nhập và Đăng ký
                  IconButton(
                    icon: const Icon(Icons.login),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => LoginPage()),
                      );
                    },
                    tooltip: 'Đăng nhập',
                  ),
                  IconButton(
                    icon: const Icon(Icons.person_add),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => Register()),
                      );
                    },
                    tooltip: 'Đăng ký',
                  ),
                ] else ...[
                  // Nếu đã đăng nhập: Quản lý tin và Cá nhân
                  IconButton(
                    icon: const Icon(Icons.list_alt),
                    onPressed: () {
                      // Điều hướng đến trang Quản lý tin (nếu có)
                    },
                    tooltip: 'Quản lý tin',
                  ),
                  IconButton(
                    icon: const Icon(Icons.person),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => Profile()),
                      );
                    },
                    tooltip: 'Cá nhân',
                  ),
                ],
              ],
            ),
          ),
        ),
        // Nút FloatingActionButton Đăng tin miễn phí
        Positioned(
          bottom: 10.0,
          left: MediaQuery.of(context).size.width / 2 - 30,
          child: FloatingActionButton(
            onPressed: () {
              // Kiểm tra trạng thái đăng nhập
              if (isLoggedIn) {
                // Nếu đã đăng nhập, điều hướng đến trang đăng tin
                // Navigator.push(
                //   context,
                //   MaterialPageRoute(builder: (context) => PostScreen()),
                // );
              } else {
                // Nếu chưa đăng nhập, điều hướng đến trang đăng nhập
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => LoginPage()),
                );
              }
            },
            backgroundColor: Colors.orange,
            child: const Icon(Icons.add),
            tooltip: 'Đăng tin miễn phí',
          ),
        ),
      ],
    );
  }
}
