import React, { useState } from "react";
import { Button, Input, InputGroup } from "reactstrap";
import SelectSum from "./SelectSum";
import PayWithInput from "./PayWithInput.jsx";
import { checkCryptoAddress } from "@/functions/helpers";
import { previewCryptoWithdraw } from "@/functions/getBackendData";

import styles from "@/styles/components/Account/modals/TransactModals.module.scss";

const DefaultView = ({
  requestOpenPayWith,
  requestOpenPreview,
  paymentMethod,
  updateAmount,
  updateToken,
  updateWithdrawalAmount,
  updateFee,
  amount,
  token,
}) => {
  const MIN_AMOUNT = 1,
    MAX_AMOUNT = 20_000;
  const [firstLoading, setFirstLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (amount) => {
    setErrors({});
    if (amount.length <= 9) updateAmount(amount);
  };

  const handlePreviewClick = () => {
    setErrors({});
    updateAmount((a) => (a ? Number.parseFloat(a).toString() : a));
    let ok = true;

    // check amount
    if (!amount || parseFloat(amount) < MIN_AMOUNT) {
      ok = false;
      setErrors({ amount: "You cannot withdraw less than $1" });
    } else if (parseFloat(amount) > MAX_AMOUNT) {
      ok = false;
      setErrors({
        amount: "You cannot withdraw more than $20,000 at once.",
      });
    }

    // check payment method
    if (!paymentMethod) {
      ok = false;
      setErrors((errors) => ({
        ...errors,
        payment: "Please select payment method",
      }));
    }

    // check token (crypto address)
    if (!paymentMethod || !checkCryptoAddress(token, paymentMethod.ticker)) {
      ok = false;
      setErrors((errors) => ({
        ...errors,
        token: `Enter valid ${
          paymentMethod ? paymentMethod.ticker.toUpperCase() : "crypto"
        } address`,
      }));
    }

    if (ok) {
      // get preview data
      setLoading(true);

      previewCryptoWithdraw(paymentMethod.id, amount)
        .then((r) => {
          if (r.data.success) {
            updateFee(r.data.payload.fee);
            updateWithdrawalAmount(r.data.payload.withdrawalAmount);
            requestOpenPreview();
          } else {
            setErrors((errors) => ({
              ...errors,
              token: r.data.payload.errorMessage,
            }));
          }
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className={styles.defaultModalView}>
      <div className={styles.modalHeadline}>Withdraw</div>
      <SelectSum amount={amount} onChange={handleAmountChange} />
      {errors.amount && (
        <div className={styles.errorMessage}>{errors.amount}</div>
      )}
      <PayWithInput
        title={"Pay to"}
        paymentMethod={paymentMethod}
        onClick={requestOpenPayWith}
        className={errors.payment ? styles.errorInput : ""}
      />
      {errors.payment && (
        <div className={styles.errorMessage}>{errors.payment}</div>
      )}
      {paymentMethod && (
        <>
          <div className={styles.PayWithInput}>
            <div className={styles.title}>Address</div>
            <InputGroup>
              <Input
                placeholder="Enter token address"
                onChange={(e) => updateToken(e.target.value)}
                value={token}
                className={`${styles.tokenAddress} ${
                  errors.token ? styles.errorInput : ""
                }`}
              />
            </InputGroup>
          </div>
          {errors.token && (
            <div className={styles.errorMessage}>{errors.token}</div>
          )}
        </>
      )}
      <Button
        color="primary"
        className={styles.previewBtn}
        onClick={handlePreviewClick}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="ml-auto">Processing...</span>
            <svg
              classList={"ml-auto"}
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
          <span>Preview Withdrawal</span>
        )}
      </Button>
    </div>
  );
};

export default DefaultView;
