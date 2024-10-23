import React from "react";
import Header from "../components/Header";
import Navigator from "../components/Navigator";
import Footer from "../components/Footer";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ServicePage = () => {
    const mockData = [
        {
          package: 'Tin VIP nổi bật',
          starCount: 5,
          pricePerDay: 50000,
          pricePerWeek: 315000,
          pricePerMonth: {
            original: 1500000,
            discounted: 1200000
          },
          pushPrice: 5000,
          titleColor: '#E13427',
          autoApprove: true,
          showPhoneNumber: true,
          highlight: true
        },
        {
          package: 'Tin VIP 1',
          starCount: 4,
          pricePerDay: 30000,
          pricePerWeek: 190000,
          pricePerMonth: {
            original: 900000,
            discounted: 800000
          },
          pushPrice: 3000,
          titleColor: '#ea2e9d',
          autoApprove: true,
          showPhoneNumber: false,
          highlight: false
        },
        {
          package: 'Tin VIP 2',
          starCount: 3,
          pricePerDay: 20000,
          pricePerWeek: 133000,
          pricePerMonth: {
            original: 600000,
            discounted: 540000
          },
          pushPrice: 2000,
          titleColor: '#FF6600',
          autoApprove: true,
          showPhoneNumber: false,
          highlight: false
        },
        {
          package: 'Tin VIP 3',
          starCount: 2,
          pricePerDay: 10000,
          pricePerWeek: 63000,
          pricePerMonth: {
            original: 300000,
            discounted: 240000
          },
          pushPrice: 2000,
          titleColor: '#007BFF',
          autoApprove: true,
          showPhoneNumber: false,
          highlight: false
        },
        {
          package: 'Tin thường',
          starCount: 0,
          pricePerDay: 2000,
          pricePerWeek: 12000,
          pricePerMonth: {
            original: 60000,
            discounted: 48000
          },
          pushPrice: 2000,
          titleColor: '#055699',
          autoApprove: false,
          showPhoneNumber: false,
          highlight: false
        }
      ];

      return (
        <div className=''>
      <div className="w-full flex flex-col items-center h-full border">
        <Header />
      </div>
      <Navigator />
        <section className="section py-12 px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full table-pricing">
                <thead>
                  <tr>
                    <th className="bg-white border-0"></th>
                    {mockData.map((item, index) => (
                      <th
                        key={index}
                        className={`package_vip${index + 1} bg-[${item.titleColor}] text-white vertical-align-middle min-w-[200px]`}
                      >
                        {item.package}
                        <span className={`star star-${item.starCount}`}></span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="nowrap"><strong>Giá ngày</strong></td>
                    {mockData.map((item, index) => (
                      <td key={index}>
                        <span className="price-day">{item.pricePerDay.toLocaleString()}đ</span>
                        <span className="block text-sm">(Tối thiểu 3 ngày)</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="nowrap"><strong>Giá tuần (7 ngày)</strong></td>
                    {mockData.map((item, index) => (
                      <td key={index}>
                        <span className="price-week">{item.pricePerWeek.toLocaleString()}đ</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="nowrap"><strong>Giá tháng (30 ngày)</strong><span className="block text-sm text-[#4caf50]">Rẻ hơn 10% so với giá ngày</span></td>
                    {mockData.map((item, index) => (
                      <td key={index}>
                        <span className="block line-through text-red-500">{item.pricePerMonth.original.toLocaleString()}đ</span>
                        <span className="block text-[#4caf50]">Giảm {100 - Math.round(item.pricePerMonth.discounted / item.pricePerMonth.original * 100)}% chỉ còn</span>
                        <span className="price-month">{item.pricePerMonth.discounted.toLocaleString()}đ</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="nowrap"><strong>Giá đẩy tin</strong></td>
                    {mockData.map((item, index) => (
                      <td key={index}>{item.pushPrice.toLocaleString()}đ</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="nowrap vertical-align-middle"><strong>Màu sắc tiêu đề</strong></td>
                    {mockData.map((item, index) => (
                      <td key={index}>
                        <p>
                          <span className="font-bold" style={{ color: item.titleColor }}>
                            {item.package.toUpperCase()}
                          </span>
                        </p>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="nowrap vertical-align-middle"><strong>Tự động duyệt</strong></td>
                    {mockData.map((item, index) => (
                      <td key={index}>
                        <p>
                          <img
                            className="mx-auto"
                            src={item.autoApprove ? '/images/icon-tick-green.svg' : '/images/icon-x-red.svg'}
                            alt={item.autoApprove ? 'Tự động duyệt' : 'Không tự động duyệt'}
                          />
                        </p>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="nowrap vertical-align-middle"><strong>Hiển thị số điện thoại<br /> ở trang danh sách</strong></td>
                    {mockData.map((item, index) => (
                      <td key={index}>
                        <p>
                          <img
                            className="mx-auto"
                            src={item.showPhoneNumber ? '/images/icon-tick-green.svg' : '/images/icon-x-red.svg'}
                            alt={item.showPhoneNumber ? 'Hiển thị số điện thoại' : 'Không hiển thị số điện thoại'}
                          />
                        </p>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="nowrap vertical-align-middle"><strong>Huy hiệu nổi bật</strong></td>
                    {mockData.map((item, index) => (
                      <td key={index}>
                        <p>
                          <img
                            className="mx-auto"
                            src={item.highlight ? '/images/icon-tick-green.svg' : '/images/icon-x-red.svg'}
                            alt={item.highlight ? 'Huy hiệu nổi bật' : 'Không có huy hiệu nổi bật'}
                          />
                        </p>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="bg-white border-b-0"></td>
                    {mockData.map((item, index) => (
                      <td key={index} className="bg-white border-b-0">
                        <button
                          className="btn btn-primary btn-block js-jump-to"
                          data-jumpto={`demo-${item.package.toLowerCase().replace(/\s/g, '-')}`}
                        >
                          Xem demo
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <Footer /> 
    </div>
      );
    };

export default ServicePage;