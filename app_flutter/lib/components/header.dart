import 'package:flutter/material.dart';
import '../pages/home.dart';

class Header extends StatelessWidget implements PreferredSizeWidget {
  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: Colors.white,
      elevation: 0,
      title: GestureDetector(
        onTap: () {
          Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(builder: (context) => Home()),
            (route) => false,
          );
        },
        child: Image.asset(
          'assets/logo.png',
          height: 50,
        ),
      ),
      actions: [
        Row(
          children: [
            IconButton(
              icon: Icon(Icons.menu, color: Colors.black),
              onPressed: () {
                Scaffold.of(context)
                    .openEndDrawer(); // Mở endDrawer khi nhấn vào "Danh mục"
              },
            ),
            const Text(
              'Danh mục',
              style: TextStyle(color: Colors.black, fontSize: 16),
            ),
            const SizedBox(width: 16),
          ],
        ),
      ],
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight);
}
