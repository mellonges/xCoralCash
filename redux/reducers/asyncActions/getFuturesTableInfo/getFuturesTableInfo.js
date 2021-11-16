import { createAsyncThunk } from "@reduxjs/toolkit";
import { combineTableInfo } from "@/functions/combine";

export const getFuturesTableInfo = createAsyncThunk(
    "rootStore/getFuturesTableInfo",
    async function (_, { getState }) {
        try {
            const isConnected = getState().store.isConnected
            let userArr
            let dai
            let xCoral
            let XCORAL_DAI_UNI_LP_VALUE
            let suiko
            let usdc
            let weth
            let getDecimals
            const secondsInYear = 31536000
            const { futures, monetaryPolicy } = getState().store.contracts
            let userTableData
            let address = localStorage.getItem("lastWalletAddress")
            // let address = getState().store.address
            console.log(address)
            if (address && isConnected) {
                if ("if")
                    userTableData = await futures.methods.pendingPayoutFor(address).call()
                console.log(userTableData)
                userArr = combineTableInfo(userTableData)

                ///erc20 calc
                const { xCORAL, DAI, SUIKO, USDC, WETH, XCORAL_DAI_UNI_LP } = getState().store.ERC20
                let daiPromise = DAI.methods.decimals().call()
                let xCoralPromise = xCORAL.methods.decimals().call()
                let XCORAL_DAI_UNI_LP_Promise = XCORAL_DAI_UNI_LP.methods.decimals().call()
                let suikoPromise = SUIKO.methods.decimals().call()
                let usdcPromise = USDC.methods.decimals().call()
                let wethPromise = WETH.methods.decimals().call()
                dai = await daiPromise
                xCoral = await xCoralPromise
                suiko = await suikoPromise
                usdc = await usdcPromise
                XCORAL_DAI_UNI_LP_VALUE = await XCORAL_DAI_UNI_LP_Promise
                weth = await wethPromise
                getDecimals = (ERC20) => {
                    switch (ERC20) {
                        case process.env.NEXT_PUBLIC_DAI: {
                            return dai
                        }
                        case process.env.NEXT_PUBLIC_USDC: {
                            return usdc
                        }
                        case process.env.NEXT_PUBLIC_XCORAL_DAI_UNI_LP: {
                            return XCORAL_DAI_UNI_LP_VALUE
                        }
                        case process.env.NEXT_PUBLIC_SUIKO: {
                            return suiko
                        }
                        case process.env.NEXT_PUBLIC_WETH: {
                            return weth
                        }
                        case process.env.NEXT_PUBLIC_XCORAL: {
                            return xCoral
                        }
                    }
                }

            }
            const assetsData = await futures.methods.supportedAssets().call()
            const currentMultiplier = await monetaryPolicy.methods.currentAppreciationMultiplier().call()
            const rebaseInterval = await monetaryPolicy.methods.rebaseCooldown().call()




            const futuresTableData = combineTableInfo(assetsData).map(i => {
                const vestingRewardsTerm = i["1"][4] * 13

                return {
                    coinName: i[0],
                    termsID: i['1'][0],
                    expiration: vestingRewardsTerm,
                    DEPOSITED_AND_REDEEMABLE: (function () {

                        if (isConnected) {


                            return (userArr.filter(item => item['0'][2] == i[1][0])
                                .reduce((sum, current) => {
                                    console.log(current)
                                    return {
                                        deposited: +sum.deposited + (+current['0'][5] / 10 ** getDecimals(current['0'][6])),
                                        asset: current['0'][6],
                                        redeemable_xcoral: +sum.redeemable_xcoral + (current['1'] / 10 ** 9),
                                        upcoming_xcoral: +sum.upcoming_xcoral + (current['2'] / 10 ** 9),
                                    }
                                }, { deposited: 0, asset: null, redeemable_xcoral: null, upcoming_xcoral: null }))
                        } else {

                            return {
                                deposited: null,
                                asset: null,
                                redeemable_xcoral: null,
                                upcoming_xcoral: null,
                            }
                        }
                    })(),
                    yield: (
                        (+i["2"] / 10 ** 5 + 1)
                        **
                        (secondsInYear / vestingRewardsTerm)
                        *
                        (
                            (currentMultiplier / 10 ** 5)
                            **
                            (8760 / (rebaseInterval / 3600))
                        )
                        - 1
                    ) * 100
                }


            })

            // const erc20Arr = futuresTableData.map(item => {
            //     if (item.DEPOSITED_AND_REDEEMABLE.asset) {
            //         return item.DEPOSITED_AND_REDEEMABLE.asset
            //     }
            // }).filter(i => i)


            return futuresTableData
        } catch (e) {
            console.log("error нахуй")
            console.info(e.message)
        }
    }
)


