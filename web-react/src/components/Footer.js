import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-gray-400 text-white py-6'>
            <div className='max-w-1100 mx-auto grid grid-cols-1 md:grid-cols-4 gap-6'>
                {/* Cột 1 */}
                <div>
                    <h2 className='text-lg font-bold'>Về Chúng Tôi</h2>
                    <p className='text-sm'>Mô tả về công ty của bạn ở đây. Thêm một đoạn ngắn về những gì bạn làm.</p>
                </div>
                {/* Cột 2 */}
                <div>
                    <h2 className='text-lg font-bold'>Liên Kết Nhanh</h2>
                    <ul className='list-none p-0'>
                        <li><a href="/privacy" className='text-sm hover:underline'>Chính Sách Bảo Mật</a></li>
                        <li><a href="/terms" className='text-sm hover:underline'>Điều Khoản Dịch Vụ</a></li>
                        <li><a href="/contact" className='text-sm hover:underline'>Liên Hệ</a></li>
                    </ul>
                </div>
                {/* Cột 3 */}
                <div>
                    <h2 className='text-lg font-bold'>Liên Hệ Với Chúng Tôi</h2>
                    <p className='text-sm'>Email: contact@yourcompany.com</p>
                    <p className='text-sm'>Điện thoại: (123) 456-7890</p>
                </div>
                {/* Cột 4 */}
                <div>
                    <h2 className='text-lg font-bold'>Theo Dõi Chúng Tôi</h2>
                    <div className='flex gap-4'>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-square"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className='text-center mt-4'>
                <p className='text-sm'>&copy; {new Date().getFullYear()} Tên Công Ty Của Bạn. Bảo lưu mọi quyền.</p>
            </div>
        </footer>
    );
};

export default Footer;
