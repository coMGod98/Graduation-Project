import React, {useEffect, useState} from "react";
import Header from "../components/header";
import styles from "./myPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import OrderHistory from "../components/orderHistory";
import { Navigate } from "react-router-dom";

function MyPage() {

  let { menu } = useParams();




  const [inputPw, setInputPw] = useState();
  const [pass, setPass] = useState(false);

  const changePw = (e) => {
    setInputPw(e.target.value);
  }

  const checkPw = (e) => {
    e.preventDefault();
    if(inputPw === "pass") {
      setPass(true);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  }

  const withdrawalClick = () => {
    if(window.confirm("정말 회원 탈퇴하시겠습니까?")) {
      alert("회원 탈퇴가 완료되었습니다.");
    }
  }





  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem("user_ID") === null) {
      navigate("/");
      alert("로그인 후 이용할 수 있습니다.");
    } else {
      setIsLogin(true);
    }
  }, []);



  return (
    
    <>
      <Header />
      <div className={styles.mypgSection}>
        <div className={styles.menuWrap}>
          <h1>마이페이지</h1>

          {menu === "myInfo" ? <div style={{backgroundColor:'rgb(213, 239, 255)'}}>내 정보</div> 
          : <Link to="/myPage/myInfo">
            <div>내 정보</div>
          </Link>
          }
          {menu === "modUserInfo" ? <div style={{backgroundColor:'rgb(213, 239, 255)'}}>회원 정보 수정</div> 
          : <Link to="/myPage/modUserInfo">
            <div>회원 정보 수정</div>
          </Link>
          }
          {menu === "orderHistory" ? <div style={{backgroundColor:'rgb(213, 239, 255)'}}>주문 내역</div> 
          : <Link to="/myPage/orderHistory">
            <div>주문 내역</div>
          </Link>
          }
          {menu === "withdrawal" ? <div style={{backgroundColor:'rgb(213, 239, 255)'}}>회원 탈퇴</div> 
          : <Link to="/myPage/withdrawal">
            <div>회원 탈퇴</div>
          </Link>
          }
        </div>
        
        {menu === "myInfo" ?
          <div className={styles.mypgWrap}>
            <div className={styles.mypgHeader}>내 정보</div>
            <h2>{sessionStorage.getItem("user_ID")}님 반갑습니다.</h2>
            <div className={styles.listWrap}>
              <div className={styles.listTag}>가입일</div>
              <div className={styles.listInfo}>~~</div>
            </div>
            <div className={styles.listWrap}>
              <div className={styles.listTag}>이메일</div>
              <div className={styles.listInfo}>~~</div>
            </div>
            <div  style={{borderBottom:'1px solid rgb(179, 179, 179)'}} 
            className={styles.listWrap}>
              <div className={styles.listTag}>휴대전화</div>
              <div className={styles.listInfo}>~~</div>
            </div>
          </div>
          



          : (menu === "modUserInfo" ? 

          (pass === false) ? 
            <div className={styles.mypgWrap}>
              <div className={styles.mypgHeader}>회원 정보 수정</div>
              <p>회원 정보 수정을 위해 비밀번호를 입력해주세요(임시pw:'pass')</p>
              
              <form onSubmit={checkPw}>
                <div style={{borderBottom:'1px solid rgb(179, 179, 179)'}} className={styles.listWrap}>
                  <div className={styles.listTag}>비밀번호</div>
                  <div className={styles.listInfo}>
                  <input maxLength="20" type="password" onChange={changePw}/>
                  </div>
                </div>
                <button className={styles.mypgBtn} type="submit">확인</button>
              </form>
            </div>
          : 
          <div className={styles.mypgWrap}>
            <div className={styles.mypgHeader}>회원 정보 수정</div>
            <div style={{borderTop:'1px solid rgb(179, 179, 179)'}} className={styles.modWrap}>
              <div className={styles.modTag}>이름</div>
              <div className={styles.modInput}><input /></div>
            </div>
            <div style={{borderTop:'1px solid rgb(179, 179, 179)'}} className={styles.modWrap}>
              <div className={styles.modTag}>주소</div>
              <div className={styles.modInput}><input className={styles.shorInput}/>
              <button className={styles.zipBtn}>우편번호</button></div>
            </div>
            <div className={styles.modWrap}>
              <div className={styles.modTag}></div>
              <div className={styles.modInput}><input /></div>
            </div>
            <div className={styles.modWrap}>
              <div className={styles.modTag}></div>
              <div className={styles.modInput}><input /></div>
            </div>
            <div style={{borderTop:'1px solid rgb(179, 179, 179)', borderBottom:'1px solid rgb(179, 179, 179)'}} className={styles.modWrap}>
              <div className={styles.modTag}>이메일</div>
              <div className={styles.modInput}><input name="email" type="email"/></div>
            </div>
            <button className={styles.mypgBtn}>수정</button>
          </div>
          





          : (menu === "orderHistory" ? 
          <div className={styles.mypgWrap}>
            <div className={styles.mypgHeader}>주문 내역</div>
            <div className={styles.orderTagDiv}>
              <div className={styles.orderDateTag}>주문날짜</div>
              <div className={styles.orderNumTag}>주문번호</div>
              <div className={styles.orderProdTag}>상품명(옵션)</div>
              <div className={styles.orderPayTag}>결제정보</div>
              <div className={styles.orderStateTag}>주문상태</div>
            </div>
            <OrderHistory />
            <OrderHistory />
            <OrderHistory />


          </div>




          : (pass === false) ? 
          <div className={styles.mypgWrap}>
            <div className={styles.mypgHeader}>회원 탈퇴</div>
            <p>회원 탈퇴를 위해 비밀번호를 입력해주세요(임시pw:'pass')</p>
            
            <form onSubmit={checkPw}>
              <div style={{borderBottom:'1px solid rgb(179, 179, 179)'}} className={styles.listWrap}>
                <div className={styles.listTag}>비밀번호</div>
                <div className={styles.listInfo}>
                <input maxLength="20" type="password" onChange={changePw}/>
                </div>
              </div>
              <button className={styles.mypgBtn} type="submit">확인</button>
            </form>
          </div>
          : 
          <div className={styles.mypgWrap}>
            <div className={styles.mypgHeader}>회원 탈퇴</div>
            <p>회원탈퇴 하시겠습니까?</p>
            <p>배송 받지 않은 상품이 있는 경우 회원 탈퇴가 불가능합니다.</p>
            <button onClick={withdrawalClick}
            className={styles.mypgBtn}>회원 탈퇴</button>
          </div>




          ))
        }
      </div>
    </>
  );
}
export default MyPage;