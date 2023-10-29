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
                <div className={styles.item1}>
                    <input type="checkbox"></input>
                </div>
                <div className={styles.item2}>12345678</div>
                <div className={styles.item3}>상품명1</div>
                <div className={styles.item4}>#,###원</div>
                <div className={styles.item5}>5개</div>
                <div className={styles.item6}>대분류 &gt; 소분류</div>
                <div className={styles.item7}>2123-12-34</div>
                <div className={styles.item8}>
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