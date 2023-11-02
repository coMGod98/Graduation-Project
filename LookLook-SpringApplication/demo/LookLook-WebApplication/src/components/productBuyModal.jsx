import React from "react";
import styles from "../components/productBuyModal.module.css";

function ProductBuyModal({isOpen, closeModal}) {

    const purchaseSubmit = () => {
        return null;
    }

    return (
        <>
            <div className={styles.back} style={{display:isOpen ? "block" : "none"}}>
                <div className={styles.front}>

                    <form onSubmit={purchaseSubmit}>
                        <div className={styles.section}>
                            <div className={styles.header}>상품 바로 구매</div>
                            <div className={styles.header2}>배송정보</div>
                            <div className={styles.wrap}>
                                <div className={styles.tag}>이름</div>
                                <div className={styles.info}>홍길동</div>
                            </div>
                            <div className={styles.wrap}>
                                <div className={styles.tag}>연락처</div>
                                <div className={styles.info}>01012345678</div>
                            </div>
                            <div className={styles.wrap}>
                                <div className={styles.tag}>주소</div>
                                <div className={styles.info}>
                                    <button>기본 주소</button>
                                    <button>신규 주소</button>
                                    <div><input className={styles.addrInput}/></div>
                                </div>
                            </div>
                            <div className={styles.header2}>상품 정보</div>
                            <div className={styles.wrap}>
                                <div className={styles.tag}>
                                    <img src={require("../images/looklook_logo.png")} alt="prod_img" />
                                </div>
                                <div className={styles.info}>
                                    <div>상품명: </div>
                                    <div>수량: </div>
                                    <div>사이즈: </div>
                                    <div>색상: </div>
                                </div>
                            </div>
                            <div className={styles.header2}>결제 정보</div>
                            <div className={styles.wrap}>
                                <div className={styles.tag}>결제 수단</div>
                                <div className={styles.info}>
                                    <input /><input />
                                </div>
                            </div>
                            <div className={styles.header2}>결제 금액</div>
                            <div className={styles.wrap}>
                                <div className={styles.tag}>배송비</div>
                                <div className={styles.info}>2,500원</div>
                            </div>
                            <div className={styles.wrap}>
                                <div className={styles.tag}>상품 가격</div>
                                <div className={styles.info}>#,###원</div>
                            </div>
                            <div className={styles.wrap}>
                                <div className={styles.tag}>총 결제 금액</div>
                                <div className={styles.info}><strong>#,###원</strong></div>
                            </div>





                        </div>



                        <div className={styles.btnWrap}>
                            <button type="submit">구매</button>
                            <button type="button" onClick={closeModal}>취소</button>
                        </div>




                    </form>


                </div>
            </div>
        </>
    );
}
export default ProductBuyModal;