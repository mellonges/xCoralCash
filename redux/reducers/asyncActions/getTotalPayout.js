import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTotalPayout = createAsyncThunk(
    "rootStore/getTotalPayOut",
    async function ({ assetAddress, amount, decimals }, { getState }) {
        try {
            const futuresContract = getState().store.contracts.futures
            const monetaryPolicyContract = getState().store.contracts.monetaryPolicy
            const assetType = await futuresContract.methods.assetType(assetAddress).call()
            console.log(assetType)
            if (assetType == 1 || assetType == 2) {
                const amountValue = BigInt(amount * 10 ** decimals)

                console.log(`assetAddress: ${assetAddress} amount: ${amountValue} assetType ${assetType}`)
                const result = await monetaryPolicyContract.methods.calculateTokenValueInXCORAL(assetAddress, amountValue, assetType).call()
                return [result / 10 ** 9, amount]
            } else {

                const result = await monetaryPolicyContract.methods.calculateLPTokenValueInXCORAL(assetAddress, amountValue, assetType).call()
                return [result / 10 ** 9, amount]
            }

        } catch (e) {
            console.log(e)
        }
    }
)