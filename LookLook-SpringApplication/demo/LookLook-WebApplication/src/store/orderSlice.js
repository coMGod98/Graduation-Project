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
        addOrderItem: (state, { payload }) => {
            state.newAddress = payload.pAddr;
            state.orderItemIds = payload.pIds; //배열
            state.paymentMethod = payload.pMethod;
            state.paymentType = payload.pType;
        },
        setIdsOrderItem: (state, { payload }) => {
            state.orderItemIds = payload.itemIds; //배열
        },
        deleteOrderItem: (state) => {
            state.newAddress = "";
            state.orderItemIds = "";
            state.paymentMethod = "";
            state.paymentType = "";
        }
    },
})

export default orderSlice.reducer;
export const { addOrderItem, setIdsOrderItem, deleteOrderItem } = orderSlice.actions;
