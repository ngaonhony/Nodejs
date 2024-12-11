import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import '../services/ServiceApi.dart';
import '../services/PostUserApi.dart';
import '../services/PaymentApi.dart';
import '../screens/WebViewScreen.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SelectServiceScreen extends StatefulWidget {
  final Map<String, dynamic> postData;

  const SelectServiceScreen({Key? key, required this.postData}) : super(key: key);

  @override
  _SelectServiceScreenState createState() => _SelectServiceScreenState();
}

class _SelectServiceScreenState extends State<SelectServiceScreen> {
  List<dynamic> services = [];
  String? selectedService;
  bool isLoading = true;
  late PostApi _postApiService;
  late ServiceApi serviceApi;
  late PaymentApi paymentApi;
  String token = '';
  String paymentId = '';
  double amount=0.0;

  @override
  void initState() {
    super.initState();
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
      final serviceList = await serviceApi.getServices();
      setState(() {
        services = serviceList;
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        isLoading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Lỗi khi tải danh sách dịch vụ: $e")),
      );
    }
  }

  Future<void> createPostAndPay() async {
    if (selectedService == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Vui lòng chọn một dịch vụ")),
      );
      return;
    }
    try {
      final payUrl = await paymentApi.createMoMoPayment(amount, paymentId, token);

      if (payUrl != null) {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => WebViewScreen(url: payUrl),
          ),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Không thể tạo URL thanh toán.')),
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
      appBar: AppBar(title: const Text("Chọn Dịch Vụ")),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : services.isEmpty
          ? const Center(child: Text("Không có dịch vụ khả dụng."))
          : Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: services.length,
              itemBuilder: (context, index) {
                final service = services[index];
                return ListTile(
                  title: Text(service['name']),
                  subtitle: Text('Giá: ${service['price_per_day']} VND/ngày'),
                  trailing: Radio<String>(
                    value: service['_id'],
                    groupValue: selectedService,
                    onChanged: (value) {
                      setState(() {
                        selectedService = value;
                      });
                    },
                  ),
                );
              },
            ),
          ),
          ElevatedButton(
            onPressed: createPostAndPay,
            child: const Text("Tiến Hành Thanh Toán"),
          ),
        ],
      ),
    );
  }
}
