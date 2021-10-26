import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Transaction from "./Transaction";
import styles from "../../../styles/components/Account/AllTransactionsModal.module.scss";
import { getUserData } from "../../../functions/getBackendData";
import moment from "moment";

const AllTransactionsModal = ({
  transactionsCurrent,
  isOpen,
  toggle,
  hasMore,
}) => {
  const [transactions, setTransactions] = useState(transactionsCurrent);
  const [page, setPage] = useState(1);
  const [haveMoreBefore, setHasMoreBefore] = useState();
  const [haveMoreAfter, setHasMoreAfter] = useState();
  const [loading, setLoading] = useState(false);

  const pageRef = useRef(1);
  const headlineRef = useRef({});

  useEffect(() => {
    setTransactions(transactionsCurrent);
  }, [transactionsCurrent]);

  useEffect(() => {
    setHasMoreAfter(hasMore);
  }, [hasMore]);

  const loadMoreTransactions = (order = 1, lastTime = moment().unix()) => {
    setLoading(order === 1 ? "next" : "prev");
    getUserData([
      {
        type: "transactions",
        params: {
          lastTransactionDate: lastTime,
          direction: order > 0 ? undefined : "ASCENDING",
        },
      },
    ])
      .then((res) => res.data.payload.processedData)
      .then((res) => {
        let result = res[0];

        if (order === -1) {
          if (page !== 1) setHasMoreBefore(result.hasMore);
          else setHasMoreBefore(false);

          setHasMoreAfter(true);
        } else if (order === 1) {
          setHasMoreAfter(result.hasMore);
          setHasMoreBefore(true);
        }

        setTransactions(result.transactions);
      })
      .finally(() => {
        setLoading(false);

        // go up
        headlineRef?.current?.scrollIntoView({ top: 0, behavior: "smooth" });
      });
  };

  const switchPage = (newPage) => {
    pageRef.current = page;
    setPage(newPage);
  };

  useEffect(() => {
    if (pageRef.current !== page) {
      let direction =
        pageRef.current < page ? 1 : pageRef.current > page ? -1 : 1;
      let lastTime;

      if (transactions && transactions.length)
        if (direction === -1)
          lastTime =
            !isOpen && transactionsCurrent
              ? moment.unix()
              : transactions[0].time;
        else if (direction === 1) lastTime = transactions.slice(-1).pop().time;

      loadMoreTransactions(direction, lastTime);
    }
  }, [page]);

  return (
    <Modal
      className={styles.transactionsModal}
      isOpen={isOpen}
      toggle={toggle}
      centered={true}
      modalTransition={{
        timeout: 100,
      }}
      backdropTransition={{
        timeout: 100,
      }}
      onClosed={() => {
        switchPage(1);
      }}
    >
      <a
        className={`closeBtn curspor-pointer`}
        ref={headlineRef}
        onClick={() => toggle()}
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.2407 9.50014L18.6389 2.10154C19.1204 1.6203 19.1204 0.842184 18.6389 0.360936C18.1577 -0.120312 17.3796 -0.120312 16.8983 0.360936L9.49989 7.75953L2.10167 0.360936C1.62021 -0.120312 0.842336 -0.120312 0.361098 0.360936C-0.120366 0.842184 -0.120366 1.6203 0.361098 2.10154L7.75932 9.50014L0.361098 16.8987C-0.120366 17.38 -0.120366 18.1581 0.361098 18.6393C0.600928 18.8794 0.916268 19 1.23138 19C1.5465 19 1.86161 18.8794 2.10167 18.6393L9.49989 11.2407L16.8983 18.6393C17.1384 18.8794 17.4535 19 17.7686 19C18.0837 19 18.3988 18.8794 18.6389 18.6393C19.1204 18.1581 19.1204 17.38 18.6389 16.8987L11.2407 9.50014Z"
            fill="white"
          />
        </svg>
      </a>
      <ModalHeader>Recent transactions</ModalHeader>
      <ModalBody>
        {!transactions || !transactions.length ? (
          <div
            className={`${styles.noAssetsHolder} d-flex flex-column align-items-center justify-content-center`}
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
          <>
            <div className={styles.transactionsList}>
              {transactions &&
                transactions.map((transaction, i) => (
                  <Transaction
                    key={i}
                    data={transaction}
                    showComission={true}
                  />
                ))}
            </div>
            <div
              className={`${styles.pagination} d-flex align-items-center justify-content-center`}
            >
              {haveMoreBefore ? (
                <Button
                  color="secondary"
                  className={styles.prevBtn}
                  onClick={() => {
                    if (!loading) switchPage(page - 1);
                    document.activeElement = null;
                  }}
                >
                  {loading === "prev" ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${styles.icon}`}
                        width="15px"
                        height="15px"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          fill="none"
                          stroke="#fff"
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
                      Loading...
                    </>
                  ) : (
                    <>
                      <svg
                        width="6"
                        className={styles.icon}
                        height="10"
                        viewBox="0 0 6 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.159477 4.6098L4.6096 0.159755C4.71253 0.0567475 4.84993 0 4.99643 0C5.14293 0 5.28033 0.0567475 5.38326 0.159755L5.71098 0.487394C5.92423 0.700889 5.92423 1.04788 5.71098 1.26105L1.9741 4.99793L5.71512 8.73895C5.81805 8.84196 5.87488 8.97928 5.87488 9.1257C5.87488 9.27228 5.81805 9.4096 5.71512 9.51269L5.3874 9.84025C5.28439 9.94325 5.14708 10 5.00058 10C4.85407 10 4.71668 9.94325 4.61375 9.84025L0.159477 5.38614C0.0563073 5.2828 -0.000358582 5.14484 -3.33786e-05 4.99817C-0.000358582 4.85094 0.0563073 4.71305 0.159477 4.6098Z"
                          fill="#02ABC1"
                        />
                      </svg>
                      Previous page
                    </>
                  )}
                </Button>
              ) : null}
              {haveMoreAfter ? (
                <Button
                  color="primary"
                  className={styles.nextBtn}
                  onClick={() => {
                    if (!loading) switchPage(page + 1);
                    document.activeElement = null;
                  }}
                >
                  {loading === "next" ? (
                    <>
                      Loading...
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${styles.icon}`}
                        width="15px"
                        height="15px"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          fill="none"
                          stroke="#fff"
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
                      Next page
                      <svg
                        width="6"
                        height="10"
                        viewBox="0 0 6 10"
                        className={styles.icon}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.7154 4.6098L1.26527 0.159755C1.16235 0.0567475 1.02495 0 0.878448 0C0.731945 0 0.594548 0.0567475 0.491622 0.159755L0.163901 0.487394C-0.0493491 0.700889 -0.0493491 1.04788 0.163901 1.26105L3.90078 4.99793L0.159755 8.73895C0.0568288 8.84196 0 8.97928 0 9.1257C0 9.27228 0.0568288 9.4096 0.159755 9.51269L0.487476 9.84025C0.590483 9.94325 0.727799 10 0.874302 10C1.0208 10 1.1582 9.94325 1.26113 9.84025L5.7154 5.38614C5.81857 5.2828 5.87524 5.14484 5.87491 4.99817C5.87524 4.85094 5.81857 4.71305 5.7154 4.6098Z"
                          fill="white"
                        />
                      </svg>
                    </>
                  )}
                </Button>
              ) : null}
            </div>
          </>
        )}
      </ModalBody>
    </Modal>
  );
};
export default AllTransactionsModal;
