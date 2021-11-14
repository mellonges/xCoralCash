import { createAsyncThunk } from "@reduxjs/toolkit";
import { combineTableInfo } from "@/functions/combine";
import { msToTime } from "@/functions/msToTime";
export const getFuturesTableInfo = createAsyncThunk(
    "rootStore/getFuturesTableInfo",
    async function (_, { getState }) {
        try {
            const secondsInYear = 31536000

            const futures = getState().store.contracts.futures
            const monetaryPolicy = getState().store.contracts.monetaryPolicy
            let userTableData
            let address = localStorage.getItem("lastWalletAddress")
            if (!address) {
                userTableData = await futures.methods.pendingPayoutFor("0xbe9cFBf33f987A3B0a9E0616F98E34f0B9D8F819").call()
                console.log(userTableData)
            }
            const assetsData = await futures.methods.supportedAssets().call()
            const currentMultiplier = await monetaryPolicy.methods.currentAppreciationMultiplier().call()
            const rebaseInterval = await monetaryPolicy.methods.rebaseCooldown().call()
            const userArr = combineTableInfo(userTableData)

            const futuresTableData = combineTableInfo(assetsData).map(i => {
                const vestingRewardsTerm = i["1"][4] * 13
                return {
                    termsID: i['1'][0],
                    expiration: msToTime(vestingRewardsTerm),
                    DEPOSITED_AND_REDEEMABLE: userArr.filter(item => item['0'][2] == i[1][0]),
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


            return futuresTableData
        } catch (e) {
            console.log("error нахуй ")
            console.info(e.message)
        }
    }
)


