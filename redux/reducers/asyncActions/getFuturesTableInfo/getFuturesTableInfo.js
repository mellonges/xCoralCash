import {createAsyncThunk} from "@reduxjs/toolkit";

export const getFuturesTableInfo = createAsyncThunk(
    "rootStore/getFuturesTableInfo",
    async function(_, {getState}) {
        try {
            const contract = getState().store.contracts.futures
            const returnDate = await contract.methods.supportedAssets().call()
            return returnDate
        } catch (e) {
            console.log("error нахуй ")
            console.error(e.message)
        }
    }
)