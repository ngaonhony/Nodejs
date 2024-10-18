import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../components/footer.dart';
import '../components/header.dart';
import '../components/UI/MenuDrawer.dart';
import '../screens/search_box.dart';
import '../components/UI/product.dart';
import '../components/UI/DanhMuc.dart';
import '../components//UI/auth_info.dart';
import '../services/auth_service.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  String? username;

  @override
  void initState() {
    super.initState();
    _checkLoginStatus();
  }

  Future<void> _checkLoginStatus() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      username = prefs.getString('username');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: Header(),
      endDrawer: MenuDrawer(),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SearchBox(),
            const SizedBox(height: 8),
            if (username != null)
              Padding(
                padding: const EdgeInsets.symmetric(
                    horizontal: 16.0), // Thiết lập padding trái và phải
                child: SizedBox(
                  width:
                      double.infinity, // Chiều rộng 90% của màn hình (nếu cần)
                  child: AuthInfo(username: username!),
                ),
              ),
            const SizedBox(height: 8),
            SizedBox(height: 420, child: DanhMuc()),
            const SizedBox(height: 16),
            _buildTitleSection(),
            const SizedBox(height: 8),
            _buildFeaturedAreas(),
            const SizedBox(height: 16),
            ...List.generate(3, (index) => ProductForm()),
          ],
        ),
      ),
      bottomNavigationBar: Footer(),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: Colors.orange,
        child: const Icon(Icons.add),
        tooltip: 'Đăng tin miễn phí',
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }

  Widget _buildTitleSection() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Cho Thuê Phòng Trọ, Giá Rẻ, Tiện Nghi, Mới Nhất 2024',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          Text(
            'Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, '
            'phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2024.',
            style: TextStyle(fontSize: 16, color: Colors.grey[700]),
          ),
          const SizedBox(height: 16),
          const Text(
            'Khu vực nổi bật',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }

  Widget _buildFeaturedAreas() {
    final featuredAreas = [
      {'title': 'Phòng trọ\nHồ Chí Minh', 'imagePath': 'assets/images/hcm.jpg'},
      {'title': 'Phòng trọ\nHà Nội', 'imagePath': 'assets/images/hanoi.jpg'},
      {'title': 'Phòng trọ\nĐà Nẵng', 'imagePath': 'assets/images/danang.jpg'},
    ];

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        children: featuredAreas.map((area) {
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: _buildFeaturedArea(area['title']!, area['imagePath']!),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildFeaturedArea(String title, String imagePath) {
    return Container(
      width: 120,
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        boxShadow: [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 4,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Image.asset(
              imagePath,
              width: 100,
              height: 60,
              fit: BoxFit.cover,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            title,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }
}
