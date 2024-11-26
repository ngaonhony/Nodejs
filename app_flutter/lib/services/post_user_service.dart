import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class UserPostApiService {
  final String baseUrl = 'http://10.40.6.110:3000/api/posts';

  Future<String?> _getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('accessToken');
  }


  Future<Map<String, String>> _setHeaders() async {
    final headers = {'Content-Type': 'application/json'};
    final token = await _getToken();
    if (token != null) {
      headers['Authorization'] = 'Bearer $token';
    }
    return headers;
  }


  Future<List<dynamic>> getUserPosts() async {
    try {
      final headers = await _setHeaders();
      final response = await http.get(Uri.parse(baseUrl), headers: headers);
      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed to load user posts: ${response.body}');
      }
    } catch (error) {
      print('Error fetching user posts: $error');
      throw Exception('Failed to load user posts');
    }
  }

  Future<Map<String, dynamic>> createPost(
      Map<String, dynamic> postData, List<File> imageFiles) async {
    final request = http.MultipartRequest('POST', Uri.parse(baseUrl));
    request.headers.addAll(await _setHeaders());

    postData.forEach((key, value) {
      request.fields[key] = value.toString();
    });

    for (var imageFile in imageFiles) {
      request.files.add(await http.MultipartFile.fromPath('images', imageFile.path));
    }

    try {
      final response = await request.send();
      if (response.statusCode == 201) {
        return json.decode(await response.stream.bytesToString());
      } else {
        print('Error creating post: ${await response.stream.bytesToString()}');
        throw Exception('Failed to create post');
      }
    } catch (e) {
      print('Create post error: $e');
      throw Exception('Failed to create post');
    }
  }

  Future<Map<String, dynamic>> updatePost(
      String id, Map<String, dynamic> postData, [List<File>? imageFiles]) async {
    if (imageFiles != null && imageFiles.isNotEmpty) {
      final request = http.MultipartRequest('PUT', Uri.parse('$baseUrl/$id'));
      request.headers.addAll(await _setHeaders());

      postData.forEach((key, value) {
        request.fields[key] = value.toString();
      });

      for (var imageFile in imageFiles) {
        request.files.add(await http.MultipartFile.fromPath('images', imageFile.path));
      }

      final response = await request.send();

      if (response.statusCode == 200) {
        return json.decode(await response.stream.bytesToString());
      } else {
        throw Exception('Failed to update post with new images');
      }
    } else {
      final response = await http.put(
        Uri.parse('$baseUrl/$id'),
        headers: await _setHeaders(),
        body: json.encode(postData),
      );

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed to update post');
      }
    }
  }

  // Xóa bài viết
  Future<void> deletePost(String id) async {
    final response = await http.delete(Uri.parse('$baseUrl/$id'), headers: await _setHeaders());
    if (response.statusCode != 200) {
      throw Exception('Failed to delete post');
    }
  }
}
