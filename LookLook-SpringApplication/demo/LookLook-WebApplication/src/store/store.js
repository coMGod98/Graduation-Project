import {configureStore} from "@reduxjs/toolkit";
import orderSlice from "./orderSlice";
import orderInfoSlice from "./orderInfoSlice";
import orderResultSlice from "./orderResultSlice";

const store = configureStore({
    reducer : {
        orderItem : orderSlice,
        orderInfoItem : orderInfoSlice,
        resultInfo : orderResultSlice,
    },
});

export default store;