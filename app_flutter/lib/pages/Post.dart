// import 'dart:convert';
// import 'dart:io';
// import 'package:image_picker/image_picker.dart';
// import 'package:shared_preferences/shared_preferences.dart';
// import '../services/post_service.dart';
// import 'package:flutter/material.dart';
// import 'package:flutter/services.dart';
// import './home.dart';
//
// class PostScreen extends StatefulWidget {
//   @override
//   _PostScreenState createState() => _PostScreenState();
// }
//
// class _PostScreenState extends State<PostScreen> {
//   final _formKey = GlobalKey<FormState>();
//   PostApiService? _postApiService; // Khởi tạo PostApiService sau khi lấy token
//   final ImagePicker _picker = ImagePicker();
//
//   // Khai báo các biến dữ liệu
//   String selectedHouse = '';
//   String title = '';
//   String description = '';
//   String price = '';
//   String area = '';
//   String selectedProvince = '';
//   String selectedDistrict = '';
//   String selectedCommune = '';
//   List<File> selectedImages = []; // Danh sách ảnh đã chọn
//
//   List<dynamic> provinces = [];
//   List<dynamic> districts = [];
//   List<dynamic> communes = [];
//   List<dynamic> categories = [];
//   String _selectedCategory = ''; // Chỉ khai báo một lần
//
//   @override
//   void initState() {
//     super.initState();
//     _initializeServiceAndData();
//   }
//
//   // Hàm khởi tạo PostApiService với token từ SharedPreferences
//   Future<void> _initializeServiceAndData() async {
//     final token = await _getAccessToken();
//     setState(() {
//       _postApiService = PostApiService(token: token);
//     });
//     loadProvincesData();
//     loadCategories();
//   }
//
//   Future<void> loadCategories() async {
//     if (_postApiService == null) return; // Đảm bảo PostApiService đã được khởi tạo
//     try {
//       final List<dynamic> categoryList = await _postApiService!.getCategories();
//       setState(() {
//         categories = categoryList; // Lưu danh sách danh mục
//       });
//     } catch (e) {
//       print("Error loading categories: $e");
//     }
//   }
//
//   Future<void> loadProvincesData() async {
//     final String response = await rootBundle.loadString('assets/data/vn_units.json');
//     final data = await json.decode(response);
//     setState(() {
//       provinces = data;
//     });
//   }
//
//   void onSelectProvince(String provinceName) {
//     setState(() {
//       selectedProvince = provinceName;
//       selectedDistrict = '';
//       selectedCommune = '';
//       districts = provinceName == "Toàn quốc"
//           ? []
//           : provinces.firstWhere(
//               (province) => province['FullName'] == provinceName,
//           orElse: () => {'District': []})['District'] ?? [];
//       communes = [];
//     });
//   }
//
//   void onSelectDistrict(String districtName) {
//     setState(() {
//       selectedDistrict = districtName;
//       selectedCommune = '';
//       communes = districtName == "Tất cả"
//           ? []
//           : districts.firstWhere(
//               (district) => district['FullName'] == districtName,
//           orElse: () => {'Ward': []})['Ward'] ?? [];
//     });
//   }
//
//   Future<void> pickImages() async {
//     final List<XFile>? images = await _picker.pickMultiImage(maxHeight: 600, maxWidth: 800);
//     if (images != null && images.length <= 10) {
//       setState(() {
//         selectedImages = images.map((image) => File(image.path)).toList();
//       });
//     } else {
//       ScaffoldMessenger.of(context).showSnackBar(SnackBar(
//         content: Text("Bạn chỉ có thể chọn tối đa 10 ảnh."),
//       ));
//     }
//   }
//
//   // Hàm gửi dữ liệu bài đăng lên API
//   Future<void> submitPost() async {
//     if (!_formKey.currentState!.validate()) return;
//     _formKey.currentState!.save();
//
//     if (_postApiService == null) {
//       ScaffoldMessenger.of(context).showSnackBar(
//           SnackBar(content: Text("Dịch vụ API chưa được khởi tạo")));
//       return;
//     }
//
//     // Tạo dữ liệu bài đăng
//     Map<String, dynamic> postData = {
//       "title": title,
//       "description": description,
//       "categoryId": _selectedCategory,
//       "location": {
//         "houseAndStreet": selectedHouse,
//         "commune": selectedCommune,
//         "district": selectedDistrict,
//         "province": selectedProvince,
//       },
//       "price": int.tryParse(price) ?? 0,
//       "area": int.tryParse(area) ?? 0,
//     };
//
//     try {
//       await _postApiService!.createPost(postData, selectedImages); // Gửi danh sách hình ảnh
//       ScaffoldMessenger.of(context).showSnackBar(SnackBar(
//         content: Text("Đăng tin thành công!"),
//       ));
//       Navigator.of(context).pushAndRemoveUntil(
//         MaterialPageRoute(builder: (context) => Home()),
//             (route) => false,
//       );
//     } catch (e) {
//       ScaffoldMessenger.of(context).showSnackBar(SnackBar(
//         content: Text("Lỗi khi đăng tin: $e"),
//       ));
//     }
//   }
//
//   // Hàm lấy token từ SharedPreferences
//   Future<String> _getAccessToken() async {
//     final prefs = await SharedPreferences.getInstance();
//     return prefs.getString('accessToken') ?? '';
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: SingleChildScrollView(
//         child: Padding(
//           padding: const EdgeInsets.all(16.0),
//           child: Form(
//             key: _formKey,
//             child: Column(
//               crossAxisAlignment: CrossAxisAlignment.start,
//               children: [
//                 Text(
//                   'Đăng tin mới',
//                   style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
//                 ),
//                 SizedBox(height: 20),
//                 _buildDropdown(
//                   label: "Chọn Tỉnh/Thành Phố",
//                   value: selectedProvince,
//                   items: [
//                     ...provinces.map((province) {
//                       return DropdownMenuItem<String>(
//                         value: province['FullName'],
//                         child: Text(province['FullName']),
//                       );
//                     }).toList(),
//                   ],
//                   onChanged: (value) {
//                     if (value != null) {
//                       onSelectProvince(value);
//                     }
//                   },
//                 ),
//                 if (districts.isNotEmpty)
//                   _buildDropdown(
//                     label: "Chọn Huyện/Quận",
//                     value: selectedDistrict,
//                     items: [
//                       ...districts.map((district) {
//                         return DropdownMenuItem<String>(
//                           value: district['FullName'],
//                           child: Text(district['FullName']),
//                         );
//                       }).toList(),
//                     ],
//                     onChanged: (value) {
//                       if (value != null) {
//                         onSelectDistrict(value);
//                       }
//                     },
//                   ),
//                 if (communes.isNotEmpty)
//                   _buildDropdown(
//                     label: "Chọn Xã/Phường",
//                     value: selectedCommune,
//                     items: [
//                       ...communes.map((commune) {
//                         return DropdownMenuItem<String>(
//                           value: commune['FullName'],
//                           child: Text(commune['FullName']),
//                         );
//                       }).toList(),
//                     ],
//                     onChanged: (value) {
//                       if (value != null) {
//                         setState(() {
//                           selectedCommune = value;
//                         });
//                       }
//                     },
//                   ),
//                 SizedBox(height: 15),
//                 TextFormField(
//                   decoration: InputDecoration(
//                     labelText: 'Số nhà và tên đường',
//                     border: OutlineInputBorder(),
//                   ),
//                   onSaved: (value) => selectedHouse = value ?? '',
//                   validator: (value) => value!.isEmpty ? 'Nhập địa chỉ' : null,
//                 ),
//                 SizedBox(height: 25),
//                 TextFormField(
//                   decoration: InputDecoration(
//                     labelText: 'Tiêu đề',
//                     border: OutlineInputBorder(),
//                   ),
//                   onSaved: (value) => title = value ?? '',
//                   validator: (value) => value!.isEmpty ? 'Nhập tiêu đề' : null,
//                 ),
//                 SizedBox(height: 25),
//                 _buildDropdown(
//                   label: "Chọn Danh Mục",
//                   value: _selectedCategory,
//                   items: categories.map((category) {
//                     return DropdownMenuItem<String>(
//                       value: category['_id'],
//                       child: Text(category['name']),
//                     );
//                   }).toList(),
//                   onChanged: (value) {
//                     setState(() {
//                       _selectedCategory = value ?? '';
//                     });
//                   },
//                 ),
//                 SizedBox(height: 25),
//                 TextFormField(
//                   maxLines: 5,
//                   decoration: InputDecoration(
//                     labelText: 'Nội dung mô tả',
//                     border: OutlineInputBorder(),
//                   ),
//                   onSaved: (value) => description = value ?? '',
//                   validator: (value) =>
//                   value!.isEmpty ? 'Nhập nội dung mô tả' : null,
//                 ),
//                 SizedBox(height: 25),
//                 TextFormField(
//                   keyboardType: TextInputType.number,
//                   decoration: InputDecoration(
//                     labelText: 'Giá cho thuê',
//                     suffixText: 'đồng/tháng',
//                     border: OutlineInputBorder(),
//                   ),
//                   onSaved: (value) => price = value ?? '',
//                   validator: (value) =>
//                   value!.isEmpty ? 'Nhập giá cho thuê' : null,
//                 ),
//                 SizedBox(height: 25),
//                 TextFormField(
//                   keyboardType: TextInputType.number,
//                   decoration: InputDecoration(
//                     labelText: 'Diện tích',
//                     suffixText: 'm²',
//                     border: OutlineInputBorder(),
//                   ),
//                   onSaved: (value) => area = value ?? '',
//                   validator: (value) =>
//                   value!.isEmpty ? 'Nhập diện tích' : null,
//                 ),
//                 SizedBox(height: 25),
//                 Text(
//                   'Hình ảnh',
//                   style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
//                 ),
//                 SizedBox(height: 10),
//                 GestureDetector(
//                   onTap: pickImages,
//                   child: Container(
//                     decoration: BoxDecoration(
//                       border: Border.all(color: Colors.black, width: 1.0),
//                       borderRadius: BorderRadius.circular(10),
//                     ),
//                     padding: EdgeInsets.all(20.0),
//                     child: Row(
//                       mainAxisAlignment: MainAxisAlignment.center,
//                       children: [
//                         Icon(Icons.photo),
//                         SizedBox(width: 8),
//                         Text(selectedImages.isNotEmpty
//                             ? 'Đã chọn ${selectedImages.length} ảnh'
//                             : 'Chọn ảnh từ thư viện'),
//                       ],
//                     ),
//                   ),
//                 ),
//                 SizedBox(height: 20),
//               ],
//             ),
//           ),
//         ),
//       ),
//       bottomNavigationBar: BottomAppBar(
//         child: Row(
//           children: [
//             Expanded(
//               child: ElevatedButton(
//                 onPressed: () {
//                   Navigator.of(context).pushAndRemoveUntil(
//                     MaterialPageRoute(builder: (context) => Home()),
//                         (route) => false,
//                   );
//                 },
//                 child: Row(
//                   mainAxisAlignment: MainAxisAlignment.center,
//                   children: [
//                     Icon(Icons.arrow_back),
//                     SizedBox(width: 8),
//                     Text('Quay lại'),
//                   ],
//                 ),
//               ),
//             ),
//             Expanded(
//               child: ElevatedButton(
//                 onPressed: submitPost,
//                 style: ElevatedButton.styleFrom(
//                     backgroundColor: Colors.blue,
//                     foregroundColor: Colors.white),
//                 child: Row(
//                   mainAxisAlignment: MainAxisAlignment.center,
//                   children: [
//                     Text('Tiếp tục'),
//                   ],
//                 ),
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
//
//   Widget _buildDropdown({
//     required String label,
//     required String value,
//     required List<DropdownMenuItem<String>> items,
//     required ValueChanged<String?> onChanged,
//   }) {
//     return Padding(
//       padding: const EdgeInsets.only(bottom: 16.0),
//       child: Column(
//         crossAxisAlignment: CrossAxisAlignment.start,
//         children: [
//           Text(label, style: TextStyle(fontSize: 18)),
//           DropdownButtonFormField<String>(
//             decoration: InputDecoration(
//               border: OutlineInputBorder(),
//               filled: true,
//               fillColor: Colors.white,
//               contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
//             ),
//             value: value.isEmpty ? null : value,
//             hint: Text(label),
//             items: items.isNotEmpty
//                 ? items
//                 : [
//               DropdownMenuItem(value: '', child: Text('Không có dữ liệu'))
//             ],
//             onChanged: onChanged,
//           ),
//         ],
//       ),
//     );
//   }
// }
