  import Navigator from "../components/Navigator";
  import React, { useEffect, useState } from "react";
  import UserBar from "../components/UserBar";
import { MdOutlineCloudUpload } from "react-icons/md";
const NewPost = () => {
  const [formData, setFormData] = useState({
    address: "",
    title: "",
    description: "",
    price: "",
    images: null,
    video: null,
    province: "",
    district: "",
    ward: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    // Dữ liệu tỉnh, quận từ file JSON
    const fetchProvinces = async () => {
      // Đây là dữ liệu mô phỏng từ file JSON của bạn
      const data = [
        {
          Code: "01",
          FullName: "Thành phố Hà Nội",
          District: [
            {
              Code: "001",
              FullName: "Quận Ba Đình",
              Ward: [
                { Code: "00001", FullName: "Phường Phúc Xá" },
                { Code: "00004", FullName: "Phường Trúc Bạch" },
                { Code: "00006", FullName: "Phường Vĩnh Phúc" },
              ],
            },
            // Có thể thêm các quận khác ở đây
          ],
        },
        // Có thể thêm các tỉnh khác ở đây
      ];

      setProvinces(data);
    };

    fetchProvinces();
  }, []);
  const getAddress = (data) => {
    const parts = [];
    if (data.detail) parts.push(data.detail);
    if (data.ward_name) parts.push(data.ward_name);
    if (data.district_name) parts.push(data.district_name);
    if (data.province_name) parts.push(data.province_name);
    return parts.join(", ");
  };
  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    setFormData({
      ...formData,
      province: provinceCode,
      district: "",
      ward: "",
    });

    // Tìm quận tương ứng với tỉnh đã chọn
    const selectedProvince = provinces.find(
      (province) => province.Code === provinceCode
    );
    setDistricts(selectedProvince ? selectedProvince.District : []);
    setWards([]);
  };
  const categories = [
    { id: "1", name: "Nhà ở" },
    { id: "2", name: "Căn hộ" },
    { id: "3", name: "Biệt thự" },
    { id: "4", name: "Nhà đất" },
    { id: "5", name: "Phòng trọ" },
  ];

  useEffect(() => {
    const fetchProvinces = async () => {
      const data = [
        {
          Code: "01",
          FullName: "Thành phố Hà Nội",
          District: [
            {
              Code: "001",
              FullName: "Quận Ba Đình",
              Ward: [
                { Code: "00001", FullName: "Phường Phúc Xá" },
                { Code: "00004", FullName: "Phường Trúc Bạch" },
                { Code: "00006", FullName: "Phường Vĩnh Phúc" },
              ],
            },
          ],
        },
      ];

      setProvinces(data);
    };

    fetchProvinces();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData({ ...formData, category });
  };
  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    setFormData({ ...formData, district: districtCode, ward: "" });

    // Tìm phường tương ứng với quận đã chọn
    const selectedDistrict = districts.find(
      (district) => district.Code === districtCode
    );
    setWards(selectedDistrict ? selectedDistrict.Ward : []);
  };

  const handleWardChange = (e) => {
    const ward = e.target.value;
    setFormData({ ...formData, ward });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // handle form submission
  };
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setFormData({
      ...formData,
      name: userData.username,
      phone: "",
    });
  };

  return (
    <div className="flex flex-col">
      <div className="w-full sticky top-0 bg-white z-10">
        <Navigator />
      </div>
      <div className="flex ">
        <div className="border flex flex-col gap-4 justify-start items-center">
          <div className="w-full sticky top-16 bg-white z-10 shadow-md">
            {" "}
            <UserBar />
          </div>
        </div>
        <div className="flex flex-col mt-4 w-[1200px] mx-auto pl-8 pr-8 bg-gray-50 rounded shadow-lg">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Trang chủ
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <a
                    href="#"
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                    Quản lý
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    Đăng tin mới
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <h2 className="text-4xl mt-4 mb-4 w-1100">Đăng tin mới</h2>
          <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md">
            <div className="flex">
              <div className="py-1">
                <svg
                  className="fill-current h-6 w-6 text-green-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Lưu ý</p>
                <p className="text-sm">
                  Nếu bạn đã từng đăng tin trên Phongtro123.com, hãy sử dụng
                  chức năng ĐẶT TIN / GIA HẠN / NÂNG CẤP VIP trong mục QUẢN LÝ
                  TIN ĐĂNG để làm mới, đẩy tin lên cao thay vì đăng tin mới. Tin
                  đăng trùng nhau sẽ không được duyệt.
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-[70%] pr-8  ">
              <h1 className="text-2xl font-bold pt-6 mb-4 w-1100">
                Địa chỉ cho thuê
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-2">
                  <div className="mb-4 w-1/3 px-2">
                    <label className="block text-gray-700 font-semibold">
                      Chọn tỉnh:
                    </label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={(e) => {
                        handleProvinceChange(e);
                        const selectedProvince = provinces.find(
                          (province) => province.Code === e.target.value
                        );
                        setFormData((prevData) => ({
                          ...prevData,
                          province_name: selectedProvince
                            ? selectedProvince.FullName
                            : "",
                        }));
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="">-- Chọn tỉnh --</option>
                      {provinces.map((province) => (
                        <option key={province.Code} value={province.Code}>
                          {province.FullName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4 w-1/3 px-2">
                    <label className="block text-gray-700 font-semibold">
                      Chọn huyện:
                    </label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={(e) => {
                        handleDistrictChange(e);
                        const selectedDistrict = districts.find(
                          (district) => district.Code === e.target.value
                        );
                        setFormData((prevData) => ({
                          ...prevData,
                          district_name: selectedDistrict
                            ? selectedDistrict.FullName
                            : "",
                        }));
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="">-- Chọn huyện --</option>
                      {districts.map((district) => (
                        <option key={district.Code} value={district.Code}>
                          {district.FullName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4 w-1/3 px-2">
                    <label className="block text-gray-700 font-semibold">
                      Chọn phường:
                    </label>
                    <select
                      name="ward"
                      value={formData.ward}
                      onChange={(e) => {
                        handleWardChange(e);
                        const selectedWard = wards.find(
                          (ward) => ward.Code === e.target.value
                        );
                        setFormData((prevData) => ({
                          ...prevData,
                          ward_name: selectedWard ? selectedWard.FullName : "",
                        }));
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="">-- Chọn phường --</option>
                      {wards.map((ward) => (
                        <option key={ward.Code} value={ward.Code}>
                          {ward.FullName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4 w-1/2 px-2">
                    <label className="block text-gray-700 font-semibold">
                      Địa chỉ chi tiết:
                    </label>
                    <input
                      type="text"
                      name="detail"
                      value={formData.detail} // Liên kết với formData.detail
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          detail: e.target.value, // Cập nhật địa chỉ chi tiết
                        }))
                      }
                      className="w-full p-2 border rounded mt-1"
                      placeholder="Nhập địa chỉ chi tiết"
                    />
                  </div>
                  <div className="mb-4 w-full px-2">
                    <label className="block  text-gray-700 font-semibold">
                      Địa chỉ cho thuê:
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={getAddress(formData)}
                      className="w-full bg-gray-200 p-2 border rounded mt-1"
                      placeholder="Nhập địa chỉ"
                      disabled
                    />
                  </div>
                </div>
                <h1 className="text-2xl font-bold mb-4 w-1100">
                  Thông tin mô tả
                </h1>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold">
                    Danh mục:
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleCategoryChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5">
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold">
                    Tiêu đề:
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1"
                    placeholder="Nhập tiêu đề"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold">
                    Mô tả:
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1"
                    rows="4"
                    placeholder="Mô tả chi tiết"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-2">
                    Tên liên hệ:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-bold mb-2">
                    Điện thoại:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    disabled
                  />
                </div>
                <label
                  htmlFor="rent"
                  className="block text-gray-700 font-bold mb-2">
                  Giá cho thuê:
                </label>
                <div className="mb-4 flex w-1/2">
                  <div className="flex-1 w-1">
                    <input
                      type="text"
                      id="rent"
                      name="rent"
                      value={formData.rent}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded  py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-r-md border-gray-300 border-l-0 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <span className="text-gray-500">đồng/tháng</span>
                  </span>
                </div>
                <label
                  htmlFor="area"
                  className="block text-gray-700 font-bold mb-2">
                  Diện tích:
                </label>
                <div className="flex mb-4 w-1/2">
                  <div className="flex-1 w-1">
                    <input
                      type="number"
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded-l-md w-1/2 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-r-md border-gray-300 border-l-0 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <span className="text-gray-500">
                      m<sup>2</sup>
                    </span>
                  </span>
                </div>
                <div className="mb-4">
                  <h1 className="text-2xl font-bold mb-4 w-1100">Hình ảnh</h1>
                  <div className="mb-2">
                    <div className="relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                      <div className="absolute">
                        <div className="flex flex-col items-center">
                          <MdOutlineCloudUpload className="text-gray-200 w-12 h-12" />
                          <span className="block text-gray-400 font-normal">
                            Attach you files here
                          </span>
                          <span className="block text-gray-400 font-normal">
                            or
                          </span>
                          <span className="block text-blue-400 font-normal">
                            Browse files
                          </span>
                        </div>
                      </div>
                      <input
                        type="file"
                        className="h-full w-full opacity-0"
                        name=""
                      />
                    </div>
                    <div className="flex justify-between items-center text-gray-400">
                      <span>Accepted file type:.doc only</span>
                      <span className="flex items-center ">
                        <i className="fa fa-lock mr-1"></i> secure
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white p-3 rounded mt-4 hover:bg-green-700">
                  Tạo tin đăng
                </button>
              </form>
            </div>
            <div className="w-[30%] flex ">
              <div className="">
                <p className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 p-4 text-yellow-700">
                  <b>Lưu ý khi đăng tin:</b>
                  <ul className="list-disc pl-6">
                    <li>Nội dung phải viết bằng tiếng Việt có dấu.</li>
                    <li>Tiêu đề tin không dài quá 100 ký tự.</li>
                    <li>
                      Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng
                      có hiệu quả hơn.
                    </li>
                    <li>
                      Để tăng gỡ tin, cẩn và tin rao được nhiều người quan tâm
                      hơn, hãy sửa vị trí tin rao của bạn trên bản đồ cách keo
                      icon tới đúng vị trí của tin rao.
                    </li>
                    <li>
                      Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều
                      lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao
                      dịch nhanh chóng!
                    </li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
