import 'package:flutter/material.dart';
import 'post_box.dart';
import '../../services/post_service.dart';

class PostListPage extends StatelessWidget {
  final PostApiService postService = PostApiService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Danh Sách Phòng Trọ'),
      ),
      body: FutureBuilder<List<dynamic>>(
        future: postService.getAllPosts(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Lỗi khi tải dữ liệu'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(child: Text('Không có bài đăng nào'));
          }

          final posts = snapshot.data!;

          return ListView.builder(
            itemCount: posts.length,
            itemBuilder: (context, index) {
              final post = posts[index];
              return PostBox(
                postId: post['_id'] ?? '',
                title: post['title'] ?? 'Không có tiêu đề',
                price: (post['price'] is num ? post['price'] : 0).toString() +
                    ' đồng/tháng',
                area:
                    (post['area'] is num ? post['area'] : 0).toString() + ' m²',
                location:
                    '${post['address']?['district'] ?? ""}, ${post['address']?['province'] ?? ""}',
                imageUrl:
                    (post['imageUrl'] != null && post['imageUrl'].isNotEmpty)
                        ? post['imageUrl'][0]
                        : 'https://via.placeholder.com/200',
              );
            },
          );
        },
      ),
    );
  }
}
