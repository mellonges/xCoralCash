import React from 'react';
import styles from "@/styles/pages/account/Wallet.module.scss";
import {Button} from "reactstrap";
// import CreditCard from "../SVG/credit-card.svg"

const BonusBlockMobile = () => {
    return (
        <div
            className={`${styles.topBlock} d-flex align-items-center`}>
            <div className={`${styles.balance}  d-flex align-items-center`}>
                <div className={styles.Icon}>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2344:7136)">
                            <path d="M1.73627 14.5185L2.81798 20.9606C3.12948 22.8157 4.88584 24.067 6.74097 23.7555L24.9152 20.7039C26.7703 20.3924 28.0217 18.636 27.7102 16.7809L26.6285 10.3388C26.5743 10.0162 26.2688 9.79855 25.9462 9.85272L2.22235 13.8362C1.89975 13.8904 1.6821 14.1959 1.73627 14.5185ZM8.63784 17.5641L7.08005 17.8257C6.51545 17.9205 5.9809 17.5397 5.88609 16.9751C5.79129 16.4105 6.17214 15.8759 6.73674 15.7811L8.29452 15.5195C8.85912 15.4247 9.39368 15.8056 9.48848 16.3702C9.58328 16.9348 9.20244 17.4693 8.63784 17.5641Z" fill="white"/>
                            <path d="M26.0888 7.12581L26.0534 6.91488C25.7419 5.05975 23.9855 3.80841 22.1304 4.11991L3.95615 7.17158C2.10102 7.48308 0.849682 9.23944 1.16118 11.0946L1.1966 11.3055C1.25077 11.6281 1.55625 11.8458 1.87886 11.7916L25.6027 7.80807C25.9253 7.7539 26.1429 7.44842 26.0888 7.12581Z" fill="white"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_2344:7136">
                                <rect width="25.2407" height="25.2407" fill="white" transform="translate(0 4.17944) rotate(-9.53174)"/>
                            </clipPath>
                        </defs>
                    </svg>

                </div>
                <div className={styles.info}>
                    <strong
                        // style={{color: "white"}}
                        className={styles.balaneAmount}>
                        Try Bonding your DAI to earn bonuses
                    </strong>
                    <span>Deposit your DAI or DAI-xCORAL LP tokens to Coral Treasury to earn a bonus of up to 10%</span>
                </div>
            </div>
            <div className={`ml-auto ${styles.actionButtons} d-flex`}>
                <Button
                    color="primary"
                    className={`d-flex ${styles.depositBtn}`}
                >

                    <span className="ml-auto mr-auto">Bond now</span>
                </Button>
            </div>
        </div>
    );
};

export default BonusBlockMobile;