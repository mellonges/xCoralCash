import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendTransactionReducer = createAsyncThunk(
    "rootStore/sendTransactionReducer",
    async function({ inputValue, coinAddress, termsID, methods, decimals }, { getState }) {
    try {
        let encodeABI
        const userAddress = getState().stinputValueore.address
        const futures = getState().store.contracts.futures
        const web3 = getState().store.web3ForUser
        const amountValue = (inputValue * 10 ** decimals)
        if (methods === "deposit") {
            encodeABI = await futures.methods.deposit(amountValue, coinAddress, termsID, userAddress).encodeABI()
        } else if (methods === "redeem") {
            encodeABI = await futures.methods.redeemAsset(userAddress, coinAddress, termsID).encodeABI()
        }
        web3.eth.sendTransaction({
            from: userAddress,
            to: process.env.NEXT_PUBLIC_FUTURES,
            data: encodeABI,
        })
    } catch (e) {
        console.error(e)
    }
    })