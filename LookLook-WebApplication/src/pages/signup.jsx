import React from "react";
import Header from "../components/header";
import styles from "./signup.module.css";
import { Link } from "react-router-dom";



function SignUp() {

  return (
    <>
      <Header />
      <div className={styles.signupSection}>
        <div className={styles.signupHeader}>
          <h>회원가입</h>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userInfoHeader}>
            <h>회원정보 입력</h>
          </div>
          <div className={styles.userInfoTags}>
            이름<br/>아이디<br/><br/>비밀번호<br/>비밀번호확인
            <br/><br/>성별<br/>휴대전화<br/>주소<br/><br/><br/>이메일
          </div>
          <div className={styles.userInfoWrap}>
            <div>
              <input />
            </div>
            <div>
              <input className={styles.shortInput}/><button>중복 확인</button>
            </div>
            <div>
              <h>영문 포함, 숫자 포함, 8~16자 이내</h>
            </div>
            <div>
              <input />
            </div>
            <div>
              <input />
            </div>
            <div>
              <h>비밀번호를 입력해주세요.</h>
            </div>
            <div>
              <input type="radio" id="male" value="male" 
              className={styles.radioInput} />남
              <input type="radio" id="female" value="female"
              className={styles.radioInput} style={{marginLeft:'15px'}}/>여
            </div>
            <div>
              <input />
            </div>
            <div>
              <input className={styles.shortInput}/><button>우편번호</button>
            </div>
            <div>
              <input />
            </div>
            <div>
              <input />
            </div>
            <div>
              <input />
            </div>
          </div>

          <div className={styles.signupBtnWrap}>
            <Link to="/signupResult">
              <button style={{backgroundColor:'rgb(41, 55, 117)', color:'white'}}>회원가입</button>
            </Link>
            <Link to="/">
              <button>회원가입 취소</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignUp;