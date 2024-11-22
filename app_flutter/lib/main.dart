import 'package:phongtronhom1/pages/home.dart';
import 'package:phongtronhom1/pages/login.dart';
import 'package:phongtronhom1/pages/register.dart';
import 'package:flutter/material.dart';


void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Cho Thuê Phòng Trọ',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Home(),
    );
  }
}
