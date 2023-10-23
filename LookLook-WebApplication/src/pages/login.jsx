import React, { useState } from "react";
import Header from "../components/header";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const[uID, setUID] = useState("");
  const uIDChange = (e) => {
    setUID(e.target.value);
  }
  const [passwd, setPasswd] = useState("");
  const passwdChange = (e) => {
    setPasswd(e.target.value);
  }

  // 로그인 submit 버튼 입력 처리
  const submitHandler = (e) => {
    e.preventDefault();
    if(uID === "" || passwd === "") {
      alert("ID 및 비밀번호를 입력해주세요!");
    } else if (uID.length < 8) {
      alert("아이디는 8~16자 이내로 입력해주세요!");
    } else {
      console.log(uID, passwd);
      navigate("/");
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

            <input onChange={uIDChange}
            type="text" name="id" placeholder="아이디" 
            minLength="8" maxLength="16" required/>
            <input onChange={passwdChange} type={passwordType.type}
             name="pw" placeholder="비밀번호" maxLength="20" required/>

            <div className={styles.hidePwWrap}>
            {console.log(uID)}
            {console.log(passwd)}
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