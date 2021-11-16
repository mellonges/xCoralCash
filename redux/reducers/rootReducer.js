import { createSlice } from "@reduxjs/toolkit";
import { connectWallet } from "./asyncActions/connectWallet";
import { disconnectWallet } from "./asyncActions/disconnectWallet";
import { repairConnect } from "./asyncActions/repairConnect";
import XCORAL_ABI from "../../ABI/xcoral.json"
import MONETARY_ABI from "../../ABI/monetary.json"
import FUTURES_ABI from "../../ABI/futures.json"
import TREASURY_ABI from "../../ABI/treasury.json"
import Web3 from "web3"
import { getWalletInfo } from "./asyncActions/getWalletInfo/getCurrentPriceReducer";
import { msToTime } from "@/functions/msToTime";
import { formatBalance } from "@/functions/formatBalance";
import { getFuturesTableInfo } from "./asyncActions/getFuturesTableInfo/getFuturesTableInfo";
import { changeWalletAddress } from "./asyncActions/changeWalletAddress";
import { toast } from "react-toastify";


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
        xCoralBalance: null,
        modalWindow: {
            isOpen: false,
            activeOperation: 1,
            data: {
                firstLoading: false,
                iconAddress: null,
                assetName: null,
                deposited: null,
                disabledRedeem: null,
                redeemable_xcoral: null

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
            systemInfo: null,
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
        openAndCloseModalWindow(state) {
            if(!state.isConnected) {
                toast.error("you must connect wallet", {position: "top-center", autoClose: false})
            } else {
                state.modalWindow.isOpen = !state.modalWindow.isOpen

            }
        },
        dispatchDataForModalWindow(state, action) {
            state.modalWindow.data.firstLoading = true
            state.modalWindow.data.disabledRedeem = action.payload.disabledRedeem
            state.modalWindow.data.iconAddress = action.payload.iconAddress
            state.modalWindow.data.assetName = action.payload.assetName
            state.modalWindow.data.deposited = action.payload.deposited
            state.modalWindow.data.redeemable_xcoral = action.payload.redeemable_xcoral
            state.modalWindow.data.firstLoading = false
        },
        setActiveOperation(state, action) {
        if (state.isConnected && state.modalWindow.data.disabledRedeem  &&  action.payload === 2 || action.payload === 1) {
                state.modalWindow.activeOperation = action.payload
            } 
        }
    },
    extraReducers: {
        [connectWallet.fulfilled]: (state, action) => {
            state.isConnected = true
            state.address = action.payload[0].address
            state.network = action.payload[0].network
            state.balance = action.payload[0].balance == null ? 0 : action.payload.balance
            state.xCoralBalance = formatBalance(action.payload[1] / 10 ** 9).slice(1)
            localStorage.setItem("selectedWallet", action.payload[0].wallet.name)
            localStorage.setItem("lastWalletAddress", action.payload[0].address)

        },
        [connectWallet.rejected]: () => {
            console.error("закрыл окно уебок")
        },
        [disconnectWallet.fulfilled]: (state) => {
            state.address = null
            state.network = null
            state.balance = null
            state.xCoralBalance = null
            state.isConnected = false
            localStorage.clear()
        },

        [repairConnect.fulfilled]: (state, action) => {
            state.isConnected = true
            state.address = action.payload[2]
            state.network = action.payload[0].network
            state.balance = action.payload[0].balance == null ? 0 : action.payload.balance
            state.xCoralBalance = formatBalance(action.payload[1] / 10 ** 9).slice(1)

        },
        [repairConnect.rejected]: () => {
            console.log("repairConnect error")
        },
        [changeWalletAddress.fulfilled]: (state, action) => {
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
            } else state.walletMiniInfo.nextRebaseIn = msToTime(nextRebaseIn)
        },
        [getFuturesTableInfo.pending]: (state) => {
            state.futuresTableInfo.init = false
        },
        [getFuturesTableInfo.fulfilled]: (state, action) => {
            state.futuresTableInfo.data = action.payload
            state.futuresTableInfo.init = true

        },

    }

})


export default rootStore.reducer
export const { dispatchOnboard, dispatchWeb3forUser, openAndCloseModalWindow, setActiveOperation, dispatchDataForModalWindow } = rootStore.actions
