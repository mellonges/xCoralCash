import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import store from "./reducers/rootReducer";

const makeStore = () =>
    configureStore({
        reducer: {store},
        devTools: true,
    });
export const wrapper = createWrapper(makeStore);

