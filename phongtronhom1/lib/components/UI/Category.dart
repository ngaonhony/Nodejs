import 'package:flutter/material.dart';
import '../../services/CategoryApi.dart';

class DanhMuc extends StatefulWidget {
  @override
  _DanhMucState createState() => _DanhMucState();
}

class _DanhMucState extends State<DanhMuc> {
  late Future<List<dynamic>> categoriesFuture;

  @override
  void initState() {
    super.initState();
    categoriesFuture = CategoryApi().getCategories(); // Gọi API để lấy dữ liệu
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Danh mục cho thuê'),
      ),
      body: FutureBuilder<List<dynamic>>(
        future: categoriesFuture, // Kết nối với API và lấy dữ liệu
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator()); // Hiển thị loading khi đang tải
          } else if (snapshot.hasError) {
            return Center(child: Text('Lỗi: ${snapshot.error}')); // Nếu có lỗi
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(child: Text('Không có dữ liệu')); // Nếu không có dữ liệu
          } else {
            final categories = snapshot.data!;
            return ListView.builder(
              itemCount: categories.length,
              itemBuilder: (context, index) {
                final category = categories[index];
                return Card(
                  margin: EdgeInsets.symmetric(vertical: 1.0, horizontal: 16),
                  child: ListTile(
                    leading: Icon(Icons.category, size: 20.0), // Sử dụng icon mặc định
                    title: Text(
                      category['name'] ?? 'Không có tiêu đề',
                      style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                    ),
                    trailing: Text(
                      '(${category['count'] ?? 0})',
                      style: TextStyle(fontSize: 12, color: Colors.grey),
                    ),
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }
}
