import { createAsyncThunk } from "@reduxjs/toolkit";
import {getFuturesTableInfo} from "./asyncActions/getFuturesTableInfo/getFuturesTableInfo";
import {error} from "next/dist/build/output/log";

export const sendTransactionReducer = createAsyncThunk(
    "rootStore/sendTransactionReducer",
    async function({ inputValue = 0, coinAddress, termsID, methods, decimals = 0 }, { getState }) {
    try {
        let encodeABI
        const userAddress = getState().store.address
        const futures = getState().store.contracts.futures
        const web3 = getState().store.web3ForUser
        const amountValue = BigInt(inputValue * 10 ** decimals)
        const notify = getState().store.notify
        if (methods === "deposit") {
            console.log(`amountValue: ${amountValue} coinAddress: ${coinAddress} termsID ${termsID} ${userAddress}`)
            encodeABI = await futures.methods.deposit(amountValue, coinAddress, termsID, userAddress).encodeABI()
        } else if (methods === "redeem") {
            console.log("coinAddress" + "  " + coinAddress)
            encodeABI = await futures.methods.redeemAsset(userAddress, coinAddress, termsID).encodeABI()
        }
        //    await web3.eth.sendTransaction({
        //     from: userAddress,
        //     to: process.env.NEXT_PUBLIC_FUTURES,
        //     data: encodeABI,
        // }).on("transactionHash", (hash) => {
        //     const {emitter} =  notify.hash(hash)
        //      emitter.on("txConfirmed",  () => {
        //         console.log("from emiter")
                
        //     })

        // })

        await new Promise((resolve, reject) => {
            web3.eth.sendTransaction({
              from: userAddress,
              to: process.env.NEXT_PUBLIC_FUTURES,
              data: encodeABI,
            }).on("transactionHash", (hash) => {
              const {emitter} =  notify.hash(hash)
              emitter.on("txConfirmed",  () => {
                console.log("from emiter")
                resolve()

              })
            }).on("error", (error) => {
                reject(error)
            })
          }
          )

    } catch (e) {
        return  rejectWithValue(e)
    }
    })