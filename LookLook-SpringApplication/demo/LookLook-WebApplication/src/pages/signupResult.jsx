import React from "react";
import Header from "../components/header";
import styles from "./signupResult.module.css";
import { Link } from "react-router-dom";

function SignUpResult() {
  return (
      <>
        <Header />
        <div className={styles.signupResultSection}>
          <div className={styles.signupResultWrap}>
            <div>
              <img src={require("../images/check.png")} alt="check"/>
            </div>
            <h1>회원가입이 완료되었습니다.</h1><br></br>
            <h3>회원님은 모든 룩룩 서비스를 이용하실 수 있습니다.</h3>
            <div>
              <Link to="/login">
                <button
                    style={{backgroundColor: 'rgb(41, 55, 117)',
                      color: 'white'}}>
                  로그인</button>
              </Link>
              <Link to="/">
                <button style={{backgroundColor:'white'}}>홈으로</button>
              </Link>
            </div>

          </div>
        </div>
      </>
  );
}
export default SignUpResult;