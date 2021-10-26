import styles from "@/styles/components/Account/modals/TransactModals.module.scss";

const PayWithMethod = ({ icon, text }) => {
  return (
    <div className={styles.payWithMethodCard}>
      <img src={icon} />
      <div className={styles.text}>{text}</div>
    </div>
  );
};

const PayWithInput = ({ paymentMethod, onClick, className = "" }) => {
  let text = paymentMethod
    ? paymentMethod.ticker
      ? `${paymentMethod.title} (${paymentMethod.ticker.toUpperCase()})`
      : `${paymentMethod.title}`
    : "";

  return (
    <div className={`${styles.PayWithInput} ${className}`} onClick={onClick}>
      <div className={styles.title}>Pay with</div>
      <div className={styles.method}>
        {paymentMethod ? (
          <PayWithMethod icon={paymentMethod.img} text={text} />
        ) : (
          "Select a payment method"
        )}
      </div>
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
  );
};

export default PayWithInput;
