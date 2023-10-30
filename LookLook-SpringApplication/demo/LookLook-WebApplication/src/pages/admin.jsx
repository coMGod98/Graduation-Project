import React, {useEffect, useState} from "react";
import styles from "./admin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

import UserManageList from "../components/admin/userManageList";
import UserManageListTag from "../components/admin/userManageListTag";

import ProdInfoList from "../components/admin/prodInfoList";
import ProdInfoListTag from "../components/admin/prodInfoListTag";

import ProdRequestList from "../components/admin/prodRequestList";
import ProdRequestListTag from "../components/admin/prodRequestListTag";



function Admin() {
    const accessToken = localStorage.getItem("accessToken");

  const {menu} = useParams();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState([]);
  
  const logoutClick = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
        localStorage.setItem("accessToken", "");
      navigate("/");
    }
  }
  const pageReload = () => {
      window.location.reload();
  }


  useEffect(() => {
    fetch('/admin/user-list', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })
        .then(res => res.json())
        .then(res => {
          console.log("사용자 리스트: ", res);
          setUserInfo(res);
        })
        .catch(err => {
          console.log("오류: ", err);
        })
  }, []);

  return (
    <>
      <div className={styles.adminHeader}>
        <img src={require("../images/looklook_logo.png")} alt="logo" />
      </div>
      <div className={styles.adminSection}>
        <div className={styles.adminMenu}>
          <div className={styles.adminInfoWrap}>
            <h3>관리자님 반갑습니다.</h3>
            <img onClick={logoutClick}
            src={require("../images/logout.png")} alt="logout" />
          </div>

          {menu === "userManage" 
          ? <div style={{backgroundColor:'rgb(213, 239, 255)'}}
          className={styles.menuDiv}>회원 관리</div>
          :
          <Link to="/admin/userManage">
            <div className={styles.menuDiv}>회원 관리</div>
          </Link>
          }
          {menu === "prodInfo" 
          ? <div style={{backgroundColor:'rgb(213, 239, 255)'}}
          className={styles.menuDiv}>상품 정보 조회</div>
          :
          <Link to="/admin/prodInfo">
            <div className={styles.menuDiv}>상품 정보 조회</div>
          </Link>
          }
          {menu === "prodRequest" 
          ? <div style={{backgroundColor:'rgb(213, 239, 255)'}}
          className={styles.menuDiv}>상품 요청 승인</div>
          :
          <Link to="/admin/prodRequest">
            <div className={styles.menuDiv}>상품 요청 승인</div>
          </Link>
          }
        </div>

        {menu === "userManage" 
        ? 
        <div className={styles.adminWorkSpace}>
          <div className={styles.workHeader}>회원 관리</div>
          <div className={styles.searchWrap}>
            <input /><button>검색</button>

          </div>
          <div className={styles.workWrap}>
            <UserManageListTag />
              {userInfo.map((item, id) => {
                 return <UserManageList key={id} list={item}/>

              })}


          </div>
          


        </div>







        : (menu === "prodInfo" 
        ? 
        <div className={styles.adminWorkSpace}>
          <div className={styles.workHeader}>상품 정보 조회</div>
          <div className={styles.searchWrap}>
            <input /><button>검색</button>
          </div>
          <div className={styles.workWrap}>
            <ProdInfoListTag />
            <ProdInfoList />
            <ProdInfoList />
            <ProdInfoList />
          </div>
        </div>





        : 
        <div className={styles.adminWorkSpace}>
          <div className={styles.workHeader}>상품 요청 승인</div>
          <div className={styles.searchWrap}>
            <input /><button>검색</button>
          </div>
          <div className={styles.workWrap}>
            <ProdRequestListTag />
            <ProdRequestList />
            <ProdRequestList />
            <ProdRequestList />
          </div>
        </div>
        )}
        


      </div>
    </>
  );
}
export default Admin;