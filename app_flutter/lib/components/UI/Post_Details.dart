import 'package:flutter/material.dart';

class ChiTietPhongTroPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Chi Tiết Phòng Trọ'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Stack(
                children: [
                  Container(
                    width: double.infinity,
                    height: 200,
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: AssetImage('assets/images/danang.jpg'),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  Positioned(
                    top: 10,
                    left: 10,
                    child: Icon(
                      Icons.photo,
                      color: Colors.white,
                      size: 30,
                    ),
                  ),
                  Positioned(
                    top: 10,
                    right: 10,
                    child: IconButton(
                      icon: Icon(Icons.favorite_border),
                      color: Colors.white,
                      onPressed: () {},
                    ),
                  ),
                ],
              ),
              // Thông tin chính
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Cho thuê phòng trọ cao cấp tại 64 Trương Văn Bang - Bình Trưng Tây',
                      style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.red),
                    ),
                    SizedBox(height: 5),
                    Text(
                      'Địa chỉ: 64 Đường Trương Văn Bang, Phường Bình Trưng Tây, Quận 2, Hồ Chí Minh',
                      style: TextStyle(fontSize: 14, color: Colors.black54),
                    ),
                    SizedBox(height: 10),
                    Row(
                      children: [
                        Text(
                          '3 triệu/tháng',
                          style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              color: Colors.green),
                        ),
                        Spacer(),
                        Text(
                          '16m²',
                          style: TextStyle(fontSize: 14, color: Colors.black54),
                        ),
                        SizedBox(width: 10),
                        Text(
                          '10 giờ trước',
                          style: TextStyle(fontSize: 14, color: Colors.black54),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Divider(),
              // Thông tin người đăng
              ListTile(
                leading: CircleAvatar(
                  child: Icon(Icons.person),
                ),
                title: Text('Chú Hùng (*)'),
                subtitle: Text('Đang hoạt động'),
                trailing: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    IconButton(
                      icon: Icon(Icons.call),
                      color: Colors.blue,
                      onPressed: () {},
                    ),
                    IconButton(
                      icon: Icon(Icons.message),
                      color: Colors.lightBlue,
                      onPressed: () {},
                    ),
                  ],
                ),
              ),
              Divider(),
              // Thông tin mô tả
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Thông tin mô tả',
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 5),
                    Text(
                      'Cho thuê phòng đẹp, giá rẻ, an ninh tốt tại Bình Trưng Tây, Quận 2\n'
                      'Diện tích: 16-30m²\n'
                      'Phòng mới xây, cao cấp như khách sạn, đầy đủ nội thất (giường, tủ), '
                      'vệ sinh khép kín, có máy lạnh, nước nóng năng lượng mặt trời, nhà để xe. '
                      'Khu an ninh, yên tĩnh, thoáng mát, cách Quận 1 chỉ 10 phút đi xe máy.\n\n'
                      'Giá: từ 3 triệu/tháng - 3.5 triệu/tháng\n'
                      'Địa chỉ: 64 Trương Văn Bang - Bình Trưng Tây - Quận 2 (cạnh cầu Giồng Ông Tố 2)\n'
                      'Liên hệ: 0943773920 (A. Hùng).',
                      style: TextStyle(fontSize: 14),
                    ),
                  ],
                ),
              ),
              Divider(),
              // Đặc điểm tin đăng
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Đặc điểm tin đăng',
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 5),
                    Text('Mã tin: #4345'),
                    Text('Chuyên mục: Cho thuê phòng trọ Quận 2'),
                    Text('Khu vực: Cho thuê phòng trọ Hồ Chí Minh'),
                    Text('Loại tin rao: Phòng trọ, nhà trọ'),
                    Text('Đối tượng thuê: Tất cả'),
                    Text('Gói tin: Tin VIP nổi bật'),
                    Text('Ngày đăng: Thứ 2, 09:37 07/10/2024'),
                    Text('Ngày hết hạn: Thứ 5, 09:37 17/10/2024'),
                  ],
                ),
              ),
              Divider(),
              // Thông tin liên hệ
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Thông tin liên hệ',
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 5),
                    Text('Liên hệ: Chú Hùng (*)'),
                    Text('Điện thoại: 0943773920'),
                    Text('Zalo: 0943773920'),
                  ],
                ),
              ),
              Divider(),
              // Bản đồ
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Bản đồ',
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 5),
                    Text(
                        'Địa chỉ: 64 Đường Trương Văn Bang, Phường Bình Trưng Tây, Quận 2, Hồ Chí Minh'),
                    SizedBox(height: 10),
                    Container(
                      height: 200,
                      width: double.infinity,
                      color: Colors.grey[300],
                      child: Center(
                        child: Text('xem bản đồ',
                            style: TextStyle(color: Colors.blue)),
                      ),
                    ),
                  ],
                ),
              ),
              Divider(),
              // Gửi phản hồi
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Center(
                  child: ElevatedButton.icon(
                    onPressed: () {},
                    icon: Icon(Icons.flag),
                    label: Text('Gửi phản hồi'),
                    style:
                        ElevatedButton.styleFrom(backgroundColor: Colors.blue),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
