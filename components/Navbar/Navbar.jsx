// import Link from 'next/link'
import React, {useEffect, useRef, useState} from 'react'
// import { Button } from 'reactstrap'
import styles from "styles/pages/account/Layout.module.scss"
// import { useState, useEffect, useRef } from 'react'
// import SearchForm from '../Home/SearchForm'
// import {AnimatePresence, motion} from 'framer-motion'
// import {ChangeAccountTradeModalState} from '../../../functions/observers'
import Link from "next/link";
// import {logOut} from "@/functions/getBackendData";
import {useDispatch, useSelector} from "react-redux";
import getNetworkName from "@/functions/getNetworkName";
// import { connect } from 'rxjs/operators'
import { toast } from 'react-toastify'
import {connectWallet} from "../../redux/reducers/asyncActions/connectWallet";
import {dispatchOnboard, dispatchWeb3forUser} from "../../redux/reducers/rootReducer";
import {disconnectWallet} from "../../redux/reducers/asyncActions/disconnectWallet";
import Onboard from "bnc-onboard";
import Web3 from "web3";
import {getWalletInfo} from "../../redux/reducers/asyncActions/getWalletInfo/getCurrentPriceReducer";
import {getFuturesTableInfo} from "../../redux/reducers/asyncActions/getFuturesTableInfo/getFuturesTableInfo";


const Navbar = () => {
    const dispatch = useDispatch()
    const isConnected = useSelector(({store}) => store.isConnected)
    const walletAddress = useSelector(({store}) => store.address)
    const network = useSelector(({store}) => store.network)

const connectFunctionForButton = () => {
        if (isConnected) {
            dispatch(disconnectWallet())
        } else {
            dispatch(connectWallet())
        }
}

    return (
        // <div className={styles.AccountWrapper}>
            <div className={styles.TopPanel}>


                <div
                    style={{justifyContent: "end"}}
                    className="d-none d-lg-flex align-items-center w-100">
                    {/*<div className={styles.searchFormWrapper}>*/}
                    {/*  <SearchForm classes={styles} />*/}
                    {/*</div>*/}
                    <div>
                        {isConnected && <div className={styles.displayAddressPlace}> 
                        {/* {getNetworkName(network)} */}
                            {getNetworkName(network)} network <b
                        className={styles.showAddress}>{walletAddress}</b></div>}
                    </div>
                     <button onClick={() => connectFunctionForButton()}
                        style={{backgroundColor: "#1ab0c4"}}
                        // onClick={(e) => {
                        //   e.preventDefault()
                        //   ChangeAccountTradeModalState({
                        //     isOpen: true,
                        //   })
                        // }}
                        className={`btn btn-primary ${styles.tradeBtn}`}
                    >
                        {isConnected ? "Disconnect" : "Connect Wallet"}
                    </button>
                </div>
                <div
                    className={`${styles.top} d-flex d-lg-none w-100 align-items-center`}
                >


                    <div className={styles.leftSideNav}>
                        <div className={styles.top}
                             style={{justifyContent: "end"}}
                        >
                             {isConnected ? <div className={styles.displayAddressPlace}> {getNetworkName(network)} network <b
                             className={styles.showAddress}>{walletAddress.slice(0, 4) + '.'.repeat(3) + walletAddress.slice(-4)}</b></div> : <Link href="/account/">
                               <a
                                   style={{
                                    fontFamily: "Asul",
                                   fontSize: "23.4759px",
                                   lineHeight: "96.3%",
                                   fontWeight: "bold",
                                   letterSpacing: "-0.07em",
                                   color: "#003D56",
                               }}
                                   className={styles.logotype}>
                                   xcoral<span
                                   style={{color: "#1ab0c4"}}
                               >
                                   .cash</span>
                               </a>
                            </Link>}
                        </div>

                        {/*<Notifications color="light" />  */}
                    </div>
                    <div className="ml-auto d-flex align-items-center">

                        <button onClick={(() => connectFunctionForButton())}

                            // onClick={(e) => {
                            //   e.preventDefault()
                            //   ChangeAccountTradeModalState({
                            //     isOpen: true,
                            //   })
                            // }}
                            className={`btn btn-primary`}
                            style={{
                                backgroundColor: "#1ab0c4",
                                fontWeight: 500,
                                width: "100px",
                                display: "block",
                                padding: 0,
                                height: "28px",
                                fontsize: "13px",
                                lineHeight: "17px",
                                /* identical to box height */

                                textAlign: "center",
                                letterSpacing: "-0.02em",
                                marginLeft: "15px"}}
                        >
                            {isConnected ? "Disconnect" : "Connect"}
                        </button>

                    </div>
                </div>
            </div>
        // </div>

    )
}
export default Navbar
