import React from 'react'
import styles from "styles/pages/account/Layout.module.scss"
import { useDispatch, useSelector } from "react-redux";
import getNetworkName from "@/functions/getNetworkName";
import { connectWallet } from "../../redux/reducers/asyncActions/connectWallet";
import { disconnectWallet } from "../../redux/reducers/asyncActions/disconnectWallet";
import * as PropTypes from "prop-types";
import Link from "next/link"


Link.propTypes = {
    href: PropTypes.string,
    children: PropTypes.node
};
const Navbar = () => {
    const dispatch = useDispatch()
    const isConnected = useSelector(({ store }) => store.isConnected)
    const walletAddress = useSelector(({ store }) => store.address)
    const network = useSelector(({ store }) => store.network)

    const connectFunctionForButton = () => {
        if (isConnected) {
            dispatch(disconnectWallet())
        } else {
            dispatch(connectWallet())
        }
    }

    return (
        <div className={styles.TopPanel}>


            <div
                style={{ justifyContent: "end" }}
                className="d-none d-lg-flex align-items-center w-100">
                <div>
                    {isConnected && <div className={styles.displayAddressPlace}>
                        {getNetworkName(network)} network <b
                            className={styles.showAddress}>{walletAddress}</b></div>}
                </div>
                <button onClick={() => connectFunctionForButton()}
                    style={{ backgroundColor: "#1ab0c4" }}
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
                        style={{ justifyContent: "end" }}
                    >
                        {isConnected ? <div className={styles.displayAddressPlace}> {getNetworkName(network)} network <b
                            className={styles.showAddress}>{walletAddress.slice(0, 4) + '.'.repeat(3) + walletAddress.slice(-4)}</b></div> : <Link href="/">
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
                                    style={{ color: "#1ab0c4" }}
                                >
                                    .cash</span>
                            </a>
                        </Link>}
                    </div>
                </div>
                <div className="ml-auto d-flex align-items-center">

                    <button onClick={(() => connectFunctionForButton())}


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
                            marginLeft: "15px"
                        }}
                    >
                        {isConnected ? "Disconnect" : "Connect"}
                    </button>

                </div>
            </div>
        </div>
    )
}
export default Navbar
