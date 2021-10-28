import {createSlice} from "@reduxjs/toolkit";
import {connectWallet} from "./asyncActions/connectWallet";
import {disconnectWallet} from "./asyncActions/disconnectWallet";
import {repairConnect} from "./asyncActions/repairConnect";
const rootStore = createSlice({
    name: "rootStore",
    initialState: {
        onboard: null,
        web3ForUser: null,
        isConnected: false,
        address: "0x0000000000000000000000",
        balance: null,
        network: null,
    }, reducers: {
        dispatchOnboard(state, action) {
            state.onboard = action.payload
        },
        dispatchWeb3forUser(state, action) {
            state.web3ForUser = action.payload
        },
        changeWalletAddress(state, action) {
            console.log(action.payload)
            state.address = action.payload
        }
    },
    extraReducers: {
        [connectWallet.fulfilled]: (state, action) => {
                state.isConnected = true
                state.address = action.payload.address
            state.network = action.payload.network
            state.balance = action.payload.balance == null ? 0 : action.payload.balance
            localStorage.setItem("selectedWallet", action.payload.wallet.name)
            localStorage.setItem("lastWalletAddress", action.payload.address)
        },
        [disconnectWallet.fulfilled]: (state) => {
            state.isConnected = false
            localStorage.clear()
        },

        [repairConnect.fulfilled] : (state, action) => {
            state.isConnected = true
            // state.address = localStorage.getItem("lastWalletAddress")
            state.network = action.payload.network
            state.balance = action.payload.balance == null ? 0 : action.payload.balance
        },
        [repairConnect.rejected] : () => {
            console.log("repairConnect error")
        },
        

    }

})


export default rootStore.reducer
export const {dispatchOnboard, dispatchWeb3forUser, changeWalletAddress} = rootStore.actions
