import { createAsyncThunk } from "@reduxjs/toolkit";

const sendTransactionReducer = createAsyncThunk(
    "rootStore/sendTransactionReducer",
    async function ({ amount, assetAddress, termsID, methods, decimals }, { getState }) {
        try {
            let encodeABI
            const userAddress = getState.store.address
            const futures = getState.store.contracts.futures
            const web3 = getState().store.web3ForUser
            const amountValue = amount * 10 ** decimals
            if (methods === "deposit") {
                encodeABI = await futures.methods.deposit(amountValue, assetAddress, termsID, userAddress)
            } else if (methods === "redeem") {
                encodeABI = await futures.methods.redeemAsset(userAddress, assetAddress, termsID)
            }
            web3.sendTransaction({
                from: userAddress,
                to: process.env.NEXT_PUBLIC_FUTURES,
                data: encodeABI,
            })
        } catch (e) {

        }
    }
)