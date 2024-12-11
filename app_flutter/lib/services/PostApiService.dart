import 'dart:convert';
import 'package:http/http.dart' as http;

class PostApiService {
  final String baseUrl = 'http://192.168.100.243:3000/api/posts';

  // Hàm gọi API lấy tất cả bài đăng
  Future<List<dynamic>> getAllPosts({String? title, String? location, String? categoryId}) async {
    try {
      // Xây dựng URL với các tham số lọc nếu có
      String url = '$baseUrl?';
      if (title != null && title.isNotEmpty) {
        url += 'title=$title&';
      }
      if (location != null && location.isNotEmpty) {
        url += 'location=$location&';
      }
      if (categoryId != null && categoryId.isNotEmpty) {
        url += 'categoryId=$categoryId&';
      }
      url = url.endsWith('&') ? url.substring(0, url.length - 1) : url;

      final response = await http.get(Uri.parse(url));
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data;
      } else {
        throw Exception('Failed to load posts: ${response.body}');
      }
    } catch (error) {
      print('Error fetching posts: $error');
      throw Exception('Failed to load posts');
    }
  }

  // Hàm gọi API lấy chi tiết bài đăng theo ID
  Future<Map<String, dynamic>> getPostById(String id) async {
    try {
      final url = Uri.parse('$baseUrl/$id'); // Dùng ID để gọi API chi tiết bài đăng
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        if (responseData != null ) {
          return responseData;
        } else {
          throw Exception('Dữ liệu bài đăng không hợp lệ từ server');
        }
      } else {
        throw Exception('Không thể lấy chi tiết bài đăng: ${response.statusCode}');
      }
    } catch (error) {
      throw Exception('Lỗi khi lấy chi tiết bài đăng: $error');
    }
  }
}
