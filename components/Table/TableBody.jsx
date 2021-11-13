import React from 'react';
import stylesFutures from "@/styles/pages/account/Futures/Futures.module.scss";
import {Button} from "reactstrap";
import styles from "@/styles/pages/account/Wallet.module.scss";
import stylesFuturesColor from "@/styles/pages/account/Futures/Futures.module.scss";
import {useDispatch} from "react-redux";
import {openAndCloseModalWindow, setActiveOperation} from "../../redux/reducers/rootReducer";

const TableBody = ({nameCoin, disabled, expiration}) => {
    const imgLink = `https://d24va9fw68seps.cloudfront.net/coin_${nameCoin}.png`
    const dispatch = useDispatch()
    return (
        <>
            <tbody>
            <tr>
                <td className={stylesFutures.TDContentExp}>
                    <div className={stylesFutures.TDContentExpCont}>

                        {/*<img  src={imgLink} alt=""/>*/}

                        <div className={stylesFutures.TDTitle}>
                            {nameCoin}
                            <div className={stylesFutures.TDSubTitle}>
                                expiration: {expiration}
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    40% APY
                </td>
                <td>
                    <div className={stylesFutures.OthTDTitle}>
                        42,653.22
                        <div className={stylesFutures.OthTDSubTitle}>
                            DAI
                        </div>
                    </div>
                </td>
                <td className={stylesFutures.TDContentExp}>
                    <div className={stylesFutures.TDContentExpCont}>
                        <svg className={stylesFutures.OthTDImg} width="24" height="24" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 1L1 6.5L12 12L23 6.5L12 1Z" stroke="#658796" strokeWidth="1.936"
                                  strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M1 17.5L12 23L23 17.5" stroke="#658796" strokeWidth="1.936" strokeLinecap="round"
                                  strokeLinejoin="round"></path>
                            <path d="M1 12L12 17.5L23 12" stroke="#658796" strokeWidth="1.936" strokeLinecap="round"
                                  strokeLinejoin="round"></path>
                        </svg>
                        <div className={stylesFutures.OthTDTitle}>
                            921.55
                            <div className={stylesFutures.OthTDSubTitle}>
                                Upcoming 1,240.32
                            </div>
                        </div>
                    </div>
                </td>
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