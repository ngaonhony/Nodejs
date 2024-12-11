import 'package:flutter/material.dart';
import 'package:phongtronhom1/services/PostUserApi.dart';
import '../screens/WebViewScreen.dart';
import '../services/ServiceApi.dart';
import '../screens/WebViewScreen.dart'; // File hiển thị WebView thanh toán
import '../services/PaymentApi.dart';
import 'package:shared_preferences/shared_preferences.dart';// API xử lý thanh toán

class SelectedServiceScreen extends StatefulWidget {
  final Map<String, dynamic> postData;

  const SelectedServiceScreen({Key? key, required this.postData}) : super(key: key);

  @override
  _SelectedServiceScreenState createState() => _SelectedServiceScreenState();
}

class _SelectedServiceScreenState extends State<SelectedServiceScreen> {
  List<dynamic> services = [];
  String? selectedService;
  String timeUnit = 'day'; // Gói thời gian mặc định
  int selectedDays = 3;
  String selectedPaymentMethod = 'momo';
  double totalAmount = 0.0;
  bool isLoading = true;
  late PostApi _postApiService;
  late ServiceApi serviceApi;
  late PaymentApi paymentApi;
  String token = '';
  String paymentId = '';

  @override
  void initState() {
    super.initState();
    fetchServices();
    initializeServices();
  }
  Future<void> initializeServices() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('accessToken') ?? '';

    _postApiService = PostApi(token);
    serviceApi = ServiceApi();
    paymentApi = PaymentApi();

    await fetchServices();
  }

  Future<void> fetchServices() async {
    try {
      final data = await serviceApi.getServices();
      setState(() {
        services = data;
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        isLoading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error loading services: $e')),
      );
    }
  }

  void calculateTotalAmount() {
    if (selectedService != null) {
      final service = services.firstWhere((s) => s['_id'] == selectedService);
      setState(() {
        totalAmount = service['price_per_day'] * selectedDays.toDouble();
      });
    }
  }

  Future<void> handlePayment() async {
    if (selectedService == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Vui lòng chọn dịch vụ')),
      );
      return;
    }

    try {
      // Gửi thông tin bài đăng đến server
      final postResponse = await _postApiService.createPost(
        {...widget.postData, 'serviceId': selectedService},
        widget.postData['images'],
      );

      // Gọi API thanh toán
      final payUrl = await paymentApi.createMoMoPayment(
        totalAmount,
        paymentId,
        token, // Thay bằng token hợp lệ
      );

      // Điều hướng sang WebView để thanh toán
      if (payUrl != null) {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => WebViewScreen(url: payUrl),
          ),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Không thể tạo URL thanh toán')),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Lỗi khi tạo bài đăng hoặc thanh toán: $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Chọn Dịch Vụ')),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Chọn loại tin'),
            DropdownButton<String>(
              value: selectedService,
              hint: const Text('-- Chọn loại tin --'),
              isExpanded: true,
              items: services.map((service) {
                return DropdownMenuItem<String>(
                  value: service['_id'],
                  child: Text(service['name']),
                );
              }).toList(),
              onChanged: (value) {
                setState(() {
                  selectedService = value!;
                  calculateTotalAmount();
                });
              },
            ),
            const SizedBox(height: 16),
            const Text('Gói thời gian'),
            DropdownButton<String>(
              value: timeUnit,
              isExpanded: true,
              items: const [
                DropdownMenuItem(value: 'day', child: Text('Đăng theo ngày')),
                DropdownMenuItem(value: 'week', child: Text('Đăng theo tuần')),
                DropdownMenuItem(value: 'month', child: Text('Đăng theo tháng')),
              ],
              onChanged: (value) {
                setState(() {
                  timeUnit = value!;
                  selectedDays = timeUnit == 'day'
                      ? 3
                      : timeUnit == 'week'
                      ? 7
                      : 30;
                  calculateTotalAmount();
                });
              },
            ),
            const SizedBox(height: 16),
            const Text('Thông tin thanh toán'),
            Container(
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                color: Colors.grey[200],
                borderRadius: BorderRadius.circular(8),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Loại tin: ${selectedService ?? 'Chưa chọn'}'),
                  Text('Gói thời gian: $timeUnit'),
                  Text('Số ngày: $selectedDays'),
                  Text('Thành tiền: ${totalAmount.toStringAsFixed(0)} VND'),
                ],
              ),
            ),
            const SizedBox(height: 16),
            const Text('Chọn phương thức thanh toán'),
            Column(
              children: [
                RadioListTile<String>(
                  title: const Text('Thanh toán ví MoMo'),
                  value: 'momo',
                  groupValue: selectedPaymentMethod,
                  onChanged: (value) {
                    setState(() {
                      selectedPaymentMethod = value!;
                    });
                  },
                ),
                RadioListTile<String>(
                  title: const Text('Thanh toán thẻ quốc tế'),
                  value: 'credit',
                  groupValue: selectedPaymentMethod,
                  onChanged: (value) {
                    setState(() {
                      selectedPaymentMethod = value!;
                    });
                  },
                ),
                RadioListTile<String>(
                  title: const Text('Chuyển khoản ngân hàng'),
                  value: 'bank',
                  groupValue: selectedPaymentMethod,
                  onChanged: (value) {
                    setState(() {
                      selectedPaymentMethod = value!;
                    });
                  },
                ),
              ],
            ),
            const Spacer(),
            ElevatedButton(
              onPressed: handlePayment,
              style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(50)),
              child: Text('Thanh toán ${totalAmount.toStringAsFixed(0)} VND'),
            ),
          ],
        ),
      ),
    );
  }
}
