import React from "react";
import styles from './Bannercode.module.css';
import logo from '../img/logo.png';
import sing from '../img/sing.png';
import text from '../img/text.png';

function Bannercode() {  

    
    return (
        <div className={styles.background}>
            <div className={styles.content}>
            <h2 className={styles.title}>คุณมีสิทธิ์ได้รับโค้ด <br/><span className={styles.subtitle}>LINE MAN RIDE</span></h2>
            <img  src={logo}  className={styles.logo} alt="logo 1"/>
            <p className={styles.pretext}>กรุณาแคปหน้าจอ หรือ คัดลอดโค้ดไปใช้ได้เลย!</p>  
            </div>
            <div className={styles.boxcode}>
                <h2 className={styles.text}>LINEMAN: ECO</h2>
                <h2 className={styles.textinfo}>ส่วนลด 60% max to 100 THB</h2>
                <h2 className={styles.textspan}>no minimum spend new user only</h2>
                <button className={styles.codeButton}>LMEMYZSK7LA</button>
            </div>
            <div className={styles.boxcode}>
                <h2 className={styles.text}>LINEMAN: ECO</h2>
                <h2 className={styles.textinfo}>ส่วนลด 25% max to 50 THB</h2>
                <h2 className={styles.textspan}>no minimum spend</h2>
                <button className={styles.codeButton}>LMEMYV8YVU7</button>
            </div>
            <div className={styles.boxcode}>
                <h2 className={styles.text}>LINEMAN: ECO</h2>
                <h2 className={styles.textinfo}>ส่วนลด 30% max to 30 THB</h2>
                <h2 className={styles.textspan}>no minimum spend new user only</h2>
                <button className={styles.codeButton}>LMEMY3CSSY1</button>
            </div>



            
            
            <img src={sing} alt="" id={styles.sing} />
            <img src={text} alt="" id={styles.text}/>
        </div>
    );
}

export default Bannercode;
