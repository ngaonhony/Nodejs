import 'dart:convert';
import 'package:http/http.dart' as http;

class PaymentApi {
  final String baseUrl = 'http://192.168.100.243:3000/api/momo';

  Future<String?> createMoMoPayment(double amount, String paymentId, String token) async {
    final response = await http.post(
      Uri.parse('$baseUrl/paymentMoMo'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'amount': amount,
        'paymentId': paymentId,
      }),
    );

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      if (data['payUrl'] != null) {
        return data['payUrl'];
      } else {
        throw Exception("URL thanh toán không tồn tại.");
      }
    } else {
      throw Exception("Lỗi khi gọi API thanh toán: ${response.statusCode}");
    }
  }

  Future<Map<String, dynamic>> checkTransactionStatus(String orderId, String token) async {
    final response = await http.post(
      Uri.parse('$baseUrl/check-status-transaction-MoMo'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({'orderId': orderId}),
    );

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to check transaction status: ${response.body}');
    }
  }
}
