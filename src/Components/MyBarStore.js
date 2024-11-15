import React from 'react';
import './MyBarStore.css';
import head from '../img/head.png';
import mylogo from '../img/mylogo.png';
import mrbar from '../img/mrbar.png';
import th from '../img/th.png';
import en from '../img/en.png';
import vr from '../img/vr.png';
import product from '../img/product.png';

const MyBarStore = () => {
  return (
    <div className="container">
      <div className="header">
        <img src={head} className="logohead" alt="Header" />
      </div>

      <h2 className="title">Welcome to</h2>
      <h2 className="title2">MY BAR STORE</h2>

      <div className="main-image">
        <div className="overlay">
            <img src={mylogo} alt="Logo" className="mylogo" />

            <p className="description">
              มาเล่นเกมและลุ้นรับ COINS<br />
              แลกไอเทมสุดพรีเมียมที่ไม่เหมือนใคร
              ไปกับ MY BAR STORE
            </p>


            <div class="button-container">
                <button class="glow-button">TAP TO START</button>
            </div>

          <img src={mrbar} alt="Avatar" className="avatar" />
        </div>
      </div>

      <div className="buttons-section">
        <div className="button-item">
          <img src={vr} alt="Virtual Website" />
          <h2>Virtual Website</h2>
          <img src={en} alt="btn"/>
        </div>
        <div className="button-item">
          <img src={product} alt="Exchange Coins" />
          <h2>แลก COINES</h2>
          <img src={th} alt="btn"/>
        </div>
      </div>
    </div>
  );
};

export default MyBarStore;
