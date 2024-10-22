import 'package:flutter/material.dart';

class PriceSelect extends StatefulWidget {
  @override
  _PriceSelectorScreenState createState() => _PriceSelectorScreenState();
}

class _PriceSelectorScreenState extends State<PriceSelect> {
  double _minPrice = 0;
  double _maxPrice = 15;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'CHỌN GIÁ',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text(
                  'Từ $_minPrice - $_maxPrice triệu+',
                  style: const TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.orange,
                  ),
                ),
                SliderTheme(
                  data: SliderThemeData(
                    activeTrackColor: Colors.orange,
                    inactiveTrackColor: Colors.orange[100],
                    thumbColor: Colors.white,
                    overlayColor: Colors.orange.withOpacity(0.2),
                  ),
                  child: RangeSlider(
                    values: RangeValues(_minPrice, _maxPrice),
                    min: 0,
                    max: 15,
                    divisions: 15,
                    labels: RangeLabels(
                      '$_minPrice triệu',
                      '$_maxPrice triệu+',
                    ),
                    onChanged: (RangeValues values) {
                      setState(() {
                        _minPrice = values.start;
                        _maxPrice = values.end;
                      });
                    },
                  ),
                ),
                const SizedBox(height: 16),
                const Text(
                  'Chọn nhanh',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    _buildQuickSelectButton('Dưới 1 triệu đồng'),
                    _buildQuickSelectButton('Từ 1 - 2 triệu đồng'),
                    _buildQuickSelectButton('Từ 2 - 3 triệu đồng'),
                    _buildQuickSelectButton('Từ 3 - 5 triệu đồng'),
                    _buildQuickSelectButton('Từ 5 - 7 triệu đồng'),
                    _buildQuickSelectButton('Từ 7 - 10 triệu đồng'),
                    _buildQuickSelectButton('Từ 10 - 15 triệu đồng'),
                    _buildQuickSelectButton('Trên 15 triệu đồng'),
                  ],
                ),
              ],
            ),
          ),
          Spacer(),
          ElevatedButton(
            onPressed: () {
              // Xử lý khi nhấn nút "ÁP DỤNG"
              Navigator.pop(context, '$_minPrice - $_maxPrice triệu+');
            },
            style: ElevatedButton.styleFrom(
              foregroundColor: Colors.black,
              backgroundColor: Colors.orange,
              minimumSize: Size(double.infinity, 50),
            ),
            child: const Text(
              'ÁP DỤNG',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickSelectButton(String label) {
    return ElevatedButton(
      onPressed: () {
        // Cập nhật giá trị nhanh khi nhấn nút
        setState(() {
          switch (label) {
            case 'Dưới 1 triệu đồng':
              _minPrice = 0;
              _maxPrice = 1;
              break;
            case 'Từ 1 - 2 triệu đồng':
              _minPrice = 1;
              _maxPrice = 2;
              break;
            case 'Từ 2 - 3 triệu đồng':
              _minPrice = 2;
              _maxPrice = 3;
              break;
            case 'Từ 3 - 5 triệu đồng':
              _minPrice = 3;
              _maxPrice = 5;
              break;
            case 'Từ 5 - 7 triệu đồng':
              _minPrice = 5;
              _maxPrice = 7;
              break;
            case 'Từ 7 - 10 triệu đồng':
              _minPrice = 7;
              _maxPrice = 10;
              break;
            case 'Từ 10 - 15 triệu đồng':
              _minPrice = 10;
              _maxPrice = 15;
              break;
            case 'Trên 15 triệu đồng':
              _minPrice = 15;
              _maxPrice = 15;
              break;
          }
        });
      },
      style: ElevatedButton.styleFrom(
        foregroundColor: Colors.black,
        backgroundColor: Colors.grey[200],
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      ),
      child: Text(label),
    );
  }
}
