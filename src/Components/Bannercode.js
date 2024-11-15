import React, { useState } from "react";
import styles from './Bannercode.module.css';
import logo from '../img/logo.png';
import sing from '../img/sing.png';
import text from '../img/text.png';

function Bannercode() {
    const [code1, setCode1] = useState(generateCode());
    const [code2, setCode2] = useState(generateCode());
    const [code3, setCode3] = useState(generateCode());
    const [copiedCode, setCopiedCode] = useState(null); // สถานะการคัดลอก

    function generateCode() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        let result = "";
        
        for (let i = 0; i < 6; i++) {
            result += letters.charAt(Math.floor(Math.random() * letters.length));
            result += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        return result;
    }

    function copyCode(code) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(code)
                .then(() => {
                    setCopiedCode(code); // ตั้งค่าสถานะการคัดลอก
                })
                .catch(() => {
                    alert("ไม่สามารถคัดลอกโค้ดได้");
                });
        } else {
            alert("เบราว์เซอร์ของคุณไม่รองรับการคัดลอกไปยังคลิปบอร์ด");
        }
    }

    return (
        <div className={styles.background}>
            <div className={styles.content}>
                <h2 className={styles.title}>คุณมีสิทธิ์ได้รับโค้ด <br/><span className={styles.subtitle}>LINE MAN RIDE</span></h2>
                <img src={logo} className={styles.logo} alt="logo 1"/>
                <p className={styles.pretext}>กรุณาแคปหน้าจอ หรือ คัดลอกโค้ดไปใช้ได้เลย!</p>
            </div>

            {[{ code: code1, discount: "60%", max: "100" },
              { code: code2, discount: "25%", max: "50" },
              { code: code3, discount: "30%", max: "30" }]
              .map(({ code, discount, max }, index) => (
                <div key={index} className={styles.boxcode}>
                    <h2 className={styles.text}>LINEMAN: ECO</h2>
                    <h2 className={styles.textinfo}>ส่วนลด {discount} max to {max} THB</h2>
                    <h2 className={styles.textspan}>no minimum spend</h2>
                    <button
                        className={styles.codeButton}
                        onClick={() => copyCode(code)}
                    >
                        {code}
                    </button>
                    {copiedCode === code && <span className={styles.copied}>คัดลอกโค้ดสำเร็จ!</span>}
                </div>
            ))}

            <img src={sing} alt="" id={styles.sing} />
            <img src={text} alt="" id={styles.text}/>
        </div>
    );
}

export default Bannercode;
