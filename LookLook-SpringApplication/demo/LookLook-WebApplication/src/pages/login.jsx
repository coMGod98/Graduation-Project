import React, {useEffect, useState} from "react";
import Header from "../components/header";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {

  const accessToken = sessionStorage.getItem("accessToken");

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


  useEffect(() => {

  }, [])

  // 로그인 submit 버튼 입력 처리
  const submitHandler = (e) => {
    e.preventDefault();
    if(inputID === "" || inputPW === "") {
      alert("ID 및 비밀번호를 입력해주세요!");
    } else if (inputID.length < 8) {
      alert("아이디는 8~16자 이내로 입력해주세요!");
    } else {





      fetch('/login', {
        method: 'post',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          userId: inputID,
          password: inputPW
        })
      })
          .then(res => res.json())
          .then(res => {
            const accessToken = res.accessToken; // accessToken 추출

            if (res.accessToken === undefined) {
              alert("아이디 및 비밀번호를 다시 확인해주세요.");
              return null;
            } else {
              sessionStorage.setItem('accessToken', accessToken);

              console.log("세션스토리지에 토큰 저장: ", accessToken);
              sessionStorage.setItem("uid", res.uid);

              return fetch('/admin_chk', {
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                },
              });
            }

          })
          .then(res => res.json())
          .then((res) => {
            const adminChk = res.admin_chk;
            const accessToken = sessionStorage.getItem('accessToken');

            // 세 번째 요청 (GET /admin 또는 GET /main)
            adminChk ? navigate("/admin/userManage") : navigate("/");
          })
          .catch((error) => {
            console.error('오류:', error);
          });

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
                <img onClick={handlePasswordType}
                     src={require("../images/eye_button.png")} alt="pwHide"/>
                {passwordType.type === "password"
                    ? <h1 onClick={handlePasswordType}>비밀번호 보기</h1>
                    : <h1 onClick={handlePasswordType}>비밀번호 숨기기</h1>
                }
              </div>
              <button style={{border:'0'}} type="submit" className={styles.loginBtn}>
                로그인
              </button>
            </form>


            <Link to="/signup">
              <button style={{border:'0'}} className={styles.signupBtn}>
                회원가입
              </button>
            </Link>
          </div>
        </div>
      </>
  );
}
export default Login;