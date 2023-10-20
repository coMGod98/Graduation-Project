import React, { useState, useRef } from "react";
import Header from "../components/header";
import styles from "./login.module.css";
import { Link } from "react-router-dom";

function Login() {
  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false
  });

  const handlePasswordType = e => {
    setPasswordType(() => {
        if (!passwordType.visible) {
            return { type: 'text', visible: true };
        }
        return { type: 'password', visible: false };
    })
  } 

  return (
    <>
      <Header />
      <div className={styles.loginSection}>
        <div className={styles.idInputWrap}>
          <span>로그인</span>
          <form>
            <input type="text" name="id" placeholder="아이디" />
              <input type={passwordType.type} name="pw" placeholder="비밀번호" />
              <div className={styles.hidePwWrap}>
                <img onClick={handlePasswordType}
                src={require("../images/eye_button.png")} alt="pwHide"/>
                <h onClick={handlePasswordType}>비밀번호 숨기기</h>
              </div>
              
            <Link to="/">
              <button className={styles.loginBtn}>
                로그인
              </button>
            </Link>
          </form>
          <Link to="/signup">
            <button className={styles.signupBtn}>
              회원가입
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default Login;