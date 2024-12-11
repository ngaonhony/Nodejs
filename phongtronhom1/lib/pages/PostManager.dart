import 'package:flutter/material.dart';
import '../components/UI/POSTmanager/PostDetail.dart';
import '../components/UI/POSTmanager/PostList.dart';
class PostManager extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Quản Lý Bài Đăng'),
      ),
      body: PostList(),  // Hiển thị danh sách bài đăng
    );
  }
}
