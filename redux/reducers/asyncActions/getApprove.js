import {createAsyncThunk} from "@reduxjs/toolkit";
import {getApproveAllContracts} from "@/functions/getFuckingApprove";

export const getApprove = createAsyncThunk(
    "rootStore/getApprove",
    async function(assetAddress, {getState, rejectWithValue}) {
        try {
            const notify = getState().store.notify
            const encodeABI = await getApproveAllContracts(assetAddress)
            console.log("its encodeABI log ")
            const userAddress = getState().store.address
            const web3 = getState().store.web3ForUser
            await new Promise((resolve, reject) => {
                web3.eth.sendTransaction({
                    from: userAddress,
                    to: assetAddress,
                    data: encodeABI,
                }).on("transactionHash", (hash) => {
                  const {emitter} = notify.hash(hash)
                    emitter.on("txConfirmed",  () => {
                        console.log("from emiter")
                        resolve()
                    })
                }).on("error", (error) => {
                    reject(error)
                })
                })
        } catch (e) {
           return  rejectWithValue(e)
        }
    }

)