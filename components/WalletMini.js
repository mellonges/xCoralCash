import React from "react";
import styles from "@/styles/components/Account/WalletMini.module.scss";
import { formatPrice } from "@/functions/helpers";
import TooltipComponent from "./Tooltip";

const WalletMini = ({ walletInfo, icon }) => {

  return  (
    <div
        // style={{border: "3px solid white", boxShadow: "12px 12px 2px 1px rgba(0, 0, 0, .2);"}}
        className={styles.walletWrapper}>
      {/* <h2 className={styles.title}>{walletInfo.title}</h2> */}
      <div
        className={`d-flex align-items-center ${styles.walletInner}`}
        // onClick={() => router.push("/account/wallet")}
      >
        <div
          className={`${styles.walletIcon} d-flex align-items-center justify-content-center`}
        >
          {icon}
        </div>
        <div className={styles.info}>
          <span className={styles.descr}>{walletInfo.header}</span>
          <TooltipComponent id={walletInfo.id} tooltTipContent={walletInfo.tooltipContent} />
          <strong className={styles.total}>
            {walletInfo.amount}

          </strong>
        </div>

      </div>

    </div>
  )
};

export default WalletMini;

