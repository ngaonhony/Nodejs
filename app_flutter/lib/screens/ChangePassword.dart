import 'package:flutter/material.dart';

class ChangePassword extends StatelessWidget {
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
        title: Text('Đổi Mật Khẩu'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          child: Column(
            children: [

              Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: TextFormField(
                  decoration: InputDecoration(
                    labelText: 'Mật khẩu hiện tại',
                    border: InputBorder.none,
                    fillColor: Colors.grey[100],
                    filled: true,
                    contentPadding: EdgeInsets.all(10),
                  ),
                  obscureText: true,
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
                    labelText: 'Mật khẩu mới',
                    border: InputBorder.none,
                    fillColor: Colors.grey[100],
                    filled: true,
                    contentPadding: EdgeInsets.all(10),
                  ),
                  obscureText: true,
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
                    labelText: 'Xác nhận mật khẩu mới',
                    border: InputBorder.none,
                    fillColor: Colors.grey[100],
                    filled: true,
                    contentPadding: EdgeInsets.all(10),
                  ),
                  obscureText: true,
                ),
              ),
              SizedBox(height: 20),

              ElevatedButton(
                onPressed: () {
                  // Hành động nút Đổi Mật Khẩu
                },
                child: Text('Đổi Mật Khẩu'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  foregroundColor: Colors.white,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
