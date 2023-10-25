import React from "react";
import styles from "./userManageListTag.module.css"

function UserManageListTag() {
  return (
    <div className={styles.section}>
      <div className={styles.item1}>
        <input type="checkbox"></input>
      </div>
      <div className={styles.item2}>식별번호</div>
      <div className={styles.item3}>아이디</div>
      <div className={styles.item4}>이름</div>
      <div className={styles.item5}>이메일</div>
      <div className={styles.item6}>휴대전화</div>
      <div className={styles.item7}>주소</div>
    </div>
  );
}

export default UserManageListTag;