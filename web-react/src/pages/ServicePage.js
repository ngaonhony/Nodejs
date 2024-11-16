import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Navigator from "../components/Navigator";
import Footer from "../components/Footer";
import Button from "../components/Button";
import FlameText from "../components/FlameText";
import checkImage from "../assets/images/check.png";
import closeImage from "../assets/images/close.png";
import { fetchServices } from "../slices/serviceSlice";

const ServicePage = () => {
  const dispatch = useDispatch();
  const { services = [] } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetched services data:", services);
  }, [services]);

  return (
    <div>
       <div className="w-full flex flex-col items-center h-full border">
        <Header />
      </div>
      <Navigator />
      <div className="max-w-[1100px] mx-auto mt-12">
        <h1 className="text-center text-3xl font-bold mb-8">
          Giới thiệu PHÒNG TRỌ NHÓM 1
        </h1>
        <section className="p-5 border-0 shadow-lg bg-white">
          <div className="section-content">
            <p>ĐỪNG ĐỂ PHÒNG TRỐNG THÊM BẤT CỨ NGÀY NÀO!, đăng tin ngay tại PHÒNG TRỌ NHÓM 1 và tất cả các vấn đề sẽ được giải quyết một cách nhanh nhất.</p>
            <p>ƯU ĐIỂM PHONGTRONHOM1:</p>
            {[
              "Top đầu google về từ khóa: cho thuê phòng trọ, thuê phòng trọ, phòng trọ hồ chí minh, phòng trọ hà nội, thuê nhà nguyên căn, cho thuê căn hộ, tìm người ở ghép… với lưu lượng truy cập (traffic) cao nhất trong lĩnh vực.",
              "PHÒNG TRỌ NHÓM 1 tự hào có lượng dữ liệu bài đăng lớn nhất trong lĩnh vực cho thuê phòng trọ với hơn 103.348 tin trên hệ thống và tiếp tục tăng.",
              "PHÒNG TRỌ NHÓM 1 tự hào có số lượng người dùng lớn nhất trong lĩnh vực cho thuê phòng trọ với hơn 300.000 khách truy cập thường xuyên và hơn 2.500.000 lượt pageview mỗi tháng.",
              "PHÒNG TRỌ NHÓM 1 tự hào được sự tin tưởng sử dụng của hơn 116.998 khách hàng là chủ nhà, đại lý, môi giới đăng tin thường xuyên tại website.",
              "PHÒNG TRỌ NHÓM 1 tự hào ghi nhận 88.879 giao dịch thành công khi sử dụng dịch vụ tại web, mức độ hiệu quả đạt xấp xỉ 85% tổng tin đăng."
            ].map((text, index) => (
              <p key={index} className="flex items-start mb-4">
                <img className="inline-block mr-2 w-5 h-5" src={checkImage} alt="Tick" />
                {text}
              </p>
            ))}
          </div>
        </section>
      </div>
      <section className="section py-12 px-4">
        <div className="section-header text-center mb-8">
          <div className="section-title big text-2xl font-bold mb-0">
            Bảng giá dịch vụ
          </div>
          <p className="mt-0 mb-8">Áp dụng từ ngày 31/05/2024</p>
        </div>
        <div className="w-[1300px] mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full table-pricing table-auto border-separate border-spacing-2">
            <thead>
                <tr>
                  <th className="bg-white border-0 text-white min-w-[200px] px-4 py-3"></th>
                  {services.map((item, index) => (
                    <th
                      key={index}
                      style={{ backgroundColor: item.title_color }}
                      className="text-white min-w-[200px] px-4 py-3 text-left">
                      {item.name}
                      <span className="ml-2">{"★".repeat(item.starCount)}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-gray-100">
                <tr>
                  <td className="nowrap px-4 py-3">
                    <strong>Giá ngày</strong>
                    <span className="block text-sm">(Tối thiểu 3 ngày)</span>
                  </td>
                  {services.map((item, index) => (
                    <td key={index} className="px-4 py-3">
                      <span className="price-day text-2xl font-bold">
                        {item.price_per_day ? item.price_per_day.toLocaleString() + "đ" : "N/A"}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="nowrap px-4 py-3">
                    <strong>Giá tuần (7 ngày)</strong>
                  </td>
                  {services.map((item, index) => (
                    <td key={index} className="px-4 py-3">
                      <span className="price-week text-base font-bold">
                        {item.price_per_week ? item.price_per_week.toLocaleString() + "đ" : "N/A"}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="nowrap px-4 py-3">
                    <strong>Giá tháng (30 ngày)</strong>
                    <span className="block text-sm text-[#4caf50]">
                      Rẻ hơn 10% so với giá ngày
                    </span>
                  </td>
                  {services.map((item, index) => (
                    <td key={index} className="px-4 py-3">
                      <FlameText
                        text={item.price_per_month ? item.price_per_month.toLocaleString() + "đ" : "N/A"}
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="nowrap px-4 py-3">
                    <strong>Giá đẩy tin</strong>
                  </td>
                  {services.map((item, index) => (
                    <td key={index} className="px-4 py-3">
                      {item.pushPrice ? item.pushPrice.toLocaleString() + "đ" : "N/A"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="nowrap vertical-align-middle px-4 py-3">
                    <strong>Màu sắc tiêu đề</strong>
                  </td>
                  {services.map((item, index) => (
                    <td key={index} className="px-4 py-3">
                      <p>
                        <span
                          className="font-bold"
                          style={{ color: item.title_color }}>
                          {item.name.toUpperCase()}
                        </span>
                      </p>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="nowrap vertical-align-middle px-4 py-3">
                    <strong>Tự động duyệt</strong>
                  </td>
                  {services.map((item, index) => (
                    <td key={index} className="px-4 py-3">
                      <p>
                        <img
                          className="mx-auto w-5 h-5"
                          src={item.auto_approval ? checkImage : closeImage}
                          alt={item.auto_approval ? "Tự động duyệt" : "Không tự động duyệt"}
                        />
                      </p>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="nowrap vertical-align-middle px-4 py-3">
                    <strong>
                      Hiển thị số điện thoại
                    </strong>
                  </td>
                  {services.map((item, index) => (
                    <td key={index} className="px-4 py-3">
                      <p>
                        <img
                          className="mx-auto w-5 h-5"
                          src={item.advantages ? checkImage : closeImage}
                          alt={item.advantages ? "Hiển thị số điện thoại" : "Không hiển thị số điện thoại"}
                        />
                      </p>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="nowrap vertical-align-middle px-4 py-3">
                    <strong>Huy hiệu nổi bật</strong>
                  </td>
                  {services.map((item, index) => (
                    <td key={index} className="px-4 py-3">
                      <p>
                        <img
                          className="mx-auto w-5 h-5"
                          src={item.prominent_badge ? checkImage : closeImage}
                          alt={item.prominent_badge ? "Huy hiệu nổi bật" : "Không có huy hiệu nổi bật"}
                        />
                      </p>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="bg-white border-b-0 px-4 py-3"></td>
                  {services.map((item, index) => (
                    <td key={index} className="bg-white border-b-0 px-4 py-3">
                      <Button
                        text="Xem demo"
                        textColor="text-white"
                        bgColor="bg-[#8717fb]"
                        path={`/demo-${item.name.toLowerCase().replace(/\s/g, "-")}`}
                      />
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