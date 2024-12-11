import 'package:flutter/material.dart';
import '../../../services/PostUserApi.dart';
import 'PostDetail.dart';

class PostBox extends StatelessWidget {
  final Map<String, dynamic> post; // Nhận bài đăng từ PostList

  PostBox({required this.post});

  @override
  Widget build(BuildContext context) {
    // Kiểm tra xem bài đăng có chứa ID hay không
    final postId = post['_id'] ?? 'Unknown ID';

    // Kiểm tra xem bài đăng có ảnh hay không, nếu không có dùng ảnh placeholder
    final postImage = post['images'] != null && post['images'].isNotEmpty
        ? post['images'][0]  // Lấy ảnh đầu tiên nếu có
        : 'https://via.placeholder.com/200';  // Placeholder nếu không có ảnh

    // Kiểm tra nếu giá trị 'price' có tồn tại và hợp lệ
    final price = post['price'] != null ? post['price'].toString() : 'Chưa có giá';

    return GestureDetector(
      onTap: () {
        // Khi nhấn vào bài đăng, chuyển sang chi tiết bài đăng
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => PostDetail(postId: postId),
          ),
        );
      },
      child: Card(
        elevation: 5,
        margin: EdgeInsets.symmetric(vertical: 8),
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            children: [
              // Hình ảnh
              Container(
                width: 80,
                height: 80,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: NetworkImage(postImage),
                    fit: BoxFit.cover,
                  ),
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              SizedBox(width: 10),
              // Nội dung bài đăng
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Tiêu đề bài đăng
                    Text(
                      post['title'] ?? 'Không có tiêu đề',  // Nếu không có tiêu đề, hiển thị thông báo mặc định
                      style: TextStyle(fontWeight: FontWeight.bold),
                      overflow: TextOverflow.ellipsis,  // Tránh tràn nội dung nếu tiêu đề quá dài
                    ),
                    SizedBox(height: 5),
                    // Địa chỉ bài đăng
                    Text(
                      post['location'] ?? 'Không có địa chỉ',  // Nếu không có địa chỉ, hiển thị thông báo mặc định
                      style: TextStyle(fontSize: 12, color: Colors.grey),
                      overflow: TextOverflow.ellipsis,  // Tránh tràn nội dung nếu địa chỉ quá dài
                    ),
                    SizedBox(height: 5),
                    // Giá bài đăng
                    Text(
                      '$price triệu/tháng',  // Hiển thị giá tiền nếu có, nếu không hiển thị thông báo
                      style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.green),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
