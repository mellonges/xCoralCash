import {createAsyncThunk} from "@reduxjs/toolkit";
export const repairConnect = createAsyncThunk(
    "rootStore/repairConnect",
async function(_, {getState, rejectWithValue}) {
    try { 
        const walletName = localStorage.getItem("selectedWallet")

        if(walletName) {
            const onboard = getState().store.onboard
            const isSelectedSuccess = await onboard.walletSelect(walletName)
            if (isSelectedSuccess) {
               const  currentUserState = onboard.getState()
                return currentUserState
            }
        } else {
            throw new Error("was not connected earlier")
        }
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)