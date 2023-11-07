import {configureStore} from "@reduxjs/toolkit";
import orderSlice from "./orderSlice";
import orderInfoSlice from "./orderInfoSlice";

const store = configureStore({
    reducer : {
        orderItem : orderSlice,
        orderInfoItem : orderInfoSlice,
    },
});

export default store;