import {createAsyncThunk} from "@reduxjs/toolkit";

const sendTransactionReducer = createAsyncThunk(
    "rootStore/sendTransactionReducer",
    async function(_, {getState}) {
        try {
            const web3 = getState().store.web3ForUser
        } catch (e) {

        }
    }
)