import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:connectivity_plus/connectivity_plus.dart';

class PostApi {
  final String token;
  final String baseUrl = 'http://192.168.100.243:3000/api/posts';
  PostApi(this.token);

  Future<void> _checkConnectivity() async {
    final connectivityResult = await Connectivity().checkConnectivity();
    if (connectivityResult == ConnectivityResult.none) {
      throw Exception('Không có kết nối mạng');
    }
  }

  Future<http.Response> _sendPostRequest(Uri uri, Map<String, dynamic> postData, List<XFile> selectedImages, String method) async {
    final request = http.MultipartRequest(method, uri)
      ..headers['Authorization'] = 'Bearer $token'
      ..fields['title'] = postData['title']
      ..fields['description'] = postData['description']
      ..fields['price'] = postData['price'].toString()
      ..fields['area'] = postData['area'].toString()
      ..fields['categoryId'] = postData['categoryId']
      ..fields['location'] = postData['location']
      ..fields['serviceId'] = postData['serviceId'] ?? '';

    print("Authorization Token: $token");
    print("Post Data: $postData");
    print("Selected Images: ${selectedImages.length}");

    if (selectedImages.isNotEmpty) {
      for (var image in selectedImages) {
        final file = File(image.path);
        request.files.add(await http.MultipartFile.fromPath('images', file.path));
      }
    }
    final response = await request.send();
    final responseBody = await response.stream.bytesToString();
    return http.Response(responseBody, response.statusCode);
  }

  Future<void> createPost(Map<String, dynamic> postData, List<XFile> selectedImages) async {
    await _checkConnectivity();
    final uri = Uri.parse(baseUrl);
    final request = http.MultipartRequest('POST', uri)
      ..headers['Authorization'] = 'Bearer $token'
      ..fields['title'] = postData['title']
      ..fields['description'] = postData['description']
      ..fields['price'] = postData['price'].toString()
      ..fields['area'] = postData['area'].toString()
      ..fields['categoryId'] = postData['categoryId']
      ..fields['location'] = postData['location']
      ..fields['serviceId'] = postData['serviceId'] ?? ''
      ;


    if (selectedImages.isNotEmpty) {
      for (var image in selectedImages) {
        final file = File(image.path);
        if (file.existsSync()) {
          request.files.add(await http.MultipartFile.fromPath('images', file.path));
        } else {
          throw Exception('File ảnh không tồn tại: ${file.path}');
        }
      }
    }
    try {
      final streamedResponse = await request.send();
      final response = await http.Response.fromStream(streamedResponse);
      print('Response Code: ${response.statusCode}');
      print('Response Body: ${response.body}');

      if (response.statusCode == 201) {
        final data = jsonDecode(response.body);
        print("Bài đăng đã được tạo thành công: $data");
      } else {
        _handleApiError(response);
      }
    } catch (e) {
      print('Lỗi khi gửi yêu cầu: $e');
      throw Exception('Đã xảy ra lỗi khi tạo bài đăng: $e');
    }
  }

  Future<void> updatePost(String postId, Map<String, dynamic> updatedPostData, List<XFile> selectedImages) async {
    await _checkConnectivity();
    final uri = Uri.parse('$baseUrl/$postId');
    final response = await _sendPostRequest(uri, updatedPostData, selectedImages, 'PUT');
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      print("Bài đăng đã được cập nhật: $data");
    } else {
      _handleApiError(response);
    }
  }

  Future<List<Map<String, dynamic>>> getUserPosts(String userId) async {
    await _checkConnectivity();
    final url = Uri.parse('$baseUrl/user/$userId');
    final response = await http.get(
      url,
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body)['posts'];
      return List<Map<String, dynamic>>.from(data);
    } else {
      _handleApiError(response);
    }
    return [];
  }

  Future<Map<String, dynamic>> getPostById(String postId) async {
    await _checkConnectivity();
    final url = Uri.parse('$baseUrl/$postId');
    final response = await http.get(
      url,
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return data;
    } else {
      _handleApiError(response);
    }
    return {};
  }

  Future<void> deletePost(String postId) async {
    await _checkConnectivity();
    final url = Uri.parse('$baseUrl/$postId');
    final response = await http.delete(
      url,
      headers: {'Authorization': 'Bearer $token'},
    );
    if (response.statusCode == 200) {
      print("Bài đăng đã được xóa thành công.");
    } else {
      _handleApiError(response);
    }
  }

  void _handleApiError(http.Response response) {
    try {
      final errorData = jsonDecode(response.body);
      final errorMessage = errorData['message'] ?? 'Lỗi không xác định';
      print('API Error: $errorMessage');
      throw Exception(errorMessage);
    } catch (e) {
      print('Không thể phân tích lỗi từ API: $e');
      throw Exception('Lỗi không xác định từ API');
    }
  }
}
