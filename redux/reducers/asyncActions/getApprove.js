import {createAsyncThunk} from "@reduxjs/toolkit";
import {getApproveAllContracts} from "@/functions/getFuckingApprove";

export const getApprove = createAsyncThunk(
    "rootStore/getApprove",
    async function(assetAddress, {getState}) {
        try {
            const encodeABI = await getApproveAllContracts(assetAddress)
            const userAddress = getState().store.address
            const web3 = getState().store.web3ForUser
            web3.sendTransaction({
                from: userAddress,
                to: assetAddress,
                data: encodeABI,
            })
        } catch (e) {
            console.error(e)
        }
    }

)