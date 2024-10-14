import 'package:flutter/material.dart';
import '../components/footer.dart';
import '../components/header.dart';
import '../components/UI/MenuDrawer.dart';
import '../screens/search_box.dart';
import '../components/UI/product.dart';
import '../components/UI/DanhMuc.dart';

class Home extends StatelessWidget {
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
            SizedBox(
              height: 420,
              child: DanhMuc(),
            ),
            const SizedBox(height: 16),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Cho Thuê Phòng Trọ, Giá Rẻ, Tiện Nghi, Mới Nhất 2024',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, '
                    'phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2024.',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.grey[700],
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Khu vực nổi bật',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: [
                  _buildFeaturedArea(
                    'Phòng trọ\nHồ Chí Minh',
                    'assets/images/hcm.jpg',
                  ),
                  const SizedBox(width: 8),
                  _buildFeaturedArea(
                    'Phòng trọ\nHà Nội',
                    'assets/images/hanoi.jpg',
                  ),
                  const SizedBox(width: 8),
                  _buildFeaturedArea(
                    'Phòng trọ\nĐà Nẵng',
                    'assets/images/danang.jpg',
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              child: ProductForm(),
            ),
            SizedBox(
              child: ProductForm(),
            ),
            SizedBox(
              child: ProductForm(),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Footer(),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: Colors.orange,
        child: Icon(Icons.add),
        tooltip: 'Đăng tin miễn phí',
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
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
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
