import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';
import NextNprogress from "nextjs-progressbar";
import axios from "axios";
import NProgress from "nprogress";
import Amplify from "aws-amplify";
import React, {useEffect} from "react";

Amplify.configure({
    Auth: {
        region: "us-east-1",
        userPoolId: "us-east-1_uokTPpod8",
        userPoolWebClientId: "34a9d8hhtf78j9lkde2srnmsnp",
    },
});


import TradeModal from "./components/account/modals/TradeModal";
import DepositModal from "./components/account/modals/deposit/DepositModal";
import WithdrawModal from "./components/account/modals/withdraw/WithdrawModal";
import {wrapper} from "../redux/Store";
import {useDispatch, useSelector} from "react-redux";
import Onboard from "bnc-onboard";
import Web3 from "web3";
import {dispatchOnboard, dispatchWeb3forUser} from "../redux/reducers/rootReducer";
import getNetworkName from "../functions/getNetworkName"
import {disconnectWallet} from "../redux/reducers/asyncActions/disconnectWallet";
import {repairConnect} from "../redux/reducers/asyncActions/repairConnect";
import {changeWalletAddress} from "../redux/reducers/asyncActions/changeWalletAddress";

const dappId = process.env.API_KEY
const networkId = 3
function MyApp({Component, pageProps}) {
     let setTimeOudDisconnectId
    const dispatch = useDispatch()
    const isConnected = useSelector(({store}) => store.isConnected)
    const currentWalletAddress = useSelector(({store}) => store.address)
    useEffect(() => {
        // console.log("render");
        const onboard = Onboard({
            dappId,
            hideBranding: true,
            networkId,
            subscriptions: {
                wallet: wallet => {
                    if (!wallet) return
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
                        toast.warn("disconnect in 15 seconds", {autoClose: 15000, pauseOnHover: false, pauseOnFocusLoss: false})
                       setTimeOudDisconnectId =  setTimeout(() => {
                                dispatch(disconnectWallet())
                            }, 15000)
                    } else if (networkId === undefined) {
                        toast.info("Disconnect", {autoClose: 1000, position: "bottom-center", pauseOnHover: false, pauseOnFocusLoss: false,})
                    } else {
                        clearTimeout(setTimeOudDisconnectId)
                        toast.dismiss()
                        // toast.success("Returned to Ethereum Mainnet",{pauseOnHover: false, pauseOnFocusLoss: false,})
                    }


                },
                address: address => {
                    // console.log(address)
                    if (address != currentWalletAddress) {
                        if (!address) return
                        dispatch(changeWalletAddress(address))
                        toast.success(`${address.slice(0, 4) + '.'.repeat(3) + address.slice(-4)}`, {pauseOnFocusLoss: false})
                    }


                    // if (isConnected) {
                    //     changeWalletAddress(address)
                    // }
                }
            },
            walletSelect: {
                wallets: [
                    {walletName: 'metamask'},
                    {walletName: 'coinbase', preferred: true},
                    {walletName: 'binance'},
                    {
                        walletName: 'portis',
                        apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b'
                    },
                    {
                        walletName: 'walletConnect',
                        infuraKey: '9f1757927fcf4dea9977f8b3b8748df9'
                    },

                ]
            },
            walletCheck: [
                {checkName: 'derivationPath'},
                {checkName: 'connect'},
                {checkName: 'accounts'},
                {checkName: 'network'},
                // {checkName: 'balance', minimumBalance: '100000'}
            ]
        })
        dispatch(dispatchOnboard(onboard))
        dispatch(repairConnect())
    }, [])
    let loading;
    axios.defaults.onDownloadProgress = (e) => {
        const percentage = calculatePercentage(e.loaded, e.total);
        NProgress.set(percentage);
    };
    const calculatePercentage = (loaded, total) =>
        Math.floor(loaded * 1.0) / total;

    axios.interceptors.request.use((config) => {
        if (!loading) {
            NProgress.start();
            loading = true;
        }
        return config;
    });
    axios.interceptors.response.use((response) => {
        if (loading) {
            NProgress.done();
            loading = undefined;
        }
        return response;
    });


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
            {/*<DepositModal/>*/}
            {/*<WithdrawModal/>*/}
        </>
    );
}

export default wrapper.withRedux(MyApp)