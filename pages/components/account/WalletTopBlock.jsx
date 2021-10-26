import {
  ChangeAccountDepositModalState,
  ChangeAccountWithdrawModalState,
} from "@/functions/observers";
import { Button } from "reactstrap";
import { formatPrice } from "../../../functions/helpers";
import styles from "../../../styles/pages/account/Wallet.module.scss";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

const WalletTopBlock = () => {
  const balance = useSelector(({store}) => store.balance)

  return (
    <div className={`${styles.topBlock} d-flex align-items-center`}>
      <div className={`${styles.balance}  d-flex align-items-center`}>
        <div className={styles.Icon}>
          <svg
            width="12"
            height="26"
            viewBox="0 0 12 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.22277 6.82978C5.8022 5.25042 8.51313 6.38292 8.51313 8.60688C8.51313 9.50837 9.24394 10.2392 10.1454 10.2392C11.0469 10.2392 11.7777 9.50837 11.7777 8.60688C11.7777 5.98782 10.0255 3.77164 7.63224 3.0654V1.97409C7.63224 1.0726 6.90144 0.341797 5.99995 0.341797C5.09845 0.341797 4.36765 1.0726 4.36765 1.97409V3.06275C1.58762 3.87704 -0.20627 6.66243 0.42776 9.59069C0.818033 11.3932 2.06619 12.8898 3.7665 13.5941L6.98414 14.9268C8.4721 15.5431 8.9181 17.4529 7.84055 18.6093C6.30068 20.2604 3.48676 19.1835 3.48676 16.8978C3.48676 15.9964 2.75596 15.2656 1.85446 15.2656C0.952969 15.2656 0.222168 15.9964 0.222168 16.8978C0.222168 19.4482 1.90771 21.7215 4.36765 22.4382V23.5307C4.36765 24.4322 5.09845 25.163 5.99995 25.163C6.90144 25.163 7.63224 24.4322 7.63224 23.5307V22.4359C8.5429 22.1705 9.37724 21.6845 10.0641 21.0046C12.9 18.1993 11.8876 13.4243 8.23339 11.9107L5.01575 10.578C3.51077 9.95461 3.05878 7.99594 4.22277 6.82978Z"
              fill="white"
            />
          </svg>
        </div>
        <div className={styles.info}>
          <span>My xCORAL Balance</span>
          <strong className={styles.balaneAmount}>
            {balance ? balance : 0} ETH
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
        <Button
          color="primary"
          className={`d-flex ${styles.depositBtn}`}
          // onClick={(e) => {
          //   e.preventDefault();
          //   ChangeAccountDepositModalState({
          //     isOpen: true,
          //   });
          // }}
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
          <span className="ml-auto mr-auto">Buy on SushiSwap</span>
        </Button>
      </div>
    </div>
  );
};

export default WalletTopBlock;
