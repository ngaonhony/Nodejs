import 'package:flutter/material.dart';


class FindPage extends StatefulWidget {
  @override
  _FilterScreenState createState() => _FilterScreenState();
}

class _FilterScreenState extends State<FindPage> {
  String selectedCity = 'Thành phố Hồ Chí Minh';
  String selectedDistrict = 'Chọn quận huyện...';
  String selectedRoomType = 'Chọn loại phòng...';
  String allowPets = '';
  String hasMezzanine = '';
  String hasAC = '';
  String selectedPrice = '';
  String hasBalcony = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Tiêu đề tìm theo khu vực
              Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: Text(
                  'Tìm phòng theo khu vực:',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
              ),
              SizedBox(height: 25),
              // Tỉnh/Thành phố
              DropdownButtonFormField<String>(
                value: selectedCity,
                items: ['Thành phố Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng']
                    .map((city) => DropdownMenuItem(
                  value: city,
                  child: Text(city),
                ))
                    .toList(),
                onChanged: (value) {
                  setState(() {
                    selectedCity = value!;
                  });
                },
                decoration: InputDecoration(
                  labelText: 'Tỉnh/Thành phố',
                  border: OutlineInputBorder(),
                ),
              ),
              SizedBox(height: 25),
              // Quận huyện
              DropdownButtonFormField<String>(
                value: selectedDistrict,
                items: [
                  'Chọn quận huyện...',
                  'Quận 1',
                  'Quận 2',
                  'Quận 3',
                  'Quận 4',
                  'Quận 5',
                  'Quận 6',
                  'Quận 7',
                ]
                    .map((district) => DropdownMenuItem(
                  value: district,
                  child: Text(district),
                ))
                    .toList(),
                onChanged: (value) {
                  setState(() {
                    selectedDistrict = value!;
                  });
                },
                decoration: InputDecoration(
                  labelText: 'Quận/huyện',
                  border: OutlineInputBorder(),
                ),
              ),
              SizedBox(height: 25),
              // Loại phòng
              DropdownButtonFormField<String>(
                value: selectedRoomType,
                items: ['Chọn loại phòng...', 'Phòng đơn', 'Phòng đôi', 'Phòng VIP']
                    .map((roomType) => DropdownMenuItem(
                  value: roomType,
                  child: Text(roomType),
                ))
                    .toList(),
                onChanged: (value) {
                  setState(() {
                    selectedRoomType = value!;
                  });
                },
                decoration: InputDecoration(
                  labelText: 'Loại phòng',
                  border: OutlineInputBorder(),
                ),
              ),
              SizedBox(height: 25),
              // Chọn giá
              Padding(
                padding: const EdgeInsets.only(top: 20.0),
                child: Text('Giá:',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              SizedBox(height: 16),
              Column(
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              selectedPrice = 'Dưới 2 triệu';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: selectedPrice == 'Dưới 2 triệu' ? Colors.green[400] : Colors.white,
                            foregroundColor: selectedPrice == 'Dưới 2 triệu' ? Colors.white : Colors.black,
                          ),
                          child: Text('Dưới 2 triệu'),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              selectedPrice = '2 - 3 triệu';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: selectedPrice == '2 - 3 triệu' ? Colors.green[400] : Colors.white,
                            foregroundColor: selectedPrice == '2 - 3 triệu' ? Colors.white : Colors.black,
                          ),
                          child: Text('2 - 3 triệu'),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 8),
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              selectedPrice = '3 - 4 triệu';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: selectedPrice == '3 - 4 triệu' ? Colors.green[400] : Colors.white,
                            foregroundColor: selectedPrice == '3 - 4 triệu' ? Colors.white : Colors.black,
                          ),
                          child: Text('3 - 4 triệu'),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              selectedPrice = '4 - 5 triệu';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: selectedPrice == '4 - 5 triệu' ? Colors.green[400] : Colors.white,
                            foregroundColor: selectedPrice == '4 - 5 triệu' ? Colors.white : Colors.black,
                          ),
                          child: Text('4 - 5 triệu'),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 8),
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              selectedPrice = '5 - 6 triệu';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: selectedPrice == '5 - 6 triệu' ? Colors.green[400] : Colors.white,
                            foregroundColor: selectedPrice == '5 - 6 triệu' ? Colors.white : Colors.black,
                          ),
                          child: Text('5 - 6 triệu'),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              selectedPrice = '6 - 8 triệu';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: selectedPrice == '6 - 8 triệu' ? Colors.green[400] : Colors.white,
                            foregroundColor: selectedPrice == '6 - 8 triệu' ? Colors.white : Colors.black,
                          ),
                          child: Text('6 - 8 triệu'),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 8),
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              selectedPrice = '>= 8 triệu';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: selectedPrice == '>= 8 triệu' ? Colors.green[400] : Colors.white,
                            foregroundColor: selectedPrice == '>= 8 triệu' ? Colors.white : Colors.black,
                          ),
                          child: Text('>= 8 triệu'),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              selectedPrice = 'Tất cả';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: selectedPrice == 'Tất cả' ? Colors.green[400] : Colors.white,
                            foregroundColor: selectedPrice == 'Tất cả' ? Colors.white : Colors.black,
                          ),
                          child: Text('Tất cả'),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              SizedBox(height: 25),
              // Chọn thú cưng
              Padding(
                padding: const EdgeInsets.only(top: 20.0),
                child: Text('Nuôi thú cưng:',
                  style: TextStyle(
                    fontSize: 24, // Kích thước chữ
                    fontWeight: FontWeight.bold, // In đậm
                  ),
                ),
              ),
              SizedBox(height: 16),
              Column(
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              allowPets = 'Có';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: allowPets == 'Có' ? Colors.green[400] : Colors.white,
                            foregroundColor: allowPets == 'Có' ? Colors.white : Colors.black,
                          ),
                          child: Text('Có'),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              allowPets = 'Không';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: allowPets == 'Không' ? Colors.green[400] : Colors.white,
                            foregroundColor: allowPets == 'Không' ? Colors.white : Colors.black,
                          ),
                          child: Text('Không'),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              allowPets = 'Tất cả';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: allowPets == 'Tất cả' ? Colors.green[400] : Colors.white,
                            foregroundColor: allowPets == 'Tất cả' ? Colors.white : Colors.black,
                          ),
                          child: Text('Tất cả'),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              SizedBox(height: 25),

              // Có gác
              Padding(
                padding: const EdgeInsets.only(top: 20.0),
                child: Text('Nhu cầu gác:',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              SizedBox(height: 16),
              Column(
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              hasMezzanine = 'Có';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: hasMezzanine == 'Có' ? Colors.green[400] : Colors.white,
                            foregroundColor: hasMezzanine == 'Có' ? Colors.white : Colors.black,
                          ),
                          child: Text('Có'),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              hasMezzanine = 'Không';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: hasMezzanine == 'Không' ? Colors.green[400] : Colors.white,
                            foregroundColor: hasMezzanine == 'Không' ? Colors.white : Colors.black,
                          ),
                          child: Text('Không'),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              hasMezzanine = 'Tất cả';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: hasMezzanine == 'Tất cả' ? Colors.green[400] : Colors.white,
                            foregroundColor: hasMezzanine == 'Tất cả' ? Colors.white : Colors.black,
                          ),
                          child: Text('Tất cả'),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              SizedBox(height: 25),

              // Có máy lạnh
              Padding(
                padding: const EdgeInsets.only(top: 20.0),
                child: Text('Nhu cầu máy lạnh:',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              SizedBox(height: 16),
              Column(
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              hasAC = 'Có';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: hasAC == 'Có' ? Colors.green[400] : Colors.white,
                            foregroundColor: hasAC == 'Có' ? Colors.white : Colors.black,
                          ),
                          child: Text('Có'),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              hasAC = 'Không';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: hasAC == 'Không' ? Colors.green[400] : Colors.white,
                            foregroundColor: hasAC == 'Không' ? Colors.white : Colors.black,
                          ),
                          child: Text('Không'),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              hasAC = 'Tất cả';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: hasAC == 'Tất cả' ? Colors.green[400] : Colors.white,
                            foregroundColor: hasAC == 'Tất cả' ? Colors.white : Colors.black,
                          ),
                          child: Text('Tất cả'),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              // ban công
              SizedBox(height: 25),
              Padding(
                padding: const EdgeInsets.only(top: 20.0),
                child: Text('Nhu cầu ban công:',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              SizedBox(height: 16),
              Column(
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              hasBalcony = 'Có';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor:  hasBalcony == 'Có' ? Colors.green[400] : Colors.white,
                            foregroundColor:  hasBalcony == 'Có' ? Colors.white : Colors.black,
                          ),
                          child: Text('Có'),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              hasBalcony = 'Không';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor:  hasBalcony == 'Không' ? Colors.green[400] : Colors.white,
                            foregroundColor:  hasBalcony == 'Không' ? Colors.white : Colors.black,
                          ),
                          child: Text('Không'),
                        ),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              hasBalcony = 'Tất cả';
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor:  hasBalcony == 'Tất cả' ? Colors.green[400] : Colors.white,
                            foregroundColor:  hasBalcony == 'Tất cả' ? Colors.white : Colors.black,
                          ),
                          child: Text('Tất cả'),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              SizedBox(height: 25),
              // Nút Áp dụng
              Center(
                child: Container(
                  width: double.infinity,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [Colors.green.shade400, Colors.green.shade600],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(30),
                  ),
                  child: ElevatedButton(
                    onPressed: () {

                    },
                    style: ElevatedButton.styleFrom(
                      padding: EdgeInsets.symmetric( vertical: 15),
                      backgroundColor: Colors.transparent,
                      shadowColor: Colors.transparent,
                    ),
                    child: Text('Áp dụng',
                      style: TextStyle (fontSize: 18, color: Colors.white),
                    ),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
