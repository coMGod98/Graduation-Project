import React, {useState} from "react";
import styles from "./myProductsList.module.css";
import MyProductsModal from "./myProductsModal";

function MyProductsList() {

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
                <div className={styles.item1}>12345678</div>
                <div className={styles.item2}>상품명1</div>
                <div className={styles.item3}>#,###원</div>
                <div className={styles.item4}>5개</div>
                <div className={styles.item5}>패딩</div>
                <div className={styles.item6}>2123-12-34</div>
                <div className={styles.item7}>
                    <img onClick={openModal}
                         src={require("../../images/mod.png")} alt="mod" />
                    <img onClick={openModal}
                         src={require("../../images/delete.png")} alt="delete" />
                </div>
            </div>
            <MyProductsModal isOpen={isModalOpen} closeModal={closeModal} />
        </>
    );
}

export default MyProductsList;