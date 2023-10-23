import React, { useState } from "react";
import Header from "../components/header";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {

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
      if(role==="0") {
        navigate("/");
      } else if(role==="1") {
        alert("판매자 페이지로 이동");
      } else {
        navigate("/admin/userManage");
      }
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
          <div className={styles.roleWrap}>
            {role==="0" 
            ? <button style={{color:'rgb(0, 102, 255)', border:'1px solid rgb(0, 102, 255)'}}>구매자</button>
            : <button onClick={role0Change}>구매자</button>
            }
            {role==="1" 
            ? <button style={{color:'rgb(0, 102, 255)', border:'1px solid rgb(0, 102, 255)'}}>판매자</button>
            : <button onClick={role1Change}>판매자</button>
            }
            {role==="2" 
            ? <button style={{color:'rgb(0, 102, 255)', border:'1px solid rgb(0, 102, 255)'}}>관리자</button>
            : <button onClick={role2Change}>관리자</button>
            }
          </div>
          <span>로그인</span>


          <form onSubmit={submitHandler}>
            <input onChange={uIDChange} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$]{8,16}$"
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