import { createSlice } from "@reduxjs/toolkit";
import { connectWallet } from "./asyncActions/connectWallet";
import { disconnectWallet } from "./asyncActions/disconnectWallet";
import { repairConnect } from "./asyncActions/repairConnect";
import XCORAL_ABI from "../../ABI/xcoral.json";
import MONETARY_ABI from "../../ABI/monetary.json";
import FUTURES_ABI from "../../ABI/futures.json";
import TREASURY_ABI from "../../ABI/treasury.json";
import Web3 from "web3"
import { getWalletInfo } from "./asyncActions/getWalletInfo/getCurrentPriceReducer";
import { msToTimeForDashboard } from "@/functions/msToTime";
import { formatBalance } from "@/functions/formatBalance";
import { getFuturesTableInfo } from "./asyncActions/getFuturesTableInfo/getFuturesTableInfo";
import { changeWalletAddress } from "./asyncActions/changeWalletAddress";
import { toast } from "react-toastify";
import { getAvailable } from "./asyncActions/getFuturesTableInfo/getAvailable";
import { getTotalPayout } from "./asyncActions/getTotalPayout";
import { sendTransactionReducer } from "./sendTransactionReducer";
import { getApprove } from "./asyncActions/getApprove";


const web3 = new Web3(process.env.INFURA_NET)
const contracts = {
    xCORAL: new web3.eth.Contract(XCORAL_ABI, process.env.xCORAL),
    monetaryPolicy: new web3.eth.Contract(MONETARY_ABI, process.env.monetaryPolicy),
    futures: new web3.eth.Contract(FUTURES_ABI, process.env.futures),
    treasury: new web3.eth.Contract(TREASURY_ABI, process.env.treasury),
}

const ERC20 = {
    DAI: new web3.eth.Contract(XCORAL_ABI, process.env.NEXT_PUBLIC_DAI),
    USDC: new web3.eth.Contract(XCORAL_ABI, process.env.NEXT_PUBLIC_USDC),
    XCORAL_DAI_UNI_LP: new web3.eth.Contract(XCORAL_ABI, process.env.NEXT_PUBLIC_XCORAL_DAI_UNI_LP),
    SUIKO: new web3.eth.Contract(XCORAL_ABI, process.env.NEXT_PUBLIC_SUIKO),
    WETH: new web3.eth.Contract(XCORAL_ABI, process.env.NEXT_PUBLIC_WETH),
    xCORAL: contracts.xCORAL
}
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const rootStore = createSlice({
    name: "rootStore",
    initialState: {
        onboard: null,
        web3ForUser: null,
        isConnected: false,
        address: "0x0000000000000000000000",
        balance: null,
        network: null,
        web3ForERC20: web3,
        notify: null,
        xCoralBalance: null,
        modalWindow: {
            isOpen: false,
            activeOperation: 1,
            data: {
                Loading: true,
                iconAddress: null,
                assetName: null,
                deposited: null,
                disabledRedeem: null,
                redeemable_xcoral: null,
                expiration: null,
                APY: null,
                available: null,
                decimals: null,
                totalPayout: null,
                coinAddress: null,
                loadingButton: null,
                inputValue: null,
                allowance: null,
                termsID: null,
                isAvailable: null,
                reload: 0,


            },
        },
        walletMiniInfo: {
            currentPrice: null,
            targetPrice: null,
            currentAPY: null,
            nextRebaseIn: null,

        },

        futuresTableInfo: {
            init: false,
            data: null,
            hardReload: 0,

        },

        contracts,
        ERC20,
    }, reducers: {
        dispatchOnboard(state, action) {
            state.onboard = action.payload
        },
        dispatchWeb3forUser(state, action) {
            state.web3ForUser = action.payload
        },
        dispatchNotify(state, action) {
            state.notify = action.payload
        },
        openAndCloseModalWindow(state) {
            if (!state.isConnected) {
                toast.info("Please connect your wallet", { position: "bottom-right", autoClose: 1500 })
            } else {
                state.modalWindow.isOpen = !state.modalWindow.isOpen
            }
        },
        dispatchDataForModalWindow(state, action) {
            state.modalWindow.data.Loading = true
            state.modalWindow.data.disabledRedeem = action.payload.disabledRedeem
            state.modalWindow.data.iconAddress = action.payload.iconAddress
            state.modalWindow.data.assetName = action.payload.assetName
            state.modalWindow.data.deposited = action.payload.deposited
            state.modalWindow.data.redeemable_xcoral = action.payload.redeemable_xcoral
            state.modalWindow.data.APY = action.payload.APY
            state.modalWindow.data.termsID = action.payload.termsID
            state.modalWindow.data.coinAddress = action.payload.coinAddress
            const expiration = new Date(action.payload.expiration * 1000 + Date.now())
            state.modalWindow.data.expiration = `${monthNames[expiration.getMonth()]} ${expiration.getDate()} ${expiration.getFullYear()}`
            state.modalWindow.data.Loading = false
        },
        setActiveOperation(state, action) {
            state.modalWindow.data.isAvailable = action.payload.isAvailable

            if (state.isConnected && state.modalWindow.data.disabledRedeem && action.payload.operation === 2 || action.payload.operation === 1) {
                state.modalWindow.activeOperation = action.payload.operation
            }
        },
        setActiveOperationForRedeemButton(state, action) {
            if (action.payload.isAvailable && action.payload.operation !== 2)
                state.modalWindow.activeOperation = action.payload.operation
            else if (action.payload.operation === 2 && state.modalWindow.data.disabledRedeem) {
                state.modalWindow.activeOperation = action.payload.operation
            }
        }
    },
    extraReducers: {
        [connectWallet.fulfilled]: (state, action) => {
            state.address = action.payload[0].address
            state.network = action.payload[0].network
            state.balance = action.payload[0].balance == null ? 0 : action.payload.balance
            console.log("tut")
            state.xCoralBalance = formatBalance(action.payload[1] / 10 ** 9).slice(1)
            localStorage.setItem("selectedWallet", action.payload[0].wallet.name)
            localStorage.setItem("lastWalletAddress", action.payload[0].address)
            state.isConnected = true

        },
        [connectWallet.rejected]: () => {

            console.error("dont selected walllet")
        },
        [disconnectWallet.fulfilled]: state => {
            state.address = null
            state.network = null
            state.balance = null
            state.xCoralBalance = null
            state.isConnected = false
            localStorage.clear()
        },

        [repairConnect.fulfilled]: (state, action) => {
            state.address = action.payload[2]
            state.network = action.payload[0].network
            state.balance = action.payload[0].balance == null ? 0 : action.payload.balance
            state.xCoralBalance = formatBalance(action.payload[1] / 10 ** 9).slice(1)
            state.isConnected = true

        },
        [repairConnect.rejected]: () => {
            console.log("repairConnect error")
        },
        [changeWalletAddress.fulfilled]: (state, action) => {
            if (!state.isConnected) return
            state.address = action.payload[0]
            state.xCoralBalance = formatBalance(action.payload[1] / 10 ** 9).slice(1)
            localStorage.setItem("lastWalletAddress", action.payload[0])
        },

        [getWalletInfo.fulfilled]: (state, action) => {
            state.walletMiniInfo.currentPrice = "$" + (action.payload[0] / 10 ** 18).toFixed(2)
            state.walletMiniInfo.targetPrice = "$" + (action.payload[1] / 10 ** 18).toFixed(2)
            state.walletMiniInfo.currentAPY = (formatBalance(((((action.payload[2] / 10 ** 5) ** (8760 / (action.payload[3] / 3600))) - 1) * 100).toFixed(2)) + "%").slice(1)
            const nextRebaseIn = action.payload[4] - (Date.now() / 1000).toFixed(0)
            if (nextRebaseIn <= 0) {
                state.walletMiniInfo.nextRebaseIn = "Happening now"
            } else state.walletMiniInfo.nextRebaseIn = msToTimeForDashboard(nextRebaseIn)
        },
        [getFuturesTableInfo.pending]: state => {
            state.futuresTableInfo.init = false
        },
        [getFuturesTableInfo.fulfilled]: (state, action) => {
            state.futuresTableInfo.data = action.payload
            state.futuresTableInfo.init = true


        },

        [getAvailable.fulfilled]: (state, action) => {
            state.modalWindow.data.available = action.payload[0]
            state.modalWindow.data.decimals = action.payload[1]
            state.modalWindow.data.Loading = false
        },
        [getTotalPayout.pending]: state => {
            state.modalWindow.data.reload = false
            state.modalWindow.data.Loading = true
        },
        [getTotalPayout.fulfilled]: (state, action) => {

            state.modalWindow.data.totalPayout = action.payload[0]
            state.modalWindow.data.inputValue = action.payload[1]
            state.modalWindow.data.allowance = action.payload[2]
            state.modalWindow.data.Loading = false
        },
        [sendTransactionReducer.pending]: state => {
            state.modalWindow.data.loadingButton = true
        },

        [sendTransactionReducer.fulfilled]: (state) => {
            state.modalWindow.isOpen = false
            state.modalWindow.data.loadingButton = false
            state.futuresTableInfo.hardReload += 1
        },
        [sendTransactionReducer.rejected]: state => {
          state.modalWindow.data.loadingButton = false
            console.log("rejected")
        },
        [getApprove.pending]: state => {
            state.modalWindow.data.loadingButton = true
        },

        [getApprove.rejected]: state => {
            state.modalWindow.data.loadingButton = false
        },
        [getApprove.fulfilled]: state => {
            state.modalWindow.data.reload = true
            state.modalWindow.data.loadingButton = false
            // state.modalWindow.isOpen = false
        }
    }

})


export default rootStore.reducer
export const { dispatchOnboard, dispatchWeb3forUser, openAndCloseModalWindow, setActiveOperation, dispatchDataForModalWindow, dispatchNotify, setActiveOperationForRedeemButton } = rootStore.actions
