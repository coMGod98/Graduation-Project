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
    const accessToken = sessionStorage.getItem("accessToken");

    const {menu} = useParams();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState([]);

    const logoutClick = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            sessionStorage.removeItem("accessToken");
            navigate("/");
        }
    }

    const [isTokenEnd, setIsTokenEnd] = useState(false);

    useEffect(() => {

        console.log("현재 토큰: ", accessToken);

        fetch('/admin/user-list', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 500 || res.status === 401) {
                    setIsTokenEnd(true);
                    console.log("토큰 만료됨:", res);
                    sessionStorage.removeItem("accessToken");
                    navigate("/");
                    alert("토큰이 만료되었습니다.");
                } else {
                    setIsTokenEnd(false);
                    console.log("사용자 리스트:", res);
                    setUserInfo(res);
                }
            })
            .catch(err => {
                console.log("오류: ", err);
            })
    }, []);

    return (
        <>
            <div className={styles.adminHeader}>
                <img src={require("../images/looklook_logo.png")} alt="logo" />
                <p>관리자</p>
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
                        <div className={styles.workWrap}>
                            <UserManageListTag />
                            {isTokenEnd === true
                                ? <div style={{padding:'8px', borderBottom:'1px solid rgb(180,180,180)',
                                    color:'grey'}}>토큰이 만료되었습니다.</div>
                                : (userInfo.length < 1
                                        ? <div style={{padding:'8px', borderBottom:'1px solid rgb(180,180,180)',
                                            color:'grey'}}>등록된 사용자가 없습니다.</div>
                                        :
                                        userInfo.map((item, id) => {
                                            return <UserManageList key={id} list={item}/>
                                        })
                                )
                            }



                        </div>



                    </div>







                    : (menu === "prodInfo"
                            ?
                            <div className={styles.adminWorkSpace}>
                                <div className={styles.workHeader}>상품 정보 조회</div>
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