import React, {useEffect, useState} from "react";
import styles from "./modUserModal.module.css";

function ModUserModal({muid, memail, mphoneNumber, maddress, isOpen, closeModal}) {

    const [inputEmail, seInputEmail] = useState(memail);
    const [inputNumber, seInputNumber] = useState(mphoneNumber);
    const [inputAddr, seInputAddr] = useState(maddress);

    const emailChangeHandler = (e) => {
        seInputEmail(e.target.value);
    }
    const phoneChangeHandler = (e) => {
        seInputNumber(e.target.value);
    }
    const addrChangeHandler = (e) => {
        seInputAddr(e.target.value);
    }


    // const [firstInfo, setFirstInfo] = useState([]);

    useEffect(() => {
        console.log(`모달(user${muid}) 로드: `, memail, mphoneNumber, maddress);
    }, []);

    const modSubmit = (e) => {
        e.preventDefault();
        const accessToken = sessionStorage.getItem("accessToken");
        fetch(`/admin/user-update/${muid}`, {
            method: 'post',
            headers: {
                "Content-Type":"application/json",
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                email: inputEmail,
                phoneNumber: inputNumber,
                address: inputAddr,
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                alert("사용자 정보 수정이 완료되었습니다.");
                closeModal();
                window.location.reload();
            })
            .catch(err => {
                console.log("오류: ", err);
            })

    }
    return (
        <>
            <div className={styles.back} style={{display:isOpen ? "block" : "none"}}>
                <div className={styles.front}>

                    <form onSubmit={modSubmit}>
                        <div className={styles.section}>
                            <div className={styles.wrap}>
                                <div className={styles.tags}>이메일</div>
                                <div className={styles.inputs}>
                                    <input onChange={emailChangeHandler} defaultValue={inputEmail} />
                                </div>
                            </div>
                            <div className={styles.wrap}>
                                <div className={styles.tags}>휴대전화</div>
                                <div className={styles.inputs}>
                                    <input onChange={phoneChangeHandler} defaultValue={inputNumber}/>
                                </div>
                            </div>
                            <div className={styles.wrap}>
                                <div className={styles.tags}>주소</div>
                                <div className={styles.inputs}>
                                    <input onChange={addrChangeHandler} defaultValue={inputAddr}/>
                                </div>
                            </div>
                        </div>



                        <div className={styles.btnWrap}>
                            <button type="submit">수정</button>
                            <button type="button" onClick={closeModal}>취소</button>
                        </div>
                    </form>


                </div>
            </div>
        </>
    );
}
export default ModUserModal;