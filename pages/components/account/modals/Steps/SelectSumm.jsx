/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import AutosizeInput from "react-input-autosize";

import ChooseToken from "./ChooseToken";
import styles from "../../../../../styles/components/Account/modals/trade-modules/SelectSumm.module.scss";
import ChoosePayment from "./ChoosePayment";
import { getTokenImageUrl } from "../../../../../functions/getBackendData";
import { Button } from "reactstrap";
import TokenBalance from "./TokenBalance";
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

  const selectToken = (token) => {
    if (token)
      setValidationErrors({
        ...validationErrors,
        token: undefined,
      });
    setSelectedWays({
      ...selectedWays,
      token,
    });
  };

  useEffect(() => {
    if (direction) setValidationErrors({});
  }, [direction]);

  const selectMethod = (paywith) => {
    if (
      paywith &&
      (!paywith.ticker ||
        (paywith.ticker &&
          selectedWays.token &&
          paywith.ticker !== selectedWays.token.ticker))
    ) {
      setValidationErrors({
        ...validationErrors,
        paywith: false,
      });
    } else if (
      selectedWays.token &&
      selectedWays.token.ticker === paywith.ticker
    )
      setValidationErrors({
        ...validationErrors,
        paywith: -1,
      });
    setSelectedWays({
      ...selectedWays,
      paywith,
    });
  };

  const generateBuyPreview = () => {
    // Validate ways
    let errors = {};

    if (!parseFloat(summ) || (parseFloat(summ) && parseFloat(summ) <= 0))
      errors.summ = true;

    if (
      (selectedWays && !selectedWays.token) ||
      ((isSell || isConvert) &&
        selectedWays.token &&
        +summ > selectedWays.token.quantity)
    )
      errors.token = true;

    if (
      (selectedWays && !selectedWays.paywith) ||
      (direction === 1 && selectedWays.paywith.quantity < parseFloat(summ))
    )
      errors.paywith = true;
    else if (
      selectedWays &&
      selectedWays.token &&
      selectedWays.paywith &&
      selectedWays.token.ticker === selectedWays.paywith.ticker
    )
      errors.paywith = -1;

    if (Object.keys(errors).length) setValidationErrors(errors);
    else sendPreview();
  };

  let tokenBalance;

  if (
    selectedWays &&
    selectedWays.token &&
    holdings &&
    (direction === 2 || !direction)
  )
    tokenBalance = holdings.find(
      (token) => token.ticker === selectedWays.token.ticker
    );
  else if (direction === 1 && paymentMethods)
    tokenBalance = paymentMethods.find(
      (method) => method.paymentMethodID === "USD"
    );

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
          {direction === 1 ? (
            <sup
              className={`${styles.dollarSymbol} ${
                focused || (summ.length && summ !== "0") ? styles.active : ""
              } `}
            >
              $
            </sup>
          ) : null}
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
        <div className={styles.selectPair}>
          <div
            className={`${styles.selector} d-flex align-items-center ${
              validationErrors.token ? styles.hasError : ""
            }`}
            onClick={() => setShowTokensList(true)}
          >
            <div className={styles.selectorTitle}>
              {isSell ? "Sell" : isConvert ? "From" : "Buy"}
            </div>
            {selectedWays && selectedWays.token ? (
              <div className={styles.selectedToken}>
                <img
                  src={getTokenImageUrl(
                    selectedWays && selectedWays.token.ticker,
                    "small"
                  )}
                  className={styles.icon}
                  alt={selectedWays && selectedWays.token.ticker}
                />
                {selectedWays && selectedWays.token.ticker}
              </div>
            ) : (
              <span className={styles.selectPlaceholder}>
                {!isConvert ? "Select token" : "Select From token"}
              </span>
            )}
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-auto"
            >
              <path
                opacity="0.6"
                d="M5.37494 4.40893L1.1899 0.223969C1.09311 0.127098 0.963895 0.0737305 0.82612 0.0737305C0.688344 0.0737305 0.559131 0.127098 0.462337 0.223969L0.154138 0.532091C-0.0464094 0.732868 -0.0464094 1.05919 0.154138 1.25966L3.66841 4.77393L0.150238 8.29211C0.0534436 8.38898 0 8.51812 0 8.65582C0 8.79367 0.0534436 8.92281 0.150238 9.01975L0.458437 9.3278C0.555308 9.42467 0.684445 9.47804 0.82222 9.47804C0.959996 9.47804 1.08921 9.42467 1.186 9.3278L5.37494 5.13902C5.47196 5.04184 5.52525 4.91209 5.52495 4.77416C5.52525 4.6357 5.47196 4.50603 5.37494 4.40893Z"
                fill="#678086"
              />
            </svg>
          </div>

          {validationErrors.token ? (
            <div className={styles.textError}>
              {!isSell && !isConvert
                ? "Select token"
                : isConvert
                ? "Choose a token to convert from with sufficient quantity"
                : "Select token with enough quantity"}
            </div>
          ) : null}

          <div
            className={`${styles.selector} d-flex align-items-center ${
              validationErrors.paywith ? styles.hasError : ""
            }`}
            onClick={() =>
              isConvert
                ? setShowChooseTokenInto(true)
                : !isSell && setShowPaymentMethods(true)
            }
          >
            <div className={styles.selectorTitle}>
              {isSell ? "Pay to" : isConvert ? "Into" : "Pay with"}
            </div>
            {selectedWays && selectedWays.paywith && !isConvert ? (
              <div
                className={`${styles.selectedPaymentMethod} d-flex align-items-center `}
              >
                <div className={styles.icon}>
                  {selectedWays.paywith.paymentMethodID === "USD" ? (
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0"
                        masktype="alpha"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="32"
                        height="32"
                      >
                        <rect
                          width="32"
                          height="32"
                          rx="12.3077"
                          fill="#C4C4C4"
                        />
                      </mask>
                      <g mask="url(#mask0)">
                        <rect
                          x="-3"
                          y="-8"
                          width="39"
                          height="44"
                          fill="#EDF4F5"
                        />
                        <path
                          d="M14.7696 12.3437C15.8631 11.2503 17.7399 12.0344 17.7399 13.574C17.7399 14.1981 18.2458 14.7041 18.87 14.7041C19.4941 14.7041 20 14.1981 20 13.574C20 11.7608 18.7869 10.2266 17.13 9.73762V8.9821C17.13 8.35799 16.6241 7.85205 16 7.85205C15.3759 7.85205 14.8699 8.35799 14.8699 8.9821V9.73579C12.9453 10.2995 11.7034 12.2279 12.1423 14.2551C12.4125 15.503 13.2766 16.5391 14.4538 17.0267L16.6814 17.9494C17.7115 18.376 18.0203 19.6982 17.2743 20.4988C16.2082 21.6418 14.2601 20.8963 14.2601 19.3139C14.2601 18.6898 13.7542 18.1839 13.13 18.1839C12.5059 18.1839 12 18.6898 12 19.3139C12 21.0796 13.1669 22.6534 14.8699 23.1495V23.9059C14.8699 24.53 15.3759 25.036 16 25.036C16.6241 25.036 17.13 24.53 17.13 23.9059V23.148C17.7605 22.9642 18.3381 22.6278 18.8137 22.1571C20.777 20.215 20.0761 16.9092 17.5462 15.8613L15.3186 14.9386C14.2767 14.5071 13.9638 13.1511 14.7696 12.3437Z"
                          fill="#00AAC0"
                        />
                      </g>
                    </svg>
                  ) : selectedWays.paywith.brand &&
                    selectedWays.paywith.brand === "Visa" ? (
                    <img
                      src="/images/icons/Trade/Group 1528.png"
                      alt=""
                      width="32"
                      height="32"
                    />
                  ) : selectedWays.paywith.brand &&
                    selectedWays.paywith.brand === "MasterCard" ? (
                    <img
                      src="/images/icons/Trade/Group 1528-1.png"
                      alt=""
                      width="32"
                      height="32"
                    />
                  ) : null}
                </div>
                <div className={styles.info}>
                  {selectedWays.paywith.title}

                  {selectedWays.paywith.paymentMethodID === "USD" ? (
                    <div className={styles.currentBalance}>
                      {holdings &&
                      paymentMethods.some(
                        (method) => method.paymentMethodID === "USD"
                      )
                        ? formatPrice(
                            paymentMethods.find(
                              (method) => method.paymentMethodID === "USD"
                            ).amount
                          )
                        : ""}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : isConvert && selectedWays.paywith ? (
              <div className={styles.selectedToken}>
                <img
                  src={getTokenImageUrl(
                    selectedWays && selectedWays.paywith.ticker,
                    "small"
                  )}
                  className={styles.icon}
                  alt={selectedWays && selectedWays.paywith.ticker}
                />
                {selectedWays && selectedWays.paywith.ticker}
              </div>
            ) : (
              <span className={styles.selectPlaceholder}>
                {!isConvert ? "Select payment method" : "Select Into token"}
              </span>
            )}
            {!isSell ? (
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-auto"
              >
                <path
                  opacity="0.6"
                  d="M5.37494 4.40893L1.1899 0.223969C1.09311 0.127098 0.963895 0.0737305 0.82612 0.0737305C0.688344 0.0737305 0.559131 0.127098 0.462337 0.223969L0.154138 0.532091C-0.0464094 0.732868 -0.0464094 1.05919 0.154138 1.25966L3.66841 4.77393L0.150238 8.29211C0.0534436 8.38898 0 8.51812 0 8.65582C0 8.79367 0.0534436 8.92281 0.150238 9.01975L0.458437 9.3278C0.555308 9.42467 0.684445 9.47804 0.82222 9.47804C0.959996 9.47804 1.08921 9.42467 1.186 9.3278L5.37494 5.13902C5.47196 5.04184 5.52525 4.91209 5.52495 4.77416C5.52525 4.6357 5.47196 4.50603 5.37494 4.40893Z"
                  fill="#678086"
                />
              </svg>
            ) : null}
          </div>
          {validationErrors.paywith && validationErrors.paywith !== -1 ? (
            <div className={styles.textError}>
              {!isSell && !isConvert
                ? "Select payment method with enough money"
                : isConvert
                ? "Choose a token to convert into with sufficient quantity"
                : "Choose payment method"}
            </div>
          ) : validationErrors.paywith === -1 ? (
            <div className={styles.textError}>
              You can't choose the same tokens
            </div>
          ) : null}
        </div>

        {!loading ? (
          <Button
            color="primary"
            className={styles.previewBtn}
            onClick={() => generateBuyPreview()}
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
            onClick={() => generateBuyPreview()}
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
        {tokenBalance || (selectedWays && selectedWays.token) ? (
          <TokenBalance
            quantity={tokenBalance ? tokenBalance.quantity : 0}
            ticker={
              tokenBalance
                ? !tokenBalance.ticker
                  ? "USD"
                  : tokenBalance.ticker
                : selectedWays.token.ticker
            }
          />
        ) : null}
      </div>
      <ChooseToken
        isOpen={showTokensList}
        title={isSell ? "Sell" : isConvert ? "Convert from" : "Buy"}
        isSell={isSell}
        isConvert={isConvert}
        defaultTokens={tokensList}
        holdings={holdings}
        setShowTokensList={setShowTokensList}
        selectToken={selectToken}
        selectedToken={selectedToken}
      />
      {!isConvert ? (
        <ChoosePayment
          isOpen={showPaymentMethods}
          title={isSell ? "Pay to" : "Pay with"}
          setShowPaymentMethods={setShowPaymentMethods}
          selectMethod={selectMethod}
          isSell={isSell}
          paymentMethods={
            isSell && paymentMethods
              ? paymentMethods.filter((method) => method.type === "wallet")
              : paymentMethods
          }
          selectedWays={selectedWays}
        />
      ) : (
        <ChooseToken
          isOpen={showChooseTokenInfo}
          title="Convert to"
          holdings={holdings}
          defaultTokens={tokensList}
          setShowTokensList={setShowChooseTokenInto}
          selectToken={selectMethod}
          selectedToken={selectedToken}
        />
      )}
    </>
  );
};
export default SelectSumm;
