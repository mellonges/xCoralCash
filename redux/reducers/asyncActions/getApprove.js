import {createAsyncThunk} from "@reduxjs/toolkit";
import {getApproveAllContracts} from "@/functions/getFuckingApprove";

export const getApprove = createAsyncThunk(
    "rootStore/getApprove",
    async function(assetAddress, {getState}) {
        try {
            const notify = getState().store.notify
            const encodeABI = await getApproveAllContracts(assetAddress)
            console.log("its encodeABI log ")
            const userAddress = getState().store.address
            const web3 = getState().store.web3ForUser
           await web3.eth.sendTransaction({
                from: userAddress,
                to: assetAddress,
                data: encodeABI,
            }).on("transactionHash", (hash) => {
                notify.hash(hash)
            })
        } catch (e) {
            console.error(e)
        }
    }

)