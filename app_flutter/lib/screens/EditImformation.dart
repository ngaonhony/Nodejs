import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

//thêm image_picker: ^0.8.4+4 vào dependencies trong thư viện pubspec.yaml

class EditImfor extends StatefulWidget {
  @override
  _EditImforState createState() => _EditImforState();
}

class _EditImforState extends State< EditImfor> {
  XFile? _image;

  Future<void> _pickImage() async {
    final ImagePicker _picker = ImagePicker();
    // Chọn ảnh từ thư viện
    final XFile? image = await _picker.pickImage(source: ImageSource.gallery);
    setState(() {
      _image = image; // Cập nhật ảnh đại diện
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: Text('Sửa Thông Tin Cá Nhân'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          child: Column(
            children: [
              GestureDetector(
                onTap: _pickImage,
                child: CircleAvatar(
                  radius: 50,
                  backgroundImage: _image != null ? FileImage(File(_image!.path)) : null,
                  child: _image == null
                      ? Icon(Icons.camera_alt, size: 50)
                      : null,
                ),
              ),
              SizedBox(height: 20),

              Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: TextFormField(
                  decoration: InputDecoration(
                    labelText: 'Họ và tên',
                    border: InputBorder.none,
                    fillColor: Colors.grey[100],
                    filled: true,
                    contentPadding: EdgeInsets.all(10),
                  ),
                ),
              ),
              SizedBox(height: 10),
              // Khung cho trường Email
              Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: TextFormField(
                  decoration: InputDecoration(
                    labelText: 'Email',
                    border: InputBorder.none,
                    fillColor: Colors.grey[100],
                    filled: true,
                    contentPadding: EdgeInsets.all(10),
                  ),
                  keyboardType: TextInputType.emailAddress,
                ),
              ),
              SizedBox(height: 10),
              Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: TextFormField(
                  decoration: InputDecoration(
                    labelText: 'Số điện thoại',
                    border: InputBorder.none,
                    fillColor: Colors.grey[100],
                    filled: true,
                    contentPadding: EdgeInsets.all(10),
                  ),
                  keyboardType: TextInputType.phone,
                ),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue[400],
                  foregroundColor: Colors.white,
                ),
                onPressed: () {

                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Thông tin đã được lưu!')),
                  );
                },
                child: Text('Lưu Thông Tin'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}