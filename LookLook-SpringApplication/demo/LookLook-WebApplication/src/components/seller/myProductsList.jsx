import React, {useEffect, useState} from "react";
import styles from "./myProductsList.module.css";
import MyProductsModal from "./myProductsModal";
import CategoryRename from "../categoryRename";
import CategoryRenameHigh from "../categoryRenameHigh";
function MyProductsList({list, psize, pcolor}) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    useEffect(() => {
        console.log("사이즈", psize);
    }, []);


    const deleteProduct = () => {

        const accessToken = sessionStorage.getItem("accessToken");

        if (window.confirm("상품을 삭제하시겠습니까?")) {
            fetch(`/seller/item/${list.pid}`, {
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        alert("상품 삭제를 완료했습니다!");
                        window.location.reload();
                        console.log("상품 삭제 완료", res);
                    } else {
                        alert("주문내역이 존재하므로 삭제하실 수 없습니다.");
                        console.log("상품 삭제 실패", res);
                    }
                })
                .catch(err => {
                    console.log("오류: ", err);
                })
        } else {
            return null;
        }

    }

    return (
        <>
            <div className={styles.section}>
                <div className={styles.item1}>{list.pid}</div>
                <div className={styles.item2}>{list.itemName}</div>
                <div className={styles.item3}>{list.price}원</div>
                {/*<div className={styles.item4}>{list.stock}개</div>*/}
                <div className={styles.item5}>
                    <CategoryRenameHigh cate={list.category}/>&nbsp;&gt;&nbsp;
                    <CategoryRename cate={list.category}/>
                </div>
                <div className={styles.item6}>{String(list.regTime).substring(0, 10)}</div>
                <div className={styles.item7}>
                    {/*<img onClick={openModal}*/}
                    {/*     src={require("../../images/mod.png")} alt="mod" />*/}
                    <img onClick={deleteProduct}
                         src={require("../../images/delete.png")} alt="delete" />
                </div>
            </div>
            <MyProductsModal mpid={list.pid} mprice={list.price} mstock={list.stock}
                             mpgender={list.pgender} mitemDetail={list.itemDetail}
                             msize={list.size} mcolor={list.color} mcategory={list.category}
                             isOpen={isModalOpen} closeModal={closeModal} />
        </>
    );
}

export default MyProductsList;