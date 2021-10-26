import React, { useState } from "react";
import { Button } from "reactstrap";
import SelectSum from "./SelectSum";
import PayWithInput from "./PayWithInput.jsx";
import { previewCryptoDeposit } from "@/functions/getBackendData";

import styles from "@/styles/components/Account/modals/TransactModals.module.scss";

const DefaultView = ({
  requestOpenPayWith,
  requestOpenPreview,
  paymentMethod,
  updateAmount,
  updateCryptoAmount,
  amount,
}) => {
  const MIN_AMOUNT = 10,
    MAX_AMOUNT = 20_000;
  const [firstLoading, setFirstLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleAmountChange = (amount) => {
    setErrors({});
    if (amount.length <= 9) updateAmount(amount);
  };

  const handlePreviewClick = () => {
    setErrors({});
    let ok = true;

    // check amount
    if (!amount || parseFloat(amount) < MIN_AMOUNT) {
      ok = false;
      setErrors({ amount: `You cannot deposit less than $${MIN_AMOUNT}.` });
    } else if (parseFloat(amount) > MAX_AMOUNT) {
      ok = false;
      setErrors({
        amount: "You cannot deposit more than $20,000 at once.",
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

    if (ok) {
      setLoading(true);
      let a = Number.parseFloat(amount).toString();
      updateAmount(a);
      previewCryptoDeposit(paymentMethod.id, a)
        .then((r) => {
          if (r.data.success) {
            updateCryptoAmount(r.data.payload.cryptoAmount);
          } else {
            // set preview error from backend
            ok = false;
            setErrors((errors) => ({
              ...errors,
              preview: r.data.payload.errorMessage,
            }));
          }
        })
        .finally(() => {
          setLoading(false);
          if (ok) requestOpenPreview();
        });
    }
  };

  return (
    <div className={styles.defaultModalView}>
      <div className={styles.modalHeadline}>Deposit</div>
      <SelectSum amount={amount} onChange={handleAmountChange} />
      {errors.amount && (
        <div className={styles.errorMessage}>{errors.amount}</div>
      )}
      <PayWithInput
        paymentMethod={paymentMethod}
        onClick={requestOpenPayWith}
        className={errors.payment ? styles.errorInput : ""}
      />
      {errors.payment && (
        <div className={styles.errorMessage}>{errors.payment}</div>
      )}
      <Button
        color="primary"
        className={styles.previewBtn}
        disabled={loading}
        onClick={handlePreviewClick}
      >
        {loading ? (
          <>
            <span className={"ml-auto"}>Processing...</span>
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
          <span>Preview Deposit</span>
        )}
      </Button>
      {errors.preview && (
        <div className={styles.errorMessage}>{errors.preview}</div>
      )}
    </div>
  );
};

export default DefaultView;
