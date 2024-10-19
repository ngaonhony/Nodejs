import React from 'react';
import './ProfileCard.css'; // Import CSS

function Nguoidang() {
  return (
    <div className="card">
      <div className="avatar"></div>
      <h2 className="name">Chị Giang</h2>
      <p className="status">Đang hoạt động</p>
      <button className="phoneButton">0328837249</button>
      <button className="zaloButton">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Zalo_logo_%282021%29.svg/1200px-Zalo_logo_%282021%29.svg.png"
          alt="Zalo"
          className="zaloIcon"
        />
        Nhắn Zalo
      </button>
      <button className="favoriteButton">Yêu thích</button>
    </div>
  );
}

export default Nguoidang;