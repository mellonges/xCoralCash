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
                    const {address} = currentUserState
                    const xCoralBalanceContract = getState().store.contracts.xCORAL
                    const xCoralBalance = await xCoralBalanceContract.methods.balanceOf(address).call()
                    return [currentUserState, xCoralBalance]
                }
            }

         } catch (e) {
            console.info(e)
        }


    }
)