import React, {useEffect, useState} from "react";
import styles from "./modUserModal.module.css";

function ModUserModal({muid, muserName, maddress, memail, isOpen, closeModal}) {




    const [inputName, seInputName] = useState(muserName);
    const [inputAddr, seInputAddr] = useState(maddress);
    const [inputEmail, seInputEmail] = useState(memail);

    const nameChangeHandler = (e) => {
        seInputName(e.target.value);
    }
    const addrChangeHandler = (e) => {
        seInputAddr(e.target.value);
    }
    const emailChangeHandler = (e) => {
        seInputEmail(e.target.value);
    }

    // const [firstInfo, setFirstInfo] = useState([]);

    useEffect(() => {
        console.log(`모달(user${muid}) 로드: `, muserName, maddress, memail);
    }, []);

    const modSubmit = (e) => {
        const accessToken = sessionStorage.getItem("accessToken");
        e.preventDefault();

        fetch(`/admin/user-update/${muid}`, {
            method: 'post',
            headers: {
                "Content-Type":"application/json",
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                userName: inputName,
                address: inputAddr,
                email: inputEmail,
            })
        })
            .then(res => {
                console.log(res);
                alert("사용자 정보 수정이 완료되었습니다.");
                closeModal();
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
                                <div className={styles.tags}>이름</div>
                                <div className={styles.inputs}>
                                    <input onChange={nameChangeHandler} maxLength="20"
                                           defaultValue={inputName}/>
                                </div>
                            </div>
                            <div className={styles.wrap}>
                                <div className={styles.tags}>주소</div>
                                <div className={styles.inputs}>
                                    <input onChange={addrChangeHandler} defaultValue={inputAddr}/>
                                </div>
                            </div>
                            <div className={styles.wrap}>
                                <div className={styles.tags}>이메일</div>
                                <div className={styles.inputs}>
                                    <input onChange={emailChangeHandler} defaultValue={inputEmail} />
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