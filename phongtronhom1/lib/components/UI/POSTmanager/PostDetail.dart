import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../../../services/PostUserApi.dart';
import '../../../services/CategoryApi.dart';
import '../../../services/ServiceApi.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PostDetail extends StatefulWidget {
  final String postId;

  PostDetail({required this.postId});

  @override
  _PostDetailState createState() => _PostDetailState();
}

class _PostDetailState extends State<PostDetail> {
  late Future<Map<String, dynamic>> _postDetail;
  late PostApi _postApi;
  late ServiceApi serviceApi;
  late CategoryApi categoryApi;
  late String postId;
  bool isLoading = true;

  // Biến để lưu trữ thông tin bài đăng
  late Map<String, dynamic> post;
  late String title;
  late String description;
  late String price;
  late String location;
  late String area;
  late String categoryId;
  late String serviceId;
  String categoryName = ''; // Tên category
  String serviceName = ''; // Tên service

  // Biến để quản lý ảnh
  List<XFile> selectedImages = [];

  @override
  void initState() {
    super.initState();
    postId = widget.postId;
    post = {};
    _initializeServiceAndData();
  }

  Future<void> _initializeServiceAndData() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('accessToken') ?? ''; // Lấy token từ SharedPreferences

    // Khởi tạo PostApi với token
    setState(() {
      _postApi = PostApi(token);
    });

    // Lấy thông tin bài đăng từ API
    try {
      final postData = await _postApi.getPostById(postId);
      setState(() {
        post = postData;
        isLoading = false;
        title = post['title'] ?? '';
        description = post['description'] ?? '';
        price = post['price'].toString();
        location = post['location'] ?? '';
        area = post['area'].toString();
        categoryId = post['categoryId'] ?? '';
        serviceId = post['serviceId'] ?? '';

        // Gán ảnh hiện tại nếu có
        if (post['images'] != null && post['images'].isNotEmpty) {
          selectedImages = post['images'].map<XFile>((img) => XFile(img)).toList();
        }

        // Lấy thông tin category và service từ API (Giả sử có API cung cấp thông tin này)
        _getCategoryName();
        _getServiceName();
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Lỗi khi tải thông tin bài đăng: $e')),
      );
      setState(() {
        isLoading = false;
      });
    }
  }

  // Hàm lấy tên category từ API
  Future<void> _getCategoryName() async {
    try {
      final categoryData = await categoryApi.getCategories();
      setState(() {
        categoryName = categoryData as String;
      });
    } catch (e) {
      print('Lỗi khi lấy thông tin category: $e');
    }
  }

  // Hàm lấy tên service từ API
  Future<void> _getServiceName() async {
    try {
      final serviceData = await serviceApi.getServices();
      setState(() {
        serviceName = serviceData as String;
      });
    } catch (e) {
      print('Lỗi khi lấy thông tin service: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return Scaffold(
        appBar: AppBar(title: Text('Chi tiết bài đăng')),
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text('Chi tiết bài đăng')),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Hình ảnh bài đăng
              Container(
                width: double.infinity,
                height: 250,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: NetworkImage(post['images'] != null && post['images'].isNotEmpty
                        ? post['images'][0]
                        : 'https://via.placeholder.com/200'),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              SizedBox(height: 10),
              // Tiêu đề bài đăng
              Text(
                post['title'] ?? 'Không có tiêu đề',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 10),
              // Địa chỉ và giá

                  Text(
                    'Địa chỉ: ${post['location'] ?? 'Không có địa chỉ'}',
                    style: TextStyle(fontSize: 14, color: Colors.grey),
                  ),
              SizedBox(height: 10),
                  Text(
                    '${post['price']} triệu/tháng',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.green),
                  ),

              SizedBox(height: 10),
              // Mô tả bài đăng
              Text(
                post['description'] ?? 'Không có mô tả',
                style: TextStyle(fontSize: 14),
              ),
              SizedBox(height: 10),
              // Hiển thị tên category
              Text(
                'Danh mục: $categoryName',
                style: TextStyle(fontSize: 14),
              ),
              SizedBox(height: 10),
              // Hiển thị tên dịch vụ
              Text(
                'Dịch vụ: $serviceName',
                style: TextStyle(fontSize: 14),
              ),
              SizedBox(height: 10),
              // Ngày đăng
              Text(
                'Ngày đăng: ${_formatDate(post['createdAt'])}',
                style: TextStyle(fontSize: 14),
              ),
              SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }

  // Hàm định dạng ngày tháng
  String _formatDate(String? dateString) {
    if (dateString == null) return "Không rõ";
    final date = DateTime.parse(dateString);
    return DateFormat('dd/MM/yyyy').format(date);
  }
}
