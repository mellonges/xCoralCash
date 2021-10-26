import {createAsyncThunk} from "@reduxjs/toolkit";

export const disconnectWallet = createAsyncThunk(
    "rootStore/disconnect",
    async function(_, {getState}) {
        try {
            const onboard = getState().store.onboard
            await onboard.walletReset()
        } catch (e) {
            console.info(e)
        }
    }
)