import 'package:flutter/material.dart';

class DanhMuc extends StatelessWidget {
  final List<Map<String, dynamic>> categories = [
    {'icon': Icons.home, 'title': 'Cho thuê phòng trọ', 'count': '77.865'},
    {
      'icon': Icons.apartment,
      'title': 'Cho thuê nhà nguyên căn',
      'count': '77.865'
    },
    {
      'icon': Icons.location_city,
      'title': 'Cho thuê căn hộ',
      'count': '13.747'
    },
    {
      'icon': Icons.other_houses,
      'title': 'Cho thuê căn hộ mini',
      'count': '3.102'
    },
    {
      'icon': Icons.apartment,
      'title': 'Cho thuê căn hộ dịch vụ',
      'count': '8.016'
    },
    {
      'icon': Icons.store,
      'title': 'Cho thuê mặt bằng, văn phòng',
      'count': '3.338'
    },
    {'icon': Icons.group, 'title': 'Tìm người ở ghép', 'count': '15.862'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Danh mục cho thuê'),
      ),
      body: ListView.builder(
        itemCount: categories.length,
        itemBuilder: (context, index) {
          final category = categories[index];
          return Card(
            margin: EdgeInsets.symmetric(vertical: 1.0, horizontal: 16),
            child: ListTile(
              leading: Icon(category['icon'], size: 20.0),
              title: Text(
                category['title'],
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
              ),
              trailing: Text(
                '(${category['count']})',
                style: TextStyle(fontSize: 12, color: Colors.grey),
              ),
            ),
          );
        },
      ),
    );
  }
}
