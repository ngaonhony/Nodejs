import React, { useState } from 'react';
import './Login.css';
import Header from './Header';
import Navigator from './Navigator';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className='w-full flex flex-col items-center h-full border '>
    <Header />
    <Navigator />
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <div className="social-login">
        <button className="facebook-login">Đăng nhập bằng tài khoản Facebook</button>
        <button className="google-login">Đăng nhập bằng tài khoản Google</button>
      </div>
      <div className="separator">Hoặc</div>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email*</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Mật khẩu*</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Ghi nhớ mật khẩu</label>
        </div>
        <a href="#" className="forgot-password">Quên mật khẩu?</a>
        <button type="submit" className="login-button">Đăng nhập</button>
      </form>
      <div className="register-link">
        <p>Chưa có tài khoản?</p>
        <a href="#">Đăng ký tài khoản</a>
      </div>
    </div>
    </div>
  );
}

export default Login;