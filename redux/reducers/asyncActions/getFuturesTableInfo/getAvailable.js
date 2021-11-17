import {createAsyncThunk} from "@reduxjs/toolkit";

export const getAvailable = createAsyncThunk(
    "rootStore/getAvailable",
    async function(assetName, {getState}) {
        try {
            switch (assetName) {
                case "DAI": {
                    const contract = getState().store.ERC20.DAI
                    const userAddress = getState().store.address
                    console.log(userAddress)
                    const available = await contract.methods.balanceOf(userAddress).call()
                    const decimals = localStorage.getItem("daiDecimals")
                    return [available, decimals]

                }
                case "USDC": {
                    const contract = getState().store.ERC20.USDC
                    const userAddress = getState().store.address
                    const available = await contract.methods.balanceOf(userAddress).call()
                    const decimals = localStorage.getItem("usdcDecimals")
                    return [available, decimals]

                }
                case "xCORAL-DAI LP": {
                    const contract = getState().store.ERC20.XCORAL_DAI_UNI_LP
                    const userAddress = getState().store.address
                    const available = await contract.methods.balanceOf(userAddress).call()
                    const decimals = localStorage.getItem("XCORAL_DAI_UNI_LP_VALUE_Decimals")
                    return [available, decimals]

                }
                case "SUIKO": {
                    const contract = getState().store.ERC20.SUIKO
                    const userAddress = getState().store.address
                    const available = await contract.methods.balanceOf(userAddress).call()
                    const decimals = localStorage.getItem("suikoDecimals")
                    return [available, decimals]

                }
                case "wETH": {
                    const contract = getState().store.ERC20.WETH
                    const userAddress = getState().store.address
                    const decimals = localStorage.getItem("wethDecimals")

                    const available = await contract.methods.balanceOf(userAddress).call()
                    return [available, decimals]

                }

                case "xCORAL": {
                    const contract = getState().store.ERC20.xCORAL
                    const userAddress = getState().store.address
                    const available = await contract.methods.balanceOf(userAddress).call()
                    const decimals = await contract.methods.decimals().call()
                    return [available, decimals]
                }
            }

        } catch (e) {
            console.error(e)
        }
    }
)