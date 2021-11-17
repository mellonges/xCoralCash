import React, { useState } from "react";
import { Button, Tooltip } from "reactstrap";
import { submitTrade } from "../../../../../functions/getBackendData";
import { formatPrice } from "../../../../../functions/helpers";

import styles from "../../../../../styles/components/Account/modals/trade-modules/ConfirmBuying.module.scss";
import TooltipComponent from "../../../../../components/Tooltip";
import TokenBalance from "./TokenBalance";
import styles2 from "@/styles/components/Account/modals/trade-modules/ConfirmBuying.module.scss";
const ConfirmBuying = ({
  setActiveStep,
  setSwitchOffTabs,
  title,
  selectedWays,
  buyingInformation,
  holdings,
  setBuyingInformation,
  direction,
  paymentMethods,
  assetName,
  iconAddress,
  deposited,
  expiration,
  APY,
  decimals,
  available

}) => {
  let tokenBalance;

  // if (
  //   selectedWays &&
  //   selectedWays.token &&
  //   holdings &&
  //   (direction === 2 || !direction)
  // )
  //   tokenBalance = holdings.find(
  //     (token) => token.ticker === selectedWays.token.ticker
  //   );
  // else if (direction === 1 && paymentMethods)
  //   tokenBalance = paymentMethods.find(
  //     (method) => method.paymentMethodID === "USD"
  //   );

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  // const confirmBuying = () => {
  //   let ticker = selectedWays.token.ticker;
  //   setLoading(true);
  //   submitTrade(
  //     "buy",
  //     ticker,
  //     selectedWays.paywith.type === "wallet" ? "wallet" : "card",
  //     selectedWays.paywith.type !== "wallet"
  //       ? selectedWays.paywith.paymentMethodID
  //       : undefined,
  //     buyingInformation.chargeAmount
  //   )
  //     .then((res) => res.data)
  //     .then((res) => {
  //       setActiveStep("finishOrError");
  //       if (!res.success) setBuyingInformation(res.payload);
  //       else
  //         setBuyingInformation({
  //           ...buyingInformation,
  //           success: true,
  //         });
  //     })
  //     .catch((err) => console.error(err))
  //     .finally(() => setLoading(false));
  // };

  return (
    <div className={`${styles.ConfirmBuying}`}>
      <div className={`${styles.top}`}>
        <div className="d-flex align-items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveStep("selectSumm");
              setSwitchOffTabs(false);
            }}
          >
            <svg
              width="18"
              height="13"
              viewBox="0 0 18 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.308137 7.24217L0.309083 7.24317L5.78705 12.6947C6.19744 13.1031 6.86122 13.1016 7.26972 12.6912C7.67816 12.2808 7.67659 11.617 7.2662 11.2085L3.58829 7.54845L16.2055 7.54845C16.7845 7.54845 17.2539 7.07909 17.2539 6.50008C17.2539 5.92106 16.7845 5.4517 16.2055 5.4517L3.58835 5.4517L7.26615 1.79162C7.67654 1.38317 7.67811 0.719391 7.26966 0.309005C6.86116 -0.101487 6.19733 -0.102901 5.787 0.305441L0.30903 5.75699L0.308086 5.75799C-0.102511 6.1678 -0.101201 6.83372 0.308137 7.24217Z"
                fill="#678086"
              />
            </svg>
          </a>
          <div className={`${styles.title} ml-auto mr-auto`}>{title}</div>
        </div>
      </div>
      <div className={styles.confirmInfo}>
        <div className={styles.price}>
          {/*{buyingInformation.quantity}{" "}*/}
          {/*{selectedWays && selectedWays.token.ticker}*/}
          22 {assetName}
        </div>
        <div
          className={`${styles.row} d-flex justify-content-between align-items-center`}
        >
          <div className={styles.label}>Asset</div>
          <div className={styles.value}>
            <div className={styles.cardLogo}>
              {/*{selectedWays &&*/}
              {/*selectedWays.paywith.paymentMethodID === "USD" ? (*/}
              {/*  <svg*/}
              {/*    width="32"*/}
              {/*    height="32"*/}
              {/*    viewBox="0 0 32 32"*/}
              {/*    fill="none"*/}
              {/*    xmlns="http://www.w3.org/2000/svg"*/}
              {/*  >*/}
              {/*    <mask*/}
              {/*      id="mask0"*/}
              {/*      masktype="alpha"*/}
              {/*      maskUnits="userSpaceOnUse"*/}
              {/*      x="0"*/}
              {/*      y="0"*/}
              {/*      width="32"*/}
              {/*      height="32"*/}
              {/*    >*/}
              {/*      <rect width="32" height="32" rx="12.3077" fill="#C4C4C4" />*/}
              {/*    </mask>*/}
              {/*    <g mask="url(#mask0)">*/}
              {/*      <rect x="-3" y="-8" width="39" height="44" fill="#EDF4F5" />*/}
              {/*      <path*/}
              {/*        d="M14.7696 12.3437C15.8631 11.2503 17.7399 12.0344 17.7399 13.574C17.7399 14.1981 18.2458 14.7041 18.87 14.7041C19.4941 14.7041 20 14.1981 20 13.574C20 11.7608 18.7869 10.2266 17.13 9.73762V8.9821C17.13 8.35799 16.6241 7.85205 16 7.85205C15.3759 7.85205 14.8699 8.35799 14.8699 8.9821V9.73579C12.9453 10.2995 11.7034 12.2279 12.1423 14.2551C12.4125 15.503 13.2766 16.5391 14.4538 17.0267L16.6814 17.9494C17.7115 18.376 18.0203 19.6982 17.2743 20.4988C16.2082 21.6418 14.2601 20.8963 14.2601 19.3139C14.2601 18.6898 13.7542 18.1839 13.13 18.1839C12.5059 18.1839 12 18.6898 12 19.3139C12 21.0796 13.1669 22.6534 14.8699 23.1495V23.9059C14.8699 24.53 15.3759 25.036 16 25.036C16.6241 25.036 17.13 24.53 17.13 23.9059V23.148C17.7605 22.9642 18.3381 22.6278 18.8137 22.1571C20.777 20.215 20.0761 16.9092 17.5462 15.8613L15.3186 14.9386C14.2767 14.5071 13.9638 13.1511 14.7696 12.3437Z"*/}
              {/*        fill="#00AAC0"*/}
              {/*      />*/}
              {/*    </g>*/}
              {/*  </svg>*/}
              {/*) : selectedWays &&*/}
              {/*  selectedWays.paywith.brand &&*/}
              {/*  selectedWays &&*/}
              {/*  selectedWays.paywith.brand === "Visa" ? (*/}
              {/*  <img*/}
              {/*    src="/images/icons/Trade/Group 1528.png"*/}
              {/*    alt=""*/}
              {/*    width="32"*/}
              {/*    height="32"*/}
              {/*  />*/}
              {/*) : selectedWays &&*/}
              {/*  selectedWays.paywith.brand &&*/}
              {/*  selectedWays &&*/}
              {/*  selectedWays.paywith.brand === "MasterCard" ? (*/}
              {/*  <img*/}
              {/*    src="/images/icons/Trade/Group 1528-1.png"*/}
              {/*    alt=""*/}
              {/*    width="32"*/}
              {/*    height="32"*/}
              {/*  />*/}
              {/*) : null}*/}
              <img width="21px" height="21px" src={`/coins_icons/coin_${iconAddress}.png`} />
              {assetName}
            </div>
            {/*{selectedWays.paywith.title}*/}
          </div>
        </div>

        {/* <div
          className={`${styles.row} d-flex justify-content-between align-items-center`}
        >
          <div className={styles.label}>Purchase</div>
          <div className={styles.value}>
            {formatPrice(buyingInformation.amountSpend)}
          </div>
        </div> */}
        <div
          className={`${styles.row} d-flex justify-content-between align-items-center`}
        >
          <div className={styles.label}>
            APY
            {/*<TooltipComponent*/}
            {/*  tooltipTrigger={*/}
            {/*    <svg*/}
            {/*      width="16"*/}
            {/*      height="16"*/}
            {/*      viewBox="0 0 16 16"*/}
            {/*      fill="none"*/}
            {/*      xmlns="http://www.w3.org/2000/svg"*/}
            {/*    >*/}
            {/*      <path*/}
            {/*        opacity="0.7"*/}
            {/*        d="M8.00033 0C3.58334 0 0 3.57882 0 7.99611C0 12.4176 3.58334 16.0006 8.0003 16.0006C12.4197 16.0006 16 12.4176 16 7.99611C16 3.57882 12.4197 0 8.00033 0ZM8.57044 12.4477C8.38463 12.6131 8.16929 12.6962 7.92534 12.6962C7.67295 12.6962 7.45279 12.6145 7.26487 12.451C7.07665 12.2878 6.98236 12.0592 6.98236 11.7655C6.98236 11.505 7.07362 11.2857 7.25554 11.1081C7.43746 10.9304 7.66061 10.8415 7.92534 10.8415C8.18585 10.8415 8.40511 10.9304 8.58311 11.1081C8.7608 11.2857 8.84995 11.505 8.84995 11.7655C8.84962 12.055 8.75654 12.2824 8.57044 12.4477ZM10.8873 6.70377C10.7446 6.9685 10.575 7.19677 10.3784 7.38925C10.1823 7.58169 9.82965 7.90515 9.32064 8.35991C9.18029 8.48822 9.06736 8.60085 8.98274 8.69782C8.89811 8.79511 8.83487 8.88392 8.79359 8.96466C8.75202 9.04535 8.72012 9.12609 8.69752 9.20679C8.67492 9.28719 8.64091 9.42905 8.59482 9.63172C8.51653 10.0618 8.27047 10.2768 7.85695 10.2768C7.6419 10.2768 7.46121 10.2066 7.31393 10.066C7.16724 9.92535 7.09407 9.71664 7.09407 9.43958C7.09407 9.09233 7.14798 8.79144 7.2555 8.53698C7.36243 8.28248 7.50548 8.05932 7.68318 7.86688C7.86117 7.67443 8.10089 7.44613 8.40297 7.1814C8.66769 6.94979 8.85895 6.77513 8.9767 6.65735C9.09474 6.5393 9.19385 6.408 9.27425 6.26342C9.35529 6.11855 9.39504 5.96164 9.39504 5.7921C9.39504 5.46112 9.27248 5.18224 9.02612 4.95486C8.78007 4.72748 8.46262 4.61362 8.07381 4.61362C7.61875 4.61362 7.28384 4.72837 7.0688 4.95786C6.85376 5.18735 6.67217 5.52526 6.52308 5.97191C6.38213 6.43934 6.11529 6.67302 5.72285 6.67302C5.49124 6.67302 5.2958 6.5914 5.13648 6.42815C4.97746 6.2649 4.89795 6.08813 4.89795 5.8978C4.89795 5.50506 5.02414 5.10691 5.27624 4.70365C5.52863 4.30039 5.89666 3.96638 6.38061 3.70194C6.86428 3.43721 7.42901 3.30468 8.07381 3.30468C8.67344 3.30468 9.2026 3.4155 9.66159 3.63688C10.1206 3.85793 10.4753 4.15882 10.7256 4.53948C10.9756 4.91984 11.1009 5.33337 11.1009 5.78002C11.1015 6.13093 11.0301 6.43904 10.8873 6.70377Z"*/}
            {/*        fill="#8AAAB4"*/}
            {/*      />*/}
            {/*    </svg>*/}
            {/*  }*/}
            {/*  tooltTipContent=" We charge a 0.5% fee on all transactions processed"*/}
            {/*/>*/}
          </div>
          <div className={styles.value}>
            {APY?.toFixed(2)}%
            {/*{formatPrice(buyingInformation.fee)}*/}
          </div>
        </div>
        <div
          className={`${styles.row} d-flex justify-content-between align-items-center`}
        >
          <div className={styles.label}>Expiration term</div>
          <div className={styles.value}>
            {/*{formatPrice(buyingInformation.chargeAmount)}*/}
            {expiration}
          </div>
        </div>
        <div
          className={`${styles.row} d-flex justify-content-between align-items-center`}
        >
          <div className={styles.label}>Total payout</div>
          <div className={styles.value}>
            {/*{formatPrice(buyingInformation.chargeAmount)}*/}
            2,430.21
          </div>
        </div>
      </div>
      <Button
        color="primary"
        disabled={loading}
        className={styles.previewBtn}
        onClick={() => console.log("ЖОпа 2")}
      >
        {loading ? (
          <>
            <span className="ml-auto">Processing...</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles.loadingCircleIcon} ml-auto`}
              width="200px"
              height="200px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <circle
                cx="50"
                cy="50"
                fill="none"
                stroke="#003d56"
                strokeWidth="10"
                r="35"
                strokeDasharray="164.93361431346415 56.97787143782138"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  repeatCount="indefinite"
                  dur="0.9345794392523364s"
                  values="0 50 50;360 50 50"
                  keyTimes="0;1"
                ></animateTransform>
              </circle>
            </svg>
          </>
        ) : (
          "Buy now"
        )}
      </Button>

      <TokenBalance text={"Available"} balance={formatPrice(available / 10 ** decimals).slice(1)} />
      <TokenBalance
        text={"Deposited Already"}
        balance={formatPrice(deposited).slice(1)}
      />
    </div>
  )
};
export default ConfirmBuying;
