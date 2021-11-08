import {createAsyncThunk} from "@reduxjs/toolkit";

export const getWalletInfo = createAsyncThunk(
    "rootStore/getCurrentPrice",
    async function(_, {getState}) {
        try {
            const contract = getState().store.contracts.monetaryPolicy
            const currentPrice = await contract.methods.currentPrice().call()
            const targetPrice = await contract.methods.targetPrice().call()
            const currentAPY = await contract.methods.currentAppreciationMultiplier().call()
            const nextRebaseIn = await contract.methods.cooldownExpiryTimestamp().call()
            return [currentPrice, targetPrice, currentAPY, nextRebaseIn]
        } catch (e) {
            console.log("error нахуй ")
        }
    }

)