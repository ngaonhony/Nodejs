import 'package:flutter/material.dart';
import 'Post_Details.dart';

class PostBox extends StatelessWidget {
  final String postId;
  final String title;
  final String price;
  final String area;
  final String location;
  final List<String> images;

  PostBox({
    required this.postId,
    required this.title,
    required this.price,
    required this.area,
    required this.location,
    required this.images,
  });

  @override
  Widget build(BuildContext context) {

    String displayImageUrl = (images.isNotEmpty && images[0].isNotEmpty)
        ? images[0]
        : 'https://via.placeholder.com/200';

    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: GestureDetector(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => PostDetails(postId: postId),
            ),
          );
        },
        child: Card(
          elevation: 4,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Image section
              Stack(
                children: [
                  Container(
                    width: double.infinity,
                    height: 200,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.vertical(
                        top: Radius.circular(10),
                      ),
                      image: DecorationImage(
                        image: NetworkImage(displayImageUrl),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  Positioned(
                    top: 10,
                    right: 10,
                    child: Container(
                      padding: EdgeInsets.all(5),
                      color: Colors.black54,
                      child: Text(
                        '${images.length} ảnh', // Hiển thị số lượng ảnh nếu có nhiều ảnh
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ),
                  Positioned(
                    top: 10,
                    left: 10,
                    child: Icon(
                      Icons.play_circle_fill,
                      color: Colors.white,
                      size: 40,
                    ),
                  ),
                ],
              ),
              // Product information
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.star, color: Colors.amber, size: 20),
                        Icon(Icons.star, color: Colors.amber, size: 20),
                        Icon(Icons.star, color: Colors.amber, size: 20),
                        Icon(Icons.star, color: Colors.amber, size: 20),
                        Icon(Icons.star, color: Colors.amber, size: 20),
                        SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            title,
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.red,
                            ),
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 5),
                    Text(
                      price,
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.green,
                      ),
                    ),
                    Text(
                      area,
                      style: TextStyle(fontSize: 14),
                    ),
                    Text(
                      location,
                      style: TextStyle(fontSize: 14),
                    ),
                  ],
                ),
              ),
              Divider(),
              // Contact section
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    ElevatedButton.icon(
                      onPressed: () {
                        // Xử lý hành động gọi
                      },
                      icon: Icon(Icons.call),
                      label: Text('Gọi liên hệ'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue,
                      ),
                    ),
                    ElevatedButton.icon(
                      onPressed: () {
                        // Xử lý hành động nhắn tin qua Zalo
                      },
                      icon: Icon(Icons.message),
                      label: Text('Nhắn Zalo'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.lightBlue,
                      ),
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  'Cập nhật: Vài giờ trước', // Có thể thay đổi thành dynamic nếu server cung cấp dữ liệu này
                  style: TextStyle(color: Colors.grey),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
