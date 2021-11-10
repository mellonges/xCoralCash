import React, { useState, useEffect, useRef } from "react";
import Router from "next/router";
import { Button } from "reactstrap";
import TooltipComponent from "../../../../../components/Tooltip";
import {
  previewCryptoDeposit,
  generateCryptoDeposit,
} from "@/functions/getBackendData";
import styles from "@/styles/components/Account/modals/TransactModals.module.scss";

// Note: Currently only works with cryptocurrencies
const PreviewView = ({
  amount,
  cryptoAmount,
  paymentMethod,
  requestBack,
  complete,
}) => {
  // 1 - generate address | 2 - amount sent
  const [activeStep, setActiveStep] = useState(1);
  const [firstLoading, setFirstLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedAddress, setGeneratedAddress] = useState("");
  const [copied, setCopied] = useState(false);
  const cryptoAddressRef = useRef({});
  const [depositError, setDepositError] = useState("");

  const generateDepositAddress = () => {
    setLoading(true);
    generateCryptoDeposit(paymentMethod.id, amount)
      .then((r) => {
        if (r.data.success) {
          setGeneratedAddress(r.data.payload.depositAddress);
          complete();
        } else {
          setDepositError(r.data.payload.errorMessage);
          setTimeout(() => setDepositError(""), 2000);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Open success message
  const confirmSending = () => {
    setActiveStep(2);
  };

  const copyCryptoAddress = () => {
    const el = document.createElement("textarea");
    el.value = generatedAddress;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // select crypto address text
    const selection = window.getSelection();
    selection.removeAllRanges();
    const range = document.createRange();
    range.selectNodeContents(cryptoAddressRef.current);
    selection.addRange(range);
  };

  return (
    <div className={styles.previewModalView}>
      {activeStep === 1 ? (
        <>
          <a
            href="#"
            className={styles.back}
            onClick={(e) => {
              e.preventDefault();
              requestBack();
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
          <div className={styles.modalHeadline}>Deposit Preview</div>
          <div className={styles.modalInner}>
            {firstLoading ? (
              <div className={styles.loadingWrapper}>
                <div className={styles.ldsRing}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              paymentMethod && (
                <>
                  <div className={styles.cryptoAmount}>
                    <span>{cryptoAmount}</span>
                    <span> {paymentMethod.ticker}</span>
                  </div>
                  {generatedAddress && (
                    <div className={styles.sendToWalletMessage}>
                      Send this amount to the wallet below
                    </div>
                  )}
                  <div className={styles.cryptoAmountInfo}>
                    <div className={styles.row}>
                      <div>
                        Amount deposited
                        <TooltipComponent
                          tooltipTrigger={
                            <svg
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                opacity="0.7"
                                d="M8.02255 0C3.5933 0 0 3.58637 0 8.01297C0 12.4438 3.5933 16.0344 8.02251 16.0344C12.4542 16.0344 16.0444 12.4438 16.0444 8.01297C16.0445 3.58637 12.4542 0 8.02255 0ZM8.59424 12.4739C8.40791 12.6397 8.19197 12.7229 7.94735 12.7229C7.69426 12.7229 7.47349 12.6411 7.28505 12.4773C7.09631 12.3137 7.00175 12.0846 7.00175 11.7903C7.00175 11.5293 7.09326 11.3095 7.27569 11.1315C7.45811 10.9534 7.68189 10.8644 7.94735 10.8644C8.20858 10.8644 8.42846 10.9534 8.60694 11.1315C8.78513 11.3095 8.87453 11.5292 8.87453 11.7903C8.87419 12.0804 8.78086 12.3083 8.59424 12.4739ZM10.9176 6.71791C10.7744 6.98319 10.6044 7.21194 10.4072 7.40483C10.2106 7.59768 9.85695 7.92181 9.34653 8.37754C9.20579 8.50611 9.09254 8.61899 9.00768 8.71615C8.92283 8.81365 8.8594 8.90265 8.81801 8.98356C8.77633 9.06442 8.74434 9.14533 8.72167 9.2262C8.69901 9.30677 8.6649 9.44893 8.61868 9.65203C8.54018 10.083 8.29344 10.2985 7.87877 10.2985C7.66313 10.2985 7.48193 10.2282 7.33424 10.0872C7.18715 9.94628 7.11377 9.73713 7.11377 9.45948C7.11377 9.1115 7.16783 8.80998 7.27565 8.55498C7.38287 8.29994 7.52633 8.07631 7.70451 7.88346C7.883 7.69061 8.12339 7.46182 8.4263 7.19654C8.69177 6.96444 8.88355 6.78942 9.00163 6.67138C9.12 6.55309 9.21939 6.4215 9.30001 6.27663C9.38127 6.13145 9.42113 5.97421 9.42113 5.80431C9.42113 5.47264 9.29823 5.19316 9.05119 4.9653C8.80445 4.73744 8.48612 4.62335 8.09623 4.62335C7.6399 4.62335 7.30407 4.73833 7.08843 4.96831C6.87279 5.19829 6.6907 5.53691 6.54119 5.9845C6.39986 6.45292 6.13228 6.68709 5.73874 6.68709C5.50649 6.68709 5.31051 6.60529 5.15075 6.4417C4.99128 6.27811 4.91155 6.10097 4.91155 5.91024C4.91155 5.51667 5.0381 5.11768 5.29089 4.71357C5.54398 4.30946 5.91303 3.97474 6.39833 3.70975C6.88334 3.44446 7.44964 3.31165 8.09623 3.31165C8.69753 3.31165 9.22816 3.4227 9.68842 3.64455C10.1487 3.86606 10.5044 4.16759 10.7554 4.54905C11.0061 4.93022 11.1317 5.34461 11.1317 5.7922C11.1323 6.14385 11.0607 6.45262 10.9176 6.71791Z"
                                fill="#8AAAB4"
                              />
                            </svg>
                          }
                          tooltTipContent="Crypto deposits are processed by NowPayments. 0.6% fee is charged on each deposit."
                        />
                      </div>
                      <div>${amount}</div>
                    </div>
                    <div className={styles.row}>
                      <div>Pay with</div>
                      <div>
                        <img src={paymentMethod.img} /> {paymentMethod.title} (
                        {paymentMethod.ticker.toUpperCase()})
                      </div>
                    </div>
                  </div>
                  {depositError && (
                    <div
                      className={`${styles.errorMessage} ${styles.errorDeposit} position-absolute m-0`}
                    >
                      {depositError}
                    </div>
                  )}
                  {generatedAddress && (
                    <>
                      <div className={styles.cryptoAddress}>
                        <div className={styles.cryptoAddressTitle}>Address</div>
                        <div
                          className={styles.cryptoAddressCode}
                          ref={cryptoAddressRef}
                        >
                          {generatedAddress}
                        </div>
                        <div className={"ml-2"}>
                          <svg
                            width="19"
                            height="21"
                            viewBox="0 0 19 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={copyCryptoAddress}
                            className={"cursor-pointer"}
                          >
                            <path
                              d="M17.5502 3.39253H14.8411V0.990375C14.8411 0.519738 14.4593 0.138184 13.9884 0.138184H1.38889C0.917942 0.138184 0.536133 0.519738 0.536133 0.990375V16.0754C0.536133 16.546 0.917942 16.9276 1.38889 16.9276H4.09789V19.3297C4.09789 19.8003 4.4797 20.1819 4.95065 20.1819H17.5502C18.0211 20.1819 18.403 19.8003 18.403 19.3297V4.24472C18.403 3.77408 18.0211 3.39253 17.5502 3.39253ZM2.24165 15.2232V1.84257H13.1356V3.39253H4.95071C4.47975 3.39253 4.09794 3.77408 4.09794 4.24472V15.2232H2.24165ZM16.6974 18.4776H5.80347V5.09691H16.6974V18.4776Z"
                              fill="#8AAAB4"
                            />
                          </svg>
                        </div>
                      </div>
                      {copied && (
                        <div className={styles.copiedMessage}>
                          copied to clipboard
                        </div>
                      )}
                    </>
                  )}
                  {generatedAddress && (
                    <div className={styles.cryptoWarningMessage}>
                      Only send {paymentMethod.ticker.toUpperCase()} to this
                      address. Other coins or tokens sent to this address will
                      be lost forever. Make sure you are using proper blockchain
                      network
                    </div>
                  )}
                  <Button
                    color="primary"
                    className={styles.previewBtn}
                    disabled={loading}
                    onClick={
                      !loading
                        ? generatedAddress
                          ? confirmSending
                          : generateDepositAddress
                        : null
                    }
                  >
                    {loading ? (
                      <>
                        <span className={"ml-auto"}>Generating...</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`${styles.loadingCircleIcon} ml-auto`}
                          width="30px"
                          height="30px"
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
                      <>
                        {!generatedAddress
                          ? "Generate Deposit Address"
                          : "I sent this amount"}
                      </>
                    )}
                  </Button>
                </>
              )
            )}
          </div>
        </>
      ) : (
        <div className={styles.successDepositCrypto}>
          <div className={styles.icon}>
            <svg
              width="31"
              height="25"
              viewBox="0 0 31 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.2077 4.9247L15.9119 21.1769C15.1495 22.3806 13.5549 22.7384 12.3504 21.9761L3.96032 16.6609C2.75634 15.8984 2.39849 14.3036 3.16118 13.0996C3.92402 11.8954 5.51845 11.5376 6.72218 12.3002L12.9329 16.2345L21.8469 2.16247C22.6097 0.958226 24.2044 0.601157 25.4081 1.36333C26.612 2.12607 26.9697 3.72025 26.2077 4.9247Z"
                fill="#1AB0C4"
              />
            </svg>
          </div>
          <div className={styles.successTitle}>
            We are waiting for your deposit
          </div>
          <div className={styles.successMessage}>
            Once your deposit is confirmed, your USD Wallet will be topped up
            automatically
          </div>
          <Button
            color="primary"
            className={styles.previewBtn}
            onClick={Router.reload}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default PreviewView;
