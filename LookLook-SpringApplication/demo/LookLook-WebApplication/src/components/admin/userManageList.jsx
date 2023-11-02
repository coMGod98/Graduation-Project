import React, { useState } from "react";
import styles from "./userManageList.module.css"
import ModUserModal from "./modUserModal";

function UserManageList({list}) {
  const accessToken = localStorage.getItem("accessToken");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }

  const deleteUser = () => {

    if(window.confirm("사용자 정보를 삭제하시겠습니까?")) {
      fetch('/admin/user-withdrawal', {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          uid: list.uid,
        })
      })
          .then(res => {
            alert("사용자 정보 삭제가 완료되었습니다.");
            window.location.reload();
          })
          .catch(err => {
            alert("사용자 정보 삭제에 실패했습니다.")
            console.log("오류: ", err);
          })
    } else {
      return null;
    }

  }

  return (
      <>
        <div className={styles.section}>
          <div className={styles.item1}>{list.uid}</div>
          <div className={styles.item2}>{list.userId}</div>
          <div className={styles.item3}>{list.userName}</div>
          <div className={styles.item4}>{list.address}</div>
          <div className={styles.item5}>{list.email}</div>
          <div className={styles.item6}>{list.phoneNumber}</div>
          {list.uid === 1
              ? <div className={styles.item7}></div>
              : <div className={styles.item7}>
                <img onClick={openModal}
                     src={require("../../images/mod.png")} alt="mod" />
                <img onClick={deleteUser}
                     src={require("../../images/delete.png")} alt="mod" />
              </div>
          }

        </div>
        <ModUserModal muid={list.uid} muserName={list.userName} maddress={list.address}
                      memail={list.email} isOpen={isModalOpen} closeModal={closeModal} />
      </>
  );
}

export default UserManageList;