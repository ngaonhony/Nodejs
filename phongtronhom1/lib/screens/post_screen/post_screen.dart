import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import '../../pages/Post.dart';
import '../../pages/SelectedService.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../services/PostUserApi.dart';
import '../../services/ServiceApi.dart';
import '../../services/CategoryApi.dart';
import '../../pages/home.dart';
import 'image_picker_logic.dart';
import 'custom_form_fields.dart';
import 'custom_dropdown.dart';

class PostScreen extends StatefulWidget {
  @override
  _PostScreenState createState() => _PostScreenState();
}

class _PostScreenState extends State<PostScreen> {
  final _formKey = GlobalKey<FormState>();
  PostApi? _postApiService;
  CategoryApi? _categoryApi;
  ServiceApi? serviceApi;
  final ImagePicker _picker = ImagePicker();
  ImagePickerLogic imagePickerLogic = ImagePickerLogic();

  // Data variables
  String title = '';
  String description = '';
  String price = '';
  String area = '';
  String selectedProvince = '';
  String selectedDistrict = '';
  String selectedCommune = '';
  String selectedHouse = '';
  String userId = '';

  List<XFile> selectedImages = [];
  List<dynamic> provinces = [];
  List<dynamic> districts = [];
  List<dynamic> communes = [];
  List<dynamic> categories = [];
  List<dynamic> services = [];
  String _selectedCategory = '';
  String selectedService = '';

  @override
  void initState() {
    super.initState();
    _initializeServiceAndData();
  }

  Future<void> _initializeServiceAndData() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('accessToken') ?? '';
    userId = prefs.getString('userId') ?? '';

    setState(() {
      _postApiService = PostApi(token);
      serviceApi = ServiceApi();
      _categoryApi = CategoryApi();
    });

    loadProvincesData();
    loadCategories();
    loadServices();
  }

  Future<void> loadCategories() async {
    try {
      final List<dynamic> categoryList = await _categoryApi!.getCategories();
      setState(() {
        categories = categoryList;
      });
    } catch (e) {
      print("Error loading categories: $e");
    }
  }

  Future<void> loadServices() async {
    try {
      final List<dynamic> serviceList = await serviceApi!.getServices();
      setState(() {
        services = serviceList;
      });
    } catch (e) {
      print("Error loading services: $e");
    }
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

  Future<void> pickImages() async {
    try {
      await imagePickerLogic.pickImages();
      setState(() {
        selectedImages = imagePickerLogic.selectedImages;
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(e.toString()),
      ));
    }
  }

  Future<void> submitPost() async {
    if (!_formKey.currentState!.validate()) return;
    _formKey.currentState!.save();

    String location =
        "$selectedHouse, $selectedCommune, $selectedDistrict, $selectedProvince";

    Map<String, dynamic> postData = {
      "title": title,
      "description": description,
      "categoryId": _selectedCategory,
      "location": location,
      "price": double.tryParse(price) ?? 0,
      "area": double.tryParse(area) ?? 0,
      "images": selectedImages, // Danh sách ảnh đã chọn
    };

    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => SelectedServiceScreen(postData: postData),
      ),
    );
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
                CustomDropdown(
                  label: "Chọn Tỉnh/Thành Phố",
                  value: selectedProvince,
                  items: provinces.map((province) {
                    return DropdownMenuItem<String>(
                      value: province['FullName'],
                      child: Text(province['FullName']),
                    );
                  }).toList(),
                  onChanged: (value) {
                    if (value != null) {
                      onSelectProvince(value);
                    }
                  },
                ),
                if (districts.isNotEmpty)
                  CustomDropdown(
                    label: "Chọn Huyện/Quận",
                    value: selectedDistrict,
                    items: districts.map((district) {
                      return DropdownMenuItem<String>(
                        value: district['FullName'],
                        child: Text(district['FullName']),
                      );
                    }).toList(),
                    onChanged: (value) {
                      if (value != null) {
                        onSelectDistrict(value);
                      }
                    },
                  ),
                if (communes.isNotEmpty)
                  CustomDropdown(
                    label: "Chọn Xã/Phường",
                    value: selectedCommune,
                    items: communes.map((commune) {
                      return DropdownMenuItem<String>(
                        value: commune['FullName'],
                        child: Text(commune['FullName']),
                      );
                    }).toList(),
                    onChanged: (value) {
                      if (value != null) {
                        setState(() {
                          selectedCommune = value;
                        });
                      }
                    },
                  ),
                SizedBox(height: 15),
                CustomTextFormField(
                  label: 'Số nhà và tên đường',
                  onSaved: (value) => selectedHouse = value ?? '',
                  validator: (value) => value!.isEmpty ? 'Nhập địa chỉ' : null,
                ),
                SizedBox(height: 25),
                CustomTextFormField(
                  label: 'Tiêu đề',
                  onSaved: (value) => title = value ?? '',
                  validator: (value) => value!.isEmpty ? 'Nhập tiêu đề' : null,
                ),
                SizedBox(height: 25),
                CustomDropdown(
                  label: "Chọn Danh Mục",
                  value: _selectedCategory,
                  items: categories.map((category) {
                    return DropdownMenuItem<String>(
                      value: category['_id'],
                      child: Text(category['name']),
                    );
                  }).toList(),
                  onChanged: (value) {
                    setState(() {
                      _selectedCategory = value ?? '';
                    });
                  },
                ),

                SizedBox(height: 25),
                CustomTextFormField(
                  label: 'Nội dung mô tả',
                  maxLines: 5,
                  onSaved: (value) => description = value ?? '',
                  validator: (value) => value!.isEmpty ? 'Nhập nội dung mô tả' : null,
                ),
                SizedBox(height: 25),
                CustomTextFormField(
                  label: ' Giá cho thuê',
                  suffixText: 'triệu/tháng',
                  keyboardType: TextInputType.number,
                  onSaved: (value) => price = value ?? '',
                  validator: (value) => value!.isEmpty ? 'Nhập giá cho thuê' : null,
                ),
                SizedBox(height: 25),
                CustomTextFormField(
                  label: 'Diện tích',
                  suffixText: 'm²',
                  keyboardType: TextInputType.number,
                  onSaved: (value) => area = value ?? '',
                  validator: (value) => value!.isEmpty ? 'Nhập diện tích' : null,
                ),
                SizedBox(height: 25),
                Text(
                  'Hình ảnh',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
                ),
                SizedBox(height: 10),
                Text(
                  'Chọn ảnh (tối đa 10):',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                ElevatedButton(
                  onPressed: pickImages,
                  child: Text('Chọn ảnh'),
                ),
                // Hiển thị và sắp xếp các ảnh đã chọn
                ReorderableListView(
                  shrinkWrap: true,
                  onReorder: (oldIndex, newIndex) {
                    setState(() {
                      if (newIndex > oldIndex) newIndex--;
                      final item = selectedImages.removeAt(oldIndex);
                      selectedImages.insert(newIndex, item);
                    });
                  },
                  children: [
                    for (int index = 0; index < selectedImages.length; index++)
                      ListTile(
                        key: ValueKey(index),
                        leading: Image.file(
                          File(selectedImages[index].path),
                          width: 50,
                          height: 50,
                          fit: BoxFit.cover,
                        ),
                        title: Text(selectedImages[index].name),
                        trailing: Icon(Icons.drag_handle),
                      ),
                  ],
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
}