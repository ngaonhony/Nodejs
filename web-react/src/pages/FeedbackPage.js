import React, { useState } from 'react';
import Header from '../components/Header';
import { Link } from "react-router-dom";
import Navigator from '../components/Navigator';
import Footer from "../components/Footer";
import { createFeedback } from '../services/feedbackService';
const mockData = {
  contactInfo: {
    message: "Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn PhongTro123.Com.",
    phone: "0917 686 101",
    email: "cskh.phongtro123@gmail.com",
    zalo: "0917 686 101",
    viber: "0917 686 101",
    address: "Căn 02.34, Lầu 2, Tháp 3, The Sun Avenue, Số 28 Mai Chí Thọ, Phường An Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam."
  },
  contactForm: {
    name: '',
    phone: '',
    comment: ''
  }
};

const FeedbackPage = () => {
  const [formData, setFormData] = useState(mockData.contactForm);
  const [error, setError] = useState(null);
  const [successComment, setSuccessComment] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the createFeedback function with the form data
      await createFeedback(formData);
      setSuccessComment('Cảm ơn bạn đã gửi phản hồi!');
      setFormData(mockData.contactForm); 
      setTimeout(() => {
        setSuccessComment('');
      }, 5000);
    } catch (error) {
      setError('Có lỗi xảy ra khi gửi phản hồi: ' + error.message);
    }
  };
  return (
    <div className=' bg-gray-100'>
      <div className="w-full flex flex-col items-center h-full border">
        <Header />
      </div>
      <Navigator />
      <div className="max-w-[1100px] mx-auto p-5 page_lien_he">
        <div id="breadcrumb" className="mb-4">
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link
                  to="/"
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
                </Link>
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
                    Liên hệ
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <header className="page-header">
          <h1 className="text-3xl font-bold">Liên hệ với chúng tôi</h1>
        </header>

        <div className="flex flex-wrap mt-8">
          <div className="contact-left w-1/2 pr-2">
          <section className="section section-contact-info bg-gradient-to-r from-[#0039e4] to-[#04dbf1] rounded-[50px] text-white text-[1.2rem] p-6 h-full">
  <div className="section-header mb-2">
    <span className="section-title text-xl font-semibold">Thông tin liên hệ</span>
  </div>
  <div className="section-content leading-[2]">
    <p>{mockData.contactInfo.message}</p>
    <p><strong>Điện thoại:</strong> {mockData.contactInfo.phone}</p>
    <p><strong>Email:</strong> {mockData.contactInfo.email}</p>
    <p><strong>Zalo:</strong> {mockData.contactInfo.zalo}</p>
    <p><strong>Viber:</strong> {mockData.contactInfo.viber}</p>
    <p><strong>Địa chỉ:</strong> {mockData.contactInfo.address}</p>
  </div>
</section>
          </div>

          <div className="contact-right w-1/2 pl-2">
            <section className="section section-contact-form bg-white rounded-lg shadow-md p-6 h-full">
              <div className="section-header mb-2">
                <span className="section-title text-xl font-semibold">Liên hệ trực tuyến</span>
              </div>
              <div className="section-content">
              {successComment && <p className="text-green-500">{successComment}</p>}
              {error && <p className="text-red-500">{error}</p>}
                <form method="POST" className="form-access" onSubmit={handleSubmit}>
                  <div className="form-group mb-4">
                    <label className="label-title">Họ tên của bạn</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-control w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="label-title">Số điện thoại</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="form-control w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="label-title">Nội dung</label>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      required
                      className="form-control w-full p-2 border border-gray-300 rounded"
                      rows="4"
                    ></textarea>
                  </div>
                  <input type="hidden" name="from_url" value="https://phongtro123.com/tinh-thanh/ho-chi-minh/cho-thue-phong-tro-chinh-chu-ban-cong-thang-may-gia-re.html" />
                  <div className="form-group">
                    <button type="submit" className="btn w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                      Gửi liên hệ
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>

        <style>{`
          .page_lien_he .contact-left,
          .page_lien_he .contact-right {
            height: auto; /* Đảm bảo chiều cao tự động */
          }
        `}</style>
      </div>
      <Footer />
    </div>
  );
};

export default FeedbackPage;