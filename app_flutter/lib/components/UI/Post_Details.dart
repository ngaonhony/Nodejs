import 'package:url_launcher/url_launcher.dart';
import 'package:flutter/material.dart';
import 'package:phongtronhom1/services/PostApiService.dart';
import 'package:intl/intl.dart';

class PostDetails extends StatelessWidget {
  final String postId;

  PostDetails({required this.postId});

  void _openImageSlideShow(BuildContext context, List<String> images) {
    final PageController pageController = PageController();

    showDialog(
      context: context,
      builder: (_) => Dialog(
        backgroundColor: Colors.grey[200],
        insetPadding: EdgeInsets.zero,
        child: Stack(
          children: [
            Container(
              height: 400,
              child: PageView.builder(
                controller: pageController,
                itemCount: images.length,
                itemBuilder: (context, index) {
                  return Image.network(
                    images[index],
                    fit: BoxFit.contain,
                    loadingBuilder: (context, child, loadingProgress) {
                      if (loadingProgress == null) return child;
                      return Center(child: CircularProgressIndicator());
                    },
                    errorBuilder: (context, error, stackTrace) {
                      return Center(child: Text('Lỗi tải ảnh'));
                    },
                  );
                },
              ),
            ),
            // Mũi tên trái
            Positioned(
              top: 180,
              left: 10,
              child: IconButton(
                icon: Icon(Icons.arrow_back_ios, color: Colors.black26, size: 30),
                onPressed: () {
                  pageController.previousPage(
                    duration: Duration(milliseconds: 300),
                    curve: Curves.easeInOut,
                  );
                },
              ),
            ),
            // Mũi tên phải
            Positioned(
              top: 180,
              right: 10,
              child: IconButton(
                icon: Icon(Icons.arrow_forward_ios, color: Colors.black26, size: 30),
                onPressed: () {
                  pageController.nextPage(
                    duration: Duration(milliseconds: 300),
                    curve: Curves.easeInOut,
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Chi Tiết Bài Đăng'),
      ),
      body: FutureBuilder<Map<String, dynamic>>(
        future: PostApiService().getPostById(postId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Lỗi khi tải dữ liệu: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data! == null) {
            return Center(child: Text('Không tìm thấy dữ liệu cho bài đăng này'));
          }

          final post = snapshot.data!;

          return SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Stack(
                    children: [
                      GestureDetector(
                        onTap: () {
                          _openImageSlideShow(context, List<String>.from(post['images']));
                        },
                        child: Container(
                          width: double.infinity,
                          height: 300,
                          decoration: BoxDecoration(
                            image: DecorationImage(
                              image: NetworkImage(
                                post['images'] != null && post['images'].isNotEmpty ? post['images'][0] : 'https://via.placeholder.com/200',
                              ),
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
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
                          'Địa chỉ: ${post['location'] ?? ''}',
                          style: TextStyle(fontSize: 14, color: Colors.black54),
                        ),
                        SizedBox(height: 10),
                        Row(
                          children: [
                            Text(
                              '${post['price']?.toString() ?? '0'} triệu/tháng',
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
                  ListTile(
                    leading: CircleAvatar(
                      child: Icon(Icons.person),
                    ),
                    title: Text(post['userId']?['name'] ?? 'Không có tên'),
                    subtitle: Text('Đang hoạt động'),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: Icon(Icons.call),
                          color: Colors.blue,
                          onPressed: () {
                            if (post['userId']?['phone'] != null) {
                              _launchCaller(post['userId']!['phone']);
                            }
                          },
                        ),
                        IconButton(
                          icon: Icon(Icons.message),
                          color: Colors.lightBlue,
                          onPressed: () {
                            // Bạn có thể thêm chức năng nhắn tin ở đây
                          },
                        ),
                      ],
                    ),
                  ),
                  Divider(),
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
                        Text('Danh mục: ${post['categoryId']?['name'] ?? "Không rõ"}'),
                        Text('Ngày đăng: ${_formatDate(post['createdAt'])}'),
                        Text('Ngày cập nhật: ${_formatDate(post['updatedAt'])}'),
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
                        Text('Liên hệ: ${post['userId']?['name'] ?? "Không có tên"}'),
                        Text('Điện thoại: ${post['userId']?['phone'] ?? "Không có số điện thoại"}'),
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
