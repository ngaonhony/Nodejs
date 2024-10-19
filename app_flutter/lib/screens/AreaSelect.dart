import 'package:flutter/material.dart';

class AreaSelect extends StatefulWidget {
  @override
  _AreaSelectorScreenState createState() => _AreaSelectorScreenState();
}

class _AreaSelectorScreenState extends State<AreaSelect> {
  double _minArea = 0;
  double _maxArea = 90;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'CHỌN DIỆN TÍCH',
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
                  'Từ ${_minArea.toInt()} - ${_maxArea.toInt()} m²',
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
                    values: RangeValues(_minArea, _maxArea),
                    min: 0,
                    max: 90,
                    divisions: 90,
                    labels: RangeLabels(
                      '${_minArea.toInt()} m²',
                      '${_maxArea.toInt()} m²',
                    ),
                    onChanged: (RangeValues values) {
                      setState(() {
                        _minArea = values.start;
                        _maxArea = values.end;
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
                    _buildQuickSelectButton('Dưới 20 m²', 0, 20),
                    _buildQuickSelectButton('Từ 20 m² - 30 m²', 20, 30),
                    _buildQuickSelectButton('Từ 30 m² - 50 m²', 30, 50),
                    _buildQuickSelectButton('Từ 50 m² - 70 m²', 50, 70),
                    _buildQuickSelectButton('Từ 70 m² - 90 m²', 70, 90),
                    _buildQuickSelectButton('Trên 90 m²', 90, 90),
                  ],
                ),
              ],
            ),
          ),
          Spacer(),
          ElevatedButton(
            onPressed: () {
              // Handle apply action here
              Navigator.pop(context, '$_minArea - $_maxArea m²');
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

  Widget _buildQuickSelectButton(String label, double min, double max) {
    return ElevatedButton(
      onPressed: () {
        setState(() {
          _minArea = min;
          _maxArea = max;
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
