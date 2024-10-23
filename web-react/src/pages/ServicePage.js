import React from 'react';

const ServicePage = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Bảng giá dịch vụ</h1>
            <div className="bg-yellow-300 p-6 rounded-lg shadow-md mb-6">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Gói Dịch Vụ</th>
                            <th className="border px-4 py-2">Giá Ngày</th>
                            <th className="border px-4 py-2">Giá Tuần</th>
                            <th className="border px-4 py-2">Giá Tháng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2 font-bold">Tin VIP nổi bật</td>
                            <td className="border px-4 py-2">50.000đ</td>
                            <td className="border px-4 py-2">315.000đ</td>
                            <td className="border px-4 py-2">1.500.000đ</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2 font-bold">Tin VIP 1</td>
                            <td className="border px-4 py-2">30.000đ</td>
                            <td className="border px-4 py-2">190.000đ</td>
                            <td className="border px-4 py-2">1.200.000đ</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2 font-bold">Tin VIP 2</td>
                            <td className="border px-4 py-2">20.000đ</td>
                            <td className="border px-4 py-2">133.000đ</td>
                            <td className="border px-4 py-2">900.000đ</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2 font-bold">Tin thường</td>
                            <td className="border px-4 py-2">10.000đ</td>
                            <td className="border px-4 py-2">63.000đ</td>
                            <td className="border px-4 py-2">540.000đ</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Tại sao chọn Phongtro123?</h2>
                <ul className="list-disc list-inside">
                    <li>Top đầu Google về cho thuê phòng trọ.</li>
                    <li>Hơn 103.348 tin đăng và 300.000 khách truy cập hàng tháng.</li>
                    <li>Đăng tin miễn phí, nhanh chóng và hiệu quả.</li>
                </ul>
            </div>
        </div>
    );
};

export default ServicePage;