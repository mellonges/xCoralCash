import {
  ChangeAccountDepositModalState,
  ChangeAccountWithdrawModalState,
} from "@/functions/observers";
import { Button } from "reactstrap";
import { formatPrice } from "@/functions/helpers";
import styles from "@/styles/pages/account/Wallet.module.scss";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
// import XLogo from "../SVG/Xcoral-logo.svg"
// import Dollar from "../SVG/dollar.svg"

const WalletTopBlock = ({ xCoralBalance }) => {
  return (
    <div className={`${styles.topBlock} d-flex align-items-center`}>
      <div className={`${styles.balance}  d-flex align-items-center`}>
        <div className={styles.Icon}>
          <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.245 10.468C5.97567 13.6727 4.841 15.8577 4.841 17.023L0.678 17V16.494C1.61333 15.988 2.61 14.9913 3.668 13.504C5.278 11.2193 6.36667 9.65533 6.934 8.812L5.048 5.937C3.33067 3.29967 2.02733 1.78933 1.138 1.406V0.899999L6.336 0.922999V1.429C6.336 1.95033 6.50467 2.54833 6.842 3.223C7.22533 3.98967 7.91533 5.109 8.912 6.581C10.7827 3.92833 11.718 2.03467 11.718 0.899999H15.766V1.406C15.2907 1.65133 14.846 1.98867 14.432 2.418C14.0333 2.84733 13.3663 3.69833 12.431 4.971C11.4957 6.22833 10.7443 7.294 10.177 8.168C12.799 12.0167 14.409 14.309 15.007 15.045C15.6203 15.7657 16.157 16.2487 16.617 16.494V17H11.465V16.494C11.465 16.2487 11.373 15.9497 11.189 15.597C11.0203 15.2443 10.8747 14.9607 10.752 14.746C10.6447 14.516 10.545 14.3243 10.453 14.171C10.361 14.0177 10.2383 13.8183 10.085 13.573C9.93167 13.3123 9.81667 13.113 9.74 12.975L8.245 10.468Z" fill="white" />
          </svg>
        </div>
        <div className={styles.info}>
          <span>My xCORAL Balance</span> // !!!
          <strong className={styles.balaneAmount}>
            {xCoralBalance ? xCoralBalance : <p className={styles.requestConnectWalletBar}>Connect wallet to see your xCORAL Balance</p>}
            {/*{paymentMethods &&*/}
            {/*  formatPrice(*/}
            {/*    paymentMethods.find(*/}
            {/*      (method) => method.paymentMethodID === "USD"*/}
            {/*    ).amount*/}
            {/*  )}*/}
          </strong>
        </div>
      </div>
      <div className={`ml-auto ${styles.actionButtons} d-flex`}>
        <Button color="primary" className={`d-flex ${styles.depositBtn}`}>
          <svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 8.83117C3.3781 8.83117 2.06612 7.69369 2.06612 6.28751C2.06612 4.89028 3.3781 3.74384 5 3.74384C6.6219 3.74384 7.93388 4.88133 7.93388 6.28751C7.93388 6.78012 8.39876 7.18316 8.96694 7.18316C9.53512 7.18316 10 6.78012 10 6.28751C10 4.23645 8.34711 2.47201 6.03306 2.0421V0.895656C6.03306 0.403045 5.56818 0 5 0C4.43182 0 3.96694 0.403045 3.96694 0.895656V2.0421C1.27066 2.53471 -0.464877 4.83654 0.113635 7.18316C0.599173 9.18943 2.64463 10.6135 5 10.6225C6.6219 10.6225 7.93388 11.76 7.93388 13.1661C7.93388 14.5723 6.6219 15.7098 5 15.7098C3.3781 15.7098 2.06612 14.5723 2.06612 13.1661C2.06612 12.6735 1.60124 12.2705 1.03306 12.2705C0.464876 12.2705 0 12.6735 0 13.1661C0 15.2082 1.65289 16.9816 3.96694 17.4026V19.1043C3.96694 19.597 4.43182 20 5 20C5.56818 20 6.03306 19.597 6.03306 19.1043V17.4026C8.72934 16.901 10.4545 14.5992 9.88636 12.2615C9.40083 10.2642 7.3657 8.83117 5 8.83117Z" fill="white" />
          </svg>
          <span className="ml-auto mr-auto">Buy on SushiSwap</span>
        </Button>
      </div>
    </div>
  );
};

export default WalletTopBlock;
