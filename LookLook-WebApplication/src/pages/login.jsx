import React from "react";
import Header from "../components/header";
import styles from "./login.module.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <Header />
      <div className={styles.loginSection}>
        <div className={styles.idInputWrap}>
          <span>로그인</span>
          <input placeholder="아이디" />
          <input placeholder="비밀번호" />
          <Link to="/">
            <button className={styles.loginBtn}>
              로그인
            </button>
          </Link>
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