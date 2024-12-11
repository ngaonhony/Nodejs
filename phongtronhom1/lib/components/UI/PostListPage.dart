import 'package:flutter/material.dart';
import 'post_box.dart';
import '../../services/PostApiService.dart';

class PostListPage extends StatefulWidget {
  const PostListPage({Key? key}) : super(key: key);

  @override
  State<PostListPage> createState() => _PostListPageState();
}

class _PostListPageState extends State<PostListPage> {
  late Future<List<dynamic>> postsFuture;
  List<dynamic> posts = []; // Danh sách tất cả bài đăng
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    postsFuture = PostApiService().getAllPosts();
  }

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

        // Lấy dữ liệu bài đăng từ snapshot
        posts = snapshot.data!;

        return ListView.builder(
          itemCount: posts.length,
          itemBuilder: (context, index) {
            final post = posts[index];
            return PostBox(
              postId: post['_id'] ?? '',
              title: post['title'] ?? 'Không có tiêu đề',
              price: '${(post['price'] ?? 0).toString()} triệu/tháng',
              area: '${(post['area'] ?? 0).toString()} m²',
              location:
              '${post['address']?['district'] ?? ""}, ${post['address']?['province'] ?? ""}',
              images: post['images'] != null
                  ? List<String>.from(post['images'])
                  : [], // Kiểm tra null
            );
          },
        );
      },
    );
  }
}
