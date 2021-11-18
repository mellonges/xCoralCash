import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import store from "./reducers/rootReducer";
import {customizedMiddleware} from "./reducers/Middleware";

const makeStore = () =>
    configureStore({
        reducer: {store},
        devTools: true,
        middleware: getDefaultMiddleware => getDefaultMiddleware(customizedMiddleware)
    });
export const wrapper = createWrapper(makeStore);

