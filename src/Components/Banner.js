import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collectCode, loginWithLine } from "./reducers/userSlice";
import { useNavigate } from "react-router-dom";
import styles from './Banner.module.css';
import line from '../img/line.png';
import logo from '../img/logo.png';
import sing from '../img/sing.png';
import text from '../img/text.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Banner() {
  const dispatch = useDispatch();
  const { profile, response, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (!profile) {
      dispatch(loginWithLine());
    }
  }, [dispatch, profile]);

  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isAlreadyRedeemedOpen, setIsAlreadyRedeemedOpen] = useState(false);
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

    if (!profile) {
      setIsModalOpen(false);
      console.log("โปรดเข้าสู่ระบบผ่าน Line ก่อนทำรายการ");
      return;
    }

    setIsModalOpen(true);
    dispatch(collectCode({ profile, phone }));
  };

  useEffect(() => {
    if (response) {
      if (response?.code === "ALREADY_REDEEM_TODAY") {
        setIsModalOpen(false);
        setPhone('');
        setIsAlreadyRedeemedOpen(true); // เปิด Modal สำหรับ "ALREADY_REDEEM_TODAY"
        return;
      }
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/Linemanride", { state: { response } });
      }, 3000);
    }
  }, [response, navigate]);
  
  if (!profile) {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.loadingIcon}></div>
          <p>กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          ลงทะเบียนรับโค้ด <img src={line} className={styles.subtitle} alt="LINE MAN RIDE" />
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

      {isAlreadyRedeemedOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
          <div className={styles.wrongIcon}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
            <p>ท่านได้ลงทะเบียนไปแล้ว</p>
            <button className={styles.closedButton} onClick={() => setIsAlreadyRedeemedOpen(false)}>
              ปิด
            </button>
          </div>
        </div>
      )}

      {isAlertModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
          <div className={styles.wrongIcon}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
            <p>กรุณากรอกหมายเลขโทรศัพท์ให้ครบถ้วน</p>
            <button className={styles.closedButton} onClick={() => setIsAlertModalOpen(false)}>ปิด</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner;
