import { createAsyncThunk } from "@reduxjs/toolkit";
import {getAllowance} from "@/functions/getAllowance";

export const getTotalPayout = createAsyncThunk(
    "rootStore/getTotalPayOut",
    async function ({ assetAddress, amount, decimals }, { getState }) {
        try {
            const futuresContract = getState().store.contracts.futures
            const userAddress = getState().store.address
            const monetaryPolicyContract = getState().store.contracts.monetaryPolicy
            const assetType = await futuresContract.methods.assetType(assetAddress).call()
            console.log(assetType)
            if (assetType == 1 || assetType == 2) {
                const amountValue = BigInt(amount * 10 ** decimals)

                const result = await monetaryPolicyContract.methods.calculateTokenValueInXCORAL(assetAddress, amountValue, assetType).call()
                const allowance = await getAllowance(userAddress, assetAddress)
                return [result / 10 ** 9, amount, allowance / 10 ** decimals]
            } else {

                const result = await monetaryPolicyContract.methods.calculateLPTokenValueInXCORAL(assetAddress, amountValue, assetType).call()
                return [result / 10 ** 9, amount]
            }

        } catch (e) {
            console.log(e)
        }
    }
)