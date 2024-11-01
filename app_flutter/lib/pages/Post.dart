import 'dart:convert';
import 'dart:io';
import 'package:image_picker/image_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import './home.dart';
import '../../services/post_service.dart';

class PostScreen extends StatefulWidget {
  @override
  _PostScreenState createState() => _PostScreenState();
}

class _PostScreenState extends State<PostScreen> {
  final _formKey = GlobalKey<FormState>();
  final PostApiService _postApiService = PostApiService();
  final ImagePicker _picker = ImagePicker();

  // Khai báo các biến dữ liệu
  String selectedHouse = '';
  String _selectedCategory = '';
  String _selectedObject = 'Sinh viên';
  String selectedProvince = '';
  String selectedDistrict = '';
  String selectedCommune = '';
  String title = '';
  String description = '';
  String price = '';
  String area = '';
  String name = '';
  String phone = '';
  String imageUrl = '';
  String videoUrl = '';
  File? selectedImage;
  File? selectedVideo;

  List<dynamic> provinces = [];
  List<dynamic> districts = [];
  List<dynamic> communes = [];
  List<String> categoryOptions = ["Học Sinh", "Sinh viên", "Người lao động"];

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
      districts = provinceName == "Toàn quốc"
          ? []
          : provinces.firstWhere(
                  (province) => province['FullName'] == provinceName,
                  orElse: () => {'District': []})['District'] ??
              [];
      communes = [];
    });
  }

  void onSelectDistrict(String districtName) {
    setState(() {
      selectedDistrict = districtName;
      selectedCommune = '';
      communes = districtName == "Tất cả"
          ? []
          : districts.firstWhere(
                  (district) => district['FullName'] == districtName,
                  orElse: () => {'Ward': []})['Ward'] ??
              [];
    });
  }

  Future<void> pickImage() async {
    final XFile? image = await _picker.pickImage(source: ImageSource.gallery);
    if (image != null) {
      setState(() {
        selectedImage = File(image.path);
      });
    }
  }

  Future<void> pickVideo() async {
    final XFile? video = await _picker.pickVideo(source: ImageSource.gallery);
    if (video != null) {
      setState(() {
        selectedVideo = File(video.path);
      });
    }
  }

  // Hàm gửi dữ liệu bài đăng lên API
  Future<void> submitPost() async {
    if (!_formKey.currentState!.validate()) return;
    _formKey.currentState!.save();

    // Convert image and video to base64 if selected
    String? imageBase64;
    String? videoBase64;

    if (selectedImage != null) {
      final bytes = await selectedImage!.readAsBytes();
      imageBase64 = base64Encode(bytes);
    }

    if (selectedVideo != null) {
      final bytes = await selectedVideo!.readAsBytes();
      videoBase64 = base64Encode(bytes);
    }

    // Tạo dữ liệu bài đăng
    Map<String, dynamic> postData = {
      "title": title,
      "description": description,
      "category": _selectedCategory,
      "objectForRent": _selectedObject,
      "address": {
        "province": selectedProvince,
        "district": selectedDistrict,
        "commune": selectedCommune,
        "houseAndStreet": selectedHouse,
      },
      "price": int.tryParse(price) ?? 0,
      "area": int.tryParse(area) ?? 0,
      "name": name,
      "phone": phone,
      "imageUrl": imageBase64 != null ? [imageBase64] : [],
      "videoUrl": videoBase64,
    };

    try {
      await _postApiService.createPost(postData);
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text("Đăng tin thành công!"),
      ));
      Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(builder: (context) => Home()),
        (route) => false,
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text("Lỗi khi đăng tin: $e"),
      ));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Đăng tin mới',
                  style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 20),
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
                  ),
                  onSaved: (value) => selectedHouse = value ?? '',
                  validator: (value) => value!.isEmpty ? 'Nhập địa chỉ' : null,
                ),
                SizedBox(height: 25),
                TextFormField(
                  decoration: InputDecoration(
                    labelText: 'Tiêu đề',
                    border: OutlineInputBorder(),
                  ),
                  onSaved: (value) => title = value ?? '',
                  validator: (value) => value!.isEmpty ? 'Nhập tiêu đề' : null,
                ),
                SizedBox(height: 25),
                DropdownButtonFormField<String>(
                  value: _selectedCategory.isEmpty ? null : _selectedCategory,
                  items: categoryOptions.map((category) {
                    return DropdownMenuItem(
                      value: category,
                      child: Text(category),
                    );
                  }).toList(),
                  onChanged: (value) {
                    setState(() {
                      _selectedCategory = value ?? '';
                    });
                  },
                  decoration: InputDecoration(
                    labelText: 'Loại cho thuê',
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) => value == null || value.isEmpty
                      ? 'Chọn loại cho thuê'
                      : null,
                ),
                SizedBox(height: 25),
                TextFormField(
                  maxLines: 5,
                  decoration: InputDecoration(
                    labelText: 'Nội dung mô tả',
                    border: OutlineInputBorder(),
                  ),
                  onSaved: (value) => description = value ?? '',
                  validator: (value) =>
                      value!.isEmpty ? 'Nhập nội dung mô tả' : null,
                ),
                SizedBox(height: 25),
                TextFormField(
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    labelText: 'Giá cho thuê',
                    suffixText: 'đồng/tháng',
                    border: OutlineInputBorder(),
                  ),
                  onSaved: (value) => price = value ?? '',
                  validator: (value) =>
                      value!.isEmpty ? 'Nhập giá cho thuê' : null,
                ),
                SizedBox(height: 25),
                TextFormField(
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    labelText: 'Diện tích',
                    suffixText: 'm²',
                    border: OutlineInputBorder(),
                  ),
                  onSaved: (value) => area = value ?? '',
                  validator: (value) =>
                      value!.isEmpty ? 'Nhập diện tích' : null,
                ),
                SizedBox(height: 25),
                TextFormField(
                  decoration: InputDecoration(
                    labelText: 'Họ và tên',
                    border: OutlineInputBorder(),
                  ),
                  onSaved: (value) => name = value ?? '',
                  validator: (value) =>
                      value!.isEmpty ? 'Nhập họ và tên' : null,
                ),
                SizedBox(height: 25),
                TextFormField(
                  decoration: InputDecoration(
                    labelText: 'Số điện thoại',
                    border: OutlineInputBorder(),
                  ),
                  onSaved: (value) => phone = value ?? '',
                  validator: (value) =>
                      value!.isEmpty ? 'Nhập số điện thoại' : null,
                ),
                SizedBox(height: 25),
                Text(
                  'Hình ảnh',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
                ),
                SizedBox(height: 10),
                GestureDetector(
                  onTap: pickImage,
                  child: Container(
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.black, width: 1.0),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    padding: EdgeInsets.all(20.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.photo),
                        SizedBox(width: 8),
                        Text(selectedImage != null
                            ? 'Đã chọn ảnh'
                            : 'Chọn ảnh từ thư viện'),
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 20),
                Text(
                  'Video',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
                ),
                SizedBox(height: 10),
                GestureDetector(
                  onTap: pickVideo,
                  child: Container(
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.black, width: 1.0),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    padding: EdgeInsets.all(20.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.video_library),
                        SizedBox(width: 8),
                        Text(selectedVideo != null
                            ? 'Đã chọn video'
                            : 'Chọn video từ thư viện'),
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 20),
              ],
            ),
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
                onPressed: submitPost,
                style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue,
                    foregroundColor: Colors.white),
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
            value: value.isEmpty ? null : value,
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
