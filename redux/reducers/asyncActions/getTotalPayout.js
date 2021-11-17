import {createAsyncThunk} from "@reduxjs/toolkit";

export const getTotalPayout = createAsyncThunk(
    "rootStore/getTotalPayOut",
    async function({assetAddress, amount}, {getState}) {
            try {
                const futuresContract = getState().store.contracts.futures
                const monetaryPolicyContract = getState().store.contracts.monetaryPolicy
                const assetType = await futuresContract.methods.assetType(assetAddress).call()
                console.log(assetType)
                if (assetType == 1) {

                    const result = await monetaryPolicyContract.methods.calculateTokenValueInXCORAL(assetAddress, amount, assetType).call()
                    return result / 10 ** 9
                } else {
                    console.log(`assetAddress: ${assetAddress} amount: ${amount} assetType ${assetType}`)
                    const result = await monetaryPolicyContract.methods.calculateLPTokenValueInXCORAL(assetAddress, amount, assetType).call()
                    return result / 10 ** 9
                }

            } catch (e) {
                console.log(e)
            }
    }
)