import React, { useEffect } from 'react';
import stylesFutures from "@/styles/pages/account/Futures/Futures.module.scss";
import { Button } from "reactstrap";
import styles from "@/styles/pages/account/Wallet.module.scss";
import stylesFuturesColor from "@/styles/pages/account/Futures/Futures.module.scss";
import { useDispatch } from "react-redux";
import { openAndCloseModalWindow, setActiveOperation } from "../../redux/reducers/rootReducer";
import { formatPrice } from "@/functions/helpers";
import getCoinName from "@/functions/getCoinName";
import { useSelector } from 'react-redux';
import Image from 'next/image'
import getIconAsset from "@/functions/getIconAsset";

const TableBody = ({ coinName, asset = 0, disabled, expiration, APY, deposited = 0, redeemable_xcoral = 0, upcoming_xcoral = 0 }) => {
    const isConnected = useSelector(({ store }) => store.isConnected)
    // let coinIcon
    // useEffect(async () => {
    //     coinIcon = await import(`../../coins_icons/coin_${getIconAsset(coinName)}.png`)
    //     }, [])
    const dispatch = useDispatch()
    return (
        <>
            <tbody>
                <tr>
                    <td className={stylesFutures.TDContentExp}>
                        <div className={stylesFutures.TDContentExpCont}>




                            {/* <Image width={100} height={100} src={`/public/coins_icons/coin_${getIconAsset(coinName)}.png`} /> */}





                            <img width="40px" height="40px" src={`https://d24va9fw68seps.cloudfront.net/coin_${getIconAsset(coinName)}.png`} />
                            {/* <img width="100px" height="100px" src={`/public/coins_icons/coin_${getIconAsset(coinName)}.png`} /> */}


                            {/* <img src alt="" /> */}

                            <div className={stylesFutures.TDTitle}>
                                {getCoinName(coinName)}
                                <div className={stylesFutures.TDSubTitle}>
                                    expiration: {expiration}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className={styles.tooltipMobile}>
                        </div>
                        {APY.toFixed(2)}% APY
                    </td>
                    <td>
                        <div className={stylesFutures.OthTDTitle}>
                            {isConnected && deposited ? formatPrice(deposited).slice(1) : !deposited && isConnected ? 0 : "—"}
                            <div className={stylesFutures.OthTDSubTitle}>
                                {getCoinName(coinName)}
                            </div>
                        </div>
                    </td>
                    {redeemable_xcoral ? <td className={stylesFutures.TDContentExp}>
                        <div className={stylesFutures.TDContentExpCont}>
                            <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="14.9702" cy="11" r="11" fill="#007585" fill-opacity="0.25" />
                                <circle cx="11" cy="11" r="11" fill="#007585" />
                                <path d="M10.78 11.592C9.596 13.264 9.004 14.404 9.004 15.012L6.832 15V14.736C7.32 14.472 7.84 13.952 8.392 13.176C9.232 11.984 9.8 11.168 10.096 10.728L9.112 9.228C8.216 7.852 7.536 7.064 7.072 6.864V6.6L9.784 6.612V6.876C9.784 7.148 9.872 7.46 10.048 7.812C10.248 8.212 10.608 8.796 11.128 9.564C12.104 8.18 12.592 7.192 12.592 6.6H14.704V6.864C14.456 6.992 14.224 7.168 14.008 7.392C13.8 7.616 13.452 8.06 12.964 8.724C12.476 9.38 12.084 9.936 11.788 10.392C13.156 12.4 13.996 13.596 14.308 13.98C14.628 14.356 14.908 14.608 15.148 14.736V15H12.46V14.736C12.46 14.608 12.412 14.452 12.316 14.268C12.228 14.084 12.152 13.936 12.088 13.824C12.032 13.704 11.98 13.604 11.932 13.524C11.884 13.444 11.82 13.34 11.74 13.212C11.66 13.076 11.6 12.972 11.56 12.9L10.78 11.592Z" fill="white" />
                            </svg>

                            <div className={stylesFutures.OthTDTitle}>
                                {formatPrice(redeemable_xcoral).slice(1)}
                                <div className={stylesFutures.OthTDSubTitle}>
                                    Upcoming {upcoming_xcoral}
                                </div>
                            </div>
                        </div>
                    </td> : <td className={stylesFutures.TDContentExp}>
                        <div className={stylesFutures.TDContentExpCont}>
                            <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="14.9702" cy="11" r="11" fill="#007585" fillOpacity="0.05" />
                                <circle cx="11" cy="11" r="11" fill="#C6D7D9" />
                                <path d="M10.78 11.592C9.596 13.264 9.004 14.404 9.004 15.012L6.832 15V14.736C7.32 14.472 7.84 13.952 8.392 13.176C9.232 11.984 9.8 11.168 10.096 10.728L9.112 9.228C8.216 7.852 7.536 7.064 7.072 6.864V6.6L9.784 6.612V6.876C9.784 7.148 9.872 7.46 10.048 7.812C10.248 8.212 10.608 8.796 11.128 9.564C12.104 8.18 12.592 7.192 12.592 6.6H14.704V6.864C14.456 6.992 14.224 7.168 14.008 7.392C13.8 7.616 13.452 8.06 12.964 8.724C12.476 9.38 12.084 9.936 11.788 10.392C13.156 12.4 13.996 13.596 14.308 13.98C14.628 14.356 14.908 14.608 15.148 14.736V15H12.46V14.736C12.46 14.608 12.412 14.452 12.316 14.268C12.228 14.084 12.152 13.936 12.088 13.824C12.032 13.704 11.98 13.604 11.932 13.524C11.884 13.444 11.82 13.34 11.74 13.212C11.66 13.076 11.6 12.972 11.56 12.9L10.78 11.592Z" fill="white" />
                            </svg>

                            <div className={stylesFutures.OthTDTitle}>
                                {isConnected ? 0 : "—"}
                                <div className={stylesFutures.OthTDSubTitle}>
                                </div>
                            </div>
                        </div>
                    </td>}

                    <td className={stylesFutures.TDContentExp}>
                        <div className={stylesFutures.TDContentExpCont}>
                            <Button
                                onClick={() => {
                                    dispatch(setActiveOperation(1))
                                    dispatch(openAndCloseModalWindow())
                                }}
                                color="primary"
                                className={`d-flex ${styles.depositBtn}`}
                            >
                                <svg
                                    width="10"
                                    height="18"
                                    viewBox="0 0 10 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.367122 6.13747C0.855001 5.66591 1.64412 5.66772 2.12969 6.14153L3.70256 7.68947L3.70256 1.21038C3.70256 0.541888 4.26054 4.92827e-07 4.94889 4.3265e-07C5.63724 3.72472e-07 6.19523 0.541888 6.19523 1.21038L6.19523 7.68953L7.76809 6.14147C8.25366 5.66766 9.04278 5.66585 9.53066 6.13741C10.0186 6.60904 10.0204 7.37539 9.5349 7.84919L5.8323 11.4755C5.34672 11.9481 4.55387 11.9507 4.06667 11.4766L0.362887 7.84925C-0.122561 7.37551 -0.120881 6.6091 0.367122 6.13747Z"
                                        fill="white"
                                    />
                                    <rect
                                        x="0.38623"
                                        y="14.7241"
                                        width="9.46484"
                                        height="2.83945"
                                        rx="1.41973"
                                        fill="white"
                                    />
                                </svg>
                                <span className="ml-auto mr-auto">Deposit</span>
                            </Button>
                            <Button
                                onClick={() => {
                                    dispatch(setActiveOperation(2))
                                    dispatch(openAndCloseModalWindow())
                                }}
                                className={`d-flex ${styles.depositBtn} ${stylesFuturesColor.RedeemActive}`}
                                disabled={disabled}
                            >
                                <svg
                                    width="10"
                                    height="18"
                                    viewBox="0 0 10 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.367122 6.13747C0.855001 5.66591 1.64412 5.66772 2.12969 6.14153L3.70256 7.68947L3.70256 1.21038C3.70256 0.541888 4.26054 4.92827e-07 4.94889 4.3265e-07C5.63724 3.72472e-07 6.19523 0.541888 6.19523 1.21038L6.19523 7.68953L7.76809 6.14147C8.25366 5.66766 9.04278 5.66585 9.53066 6.13741C10.0186 6.60904 10.0204 7.37539 9.5349 7.84919L5.8323 11.4755C5.34672 11.9481 4.55387 11.9507 4.06667 11.4766L0.362887 7.84925C-0.122561 7.37551 -0.120881 6.6091 0.367122 6.13747Z"
                                        fill="white"
                                    />
                                    <rect
                                        x="0.38623"
                                        y="14.7241"
                                        width="9.46484"
                                        height="2.83945"
                                        rx="1.41973"
                                        fill="white"
                                    />
                                </svg>
                                <span className="ml-auto mr-auto">Redeem</span>
                            </Button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </>
    );
};

export default TableBody;