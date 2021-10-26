import moment from "moment";
import shortid from "shortid";
import { formatPrice, getTokenIconUrl } from "../../../../functions/helpers";
import styles from "../../../../styles/components/Account/wallet/TransfersMobileTable.module.scss";
import TooltipComponent from "../../common/Tooltip";

const TransfersMobileTable = ({ transfers }) => {
  return (
    <div className={`${styles.transfersMobile} d-block d-md-none`}>
      {transfers && transfers.length ? (
        <div className={styles.Items}>
          {transfers.map((operation) => (
            <div
              className={`${styles.operationItem} d-flex`}
              key={shortid.generate()}
            >
              <div
                className={`${styles.operationIconWrapper} d-flex flex-column align-items-center`}
              >
                <span
                  className={`${styles.operationIcon} ${
                    operation.status === "failed" ? styles.failed : ""
                  } d-flex align-items-center justify-content-center`}
                >
                  {operation.type === "deposit" &&
                  operation.status !== "failed" ? (
                    <svg
                      width="10"
                      height="16"
                      viewBox="0 0 10 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.335651 5.96736C0.781712 5.53622 1.50319 5.53788 1.94714 5.97107L3.38519 7.38633L3.38519 1.46259C3.38519 0.851398 3.89535 0.355957 4.5247 0.355957C5.15405 0.355957 5.66421 0.851397 5.66421 1.46259L5.66421 7.38639L7.10225 5.97101C7.5462 5.53782 8.26768 5.53616 8.71374 5.9673C9.15986 6.3985 9.16151 7.09917 8.71762 7.53236L5.33238 10.8478C4.88843 11.2799 4.16353 11.2823 3.7181 10.8489L0.331779 7.53242C-0.112059 7.09928 -0.110524 6.39856 0.335651 5.96736Z"
                        fill="white"
                      />
                      <rect
                        x="0.353149"
                        y="12.9038"
                        width="8.65357"
                        height="2.59607"
                        rx="1.29803"
                        fill="white"
                      />
                    </svg>
                  ) : operation.type === "withdrawal" &&
                    operation.status !== "failed" ? (
                    <svg
                      width="10"
                      height="16"
                      viewBox="0 0 10 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.71367 5.56145C8.2676 5.99259 7.54613 5.99093 7.10217 5.55774L5.66413 4.14248L5.66413 10.0662C5.66413 10.6774 5.15397 11.1729 4.52462 11.1729C3.89527 11.1729 3.38511 10.6774 3.38511 10.0662L3.38511 4.14242L1.94707 5.5578C1.50311 5.99099 0.781633 5.99265 0.335573 5.5615C-0.110545 5.1303 -0.112196 4.42964 0.331699 3.99645L3.71694 0.680983C4.16089 0.248898 4.88579 0.246518 5.33122 0.679932L8.71754 3.99639C9.16138 4.42953 9.15984 5.13025 8.71367 5.56145Z"
                        fill="white"
                      />
                      <rect
                        x="0.353271"
                        y="12.9038"
                        width="8.65357"
                        height="2.59607"
                        rx="1.29803"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="3"
                      height="17"
                      viewBox="0 0 3 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.41113 0C0.631827 0 0 0.631827 0 1.41113V9.50035C0 10.2797 0.631827 10.9115 1.41113 10.9115C2.19044 10.9115 2.82227 10.2797 2.82227 9.50035V1.41113C2.82234 0.631827 2.19051 0 1.41113 0Z"
                        fill="white"
                      />
                      <path
                        d="M1.41113 12.7446C0.631827 12.7446 0 13.3765 0 14.1558V14.9984C0 15.7777 0.631827 16.4096 1.41113 16.4096C2.19044 16.4096 2.82227 15.7777 2.82227 14.9984V14.1558C2.82234 13.3763 2.19051 12.7446 1.41113 12.7446Z"
                        fill="white"
                      />
                    </svg>
                  )}
                </span>
                <span className={styles.orderId}>{operation.orderID}</span>
              </div>
              <div className={`${styles.info} w-100 d-flex`}>
                <div className={styles.infoInner}>
                  <div className={styles.top}>
                    <span className={styles.operationType}>
                      {operation.method.type === "crypto" ? (
                        <span className="text-uppercase">
                          {operation.method.coin}
                        </span>
                      ) : operation.method.type === "card" ? (
                        "USD"
                      ) : (
                        ""
                      )}{" "}
                      {operation.type}
                    </span>
                    <span className={`${styles.date} d-block`}>
                      {moment
                        .unix(operation.timestamp)
                        .format("MMM DD, YYYY HH:mm")}
                    </span>
                  </div>
                  <div className={styles.bottom}>
                    {operation.method.type === "crypto" ? (
                      <div
                        className={`${styles.cryptoInfo} d-flex align-items-center`}
                      >
                        <img
                          src={`${getTokenIconUrl(operation.method.coin)}`}
                          alt=""
                          className={styles.cryptoIcon}
                        />
                        <span className={styles.address}>
                          {operation.method.addr}
                        </span>
                      </div>
                    ) : (
                      <div className={styles.fiatInfo}>
                        {operation.type === "deposit"
                          ? `From ${operation.method.title}`
                          : `Into ${operation.method.title}`}
                      </div>
                    )}
                    {operation.status === "complete_big" ||
                    operation.status === "complete_small" ||
                    operation.status === "waiting" ||
                    operation.status === "confirming" ||
                    (operation.status === "failed" &&
                      operation.statusMessage) ? (
                      <TooltipComponent
                        id={operation.orderID}
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
                        tooltTipContent={
                          operation.status === "complete_big" ? (
                            `You deposited more crypto that you originally intended. Your entire deposit has been added to your wallet.`
                          ) : operation.status === "complete_small" ? (
                            "You deposited less crypto that you originally intended. Your entire deposit has been added to your wallet."
                          ) : operation.status === "confirming" ? (
                            "We have received your deposit. Once it’s confirmed by the blockchain network, the funds will be added to your wallet."
                          ) : operation.status === "waiting" &&
                            operation.type === "deposit" ? (
                            <>
                              Please send your{" "}
                              <span className="text-uppercase">
                                {operation.method.coin}
                              </span>{" "}
                              coins to this address.
                            </>
                          ) : operation.status === "waiting" &&
                            operation.type === "withdrawal" ? (
                            <>
                              Your{" "}
                              <span className="text-uppercase">
                                {operation.method.coin}
                              </span>{" "}
                              withdrawal is being processed; coins will be sent
                              to this address
                            </>
                          ) : operation.statusMessage ? (
                            operation.statusMessage
                          ) : (
                            ""
                          )
                        }
                      />
                    ) : null}

                    <div
                      className={`${styles.status} ${
                        operation.status === "failed" ? styles.failed : ""
                      } `}
                    >
                      {operation.status !== "complete" &&
                      operation.status !== "failed" ? (
                        <svg
                          width="7"
                          height="7"
                          viewBox="0 0 7 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="3.5" cy="3.5" r="3.5" fill="#FFC738" />
                        </svg>
                      ) : (
                        ""
                      )}{" "}
                      {operation.status === "complete"
                        ? "Completed"
                        : operation.status === "complete_big" ||
                          operation.status === "complete_small"
                        ? "Completed (with warnings)"
                        : operation.status === "failed"
                        ? "Failed"
                        : operation.status === "waiting"
                        ? "Waiting"
                        : "Confirming"}
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.amountHolder} ml-auto position-absolute`}
                >
                  <strong className={styles.amount}>
                    {operation.method.type === "card"
                      ? `${
                          operation.type !== "deposit" ? "-" : ""
                        }${formatPrice(operation.amount)}`
                      : operation.method.type === "crypto"
                      ? `${operation.type !== "deposit" ? "-" : ""}${
                          operation.cryptoAmount
                        } ${operation.method.coin.toUpperCase()}`
                      : ``}
                  </strong>
                  {operation.amount ? (
                    <span className={styles.equivalent}>
                      {operation.type === "deposit" ? "+" : "-"}
                      {formatPrice(operation.amount)}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : transfers ? (
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
          <strong className={styles.name}>You have no operations</strong>
          <span className={styles.descr}>Make your first deposit</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default TransfersMobileTable;
