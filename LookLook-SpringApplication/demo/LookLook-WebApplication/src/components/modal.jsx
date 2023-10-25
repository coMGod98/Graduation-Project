import React from "react";
import styles from "./modal.module.css"

function Modal( {isOpen, content, closeModal} ) {
  <div style={{ display: isOpen ? "block" : "none"}}>
    <div className={styles.modalBack}></div>
    <div className={styles.modalWrap}>
      <div>{content}</div>
      <button onClick={closeModal}>확인</button>
    </div>
  </div>
}

export default Modal;