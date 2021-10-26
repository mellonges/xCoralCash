import {createAsyncThunk} from "@reduxjs/toolkit";

export const connectWallet = createAsyncThunk(
    "rootStore/connectData",
    async function(_, {getState}) {
        try {
            const onboard = getState().store.onboard
           const isSelected = await onboard.walletSelect()
            if (isSelected) {
              const isConnectedOnboard = await onboard.walletCheck()
                if (isConnectedOnboard) {
                    const currentUserState = await onboard.getState()
                    return currentUserState
                }
            }

         } catch (e) {
            console.info(e)
        }


    }
)