import {createAsyncThunk} from "@reduxjs/toolkit";

export const getWalletInfo = createAsyncThunk(
    "rootStore/getCurrentPrice",
    async function(_, {getState}) {
        try {
            const contract = getState().store.contracts.monetaryPolicy
            const currentPrice = await contract.methods.currentPrice().call()
            const targetPrice = await contract.methods.targetPrice().call()
            const rebaseInterval = await contract.methods.rebaseCooldown().call()
            const currentMultiplier = await contract.methods.currentAppreciationMultiplier().call()
            const nextRebaseIn = await contract.methods.cooldownExpiryTimestamp().call()
            console.log(nextRebaseIn)
            return [currentPrice, targetPrice, currentMultiplier, rebaseInterval, nextRebaseIn]
        } catch (e) {
            console.log("error нахуй ")
        }
    }

)