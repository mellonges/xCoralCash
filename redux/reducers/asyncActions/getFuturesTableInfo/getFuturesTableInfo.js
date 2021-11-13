import {createAsyncThunk} from "@reduxjs/toolkit";

export const getFuturesTableInfo = createAsyncThunk(
    "rootStore/getFuturesTableInfo",
    async function(_, {getState}) {
        try {
            const futures = getState().store.contracts.futures
            const monetaryPolicy = getState().store.contracts.monetaryPolicy
            let userTableData
            let address = localStorage.getItem("lastWalletAddress")
            if (!address) {
                userTableData = await futures.methods.pendingPayoutFor("0xbe9cFBf33f987A3B0a9E0616F98E34f0B9D8F819").call()
                console.log(userTableData)
            }
            const assetsData = await futures.methods.supportedAssets().call()
            const currentMultiplier = await monetaryPolicy.methods.currentAppreciationMultiplier().call()
            const rebaseInterval = await monetaryPolicy.methods.rebaseCooldown().call()

            return [assetsData, userTableData, currentMultiplier, rebaseInterval]
        } catch (e) {
            console.log("error нахуй ")
            console.error(e.message)
        }
    }
)


