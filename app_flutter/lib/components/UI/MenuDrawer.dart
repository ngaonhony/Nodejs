import 'package:app_flutter/pages/Profile.dart';
import 'package:app_flutter/pages/home.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../services/user_service.dart';
import '../../pages/login.dart';
import '../../pages/register.dart';

class MenuDrawer extends StatefulWidget {
  @override
  _MenuDrawerState createState() => _MenuDrawerState();
}

class _MenuDrawerState extends State<MenuDrawer> {
  String? username;
  String? phoneNumber;
  bool isLoggedIn = false;
  final UserService _userService = UserService(); // Initialize UserService

  @override
  void initState() {
    super.initState();
    _checkLoginStatus(); // Check login status on widget initialization
  }

  Future<void> _checkLoginStatus() async {
    final prefs = await SharedPreferences.getInstance();
    final String? token = prefs.getString('token'); // Retrieve token

    if (token != null) {
      // If there's a token, fetch user info from API
      try {
        final userData = await _userService.getCurrentUser();
        setState(() {
          username = userData['name'];
          phoneNumber = userData['phone'];
          isLoggedIn = true;
        });
      } catch (e) {
        print("Error fetching user info: $e");
      }
    } else {
      setState(() {
        isLoggedIn = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(
        children: <Widget>[
          _buildHeader(context), // Build header dynamically
          Expanded(
            child: ListView(
              padding: EdgeInsets.zero,
              children: <Widget>[
                _buildMenuListTile('Trang chủ', Icons.home, () {
                  // Handle home navigation
                }),
                _buildMenuListTile('Cho thuê phòng trọ', Icons.apartment, () {
                  // Handle room rental navigation
                }),
                _buildMenuListTile('Cho thuê nhà nguyên căn', Icons.house, () {
                  // Handle house rental navigation
                }),
                _buildMenuListTile('Cho thuê căn hộ', Icons.apartment, () {
                  // Handle apartment rental navigation
                }),
                _buildMenuListTile('Cho thuê căn hộ mini', Icons.apartment, () {
                  // Handle mini-apartment rental navigation
                }),
                _buildMenuListTile('Cho thuê căn hộ dịch vụ', Icons.apartment,
                    () {
                  // Handle service apartment rental navigation
                }),
                _buildMenuListTile(
                    'Cho thuê mặt bằng', Icons.store_mall_directory, () {
                  // Handle store rental navigation
                }),
                _buildMenuListTile('Tìm người ở ghép', Icons.group, () {
                  // Handle roommates search navigation
                }),
                _buildMenuListTile('Blog', Icons.book, () {
                  // Handle blog navigation
                }),
                _buildMenuListTile('Bảng giá dịch vụ', Icons.price_change, () {
                  // Handle price list navigation
                }),
                _buildMenuListTile('Nạp tiền vào tài khoản', Icons.attach_money,
                    () {
                  // Handle account top-up navigation
                }),
                _buildMenuListTile('Hướng dẫn đăng tin', Icons.help_center, () {
                  // Handle post guide navigation
                }),
                const Divider(),
                const Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Hỗ trợ đăng tin',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      SizedBox(height: 8),
                    ],
                  ),
                ),
              ],
            ),
          ),
          if (isLoggedIn) _buildSignOutButton(context),
        ],
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return UserAccountsDrawerHeader(
      decoration: const BoxDecoration(
        color: Colors.blue,
      ),
      accountName: Text(
        username ?? 'Người dùng',
        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
      ),
      accountEmail: Text(
        phoneNumber ?? 'Chưa có số điện thoại',
        style: const TextStyle(fontSize: 14, color: Colors.white70),
      ),
      currentAccountPicture: CircleAvatar(
        backgroundColor: Colors.white,
        child: Icon(Icons.person, size: 40, color: Colors.blue),
      ),
      otherAccountsPictures: isLoggedIn
          ? [
              IconButton(
                icon: const Icon(Icons.settings, color: Colors.white),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => Profile()),
                  );
                },
              ),
            ]
          : null,
    );
  }

  Widget _buildMenuListTile(String title, IconData icon, VoidCallback onTap) {
    return ListTile(
      leading: Icon(icon, color: Colors.blue),
      title: Text(title),
      trailing: const Icon(Icons.arrow_forward_ios, size: 16),
      onTap: onTap,
    );
  }

  Widget _buildSignOutButton(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 16.0),
      child: ElevatedButton.icon(
        onPressed: () async {
          final prefs = await SharedPreferences.getInstance();
          await prefs.remove('token');
          setState(() {
            isLoggedIn = false;
          });
          Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(builder: (context) => Home()),
            (route) => false,
          );
        },
        icon: const Icon(Icons.logout),
        label: const Text('Đăng xuất'),
        style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
      ),
    );
  }

  Widget _SupportInfoRow() {
    return Row(
      children: [
        Icon(Icons.phone, color: Colors.green),
        SizedBox(width: 8),
        Text('0902.657.123'),
      ],
    );
  }
}
