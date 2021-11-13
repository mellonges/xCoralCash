import {createAsyncThunk} from "@reduxjs/toolkit";

export const getFuturesTableInfo = createAsyncThunk(
    "rootStore/getFuturesTableInfo",
    async function(_, {getState}) {
        try {
            const contract = getState().store.contracts.futures
            let userTableData
            let address = localStorage.getItem("lastWalletAddress")
            if (!address) { 
                userTableData = await contract.methods.pendingPayoutFor("0xbe9cFBf33f987A3B0a9E0616F98E34f0B9D8F819").call()
            }
            const assetsData = await contract.methods.supportedAssets().call()
            return [assetsData, userTableData]
        } catch (e) {
            console.log("error нахуй ")
            console.error(e.message)
        }
    }
)