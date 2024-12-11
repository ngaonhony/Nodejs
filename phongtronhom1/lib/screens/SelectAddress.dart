import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class SelectAddress extends StatefulWidget {
  @override
  _LocationSelectorPageState createState() => _LocationSelectorPageState();
}

class _LocationSelectorPageState extends State<SelectAddress> {
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
        // Lấy danh sách huyện/quận theo tỉnh đã chọn
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
        // Lấy danh sách xã/phường theo huyện/quận đã chọn
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
      appBar: AppBar(title: Text("Chọn Địa Chỉ")),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildDropdown(
              label: "Chọn Tỉnh/Thành Phố",
              value: selectedProvince,
              items: [
                DropdownMenuItem<String>(
                  value: "Toàn quốc",
                  child: Text("Toàn quốc"),
                ),
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
                  DropdownMenuItem<String>(
                    value: "Tất cả",
                    child: Text("Tất cả"),
                  ),
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
                  DropdownMenuItem<String>(
                    value: "Tất cả",
                    child: Text("Tất cả"),
                  ),
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
            Spacer(),
            Center(
              child: ElevatedButton(
                onPressed: () {
                  Navigator.pop(
                    context,
                    "$selectedProvince, $selectedDistrict, $selectedCommune",
                  );
                },
                style: ElevatedButton.styleFrom(
                  foregroundColor: Colors.black,
                  backgroundColor: Colors.orange,
                  minimumSize: Size(double.infinity, 50),
                ),
                child: Text("Xác Nhận"),
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
