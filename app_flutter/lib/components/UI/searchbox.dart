import 'package:flutter/material.dart';

class SearchBox extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: Colors.grey[200],
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _buildHeader(),
          const SizedBox(height: 8),
          _buildOption(
            icon: Icons.location_on,
            label: 'Toàn quốc',
            onTap: () {
              // Handle location selection
            },
          ),
          const Divider(height: 1),
          _buildOption(
            icon: Icons.price_check,
            label: 'Chọn giá',
            onTap: () {
              // Handle price selection
            },
          ),
          const Divider(height: 1),
          _buildOption(
            icon: Icons.square_foot,
            label: 'Chọn diện tích',
            onTap: () {
              // Handle area selection
            },
          ),
          const SizedBox(height: 8),
          _buildSearchButton(),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(
          children: const [
            Icon(Icons.home, color: Colors.blue, size: 18),
            SizedBox(width: 4),
            Text(
              'Phòng trọ, nhà trọ',
              style: TextStyle(
                color: Colors.blue,
                fontWeight: FontWeight.bold,
                fontSize: 14,
              ),
            ),
          ],
        ),
        const Icon(Icons.close, color: Colors.black, size: 18),
      ],
    );
  }

  Widget _buildOption(
      {required IconData icon,
      required String label,
      required VoidCallback onTap}) {
    return ListTile(
      leading: Icon(icon, size: 18),
      title: Text(
        label,
        style: const TextStyle(
          color: Colors.black,
          fontWeight: FontWeight.bold,
          fontSize: 14,
        ),
      ),
      trailing: const Icon(Icons.arrow_forward_ios, size: 12),
      onTap: onTap,
    );
  }

  Widget _buildSearchButton() {
    return ElevatedButton.icon(
      onPressed: () {
        // Handle search action
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.orange,
        padding: const EdgeInsets.symmetric(vertical: 10),
        minimumSize: const Size(100, 32),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      icon: const Icon(Icons.search, color: Colors.black, size: 16),
      label: const Text(
        'Tìm kiếm',
        style: TextStyle(color: Colors.black, fontSize: 14),
      ),
    );
  }
}
