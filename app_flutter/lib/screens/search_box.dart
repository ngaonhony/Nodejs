import 'package:flutter/material.dart';
import './SelectAddress.dart';
import './ChonGiaBox.dart';
import './DienTichbox.dart';

class SearchBox extends StatefulWidget {
  @override
  _SearchBoxState createState() => _SearchBoxState();
}

class _SearchBoxState extends State<SearchBox> {
  String selectedCategory = 'Phòng trọ, nhà trọ';
  String selectedAddress = 'Chọn Địa chỉ';
  String selectedPrice = 'Chọn giá';
  String selectedArea = 'Chọn Diện tích';
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
          _buildHeader(context),
          const SizedBox(height: 8),
          _buildOption(
            icon: Icons.location_on,
            label: selectedAddress,
            onTap: () async {
              final result = await Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => SelectAddress(),
                ),
              );

              if (result != null) {
                setState(() {
                  selectedAddress = result;
                });
              }
            },
          ),
          const Divider(height: 1),
          _buildOption(
            icon: Icons.location_on,
            label: selectedPrice,
            onTap: () async {
              final result = await Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => PriceSelect(),
                ),
              );

              if (result != null) {
                setState(() {
                  selectedPrice = result;
                });
              }
            },
          ),
          const Divider(height: 1),
          _buildOption(
            icon: Icons.location_on,
            label: selectedArea,
            onTap: () async {
              final result = await Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => AreaSelect(),
                ),
              );

              if (result != null) {
                setState(() {
                  selectedArea = result;
                });
              }
            },
          ),
          const SizedBox(height: 8),
          _buildSearchButton(),
        ],
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        GestureDetector(
          onTap: () async {
            final selected = await Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (context) => RealEstateOptionsScreen(
                      selectedCategory: selectedCategory)),
            );
            if (selected != null) {
              setState(() {
                selectedCategory = selected;
              });
            }
          },
          child: Row(
            children: [
              const Icon(Icons.home, color: Colors.blue, size: 18),
              const SizedBox(width: 4),
              Text(
                selectedCategory,
                style: const TextStyle(
                  color: Colors.blue,
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
              ),
            ],
          ),
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
        // Xử lý hành động tìm kiếm
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

class RealEstateOptionsScreen extends StatelessWidget {
  final String selectedCategory;

  RealEstateOptionsScreen({required this.selectedCategory});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'CHỌN LOẠI BẤT ĐỘNG SẢN',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: ListView(
        children: [
          _buildOption(context, 'Phòng trọ, nhà trọ'),
          _buildOption(context, 'Nhà thuê nguyên căn'),
          _buildOption(context, 'Cho thuê căn hộ'),
          _buildOption(context, 'Cho thuê căn hộ mini'),
          _buildOption(context, 'Cho thuê căn hộ dịch vụ'),
          _buildOption(context, 'Tìm người ở ghép'),
          _buildOption(context, 'Cho thuê mặt bằng'),
        ],
      ),
    );
  }

  Widget _buildOption(BuildContext context, String label) {
    return Column(
      children: [
        ListTile(
          title: Text(
            label,
            style: TextStyle(
              color: label == selectedCategory ? Colors.blue : Colors.black,
              fontWeight: label == selectedCategory
                  ? FontWeight.bold
                  : FontWeight.normal,
            ),
          ),
          onTap: () {
            Navigator.pop(context, label);
          },
        ),
        const Divider(),
      ],
    );
  }
}
