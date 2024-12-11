import 'package:flutter/material.dart';
import '../../../services/PostUserApi.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'PostBox.dart';
import 'PostDetail.dart';  // Import màn hình chi tiết bài đăng

class PostList extends StatefulWidget {
  @override
  _PostListState createState() => _PostListState();
}

class _PostListState extends State<PostList> {
  Future<List<Map<String, dynamic>>>? _posts;  // Chuyển thành nullable
  late PostApi _postApi;
  late String _userId;

  @override
  void initState() {
    super.initState();
    _initializeService();
  }

  // Khởi tạo PostApi và lấy token từ SharedPreferences
  Future<void> _initializeService() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('accessToken') ?? '';
    _userId = prefs.getString('userId') ?? '';

    // Khởi tạo PostApi với token
    _postApi = PostApi(token);

    // Khởi tạo Future để lấy bài đăng
    setState(() {
      _posts = _postApi.getUserPosts(token);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      body: _posts == null
          ? Center(child: CircularProgressIndicator())  // Nếu _posts là null, hiển thị loading
          : FutureBuilder<List<Map<String, dynamic>>>(
        future: _posts,  // Sử dụng biến _posts đã được khởi tạo
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Bạn chưa đăng bài nào'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(child: Text('Bạn chưa đăng bài nào.'));
          }

          final posts = snapshot.data!;

          return ListView.builder(
            itemCount: posts.length,
            itemBuilder: (context, index) {
              // Khi nhấn vào một bài đăng, điều hướng tới PostDetail
              return GestureDetector(
                onTap: () {
                  // Chuyển tới màn hình chi tiết bài đăng
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => PostDetail(postId: posts[index]['_id']),
                    ),
                  );
                },
                child: PostBox(post: posts[index]),
              );
            },
          );
        },
      ),
    );
  }
}
