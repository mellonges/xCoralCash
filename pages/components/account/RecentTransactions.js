import React, { useEffect, useState } from "react";
import styles from "../../../styles/components/Account/RecentTransactions.module.scss";
import Placeholder from "../common/Placeholder";
import AllTransactionsModal from "./AllTransactionsModal";
import Transaction from "./Transaction";
import { RecentTransactionsModalObserver } from "../../../functions/observers";

const RecentTransactions = ({ transations, hasMore }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  useEffect(() => {
    const subscription = RecentTransactionsModalObserver.subscribe((data) => {
      if (data) setModalOpen(data.isOpen);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className={styles.RecentTransactionsWrapper}>
      {transations && transations.length ? (
        <div className={styles.transactions}>
          <div className={styles.transationsList}>
            {transations.slice(0, 5).map((transaction, index) => (
              <Transaction key={index} data={transaction} />
            ))}
          </div>

          <a
            className={styles.allTransactionsLink}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleModal();
            }}
          >
            See all transactions
          </a>
        </div>
      ) : transations ? (
        <div
          className={`${styles.noTransactions} d-flex align-items-center flex-column justify-content-center`}
        >
          <div className={styles.Icon}>
            <svg
              width="19"
              height="24"
              viewBox="0 0 19 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.7472 0.842116C14.2821 0.377029 13.5281 0.377028 13.063 0.842116C12.5972 1.30792 12.598 2.06339 13.0648 2.52818L14.95 4.40515H2.37572C1.06419 4.40515 0.000976562 5.46836 0.000976562 6.77989V9.15463C0.000976562 9.8104 0.532581 10.342 1.18835 10.342C1.84412 10.342 2.37572 9.8104 2.37572 9.15463V6.77989H14.95L13.068 8.66187C12.6057 9.12419 12.6057 9.87375 13.068 10.3361C13.5303 10.7984 14.2799 10.7984 14.7422 10.3361L18.6546 6.42368C19.115 5.96053 19.115 5.21263 18.6546 4.74949L14.7472 0.842116Z"
                fill="#678086"
              />
              <path
                d="M16.6242 16.278H4.0499L5.93188 14.3961C6.3942 13.9337 6.3942 13.1842 5.93189 12.7219C5.46957 12.2595 4.72001 12.2595 4.25769 12.7219L0.345302 16.6343C-0.115101 17.0974 -0.115101 17.8453 0.345302 18.3084L4.25678 22.2199C4.7196 22.6827 5.46998 22.6827 5.9328 22.2199C6.3949 21.7578 6.39572 21.0088 5.93462 20.5457L4.0499 18.6528H16.6242C17.9357 18.6528 18.9989 17.5896 18.9989 16.278V13.9033C18.9989 13.2475 18.4673 12.7159 17.8115 12.7159C17.1558 12.7159 16.6242 13.2475 16.6242 13.9033V16.278Z"
                fill="#678086"
              />
            </svg>
          </div>
          <strong className={styles.name}>You have no transactions</strong>
          <span className={styles.descr}>Start trading</span>
        </div>
      ) : (
        <Placeholder width="100%" height="370px" />
      )}

      <AllTransactionsModal
        isOpen={modalOpen}
        transactionsCurrent={transations}
        toggle={toggleModal}
        hasMore={hasMore}
      />
    </div>
  );
};
export default RecentTransactions;
