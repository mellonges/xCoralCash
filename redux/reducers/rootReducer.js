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
import { combineTableInfo } from "@/functions/combine";

const web3 = new Web3(process.env.INFURA_NET)
const secondsInYear = 31536000
const contracts = {
    xCORAL: new web3.eth.Contract(XCORAL_ABI, process.env.xCORAL),
    monetaryPolicy: new web3.eth.Contract(MONETARY_ABI, process.env.monetaryPolicy),
    futures: new web3.eth.Contract(FUTURES_ABI, process.env.futures),
    treasury: new web3.eth.Contract(TREASURY_ABI, process.env.treasury),
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
        xCoralBalance: null,
        modalWindow: {
            isOpen: false,
            activeOperation: 1,
            data: {},
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
    }, reducers: {
        dispatchOnboard(state, action) {
            state.onboard = action.payload
        },
        dispatchWeb3forUser(state, action) {
            state.web3ForUser = action.payload
        },
        openAndCloseModalWindow(state) {
            state.modalWindow.isOpen = !state.modalWindow.isOpen
        },
        setActiveOperation(state, action) {
            if (state.isConnected && action.payload === 2 || action.payload === 1) {
                state.modalWindow.activeOperation = action.payload
            } else {
                return
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
        [disconnectWallet.fulfilled]: (state) => {
            state.isConnected = false
            state.address = null
            state.network = null
            state.balance = null
            state.xCoralBalance = null
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
        [getFuturesTableInfo.fulfilled]: (state, action) => {
            console.log(action.payload)
           const userArr = combineTableInfo(action.payload[1])
            state.futuresTableInfo.data = combineTableInfo(action.payload[0]).map(i => {
                    const vestingRewardsTerm = i["1"][4] * 13
                    console.log(`i[2]: ${i['2']} | seconds in Year: ${secondsInYear} | vestingRewards: ${vestingRewardsTerm} | payload2: ${action.payload[2]} | payload3: ${action.payload[3]}`)
                    return {
                        termsID: i['1'][0],
                        expiration: msToTime(vestingRewardsTerm),
                        testDataUser: userArr.filter(item => item['0'][2] == i[1][0]),
                        // yield: i['2'] / 10 ** 5 + 1
                        yield: ((+i["2"] / 10 ** 5 + 1) ** (secondsInYear / vestingRewardsTerm) * (action.payload[2] / 10 ** 5) * (8760 / (action.payload[3] / 3600)) - 1) * 100
                    }

            
            })
            state.futuresTableInfo.userTableTest = action.payload[1]
            state.futuresTableInfo.init = true

        }
    }

})


export default rootStore.reducer
export const { dispatchOnboard, dispatchWeb3forUser, openAndCloseModalWindow, setActiveOperation } = rootStore.actions
