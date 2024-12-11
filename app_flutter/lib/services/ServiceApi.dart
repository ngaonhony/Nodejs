import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

class ServiceApi {
  static const String baseUrl = 'http://192.168.100.243:3000/api/services';
  Future<List<dynamic>> getServices() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load Services');
    }
  }
}
