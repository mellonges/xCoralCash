import {createAsyncThunk} from "@reduxjs/toolkit";

export const changeWalletAddress = createAsyncThunk(
    "rootStore/changeWalletAddress",
    async function(address, {getState}) {
        try {
            const xCoralBalanceContract = getState().store.contracts.xCORAL
            const xCoralBalance = await xCoralBalanceContract.methods.balanceOf(address).call()
            return [address, xCoralBalance]
        } catch (e) {
            console.log("error нахуй")
            console.error(e.message)
        }
    }
)