import 'dart:convert';
import 'package:http/http.dart' as http;

class PostApiService {
  final String baseUrl = 'http://10.40.6.110:3000/api/posts';


  Future<List<dynamic>> getAllPosts({int page = 1, int limit = 10}) async {
    try {
      final response = await http.get(Uri.parse('$baseUrl?page=$page&limit=$limit'));
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['posts'];
      } else {
        throw Exception('Failed to load posts: ${response.body}');
      }
    } catch (error) {
      print('Error fetching posts: $error');
      throw Exception('Failed to load posts');
    }
  }


  Future<Map<String, dynamic>> getPostById(String id) async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/$id'));
      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed to load post by ID: ${response.body}');
      }
    } catch (error) {
      print('Error fetching post by ID: $error');
      throw Exception('Failed to load post');
    }
  }
}
