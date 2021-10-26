import React from "react";
import styles from "../../../styles/components/Account/WalletMini.module.scss";
import { formatPrice } from "../../../functions/helpers";
import { useRouter } from "next/router";
import Placeholder from "../common/Placeholder";

const WalletMini = ({ walletInfo }) => {
  const router = useRouter();

  return walletInfo ? (
    <div className={styles.walletWrapper}>
      <h2 className={styles.title}>{walletInfo.title}</h2>
      <div
        className={`d-flex align-items-center cursor-pointer ${styles.walletInner}`}
        onClick={() => router.push("/account/wallet")}
      >
        <div
          className={`${styles.walletIcon} d-flex align-items-center justify-content-center`}
        >
          <svg
            width="24"
            height="22"
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5722 17.2734C17.1513 17.2734 15.1813 15.3034 15.1813 12.8825C15.1813 10.4617 17.1513 8.49161 19.5722 8.49161H22.0116V6.54009C22.0116 5.46383 21.1363 4.58858 20.0601 4.58858H19.0843V2.63706C19.0843 1.5608 18.2091 0.685547 17.1328 0.685547H3.47219C2.02515 0.685547 0.828867 1.74327 0.594686 3.12397C0.573219 3.20398 0.544922 3.28204 0.544922 3.36888V18.2492C0.544922 19.8631 1.85829 21.1765 3.47219 21.1765H20.0601C21.1363 21.1765 22.0116 20.3012 22.0116 19.2249V17.2734H19.5722ZM2.49644 3.61282C2.49644 3.07518 2.93358 2.63706 3.47219 2.63706H17.1328V4.58858H3.47219C2.93358 4.58858 2.49644 4.15046 2.49644 3.61282Z"
              fill="#1AB0C4"
            />
            <path
              d="M23.2319 9.9541H19.5728C17.9589 9.9541 16.6455 11.2675 16.6455 12.8814C16.6455 14.4953 17.9589 15.8086 19.5728 15.8086H23.2319C23.6358 15.8086 23.9637 15.4808 23.9637 15.0768V10.6859C23.9637 10.282 23.6358 9.9541 23.2319 9.9541Z"
              fill="#1AB0C4"
            />
          </svg>
        </div>
        <div className={styles.info}>
          <span className={styles.descr}>Total balance</span>
          <strong className={styles.total}>
            {formatPrice(walletInfo.amount)}
          </strong>
        </div>
        <svg
          className={`ml-auto ${styles.icon}`}
          width="9"
          height="15"
          viewBox="0 0 9 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5731 6.9147L1.89791 0.239632C1.74352 0.0851213 1.53743 0 1.31767 0C1.09792 0 0.891822 0.0851213 0.737433 0.239632L0.245852 0.731092C-0.0740237 1.05133 -0.0740237 1.57182 0.245852 1.89157L5.85117 7.49689L0.239632 13.1084C0.0852432 13.2629 0 13.4689 0 13.6885C0 13.9084 0.0852432 14.1144 0.239632 14.269L0.731214 14.7604C0.885725 14.9149 1.0917 15 1.31145 15C1.53121 15 1.7373 14.9149 1.89169 14.7604L8.5731 8.0792C8.72786 7.9242 8.81286 7.71725 8.81237 7.49726C8.81286 7.2764 8.72786 7.06958 8.5731 6.9147Z"
            fill="#11343F"
          />
        </svg>
      </div>
    </div>
  ) : (
    <div className={styles.walletWrapper}>
      <h2 className={styles.title}>USD Wallet</h2>
      <div
        className={`d-flex align-items-center cursor-pointer ${styles.walletInner}`}
      >
        <Placeholder height="46px" width="100%" />
      </div>
    </div>
  );
};

export default WalletMini;
