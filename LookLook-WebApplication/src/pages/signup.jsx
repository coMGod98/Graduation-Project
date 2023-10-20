import React, { useState } from "react";
import Header from "../components/header";
import styles from "./signup.module.css";
import { Link } from "react-router-dom";

function SignUp() {
  const [values, setValues] = useState({
    name: "",
    id: "",
    pw: "",
    pwVer: "",
    gender: "",
    phone: "",
    addrZip: "",
    addr: "",
    addrOption: "",
    email: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    id: "",
    pw: "",
    pwVer: "",
    gender: "",
    phone: "",
    addrZip: "",
    addr: "",
    addrOption: "",
    email: "",
  })

  const handleSubmit = e => {
    // 필드 검사 후
    const errors = validate()
    // 에러 값을 설정하고
    setErrors(errors)
    // 잘못된 값이면 제출 처리를 중단한다.
    if (Object.values(errors).some(v => v)) {
      return
    }

    alert(JSON.stringify(values, null, 2))
  }

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const validate = () => {
    const errors = {
      name: "",
      id: "",
      pw: "",
      pwVer: "",
      gender: "",
      phone: "",
      addrZip: "",
      addr: "",
      addrOption: "",
      email: "",
    }

    if (!values.name) {
      errors.name = "이메일을 입력하세요"
    }
    if (!values.id) {
      errors.id = "비밀번호를 입력하세요"
    }
    if (!values.pw) {
      errors.pw = "이메일을 입력하세요"
    }
    if (!values.pwVer) {
      errors.pwVer = "비밀번호를 입력하세요"
    }
    if (!values.gender) {
      errors.gender = "이메일을 입력하세요"
    }
    if (!values.phone) {
      errors.phone = "비밀번호를 입력하세요"
    }
    if (!values.addrZip) {
      errors.addrZip = "이메일을 입력하세요"
    }
    if (!values.addr) {
      errors.addr = "비밀번호를 입력하세요"
    }
    if (!values.addrOption) {
      errors.addrOption = "비밀번호를 입력하세요"
    }
    if (!values.email) {
      errors.email = "비밀번호를 입력하세요"
    }

    return errors
  }

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

          {/* 정보 입력창 */}
            <form onSubmit={handleSubmit}>
            <div><input type="text" name="name" required onChange={handleChange}/>
            </div>{errors.email && <span>{errors.email}</span>}
            <div>
              <input 
              type="text" id="id" maxLength="16" minLength="8" required onChange={handleChange}
              className={styles.shortInput}/><button>중복 확인</button>
            </div>
            <div>
              <h>영문 포함, 숫자 포함, 8~16자 이내</h>
            </div>
            <div><input type="password" name="pw" required onChange={handleChange}/></div>
            <div><input type="password" name="pwVer" required onChange={handleChange}/></div>
            <div>
              <h>비밀번호를 입력해주세요.</h>
            </div>
            <div>
              <input type="radio" name="gender" id="male" value="male" required onChange={handleChange}
              className={styles.radioInput} />남
              <input type="radio" name="gender" id="female" value="female" required onChange={handleChange}
              className={styles.radioInput} style={{marginLeft:'15px'}}/>여
            </div>
            <div><input type="number" name="phone" required onChange={handleChange}/></div>
            <div>
              <input 
              name="addrZip" readOnly required onChange={handleChange}
              className={styles.shortInput}/><button>우편번호</button>
            </div>
            <div><input type="text" name="addr" readOnly required onChange={handleChange}/></div>
            <div><input name="addrOption"/></div>
            <div><input type="email" name="email" required onChange={handleChange}/></div>
            </form>
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