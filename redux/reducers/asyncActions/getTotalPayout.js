import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllowance } from "@/functions/getAllowance";

export const getTotalPayout = createAsyncThunk(
    "rootStore/getTotalPayOut",
    async function ({ assetAddress, amount, decimals }, { getState }) {

        try {
            const amountValue = BigInt(amount * 10 ** decimals)
            const futuresContract = getState().store.contracts.futures
            const userAddress = getState().store.address
            const monetaryPolicyContract = getState().store.contracts.monetaryPolicy
            const assetType = await futuresContract.methods.assetType(assetAddress).call()
            const allowance = await getAllowance(userAddress, assetAddress)
            if (assetType == 1 || assetType == 2) {
                console.log(4)
                const result = await monetaryPolicyContract.methods.calculateTokenValueInXCORAL(assetAddress, amountValue, assetType).call()
                console.log(`rusult ${result}`)
                console.log(5)
                return [result / 10 ** 9, amount, allowance / 10 ** decimals]
            } else {
                console.log(7)
                const result = await monetaryPolicyContract.methods.calculateLPTokenValueInXCORAL(assetAddress, amountValue, assetType).call()
                return [result / 10 ** 9, amount, allowance / 10 ** decimals]
            }

        } catch (e) {
            console.log(e)
        }
    }
)