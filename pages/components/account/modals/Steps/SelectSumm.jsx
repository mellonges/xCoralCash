/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import AutosizeInput from "react-input-autosize";

import ChooseToken from "./ChooseToken";
import styles from "../../../../../styles/components/Account/modals/trade-modules/SelectSumm.module.scss";
import ChoosePayment from "./ChoosePayment";
import { getTokenImageUrl } from "../../../../../functions/getBackendData";
import { Button } from "reactstrap";
import TokenBalance from "./TokenBalance";
import styles2 from "../../../../../styles/components/Account/modals/trade-modules/ConfirmBuying.module.scss";
import { formatPrice } from "../../../../../functions/helpers";

const SelectSumm = ({
                      selectedWays,
                      summ,
                      direction,
                      setDirection,
                      setSelectedWays,
                      setSumm,
                      setSwitchOffTabs,
                      paymentMethods,
                      holdings,
                      sendPreview,
                      selectedToken,
                      isSell = false,
                      isConvert = false,
                      loading,
                      tokensList,
    deposited,
    assetName,
    iconAddress,

                    }) => {
  const [focused, setSummFocused] = useState(false);
  const [showTokensList, setShowTokensList] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [showChooseTokenInfo, setShowChooseTokenInto] = useState(false);
  const selectSUmmRef = useRef();

  useEffect(() => {
    if (showTokensList) setSwitchOffTabs(true);
    else setSwitchOffTabs(false);
  }, [showTokensList]);

  useEffect(() => {
    if (showPaymentMethods) setSwitchOffTabs(true);
    else setSwitchOffTabs(false);
  }, [showPaymentMethods]);

  useEffect(() => {
    if (showChooseTokenInfo) setSwitchOffTabs(true);
    else setSwitchOffTabs(false);
  }, [showChooseTokenInfo]);



  useEffect(() => {
    if (direction) setValidationErrors({});
  }, [direction]);






  return (
      <>
        <div
            className={`${
                showTokensList || showPaymentMethods || showChooseTokenInfo
                    ? "d-none"
                    : "d-block"
            }`}
        >
          {selectedWays && selectedWays.token && !isSell && !isConvert ? (
              <div
                  onClick={() => setDirection(direction > 1 ? 1 : 2)}
                  className={`${styles.direction} d-flex align-items-center justify-content-end`}
              >
                <svg
                    width="12"
                    height="15"
                    viewBox="0 0 12 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M8.78217 0L7.71733 1.06484L9.44207 2.78209H1.50075C0.672455 2.78209 0.000976562 3.45357 0.000976562 4.28187V6.53153H1.50075V4.28187H9.44207L7.72483 5.99911L8.78217 7.05645L11.7817 4.0569C12.0725 3.76439 12.0725 3.29206 11.7817 2.99956L8.78217 0Z"
                      fill="#8AAAB4"
                  />
                  <path
                      d="M10.4991 10.2809H2.55773L4.27497 8.56369L3.21763 7.50635L0.218077 10.5059C-0.0726923 10.7984 -0.0726923 11.2707 0.218077 11.5632L3.21763 14.5628L4.27497 13.5055L2.55773 11.7807H10.4991C11.3273 11.7807 11.9988 11.1092 11.9988 10.2809V8.03127H10.4991V10.2809Z"
                      fill="#8AAAB4"
                  />
                </svg>
                {direction === 1
                    ? selectedWays && selectedWays.token.ticker
                    : "USD"}
              </div>
          ) : null}
          <div
              className={`d-flex align-items-center justify-content-center ${styles.summWrapper}`}
              onClick={() => selectSUmmRef.current && selectSUmmRef.current.focus()}
          >
            <AutosizeInput
                className={`${styles.summInput}`}
                placeholder="0"
                ref={selectSUmmRef}
                value={summ}
                onFocus={() => setSummFocused(true)}
                onBlur={(e) => {
                  setSummFocused(false);
                }}
                onChange={(e) => {
                  if (
                      e.target.value != "" &&
                      /^\d{0,8}(\.?)(\d{1,2})?$/.test(e.target.value)
                  ) {
                    setSumm(e.target.value);
                    setValidationErrors({
                      ...validationErrors,
                      summ: undefined,
                    });

                    if (
                        validationErrors.paywith &&
                        selectedWays &&
                        selectedWays.paywith &&
                        direction === 1 &&
                        selectedWays.paywith.quantity >= parseFloat(e.target.value)
                    )
                      setValidationErrors({
                        ...validationErrors,
                        paywith: undefined,
                      });

                    if (
                        validationErrors.token &&
                        selectedWays &&
                        selectedWays.token &&
                        (isSell || isConvert) &&
                        selectedWays.token &&
                        +e.target.value <= selectedWays.token.quantity
                    )
                      setValidationErrors({
                        ...validationErrors,
                        token: undefined,
                      });
                  } else if (e.target.value === "") setSumm("");
                }}
            />
              {direction === 1 ? (
                  <sup
                      className={`${styles.dollarSymbol} ${
                          focused || (summ.length && summ !== "0") ? styles.active : ""
                      } `}
                  >
                      {assetName}
                  </sup>
              ) : null}
              {(selectedWays && selectedWays.token && direction === 2) ||
            ((isSell || isConvert) && selectedWays.token) ? (
                <sub
                    className={`${styles.tokenSummName} ${
                        focused || (summ.length && summ !== "0") ? styles.active : ""
                    } `}
                >
                  {selectedWays.token && selectedWays.token.ticker}
                </sub>
            ) : null}
          </div>
          {validationErrors.summ ? (
              <div className="text-center">
                <div className={styles.validationError}>
                  {!isSell && !isConvert
                      ? direction === 2
                          ? "Enter token quantity"
                          : "Must be greater than 0"
                      : "Nothing to redeem"}
                </div>
              </div>
          ) : null}

            <div className={`${styles2.ConfirmBuying}`}>
                <div className={styles2.confirmInfo}>
                    <div
                        className={`${styles2.row} d-flex justify-content-between align-items-center`}
                    >
                        <div className={styles2.label}>Asset</div>
                        <div className={styles2.value}>
                            <div className={styles2.cardLogo}>
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
                                <img width="21px" height="21px" src={`/coins_icons/coin_${iconAddress}.png`}/>
                                {assetName}
                            </div>
                            {/*{selectedWays.paywith.title}*/}
                        </div>
                    </div>
                    <div
                        className={`${styles2.row} d-flex justify-content-between align-items-center`}
                    >
                        <div className={styles2.label}>Expiration term</div>
                        <div className={styles2.value}>
                            {/*{formatPrice(buyingInformation.avgPrice)}*/}
                            22.22.22
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
                </div>
          {!loading ? (
              <Button
                  color="primary"
                  className={styles.previewBtn}
                  onClick={() => sendPreview    ()}
              >
                {isSell
                    ? "Preview Sell"
                    : isConvert
                        ? `Preview conversion`
                        : !isConvert
                            ? "Preview Buy"
                            : ""}
              </Button>
          ) : (
              <Button
                  color="primary"
                  className={styles.previewBtn}
                  disabled={loading}
                  // onClick={() => generateBuyPreview()}
              >
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
              </Button>
          )}
              <TokenBalance
                 text={"Available"}
                 balance={formatPrice(deposited).slice(1)}
              />
                <TokenBalance text={"Deposited Already"} balance={"Хуй бля"} />
        </div>
        </div>
      </>
  );
};
export default SelectSumm;

