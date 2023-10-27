import React from "react";
import styles from "./userManageList.module.css"

function UserManageList() {

  const modClick = () => {
    alert("입력창 렌더링");
  }
  return (
    <div className={styles.section}>
      <div className={styles.item1}>
        <input type="checkbox"></input>
      </div>
      <div className={styles.item2}>2134-1234</div>
      <div className={styles.item3}>abc123</div>
      <div className={styles.item4}>홍길동</div>
      <div className={styles.item5}>abc123@gachon.ac.kr</div>
      <div className={styles.item6}>01012345678</div>
      <div className={styles.item7}>서울특별시 ~~구 ~~동 ~~</div>
      <div className={styles.item8}>
        <img onClick={modClick}
        src={require("../../images/mod.png")} alt="mod" />
      </div>
    </div>
  );
}

export default UserManageList;