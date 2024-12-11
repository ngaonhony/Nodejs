import 'package:flutter/material.dart';
import '../../../services/PostUserApi.dart';

class PostDetail extends StatefulWidget {
  final String postId;

  // Khởi tạo PostDetail với postId
  PostDetail({required this.postId});

  @override
  _PostDetailState createState() => _PostDetailState();
}

class _PostDetailState extends State<PostDetail> {
  late Future<Map<String, dynamic>> _postDetail;  // Future chứa thông tin bài đăng

  @override
  void initState() {
    super.initState();
    _loadPostDetail();
  }

  // Tải chi tiết bài đăng
  Future<void> _loadPostDetail() async {
    final postApi = PostApi('your_token_here');  // Lấy token từ nơi phù hợp
    _postDetail = postApi.getPostById(widget.postId);  // Lấy bài đăng theo ID
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Chi Tiết Bài Đăng'),
      ),
      body: FutureBuilder<Map<String, dynamic>>(
        future: _postDetail,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Lỗi khi tải dữ liệu: ${snapshot.error}'));
          } else if (!snapshot.hasData) {
            return Center(child: Text('Không có dữ liệu bài đăng.'));
          }

          final post = snapshot.data!;  // Lấy dữ liệu bài đăng từ snapshot

          return Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  post['title'] ?? 'Không có tiêu đề',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
                ),
                SizedBox(height: 10),
                Text(
                  post['description'] ?? 'Không có mô tả',
                  style: TextStyle(fontSize: 16),
                ),
                SizedBox(height: 10),
                Text(
                  post['location'] ?? 'Không có địa chỉ',
                  style: TextStyle(fontSize: 14, color: Colors.grey),
                ),
                SizedBox(height: 10),
                Text(
                  '${post['price']} VND/tháng',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.green),
                ),
                SizedBox(height: 10),
                // Hiển thị ảnh nếu có
                if (post['images'] != null && post['images'].isNotEmpty)
                  Image.network(post['images'][0]),
              ],
            ),
          );
        },
      ),
    );
  }
}
