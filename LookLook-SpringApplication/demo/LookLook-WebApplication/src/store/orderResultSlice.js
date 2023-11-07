import { createSlice } from "@reduxjs/toolkit";
//주문 완료 페이지에 보여질 데이터들
//주문번호, 주문일자, 주문자명, 전화번호, 총 결제 금액, 결제수단(카드), 결제수단(할부), 배송 주소(기존/신규)

const orderResultSlice = createSlice({
    name: "resultInfo",
    initialState: {
        resultOrderId: null,
        resultDate: null,
        resultUserName: null,
        resultNumber: null,
        resultTotalPrice: null,
        resultMethod: null,
        resultType: null,
        resultAddr: null,
    },
    reducers: {
        setResultOrderIDd: (state, { payload }) => {
            state.resultOrderId = payload;
        },
        setResultDate: (state, { payload }) => {
            state.resultDate = payload;
        },
        setResultUserName: (state, { payload }) => {
            state.resultUserName = payload;
        },
        setResultNumber: (state, { payload }) => {
            state.resultNumber = payload;
        },
        setResultTotalPrice: (state, { payload }) => {
            state.resultTotalPrice = payload;
        },
        setResultMethod: (state, { payload }) => {
            state.resultMethod = payload;
        },
        setResultType: (state, { payload }) => {
            state.resultType = payload;
        },
        setResultAddr: (state, { payload }) => {
            state.resultAddr = payload;
        },

        deleteResult: (state) => {
            state.resultOrderId = null;
            state.resultDate = null;
            state.resultUserName = null;
            state.resultNumber = null;
            state.resultTotalPrice = null;
            state.resultMethod = null;
            state.resultType = null;
            state.resultAddr = null;
        }
    },
})

export default orderResultSlice.reducer;
export const { setResultOrderIDd, setResultDate, setResultUserName, setResultNumber,
    setResultTotalPrice, setResultMethod, setResultType, setResultAddr} = orderResultSlice.actions;
