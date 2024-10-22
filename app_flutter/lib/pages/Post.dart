import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import './home.dart';

class PostScreen extends StatefulWidget {
  @override
  _PostScreenState createState() => _PostScreenState();
}

class _PostScreenState extends State<PostScreen> {
  String selectedHouse = 'Chọn số nhà và tên đường...';
  String _selectedCategory = 'Chọn loại cho thuê';
  String _selectedObject = 'Chọn đối tượng cho thuê';

  List<dynamic> provinces = [];
  List<dynamic> districts = [];
  List<dynamic> communes = [];

  String selectedProvince = '';
  String selectedDistrict = '';
  String selectedCommune = '';

  @override
  void initState() {
    super.initState();
    loadProvincesData();
  }

  Future<void> loadProvincesData() async {
    final String response =
        await rootBundle.loadString('assets/data/vn_units.json');
    final data = await json.decode(response);
    setState(() {
      provinces = data;
    });
  }

  void onSelectProvince(String provinceName) {
    setState(() {
      selectedProvince = provinceName;
      selectedDistrict = '';
      selectedCommune = '';
      if (provinceName == "Toàn quốc") {
        districts = [];
        communes = [];
      } else {
        districts = provinces.firstWhere(
                (province) => province['FullName'] == provinceName,
                orElse: () => {'District': []})['District'] ??
            [];
        communes = [];
      }
    });
  }

  void onSelectDistrict(String districtName) {
    setState(() {
      selectedDistrict = districtName;
      selectedCommune = '';
      if (districtName == "Tất cả") {
        communes = [];
      } else {
        communes = districts.firstWhere(
                (district) => district['FullName'] == districtName,
                orElse: () => {'Ward': []})['Ward'] ??
            [];
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'PHÒNG TRỌ NHÓM I',
          style: TextStyle(
            color: Colors.orange, // Màu chữ tiêu đề
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.menu),
            onPressed: () {},
          ),
          IconButton(
            icon: Icon(Icons.notifications),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Đăng tin mới',
                style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 20),
              Container(
                padding: EdgeInsets.all(10.0),
                decoration: BoxDecoration(
                  color: Colors.red.shade50,
                  border: Border.all(
                    color: Colors.red,
                    width: 1.0,
                  ),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: Text(
                  'Nếu bạn đã từng đăng tin trên PHÒNG TRỌ NHÓM I, hãy sử dụng chức năng ĐẨY TIN / ĐĂNG LẠI / NÂNG CẤP VIP trong mục QUẢN LÝ TIN ĐĂNG thay vì đăng tin mới. Tin đăng trùng nhau sẽ không được duyệt',
                  style: TextStyle(
                    color: Colors.red,
                    fontSize: 16,
                  ),
                ),
              ),
              SizedBox(height: 20),

              Text(
                'Khu vực',
                style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 15),

              _buildDropdown(
                label: "Chọn Tỉnh/Thành Phố",
                value: selectedProvince,
                items: [
                  ...provinces.map((province) {
                    return DropdownMenuItem<String>(
                      value: province['FullName'],
                      child: Text(province['FullName']),
                    );
                  }).toList(),
                ],
                onChanged: (value) {
                  if (value != null) {
                    onSelectProvince(value);
                  }
                },
              ),

              if (districts.isNotEmpty)
                _buildDropdown(
                  label: "Chọn Huyện/Quận",
                  value: selectedDistrict,
                  items: [
                    ...districts.map((district) {
                      return DropdownMenuItem<String>(
                        value: district['FullName'],
                        child: Text(district['FullName']),
                      );
                    }).toList(),
                  ],
                  onChanged: (value) {
                    if (value != null) {
                      onSelectDistrict(value);
                    }
                  },
                ),

              if (communes.isNotEmpty)
                _buildDropdown(
                  label: "Chọn Xã/Phường",
                  value: selectedCommune,
                  items: [
                    ...communes.map((commune) {
                      return DropdownMenuItem<String>(
                        value: commune['FullName'],
                        child: Text(commune['FullName']),
                      );
                    }).toList(),
                  ],
                  onChanged: (value) {
                    if (value != null) {
                      setState(() {
                        selectedCommune = value;
                      });
                    }
                  },
                ),
              SizedBox(height: 15),

              TextFormField(
                decoration: InputDecoration(
                  labelText: 'Số nhà và tên đường',
                  border: OutlineInputBorder(),
                  fillColor: Colors.grey[200],
                  filled: true, // Thêm viền
                ),
              ),
              SizedBox(height: 25),

              Text(
                'Thông tin mô tả',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
              ),
              SizedBox(height: 25),

              DropdownButtonFormField<String>(
                value: _selectedCategory,
                items: ['Chọn loại cho thuê', 'Loại 1', 'Loại 2', 'Loại 3']
                    .map((category) => DropdownMenuItem(
                          value: category,
                          child: Text(category),
                        ))
                    .toList(),
                onChanged: (value) {
                  setState(() {
                    _selectedCategory = value!;
                  });
                },
                decoration: InputDecoration(
                  labelText: 'Loại cho thuê',
                  border: OutlineInputBorder(),
                  fillColor: Colors.grey[200],
                  filled: true,
                ),
              ),
              SizedBox(height: 25),

              TextField(
                decoration: InputDecoration(
                  labelText: 'Tiêu đề',
                  border: OutlineInputBorder(), // Thêm viền
                ),
              ),
              SizedBox(height: 25),

              TextField(
                maxLines: 5,
                decoration: InputDecoration(
                  labelText: 'Nội dung mô tả',
                  border: OutlineInputBorder(),
                  fillColor: Colors.grey[200],
                  filled: true, // Thêm viền
                ),
              ),
              SizedBox(height: 25),

              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  TextField(
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(
                      labelText: 'Giá cho thuê',
                      // hintText: 'Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000',
                      suffixText: 'đồng/tháng',
                      border: OutlineInputBorder(),
                      fillColor: Colors.grey[200],
                      filled: true,
                    ),
                  ),
                  SizedBox(height: 25), // Khoảng cách giữa hai trường
                  TextField(
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(
                      labelText: 'Diện tích',
                      suffixText: 'm²',
                      border: OutlineInputBorder(),
                      fillColor: Colors.grey[200],
                      filled: true,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 25),

              DropdownButtonFormField<String>(
                value: _selectedObject,
                items: ['Chọn đối tượng cho thuê', 'Tất cả', 'Nam', 'Nữ']
                    .map((object) => DropdownMenuItem(
                          value: object,
                          child: Text(object),
                        ))
                    .toList(),
                onChanged: (value) {
                  setState(() {
                    _selectedObject = value!;
                  });
                },
                decoration: InputDecoration(
                  labelText: 'Đối tượng cho thuê',
                  border: OutlineInputBorder(
                    borderSide: BorderSide(
                      color: Colors.black,
                      width: 2.0,
                    ),
                  ),
                ),
              ),
              SizedBox(height: 25),

              Text(
                'Thông tin liên hệ',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
              ),
              SizedBox(height: 25),

              TextField(
                decoration: InputDecoration(
                  labelText: 'Họ và tên',
                  border: OutlineInputBorder(),
                  fillColor: Colors.grey[200],
                  filled: true, // Thêm viền
                ),
              ),
              SizedBox(height: 25),

              // Nội dung mô tả
              TextField(
                decoration: InputDecoration(
                  labelText: 'Số điện thoại',
                  border: OutlineInputBorder(),
                  fillColor: Colors.grey[200],
                  filled: true, // Thêm viền
                ),
              ),
              SizedBox(height: 25),

              Text(
                'Hình ảnh',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
              ),
              SizedBox(height: 20),

              Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.black, width: 1.0),
                  borderRadius: BorderRadius.circular(10),
                ),
                padding: EdgeInsets.all(20.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    IconButton(
                      icon: Icon(Icons.photo),
                      onPressed: () {
                        // Thực hiện hành động chọn ảnh
                      },
                    ),
                    SizedBox(width: 8),
                    Text('Chọn ảnh'),
                  ],
                ),
              ),
              SizedBox(height: 20),

              Text(
                'Video',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
              ),
              SizedBox(height: 20),
              Text(
                'Video link youtube',
                style: TextStyle(fontSize: 20),
              ),
              SizedBox(height: 15),
              TextField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  fillColor: Colors.grey[200],
                  filled: true,
                ),
              ),
              SizedBox(height: 25),
              Text(
                'Hoặc',
                style: TextStyle(fontSize: 20),
              ),
              Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.black, width: 1.0),
                  borderRadius: BorderRadius.circular(10),
                ),
                padding: EdgeInsets.all(20.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    IconButton(
                      icon: Icon(Icons.camera_alt),
                      onPressed: () {
                        // Thực hiện hành động chọn ảnh
                      },
                    ),
                    SizedBox(width: 8),
                    Text('Chọn video'),
                  ],
                ),
              ),
              SizedBox(height: 20),
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        child: Row(
          children: [
            Expanded(
              child: ElevatedButton(
                onPressed: () {
                  Navigator.of(context).pushAndRemoveUntil(
                    MaterialPageRoute(builder: (context) => Home()),
                    (route) => false,
                  );
                },
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.arrow_back),
                    SizedBox(width: 8),
                    Text('Quay lại'),
                  ],
                ),
              ),
            ),
            Expanded(
              child: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue,
                    foregroundColor: Colors.black),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text('Tiếp tục'),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDropdown({
    required String label,
    required String value,
    required List<DropdownMenuItem<String>> items,
    required ValueChanged<String?> onChanged,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: TextStyle(fontSize: 18)),
          DropdownButtonFormField<String>(
            decoration: InputDecoration(
              border: OutlineInputBorder(),
              filled: true,
              fillColor: Colors.white,
              contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            ),
            value: value.isEmpty
                ? null
                : value, // Xử lý an toàn giá trị rỗng hoặc null
            hint: Text(label),
            items: items.isNotEmpty
                ? items
                : [
                    DropdownMenuItem(value: '', child: Text('Không có dữ liệu'))
                  ],
            onChanged: onChanged,
          ),
        ],
      ),
    );
  }
}
