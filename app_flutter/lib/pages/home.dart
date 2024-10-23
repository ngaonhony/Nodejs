import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../components/footer.dart';
import '../components/header.dart';
import '../components/UI/MenuDrawer.dart';
import '../screens/search_box.dart';
import '../components/UI/post_box.dart';
import '../components/UI/directory.dart';
import '../components/UI/info_box.dart'; // Import InfoBox

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  String? userId; // Khai báo biến để lưu userId

  @override
  void initState() {
    super.initState();
    _checkLoginStatus(); // Kiểm tra trạng thái đăng nhập
  }

  Future<void> _checkLoginStatus() async {
    // Lấy token và userId từ SharedPreferences
    final prefs = await SharedPreferences.getInstance();
    final String? token = prefs.getString('token');
    final String? id = prefs.getString('userId');

    // Nếu đã có token và userId, cập nhật state để hiển thị InfoBox
    if (token != null && id != null) {
      setState(() {
        userId = id; // Gán giá trị userId
      });
    }
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
            if (userId != null) // Kiểm tra nếu đã đăng nhập
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: SizedBox(
                  width: double.infinity,
                  child: AuthInfo(), // Hiển thị AuthInfo nếu đã đăng nhập
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
      bottomNavigationBar: Footer(), // Footer includes the button now
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
