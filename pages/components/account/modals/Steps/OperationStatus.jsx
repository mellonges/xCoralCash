import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Button, Tooltip } from "reactstrap";
import { formatPrice } from "../../../../../functions/helpers";
import styles from "../../../../../styles/components/Account/modals/trade-modules/OperationsStatus.module.scss";
import Router from "next/router";
import { TradeModalContext } from "../../../../../functions/contexts";
import TooltipComponent from "../../../../../components/Tooltip";

const OperationStatus = ({
  info,
  setActiveStep,
  selectedWays,
  toggle,
  isSell,
  isConvert,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
  const tradeContext = useContext(TradeModalContext);

  useEffect(() => {
    if (info && info.success) tradeContext.setOperationCompleted(true);
  }, [info]);

  return info ? (
    <div
      className={`${styles.StatusModal} ${
        info.success ? styles.success : styles.error
      }`}
    >
      <div className={styles.iconBlock}>
        {info.success ? (
          <>
            <div className={styles.icon}>
              <svg
                width="47"
                height="47"
                viewBox="0 0 47 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="47" height="47" rx="18.3678" fill="#C2F0ED" />
                <path
                  d="M35.2067 16.9252L24.9109 33.1774C24.1485 34.3811 22.554 34.7389 21.3494 33.9766L12.9593 28.6614C11.7554 27.8989 11.3975 26.3041 12.1602 25.1001C12.923 23.8959 14.5175 23.5381 15.7212 24.3006L21.932 28.2349L30.8459 14.163C31.6087 12.9587 33.2035 12.6016 34.4072 13.3638C35.611 14.1266 35.9687 15.7207 35.2067 16.9252Z"
                  fill="#1AB0C4"
                />
              </svg>
            </div>
            <div className={styles.title}>Operation Successful</div>
            <div className={styles.confirmInfo}>
              <div
                className={`${styles.row} d-flex justify-content-between align-items-center`}
              >
                <div className={styles.label}>Date</div>
                <div className={styles.value}>
                  {moment().format("MM/DD YYYY, HH:mm")}
                </div>
              </div>

              <div
                className={`${styles.row} d-flex justify-content-between align-items-center`}
              >
                <div className={styles.label}>
                  {isConvert ? "From" : "Quantity"}
                </div>
                <div className={styles.value}>
                  {!isSell && !isConvert
                    ? `${info.quantity} ${selectedWays.token.ticker}`
                    : isConvert
                    ? `${info.fromConversion.quantity} ${selectedWays.token.ticker}`
                    : `${info.quantity} ${selectedWays.token.ticker}`}
                </div>
              </div>
              {isConvert ? (
                <div
                  className={`${styles.row} d-flex justify-content-between align-items-center`}
                >
                  <div className={styles.label}>Into</div>
                  <div className={styles.value}>
                    {info.intoConversion.quantity} {selectedWays.paywith.ticker}
                  </div>
                </div>
              ) : (
                <div
                  className={`${styles.row} d-flex justify-content-between align-items-center`}
                >
                  <div className={styles.label}>Average price</div>
                  <div className={styles.value}>
                    {formatPrice(info.avgPrice)}
                  </div>
                </div>
              )}
              <div
                className={`${styles.row} d-flex justify-content-between align-items-center`}
              >
                <div className={styles.label}>
                  HumanBace Fee{" "}
                  <TooltipComponent
                    tooltipTrigger={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.7"
                          d="M8.00033 0C3.58334 0 0 3.57882 0 7.99611C0 12.4176 3.58334 16.0006 8.0003 16.0006C12.4197 16.0006 16 12.4176 16 7.99611C16 3.57882 12.4197 0 8.00033 0ZM8.57044 12.4477C8.38463 12.6131 8.16929 12.6962 7.92534 12.6962C7.67295 12.6962 7.45279 12.6145 7.26487 12.451C7.07665 12.2878 6.98236 12.0592 6.98236 11.7655C6.98236 11.505 7.07362 11.2857 7.25554 11.1081C7.43746 10.9304 7.66061 10.8415 7.92534 10.8415C8.18585 10.8415 8.40511 10.9304 8.58311 11.1081C8.7608 11.2857 8.84995 11.505 8.84995 11.7655C8.84962 12.055 8.75654 12.2824 8.57044 12.4477ZM10.8873 6.70377C10.7446 6.9685 10.575 7.19677 10.3784 7.38925C10.1823 7.58169 9.82965 7.90515 9.32064 8.35991C9.18029 8.48822 9.06736 8.60085 8.98274 8.69782C8.89811 8.79511 8.83487 8.88392 8.79359 8.96466C8.75202 9.04535 8.72012 9.12609 8.69752 9.20679C8.67492 9.28719 8.64091 9.42905 8.59482 9.63172C8.51653 10.0618 8.27047 10.2768 7.85695 10.2768C7.6419 10.2768 7.46121 10.2066 7.31393 10.066C7.16724 9.92535 7.09407 9.71664 7.09407 9.43958C7.09407 9.09233 7.14798 8.79144 7.2555 8.53698C7.36243 8.28248 7.50548 8.05932 7.68318 7.86688C7.86117 7.67443 8.10089 7.44613 8.40297 7.1814C8.66769 6.94979 8.85895 6.77513 8.9767 6.65735C9.09474 6.5393 9.19385 6.408 9.27425 6.26342C9.35529 6.11855 9.39504 5.96164 9.39504 5.7921C9.39504 5.46112 9.27248 5.18224 9.02612 4.95486C8.78007 4.72748 8.46262 4.61362 8.07381 4.61362C7.61875 4.61362 7.28384 4.72837 7.0688 4.95786C6.85376 5.18735 6.67217 5.52526 6.52308 5.97191C6.38213 6.43934 6.11529 6.67302 5.72285 6.67302C5.49124 6.67302 5.2958 6.5914 5.13648 6.42815C4.97746 6.2649 4.89795 6.08813 4.89795 5.8978C4.89795 5.50506 5.02414 5.10691 5.27624 4.70365C5.52863 4.30039 5.89666 3.96638 6.38061 3.70194C6.86428 3.43721 7.42901 3.30468 8.07381 3.30468C8.67344 3.30468 9.2026 3.4155 9.66159 3.63688C10.1206 3.85793 10.4753 4.15882 10.7256 4.53948C10.9756 4.91984 11.1009 5.33337 11.1009 5.78002C11.1015 6.13093 11.0301 6.43904 10.8873 6.70377Z"
                          fill="#8AAAB4"
                        />
                      </svg>
                    }
                    tooltTipContent="  We charge a 0.5% fee on all transactions processed"
                  />
                </div>
                <div className={styles.value}>
                  {formatPrice(isConvert ? info.fromConversion.fee : info.fee)}
                </div>
              </div>
              {!isConvert ? (
                <div
                  className={`${styles.row} d-flex justify-content-between align-items-center`}
                >
                  <div className={styles.label}>
                    {isSell ? "Total received" : "Total"}
                  </div>
                  <div className={styles.value}>
                    {formatPrice(info.chargeAmount)}
                  </div>
                </div>
              ) : (
                <div
                  className={`${styles.row} d-flex justify-content-between align-items-center`}
                >
                  <div className={styles.label}>Conversion Amount</div>
                  <div className={styles.value}>
                    {formatPrice(info.fromConversion.chargeAmount)}
                  </div>
                </div>
              )}
            </div>
            <Button
              color="primary"
              className={styles.previewBtn}
              onClick={() => {
                toggle();
                Router.reload();
              }}
            >
              Continue
            </Button>
            <div className={styles.bottomInfo}>
              Your order is being processed now — you will see new tokens in
              your portfolio immediately after processing is complete. You can
              close this window. Actual quantity of ELON purchased may vary; it
              depends on market conditions, volatility and other factors. You
              will never spend more than total amount cited above.
            </div>
          </>
        ) : (
          <>
            <div className={styles.icon}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="18.7586" fill="#FFF4EB" />
                <path
                  d="M32.8879 17.0644C33.0519 16.7447 33.0243 16.3823 32.8807 16.0815C32.9211 15.7392 32.8315 15.3917 32.5075 15.1251C32.2059 14.877 31.9043 14.6287 31.6029 14.3805C31.0727 13.9443 30.2427 13.8067 29.727 14.3805C27.385 16.9867 24.9359 19.4797 22.397 21.8819C20.5094 20.1186 18.5989 18.3793 16.7021 16.6377C16.0364 16.0262 15.0728 16.2181 14.6539 16.9465C14.0438 17.2493 13.5493 17.644 13.1404 18.3178C12.9457 18.6388 12.9609 19.044 13.1404 19.3662C14.3649 21.5617 16.7319 23.4921 18.678 25.2685C18.4176 25.5016 18.1591 25.7369 17.8934 25.9651C15.2715 28.2167 13.5029 29.6453 16.7841 31.954C16.8284 31.9851 16.8735 31.9782 16.9184 31.9965C16.9813 32.0255 17.0416 32.0459 17.1113 32.0573C17.133 32.0582 17.1532 32.0618 17.1746 32.0601C17.2421 32.0656 17.3082 32.0828 17.3766 32.0694C19.1407 31.7235 20.7812 30.3411 22.2696 28.8188C23.7196 30.248 25.2635 31.6134 26.9613 32.4235C27.3655 32.6164 27.8474 32.504 28.1585 32.2341C28.6803 32.2735 29.1561 31.9493 29.3948 31.4833C29.4302 31.4615 29.453 31.449 29.4913 31.4251C30.2499 30.9511 30.3192 30.0073 29.7579 29.3568C28.4903 27.888 27.143 26.4917 25.7694 25.1202C28.2425 22.7036 31.3306 20.0974 32.8879 17.0644Z"
                  fill="#FF4C4C"
                />
              </svg>
            </div>
            <div className={styles.title}>Operation failed</div>
            <div className={styles.descr}>
              Your order could not be processed.
            </div>
            <div className={styles.errorCode}>Error: {info.errorMessage}</div>
            <Button
              color="secondary"
              className={styles.startOver}
              onClick={() => setActiveStep("selectSumm")}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
              >
                <path
                  d="M19.8801 1.03835C19.3511 1.03835 18.9218 1.46769 18.9218 1.99669V2.79546C16.8633 1.0005 14.238 0 11.4401 0C5.13188 0 0 5.15056 0 11.4808C0 12.0098 0.429333 12.4392 0.958333 12.4392C1.48733 12.4392 1.91667 12.0098 1.91667 11.4808C1.91667 6.20712 6.18892 1.91667 11.4401 1.91667C13.7435 1.91667 15.9074 2.73221 17.6132 4.19702H16.7349C16.2059 4.19702 15.7766 4.62635 15.7766 5.15535C15.7766 5.68435 16.2059 6.11369 16.7349 6.11369H19.8801C20.4091 6.11369 20.8385 5.68435 20.8385 5.15535V1.99669C20.8385 1.46769 20.4091 1.03835 19.8801 1.03835Z"
                  fill="#00AAC0"
                />
                <path
                  d="M22.0427 10.5605C21.5137 10.5605 21.0844 10.9899 21.0844 11.5189C21.0844 16.7926 16.8121 21.083 11.5609 21.083C9.28442 21.083 7.14351 20.2876 5.44726 18.8549H6.36773C6.89673 18.8549 7.32607 18.4256 7.32607 17.8966C7.32607 17.3676 6.89673 16.9383 6.36773 16.9383H3.22201C3.21338 16.9383 3.20571 16.9407 3.19757 16.9407C3.16115 16.9416 3.12521 16.9464 3.0888 16.9517C3.06196 16.9555 3.03513 16.9579 3.00878 16.9641C2.97715 16.9713 2.94601 16.9828 2.91486 16.9934C2.88611 17.0034 2.85688 17.012 2.82909 17.0245C2.80273 17.0365 2.77782 17.0518 2.75242 17.0662C2.72223 17.0834 2.69253 17.1002 2.66426 17.1203C2.65707 17.1256 2.64892 17.1285 2.64173 17.1342C2.62544 17.1467 2.61298 17.162 2.59765 17.1754C2.57226 17.1975 2.54686 17.2195 2.52386 17.2444C2.5023 17.2674 2.48361 17.2914 2.46492 17.3158C2.44623 17.3403 2.42803 17.3647 2.41126 17.3906C2.39448 17.4174 2.38011 17.4452 2.36621 17.473C2.35232 17.5003 2.33938 17.5281 2.32836 17.5569C2.31734 17.5866 2.30871 17.6163 2.30057 17.6469C2.2929 17.6762 2.28476 17.7054 2.27996 17.7356C2.27421 17.7696 2.27182 17.8036 2.26942 17.8381C2.26798 17.8578 2.26367 17.8769 2.26367 17.8971V21.0557C2.26367 21.5847 2.69301 22.0141 3.22201 22.0141C3.75101 22.0141 4.18034 21.5847 4.18034 21.0557V20.2939C6.22303 22.0328 8.80909 22.9997 11.5609 22.9997C17.8692 22.9997 23.001 17.8492 23.001 11.5189C23.001 10.9899 22.5717 10.5605 22.0427 10.5605Z"
                  fill="#00AAC0"
                />
              </svg>
              Start Over
            </Button>
          </>
        )}
      </div>
    </div>
  ) : null;
};
export default OperationStatus;
