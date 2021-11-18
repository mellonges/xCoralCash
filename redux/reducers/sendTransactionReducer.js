import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendTransactionReducer = createAsyncThunk(
    "rootStore/sendTransactionReducer",
    async function({ inputValue = 0, coinAddress, termsID, methods, decimals = 0 }, { getState }) {
    try {
        let encodeABI
        const userAddress = getState().store.address
        console.log(userAddress + "44 12312 ")
        const futures = getState().store.contracts.futures
        const web3 = getState().store.web3ForUser
        const amountValue = BigInt(inputValue * 10 ** decimals)
        const notify = getState().store.notify
        if (methods === "deposit") {
            encodeABI = await futures.methods.deposit(amountValue, coinAddress, termsID, userAddress).encodeABI()
        } else if (methods === "redeem") {
            console.log("coinAddress" + "  " + coinAddress)
            encodeABI = await futures.methods.redeemAsset(userAddress, coinAddress, termsID).encodeABI()
        }
        web3.eth.sendTransaction({
            from: userAddress,
            to: process.env.NEXT_PUBLIC_FUTURES,
            data: encodeABI,
        }).on("transactionHash", (hash) => {
            notify.hash(hash)
        } )
    } catch (e) {
        console.error(e)
    }
    })