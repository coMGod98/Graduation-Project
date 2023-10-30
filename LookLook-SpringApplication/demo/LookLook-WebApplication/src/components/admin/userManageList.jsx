import React, { useState } from "react";
import styles from "./userManageList.module.css"
import ModUserModal from "./modUserModal";

function UserManageList({list}) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className={styles.section}>
        <div className={styles.item1}>{list.uid}</div>
        <div className={styles.item2}>{list.userId}</div>
        <div className={styles.item3}>{list.userName}</div>
        <div className={styles.item4}>{list.email}</div>
        <div className={styles.item5}>{list.phoneNumber}</div>
        <div className={styles.item6}>{list.address}</div>
        <div className={styles.item7}>
          <img onClick={openModal}
               src={require("../../images/mod.png")} alt="mod" />
          <img onClick={openModal}
               src={require("../../images/delete.png")} alt="mod" />
        </div>
      </div>
      <ModUserModal muid={list.uid} memail={list.email} mphoneNumber={list.phoneNumber}
                    maddress={list.address} isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
}

export default UserManageList;