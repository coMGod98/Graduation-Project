import React, {useEffect, useState} from "react";
import Header from "../components/header";
import styles from "./myPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import OrderHistory from "../components/orderHistory";
import { Navigate } from "react-router-dom";
import axios from 'axios';

function MyPage() {

  const accessToken = sessionStorage.getItem("accessToken");

  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddr, setUserAddr] = useState("");

  const [inputModName, setInputModName] = useState(userName);
  const [inputModAddr, setInputModAddr] = useState(userAddr);
  const [inputModEmail, setInputModEmail] = useState(userEmail);

  let { menu } = useParams();

  const [inputPw, setInputPw] = useState();
  const [pass, setPass] = useState(false);

  const [orderList, setOrderList] = useState([]);

  const [isTokenEnd, setIsTokenEnd] = useState(false);

  const changePw = (e) => {
    setInputPw(e.target.value);
  }

  const checkPw = (e) => {
    e.preventDefault();

    fetch('/mypage/user/auth', {
      method: 'POST',
      headers: { "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        password: inputPw
      })
    })
        .then(res => {
          console.log(res);
          if (res.status === 200) {console.log("성공", res);
            alert("인증 성공");
            setPass(true);
          }
          else {console.log("실패", res); alert("인증 실패");}
        })
        .catch(err => {
          console.log('오류: ', err.message);
        })

  }

  const withdrawalClick = () => {
    if(window.confirm("정말 회원 탈퇴하시겠습니까?")) {

      fetch('/mypage/user/withdrawal', {
        method : 'post',
        headers : {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`,
        },
      })
          .then(res => {
            if (res.status === 200) {
              console.log("회원탈퇴 완료", res);
              alert("회원 탈퇴가 완료되었습니다.");
              sessionStorage.removeItem("accessToken");
              navigate("/");
            } else {
                alert("현재 주문한 상품이 있거나 판매자로 등록한 상품이 존재합니다.");
              console.log("회원탈퇴 실패", res);
            }
          })
          .catch(err => {
            console.log('오류: ', err);
          })

    }
  }

  const modNameChange = e => {
    setInputModName(e.target.value);
  }
  const modAddrChange = e => {
    setInputModAddr(e.target.value);
  }
  const modEmailChange = e => {
    setInputModEmail(e.target.value);
  }

  const modClick = () => {
    fetch('/mypage/user/info', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userName: inputModName,
        address: inputModAddr,
        email: inputModEmail,
      })
    })
        .then(res => {
          alert("수정 완료!");
          setUserName(inputModName);
          setUserAddr(inputModAddr);
          setUserEmail(inputModEmail);
        })
        .catch(err => {
          console.log("오류: ", err);
        })


  }

  const [itemLengths, setItemlengths] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    if (accessToken === null || accessToken === undefined) {
      navigate("/login");
      alert("로그인 후 이용하실 수 있습니다.");
    } else {
      fetch('/mypage', {
        headers : {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
          .then(res => res.json())
          .then(res => {


            if (res.status === 500 || res.status === 401) {
              setIsTokenEnd(true);
              console.log("토큰 만료됨:", res);
              navigate("/");
              sessionStorage.removeItem("accessToken");
              alert("토큰이 만료되었습니다.");
            } else {
              setIsTokenEnd(false);
              console.log("사용자 정보", res);

              setUserID(res.userId);
              setUserName(res.userName);
              setUserEmail(res.email);
              setUserPhone(res.phoneNumber);
              setUserAddr(res.address);

              setInputModName(res.userName);
              setInputModAddr(res.address);
              setInputModEmail(res.email);
            }
          })
          .catch(err => {
            console.log('오류: ', err);
            navigate("/login");
          })

      fetch('/mypage/order-info', {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`,
        }
      })
          .then(res => res.json())
          .then(res => {
            console.log("주문내역", res);
            setOrderList(res);
            let i;
            let tmp = [];
            for (i = 0; i < res.length; i++) {
              tmp[i] = res[i].orderiteminfo.length;
            }
            setItemlengths(tmp);

          })
          .catch(err => {
            console.log("오류:", err);
          })
    }

  }, [])


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
                {isTokenEnd === true
                    ? <h2>토큰이 만료되었습니다.</h2>
                    : <h2>{userName}({userID})님 반갑습니다.</h2>
                }
                <div className={styles.listWrap}>
                  <div className={styles.listTag}>이메일</div>
                  <div className={styles.listInfo}>{userEmail}</div>
                </div>
                <div className={styles.listWrap}>
                  <div className={styles.listTag}>휴대전화</div>
                  <div className={styles.listInfo}>{userPhone}</div>
                </div>
                <div  style={{borderBottom:'1px solid rgb(179, 179, 179)'}}
                      className={styles.listWrap}>
                  <div className={styles.listTag}>주소</div>
                  <div className={styles.listInfo}>{userAddr}</div>
                </div>
              </div>




              : (menu === "modUserInfo" ?

                  (pass === false) ?
                      <div className={styles.mypgWrap}>
                        <div className={styles.mypgHeader}>회원 정보 수정</div>
                        <p>회원 정보 수정을 위해 비밀번호를 입력해주세요</p>

                        <form onSubmit={checkPw}>
                          <div style={{borderBottom:'1px solid rgb(179, 179, 179)'}} className={styles.listWrap}>
                            <div className={styles.listTag}>비밀번호</div>
                            <div className={styles.listInfo}>
                              <input maxLength="20" type="password" onChange={changePw}/>
                            </div>
                          </div>
                          <button style={{border:'0'}} className={styles.mypgBtn} type="submit">확인</button>
                        </form>
                      </div>
                      :
                      <div className={styles.mypgWrap}>
                        <div className={styles.mypgHeader}>회원 정보 수정</div>
                        <div style={{borderTop:'1px solid rgb(179, 179, 179)'}} className={styles.modWrap}>
                          <div className={styles.modTag}>이름</div>
                          <div className={styles.modInput}><input onChange={modNameChange} defaultValue={userName} /></div>
                        </div>
                        <div style={{borderTop:'1px solid rgb(179, 179, 179)'}} className={styles.modWrap}>
                          <div className={styles.modTag}>주소</div>
                          <div className={styles.modInput}><input onChange={modAddrChange} defaultValue={userAddr} />
                          </div>
                        </div>
                        <div style={{borderTop:'1px solid rgb(179, 179, 179)', borderBottom:'1px solid rgb(179, 179, 179)'}} className={styles.modWrap}>
                          <div className={styles.modTag}>이메일</div>
                          <div className={styles.modInput}><input onChange={modEmailChange} defaultValue={userEmail} name="email" type="email"/></div>
                        </div>
                        <button style={{border:'0'}} onClick={modClick} className={styles.mypgBtn}>수정</button>
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
                              <div className={styles.orderHisItemsWrap}>
                                  {isTokenEnd === true
                                      ?
                                      <div style={{borderBottom:'1px solid rgb(180, 180, 180)', color:'grey',
                                          padding:'8px'}}>토큰이 만료되었습니다.</div>
                                      : (orderList.length < 1
                                              ? <div style={{borderBottom:'1px solid rgb(180, 180, 180', textAlign:'center', padding:'8px'}}>주문한 상품이 없습니다.</div>
                                              :
                                              orderList.map((item, id) => {
                                                  return <OrderHistory key={id} list={item} len={itemLengths[id]}/>
                                              })
                                      )
                                  }
                              </div>



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
                              : (menu === "withdrawal" ?
                                      <div className={styles.mypgWrap}>
                                        <div className={styles.mypgHeader}>회원 탈퇴</div>
                                        <p>회원탈퇴 하시겠습니까?</p>
                                        <p>배송 받지 않은 상품이 있는 경우 회원 탈퇴가 불가능합니다.</p>
                                        <button onClick={withdrawalClick} style={{border:'0'}}
                                                className={styles.mypgBtn}>회원 탈퇴</button>
                                      </div>
                                      :
                                      <div className={styles.mypgWrap}>잘못된 페이지입니다.</div>
                              )




                  ))
          }
        </div>
      </>
  );
}
export default MyPage;