import 'package:flutter/material.dart';
import 'post_box.dart';

class PostListPage extends StatelessWidget {
  final Future<List<dynamic>> postsFuture;

  PostListPage({required this.postsFuture});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<dynamic>>(
      future: postsFuture,
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
          shrinkWrap: true,
          physics: NeverScrollableScrollPhysics(),
          itemCount: posts.length,
          itemBuilder: (context, index) {
            final post = posts[index];
            return PostBox(
              postId: post['_id'] ?? '',
              title: post['title'] ?? 'Không có tiêu đề',
              price: '${(post['price'] ?? 0).toString()} triệu/tháng',
              area: '${(post['area'] ?? 0).toString()} m²',
              location: '${post['address']?['district'] ?? ""}, ${post['address']?['province'] ?? ""}',
              images: post['images'] != null ? List<String>.from(post['images']) : [],
            );

          },
        );
      },
    );
  }
}
