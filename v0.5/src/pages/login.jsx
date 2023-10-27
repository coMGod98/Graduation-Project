import React, { useState } from "react";
import Header from "../components/header";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  //입력 아이디 값
  const[inputID, setInputID] = useState("");
  const inputIDChange = (e) => {
    setInputID(e.target.value);
  }
  //입력 비밀번호 값
  const [inputPW, setInputPW] = useState("");
  const passwdChange = (e) => {
    setInputPW(e.target.value);
  }

  // role 구매자:0 판매자:1 관리자:2
  const [role, setRole] = useState("0");
  const role0Change = () => {
    setRole("0");
  }
  const role1Change = () => {
    setRole("1");
  }
  const role2Change = () => {
    setRole("2");
  }

  // 로그인 submit 버튼 입력 처리
  const submitHandler = (e) => {
    e.preventDefault();
    if(inputID === "" || inputPW === "") {
      alert("ID 및 비밀번호를 입력해주세요!");
    } else if (inputID.length < 8) {
      alert("아이디는 8~16자 이내로 입력해주세요!");
    } else {
      const axios = require('axios'); // Node.js 환경에서 사용하는 경우


      // 첫 번째 요청 (POST /login)
      axios.post('/login')
        .then((firstResponse) => {
          if (!firstResponse.data) {
            throw new Error('First request failed');
          }
          const accessToken = firstResponse.data.accessToken; // accessToken 추출
          sessionStorage.setItem('accessToken', accessToken); // localStorage에 저장
      
          // 두 번째 요청 (GET /admin_chk)
          return axios.get('/admin_chk', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });
        })
        .then((secondResponse) => {
          if (!secondResponse.data) {
            throw new Error('Second request failed');
          }
          const adminChk = secondResponse.data.admin_chk;
          const accessToken = sessionStorage.getItem('accessToken');
      
          // 세 번째 요청 (GET /admin 또는 GET /main)
          const url = adminChk ? '/admin' : '/main';
          return axios.get(url, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });
        })
        .then((thirdResponse) => {
          // 세 번째 응답 데이터를 처리
          console.log(thirdResponse.data);
        })
        .catch((error) => {
          // 오류 처리
          console.error('오류:', error);
        });

        // const inputToken = "";

        // fetch('/login', {
        //   method: 'post',
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     userId: inputID,
        //     password: inputID,
        //   })
        //   .then((response) => response.json())
        //   .then((result) => {
        //     console.log("로그인 성공", result);
        //     inputToken = result;
        //   })
        // });

        // fetch('/')
        // .then((response) => {
        //   response.text().then((text) => {
        //     console.log("text안의 데이터: " + text);
        //   })
        // })
    }
  }

  //패스워드 숨김
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

          <form onSubmit={submitHandler}>
            <input onChange={inputIDChange} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$]{8,16}$"
            type="text" name="id" placeholder="아이디" 
            minLength="8" maxLength="16" required/>
            <input onChange={passwdChange} type={passwordType.type}
             name="pw" placeholder="비밀번호" maxLength="20" required/>

            <div className={styles.hidePwWrap}>
            {console.log(inputID)}
            {console.log(inputPW)}
              <img onClick={handlePasswordType}
              src={require("../images/eye_button.png")} alt="pwHide"/>
              {passwordType.type === "password" 
              ? <h onClick={handlePasswordType}>비밀번호 보기</h>
              : <h onClick={handlePasswordType}>비밀번호 숨기기</h>
              }
            </div>
            <button type="submit" className={styles.loginBtn}>
              로그인
            </button>
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