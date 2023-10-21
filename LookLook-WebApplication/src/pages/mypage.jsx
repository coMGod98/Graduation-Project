import React, {useState} from "react";
import Header from "../components/header";
import styles from "./myPage.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function MyPage() {

  let { menu } = useParams();
  const [ok, setOk] = useState("");
  const [justText, setJustText] = useState("안바뀐상태");

  const inputChange = (e) => {
    setOk(e.target.value);
  }
  
  const showOk = () => {
    
    if(ok === "pass") {
      setJustText("바꼈다");
      <div>통과!</div>
    }
  }

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
            <p>님 반갑습니다.</p>
          </div>
          



          : (menu === "modUserInfo" ? 
          <div className={styles.mypgWrap}>
            <div className={styles.mypgHeader}>회원 정보 수정</div>
            <p>회원 정보 수정을 위해 비밀번호를 입력해주세요</p>
            <div>
              비밀번호<input onChange={inputChange}/>
            </div>
            <button onClick={showOk}>확인</button>
            <div>{justText}</div>
            
            
          </div>





          : (menu === "orderHistory" ? 
          <div className={styles.mypgWrap}>
            <div className={styles.mypgHeader}>주문 내역</div>
          </div>




          : 
          <div className={styles.mypgWrap}>
            <div className={styles.mypgHeader}>회원 탈퇴</div>
            <p>회원탈퇴 하시겠습니까?</p>
            <p>배송 받지 않은 상품이 있는 경우 회원 탈퇴가 불가능합니다.</p>
            <button>회원 탈퇴</button>
          </div>




          ))
        }
      </div>
    </>
  );
}
export default MyPage;