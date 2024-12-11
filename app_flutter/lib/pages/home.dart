import 'package:flutter/material.dart';
import 'package:phongtronhom1/components/UI/PostListPage.dart';
import 'package:phongtronhom1/pages/login.dart';
import 'package:phongtronhom1/services/AuthService.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../components/UI/MenuDrawer.dart';
import '../screens/search_box.dart';
import '../components/UI/Category.dart';
import '../components/UI/info_box.dart';
import '../services/PostApiService.dart';
import '../components/footer.dart';
import '../components/header.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> with SingleTickerProviderStateMixin {
  String? userId;
  AuthService _authService = AuthService();
  Future<List<dynamic>>? _postsFuture;

  double _opacity = 1.0;

  @override
  void initState() {
    super.initState();
    _checkLoginStatus();
    _postsFuture = _fetchPosts();
  }

  Future<void> _checkLoginStatus() async {
    final prefs = await SharedPreferences.getInstance();
    final String? token = prefs.getString('accessToken');
    final String? id = prefs.getString('userId');

    if (token != null && id != null) {
      setState(() {
        userId = id;
      });
    }
  }

  Future<List<dynamic>> _fetchPosts() async {
    try {
      bool isTokenValid = await _authService.checkTokenExpiration();

      if (!isTokenValid) {
        _startLogoutAnimation();
        await Future.delayed(const Duration(seconds: 1));
        await _authService.logout();
        Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => LoginPage()),
              (route) => false,
        );
        return [];
      }

      final posts = await PostApiService().getAllPosts();
      return posts;

    } catch (e) {
      print(e);
      return [];
    }
  }

  void _startLogoutAnimation() {
    setState(() {
      _opacity = 0.0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedOpacity(
      opacity: _opacity,
      duration: const Duration(seconds: 1),
      child: Scaffold(
        appBar: Header(),
        endDrawer: MenuDrawer(),
        body: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SearchBox(),
              const SizedBox(height: 8),
              if (userId != null)
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16.0),
                  child: SizedBox(
                    width: double.infinity,
                    child: AuthInfo(),
                  ),
                ),
              const SizedBox(height: 8),
              SizedBox(height: 400, child: DanhMuc()),
              const SizedBox(height: 10),
              _buildTitleSection(),
              const SizedBox(height: 8),
              _buildFeaturedAreas(),
              const SizedBox(height: 16),
              SizedBox(height : 500 ,child: PostListPage()) // Gọi PostListPage ở đây

            ],
          ),
        ),
        bottomNavigationBar: Footer(),
      ),
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
    'Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, ''phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2024.',
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
            child: GestureDetector(
              onTap: () {
                // Hành động khi nhấn vào từng khu vực nổi bật
              },
              child: _buildFeaturedArea(area['title']!, area['imagePath']!),
            ),
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