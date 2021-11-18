import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import NextNprogress from "nextjs-progressbar";
import React, { useEffect } from "react";
import Notify from "bnc-notify"
import TradeModal from "./components/account/modals/TradeModal";
import { wrapper } from "../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import Onboard from "bnc-onboard";
import Web3 from "web3";
import { dispatchNotify, dispatchOnboard, dispatchWeb3forUser } from "../redux/reducers/rootReducer";
import getNetworkName from "../functions/getNetworkName"
import { repairConnect } from "../redux/reducers/asyncActions/repairConnect";
import { changeWalletAddress } from "../redux/reducers/asyncActions/changeWalletAddress";

const dappId = process.env.API_KEY
const networkId = +process.env.NEXT_PUBLIC_XCORAL_NETWORK_ID
function MyApp({ Component, pageProps }) {
    const dispatch = useDispatch()
    let setTimeOudDisconnectId
    
    const currentWalletAddress = useSelector(({ store }) => store.address)
    useEffect(() => {
        const notify = Notify({
            dappId,
            networkId
        })
        const onboard = Onboard({
            dappId,
            hideBranding: true,
            networkId,
            subscriptions: {
                wallet: wallet => {
                    if (!wallet.name) return
                    const web3 = new Web3(wallet.provider)
                    dispatch(dispatchWeb3forUser(web3))
                },
                network: networkId => {
                    if (networkId !== 3 && networkId !== undefined) {
                        toast.error(`You use ${getNetworkName(networkId)} Network, please switch to Ethereum Ropsten`, {
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                            pauseOnFocusLoss: false,
                        });
                        toast.warn("disconnect in 15 seconds", {
                            autoClose: 15000,
                            pauseOnHover: false,
                            pauseOnFocusLoss: false
                        })
                        setTimeOudDisconnectId = setTimeout(() => {

                        }, 15000)
                    } else if (networkId === undefined) {
                        toast.info("Disconnect", {
                            autoClose: 1000,
                            position: "bottom-center",
                            pauseOnHover: false,
                            pauseOnFocusLoss: false,
                        })
                    } else {
                        clearTimeout(setTimeOudDisconnectId)
                        toast.dismiss()
                    }


                },
                address: address => {
                    console.info("dispatch table info")
                    if (address != currentWalletAddress) {
                        if (!address) return
                        dispatch(changeWalletAddress(address))
                        toast.success(`${address.slice(0, 4) + '.'.repeat(3) + address.slice(-4)}`, { pauseOnFocusLoss: false })
                    }



                }
            },
            walletSelect: {
                wallets: [
                    { walletName: 'metamask', preferred: true, },
                    { walletName: 'binance' },
                    {
                        walletName: 'walletConnect',
                        infuraKey: '9f1757927fcf4dea9977f8b3b8748df9',
                        preferred: true,
                    },

                ]
            },
            walletCheck: [
                { checkName: 'derivationPath' },
                { checkName: 'connect' },
                { checkName: 'accounts' },
                { checkName: 'network' },
                // {checkName: 'balance', minimumBalance: '100000'}
            ]
        })
        dispatch(dispatchOnboard(onboard))
        dispatch(dispatchNotify(notify))
        dispatch(repairConnect())

    }, [])



    return (
        <>
            <NextNprogress
                color="#1ab0c4"
                startPosition={0.3}
                stopDelayMs={200}
                height="3"
            />

            <Component {...pageProps} />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <TradeModal />
        </>
    );
}

export default wrapper.withRedux(MyApp)