import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Banner.module.css';
import logo from '../img/logo.png';
import sing from '../img/sing.png';
import text from '../img/text.png';

function Banner() {
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    if ((/^0[0-9]*$/.test(input) || input === "") && input.length <= 10) {
      setPhone(input);
    }
  };

  const handleClick = () => {
    if (phone.length < 10) {
      setIsAlertModalOpen(true);
      return;
    }
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
      navigate('/Linemanride');
    }, 3000);
  };

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          ลงทะเบียนรับโค้ด <span className={styles.subtitle}>LINE MAN RIDE</span>
        </h2>
        <img src={logo} className={styles.logo} alt="logo 1" />
        <p className={styles.pretext}>กรุณาแคปหน้าจอ หรือ คัดลอดโค้ดไปใช้ได้เลย!</p>

        <h2 className={styles.text}>กรุณากรอกเบอร์โทร</h2>
        <div>
          <input
            className={styles.input}
            type="text"
            placeholder=""
            value={phone}
            onChange={handlePhoneChange}
            maxLength={10}
          />
        </div>

        <button className={styles.playButton} onClick={handleClick}>
          ยืนยัน
        </button>
        
        <p className={styles.pretext}>"หมายเหตุ : สามารถรับสิทธิ์ได้ 1 เครื่อง/1 วัน เท่านั้น"</p>
      </div>
      
      <img src={sing} alt="" id={styles.sing} />
      <img src={text} alt="" id={styles.text} />

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.loadingIcon}></div>
            <p>กำลังดำเนินการ</p>
          </div>
        </div>
      )}

      {isAlertModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>กรุณากรอกหมายเลขโทรศัพท์ให้ครบถ้วน</p>
            <button className={styles.closedButton} onClick={() => setIsAlertModalOpen(false)}>ปิด</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner;
