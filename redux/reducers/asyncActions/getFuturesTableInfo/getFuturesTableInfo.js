import {createAsyncThunk} from "@reduxjs/toolkit";

export const getFuturesTableInfo = createAsyncThunk(
    "rootStore/getFuturesTableInfo",
    async function(_, {getState}) {
        try {
            const contract = getState().store.contracts.futures
            let userTableData
            let address = localStorage.getItem("lastWalletAddress")
            if (address) {
                console.log(address)
                userTableData = await contract.methods.pendingPayoutFor(address).call()
            }
            const assetsData = await contract.methods.supportedAssets().call()
            return [assetsData, userTableData]
        } catch (e) {
            console.log("error нахуй ")
            console.error(e.message)
        }
    }
)