import React, { useState , useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from './Bannercode.module.css';
import logo from '../img/logo.png';
import sing from '../img/sing.png';
import text from '../img/text.png';
import line from '../img/line.png';

function Bannercode({ response }) {
    const { profile, isLoading, error  } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!profile || !response) {
            navigate("/");
        }
    }, [profile, response, navigate]);

    const generateCode = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        let result = "";
        for (let i = 0; i < 6; i++) {
            result += letters.charAt(Math.floor(Math.random() * letters.length));
            result += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        return result;
    };

    const [codes] = useState([
        { code: response?.code_100 || "ไม่มีโค้ด", discount: "60%", max: "100" },
        { code: response?.code_50 || "ไม่มีโค้ด", discount: "25%", max: "50" },
        { code: response?.code_bike || "ไม่มีโค้ด", discount: "30%", max: "30" }
    ]);

    const [copiedStates, setCopiedStates] = useState({});

    const handleCopyClick = (codeValue) => {

        const textarea = document.createElement('textarea');
        textarea.value = codeValue;
        document.body.appendChild(textarea);
        
        try {
        
            textarea.select();
            document.execCommand('copy');
            
            
            setCopiedStates(prev => ({
                ...prev,
                [codeValue]: true
            }));

           
            setTimeout(() => {
                setCopiedStates(prev => ({
                    ...prev,
                    [codeValue]: false
                }));
            }, 2000);

        } catch (err) {
            console.error('Failed to copy:', err);
            alert('ไม่สามารถคัดลอกโค้ดได้');
        } finally {
        
            document.body.removeChild(textarea);
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.content}>
                <h2 className={styles.title}>
                    คุณมีสิทธิ์ได้รับโค้ด <br/>
                    <img src={line} className={styles.subtitle} alt="LINE MAN RIDE" />
                </h2>
                <img src={logo} className={styles.logo} alt="logo 1"/>
                <p className={styles.pretext}>กรุณาแคปหน้าจอ หรือ คัดลอกโค้ดไปใช้ได้เลย!</p>
            </div>

            {codes.map((item, index) => (
                <div key={index} className={styles.boxcode}>
                    <h2 className={styles.text}>LINEMAN: ECO</h2>
                    <h2 className={styles.textinfo}>
                        ส่วนลด {item.discount} max to {item.max} THB
                    </h2>
                    <h2 className={styles.textspan}>no minimum spend</h2>
                    <button
                        onClick={() => handleCopyClick(item.code)}
                        className={`${styles.codeButton} ${copiedStates[item.code] ? styles.copied : ''}`}
                    >
                        {item.code}
                    </button>
                    {copiedStates[item.code] && (
                        <span className={styles.copied}>คัดลอกโค้ดสำเร็จ!</span>
                    )}
                </div>
            ))}
            <p className={styles.pretext}>
                หมายเหตุ :
                <ul>
                    <li>โค้ดส่วนลดจะเด้งขึ้นมาเพียง 1 ครั้ง หลังปิดหน้าจอจะไม่สามารถนำกลับมาใช้ได้อีก</li>
                    <li>กรุณาบันทึกหน้าจอหรือคัดลอกไปใช้โค้ดได้ทันที</li>
                    <li>โค้ดสามารถใช้งานได้ถึง วันที่ 31 มกราคม 2568</li>
                </ul>
            </p>

            <img src={sing} alt="" id={styles.sing} />
            <img src={text} alt="" id={styles.text}/>
        </div>
    );
}

export default Bannercode;