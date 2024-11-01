import 'dart:convert';
import 'package:flutter/material.dart';
import '../../services/post_service.dart';
import 'package:intl/intl.dart'; // Để định dạng ngày tháng
import 'package:url_launcher/url_launcher.dart'; // Để mở số điện thoại

class PostDetails extends StatelessWidget {
  final String postId;

  PostDetails({required this.postId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Chi Tiết Phòng Trọ'),
      ),
      body: FutureBuilder<Map<String, dynamic>>(
        future: PostApiService().getPostById(postId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Lỗi khi tải dữ liệu'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(child: Text('Không tìm thấy dữ liệu'));
          }

          final post = snapshot.data!;

          return SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Hình ảnh
                  Stack(
                    children: [
                      Container(
                        width: double.infinity,
                        height: 200,
                        decoration: BoxDecoration(
                          image: DecorationImage(
                            image: NetworkImage(post['imageUrl'] != null &&
                                    post['imageUrl'].isNotEmpty
                                ? post['imageUrl'][0]
                                : 'https://via.placeholder.com/200'),
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                      Positioned(
                        top: 10,
                        left: 10,
                        child: Icon(
                          Icons.photo,
                          color: Colors.white,
                          size: 30,
                        ),
                      ),
                      Positioned(
                        top: 10,
                        right: 10,
                        child: IconButton(
                          icon: Icon(Icons.favorite_border),
                          color: Colors.white,
                          onPressed: () {},
                        ),
                      ),
                    ],
                  ),
                  // Thông tin chính
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          post['title'] ?? 'Không có tiêu đề',
                          style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: Colors.red),
                        ),
                        SizedBox(height: 5),
                        Text(
                          'Địa chỉ: ${post['address']?['houseAndStreet'] ?? ''}, ${post['address']?['commune'] ?? ''}, ${post['address']?['district'] ?? ''}, ${post['address']?['province'] ?? ''}',
                          style: TextStyle(fontSize: 14, color: Colors.black54),
                        ),
                        SizedBox(height: 10),
                        Row(
                          children: [
                            Text(
                              '${post['price']?.toString() ?? '0'} đồng/tháng',
                              style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.green),
                            ),
                            Spacer(),
                            Text(
                              '${post['area']?.toString() ?? '0'} m²',
                              style: TextStyle(
                                  fontSize: 14, color: Colors.black54),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  Divider(),
                  // Thông tin người đăng
                  ListTile(
                    leading: CircleAvatar(
                      child: Icon(Icons.person),
                    ),
                    title: Text(post['name'] ?? 'Không có tên'),
                    subtitle: Text('Đang hoạt động'),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: Icon(Icons.call),
                          color: Colors.blue,
                          onPressed: () {
                            if (post['phone'] != null) {
                              _launchCaller(post['phone']);
                            }
                          },
                        ),
                        IconButton(
                          icon: Icon(Icons.message),
                          color: Colors.lightBlue,
                          onPressed: () {
                            // Mở ứng dụng tin nhắn nếu có
                          },
                        ),
                      ],
                    ),
                  ),
                  Divider(),
                  // Thông tin mô tả
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Thông tin mô tả',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        SizedBox(height: 5),
                        Text(
                          post['description'] ?? 'Không có mô tả',
                          style: TextStyle(fontSize: 14),
                        ),
                      ],
                    ),
                  ),
                  Divider(),
                  // Đặc điểm tin đăng
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Đặc điểm tin đăng',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        SizedBox(height: 5),
                        Text('Mã tin: ${post['_id']}'),
                        Text('Chuyên mục: ${post['category'] ?? "Không rõ"}'),
                        Text(
                            'Đối tượng thuê: ${post['objectForRent'] ?? "Không rõ"}'),
                        Text(
                            'Ngày đăng: ${_formatDate(post['createdAt']) ?? "Không rõ"}'),
                        Text(
                            'Ngày hết hạn: ${_formatDate(post['updatedAt']) ?? "Không rõ"}'),
                      ],
                    ),
                  ),
                  Divider(),
                  // Thông tin liên hệ
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Thông tin liên hệ',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        SizedBox(height: 5),
                        Text('Liên hệ: ${post['name'] ?? "Không có tên"}'),
                        Text(
                            'Điện thoại: ${post['phone'] ?? "Không có số điện thoại"}'),
                      ],
                    ),
                  ),
                  Divider(),
                  // Bản đồ
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Bản đồ',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        SizedBox(height: 5),
                        Text(
                            'Địa chỉ: ${post['address']?['houseAndStreet'] ?? ''}, ${post['address']?['commune'] ?? ''}, ${post['address']?['district'] ?? ''}, ${post['address']?['province'] ?? ''}'),
                        SizedBox(height: 10),
                        Container(
                          height: 200,
                          width: double.infinity,
                          color: Colors.grey[300],
                          child: Center(
                            child: Text('Xem bản đồ',
                                style: TextStyle(color: Colors.blue)),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Divider(),
                  // Gửi phản hồi
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Center(
                      child: ElevatedButton.icon(
                        onPressed: () {},
                        icon: Icon(Icons.flag),
                        label: Text('Gửi phản hồi'),
                        style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.blue),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  // Hàm mở gọi điện
  void _launchCaller(String phoneNumber) async {
    final url = 'tel:$phoneNumber';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Không thể mở số điện thoại';
    }
  }

  // Hàm định dạng ngày tháng
  String _formatDate(String? dateString) {
    if (dateString == null) return "Không rõ";
    final date = DateTime.parse(dateString);
    return DateFormat('dd/MM/yyyy').format(date);
  }
}
