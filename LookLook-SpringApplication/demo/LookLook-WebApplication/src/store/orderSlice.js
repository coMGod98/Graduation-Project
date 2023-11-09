import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "orderItem",
    initialState: {
        newAddress: "",
        orderItemIds: "",
        paymentMethod: "",
        paymentType: ""
    },
    reducers: {
        setNewAddress: (state, { payload }) => {
            state.newAddress = payload;
        },
        setOItemIds: (state, { payload }) => {
            state.orderItemIds = payload; //배열
        },
        setPaymentMethod: (state, { payload }) => {
            state.paymentMethod = payload;
        },
        setPaymentType: (state, { payload }) => {
            state.paymentType = payload;
        },



        // setIdsOrderItem: (state, { payload }) => {
        //     state.orderItemIds = payload.itemIds; //배열
        // },
        deleteOrderItem: (state) => {
            state.newAddress = "";
            state.orderItemIds = "";
            state.paymentMethod = "";
            state.paymentType = "";
        }
    },
})

export default orderSlice.reducer;
export const { setNewAddress, setOItemIds, setPaymentMethod, setPaymentType, deleteOrderItem } = orderSlice.actions;
