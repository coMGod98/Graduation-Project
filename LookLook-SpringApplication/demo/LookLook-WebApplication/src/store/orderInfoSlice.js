import { createSlice } from "@reduxjs/toolkit";
//장바구니->주문서작성, 주문서 작성 페이지에서 넣을 정보들
const orderInfoSlice = createSlice({
    name: "orderInfoItem",
    initialState: {
        address: "",
        orderItemPrice: 0,
        orderiteminfo: [{
            color: "", count: 0, itemName: "", orderItemId: 0, pid: 0, price: 0, size: "",
        }],
        phoneNumber: "",
        shipment_FEE: 0,
        totalPrice: 0,
        userName: "",
    },
    reducers: {
        setOrderInfo: (state, { payload }) => {
            state.address = payload.oAddress;
            state.orderItemPrice = payload.oItemPrice;
            state.orderiteminfo = payload.oItemInfo;
            state.phoneNumber = payload.oPhoneNumber;
            state.shipment_FEE = payload.oShipment_FEE;
            state.totalPrice = payload.oTotalPrice;
            state.userName = payload.oUserName;
        },
        deleteOrderInfo: (state) => {
            state.address = "";
            state.orderItemPrice = 0;
            state.orderiteminfo = [{
            color: "", count: 0, itemName: "", orderItemId: 0, pid: 0, price: 0, size: "",
            }];
            state.phoneNumber = "";
            state.shipment_FEE = 0;
            state.totalPrice = 0;
            state.userName = "";
        }
    },
})

export default orderInfoSlice.reducer;
export const { setOrderInfo, deleteOrderInfo } = orderInfoSlice.actions;
