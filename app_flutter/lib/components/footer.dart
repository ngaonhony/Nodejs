import 'package:flutter/material.dart';
import '../pages/login.dart';
import '../pages/register.dart';
import '../pages/home.dart';

class Footer extends StatelessWidget {
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
            SizedBox(width: 48),
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
          ],
        ),
      ),
    );
  }
}
