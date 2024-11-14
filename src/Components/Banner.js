import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Banner.module.css';
import logo from '../img/logo.png';
import sing from '../img/sing.png';
import text from '../img/text.png';

function Banner({ scrollToPatterns }) {  
    const navigate = useNavigate();

    const handleClick = (path) => {
      console.log(`Attempting to navigate to: ${path}`);
      navigate(path);
    };
    
    return (
        <div className={styles.background}>
            <div className={styles.content}>
            <h2 className={styles.title}>ลงทะเบียนรับโค้ด <span className={styles.subtitle}>LINE MAN RIDE</span></h2>
            <img  src={logo}  className={styles.logo} alt="logo 1"/>
            <p className={styles.pretext}>กรุณาแคปหน้าจอ หรือ คัดลอดโค้ดไปใช้ได้เลย!</p>  

            <h2 className={styles.text}>กรุณากรอกเบอร์โทร</h2>
            <div>
            <input className={styles.input} type="text" placeholder="" />
            </div>
            <Link to="/Linemanride" onClick={() => handleClick('/Linemanride')}>
                <button className={styles.playButton} onClick={scrollToPatterns}>
                    ยืนยัน
                </button>
            </Link>
                <p className={styles.pretext}>"หมายเหตุ : สามารถรับสิทธิ์ได้ 1 เครื่อง/1 วัน เท่านั้น"</p>
            </div>
            <img src={sing} alt="" id={styles.sing} />
            <img src={text} alt="" id={styles.text}/>
        </div>
    );
}

export default Banner;
