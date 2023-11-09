import React, {useEffect, useState} from "react";
import styles from "./orderHistory.module.css";

function OrderHistory({list, len}) {
    const [otherCount, setOtherCount] = useState(0);

    useEffect(() => {
        if (len > 1) {
            let i; let tmp = 0;
            for (i = 1; i < len; i++) {
                tmp = tmp + list.orderiteminfo[i].count;
            }
            setOtherCount(tmp);
        }
    }, []);

    return (
        <div className={styles.orderHisDiv}>
            <div className={styles.orderDate}>{(list.order.orderDate).substr(0, 10)}</div>
            <div className={styles.orderNum}>{list.order.id}</div>
            <div className={styles.orderProd}>
                <div className={styles.imgWrap}>
                    <img src={list.orderiteminfo[0].mainImgUrl} alt="prod_img"/>
                </div>
                <p>{list.orderiteminfo[0].itemName}({list.orderiteminfo[0].size}, {list.orderiteminfo[0].color}) x{list.orderiteminfo[0].count}</p>
                {list.orderiteminfo.length > 1
                    ? <p>&nbsp;외 {otherCount}개</p>
                    : null
                }
            </div>
            <div className={styles.orderPay}>
                <p>{Number(list.order.totalPrice).toLocaleString()}원</p>
                <p>{list.order.paymentMethod}</p>
                <p>{list.order.paymentType}</p>
            </div>
            {list.order.shipmentStatus === "PREPARING"
                ? <div className={styles.orderState}>배송 준비중</div>
                : <div className={styles.orderState}>{list.order.shipmentStatus}</div>
            }
        </div>
    );
}
export default OrderHistory;