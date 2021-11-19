import {createAsyncThunk} from "@reduxjs/toolkit";

export const connectWallet = createAsyncThunk(
    "rootStore/connectData",
    async function(_, {getState, rejectWithValue}) {
        try {
            console.log('try')
            const onboard = getState().store.onboard
           const isSelected = await onboard.walletSelect()
                if(!isSelected) {
                    throw "dont selected error"
                    // i know
                }
            else if (isSelected) {
                console.log(isSelected)
              const isConnectedOnboard = await onboard.walletCheck()
                if (isConnectedOnboard) {
                    console.log(isConnectedOnboard)
                    const currentUserState = await onboard.getState()
                    const xCoralBalanceContract = getState().store.contracts.xCORAL
                    const xCoralBalance = await xCoralBalanceContract.methods.balanceOf(currentUserState.address).call()
                    return [currentUserState, xCoralBalance]
                } 
                

            } 

         } catch (e) {
            return rejectWithValue(e.message)
        }


    }
)