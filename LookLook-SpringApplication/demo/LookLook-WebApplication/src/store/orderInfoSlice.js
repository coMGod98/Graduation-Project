import { createSlice } from "@reduxjs/toolkit";
//장바구니->주문서작성, 주문서 작성 페이지에서 넣을 정보들
const orderInfoSlice = createSlice({
    name: "orderInfoItem",
    initialState: {
        orderiteminfo: [],
        // orderiteminfo: [{
        //     color: "", count: 0, itemName: "", orderItemId: 0, pid: 0, price: 0, size: "",
        // }],
    },
    reducers: {
        setOrderInfo: (state, { payload }) => {
            state.orderiteminfo = payload;
        },
        deleteOrderInfo: (state) => {
            state.orderiteminfo = [];
            // state.orderiteminfo = [{
            // color: "", count: 0, itemName: "", orderItemId: 0, pid: 0, price: 0, size: "",
            // }];
        }
    },
})

export default orderInfoSlice.reducer;
export const { setOrderInfo, deleteOrderInfo } = orderInfoSlice.actions;
