import React, { useState } from "react";
import Header from "../components/header";
import styles from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from 'axios';

function SignUp() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    userName: "", userId: "", password: "", pwVer: "", gender: "",
    phoneNumber: "", address: "", email: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if(values.password != values.pwVer) {
      alert("비밀번호 확인이 일치하지 않습니다.");
    } else if(values.address === "") {
      console.log(values);
      alert("주소를 입력해주세요!");
    } else {

      fetch('/signup', {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(
            {
              userId: values.userId,
              userName: values.userName,
              password: values.password,
              sex: values.gender,
              phoneNumber: values.phoneNumber,
              address: values.address,
              email: values.email,
            }
        )
      })
          .then(res => {
            if (res.status === 200) {
              console.log(res);
              navigate("/signupResult")
            } else {
              console.log("회원가입 실패:", res);
            }
          })
          .catch(error => {
            console.log("오류: ", error);
          })
    }
  }

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const onclickQuit = () => {
    if(window.confirm("회원가입 절차를 취소하시겠습니까?")) {
      navigate("/");
    }
  }

  return (
      <>
        <Header />
        <div className={styles.signupSection}>
          <div className={styles.signupHeader}>
            <h1>회원가입</h1>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userInfoHeader}>
              <h1>회원정보 입력</h1>
            </div>
            <div className={styles.userInfoTags}>
              이름<br/>아이디<br/><br/>비밀번호<br/>비밀번호확인
              <br/><br/>성별<br/>휴대전화<br/>주소<br/>이메일
            </div>




            <form onSubmit={handleSubmit}>

              <div className={styles.userInfoWrap}>

                {/* 정보 입력창 */}

                <div><input type="text" name="userName" required onChange={handleChange}/>
                </div>
                <div>
                  <input
                      type="text" name="userId" maxLength="16" minLength="8" required onChange={handleChange}
                      pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$]{8,16}$"
                      placeholder="영문, 숫자 포함 / 8~16자 이내"/>
                </div>
                <div>
                  <h1>영문 포함, 숫자 포함, 8~16자 이내</h1>
                </div>
                <div><input type="password" name="password" required onChange={handleChange}/></div>
                <div><input type="password" name="pwVer" required onChange={handleChange}/></div>
                <div>
                  <h1>비밀번호를 입력해주세요.</h1>
                </div>
                <div>
                  <input type="radio" name="gender" id="male" value="male" required onChange={handleChange}
                         className={styles.radioInput} />남
                  <input type="radio" name="gender" id="female" value="female" required onChange={handleChange}
                         className={styles.radioInput} style={{marginLeft:'15px'}}/>여
                </div>
                <div><input type="text" name="phoneNumber" placeholder="숫자만 입력해주세요"
                            required onChange={handleChange} minLength="11" maxLength="11" pattern="\d*"/></div>
                <div>
                  <input name="address" required onChange={handleChange} />
                </div>
                <div><input type="email" name="email" required onChange={handleChange}/></div>

              </div>
              <div className={styles.signupBtnWrap}>
                <button type="submit">회원가입</button>
                <button type="button" onClick={onclickQuit}
                        style={{color:'black',
                          backgroundColor:'white'}}>회원가입 취소</button>
              </div>
            </form>


          </div>
        </div>
      </>
  );
}
export default SignUp;