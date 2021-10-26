import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import { getTokenImageUrl } from '../../../functions/getBackendData'
import { capitalizeFirstLetter, formatPrice } from '../../../functions/helpers'
import styles from '../../../styles/components/Account/TransactionView.module.scss'

const Transaction = ({ data, showComission }) => {
  const router = useRouter()

  return data ? (
    <div
      className={`${styles.TransactionView} d-flex align-items-center cursor-pointer`}
      onClick={() =>
        data.type !== 'CONVERT' &&
        router.push(
          '/account/persons/[token]',
          `/account/persons/${data.ticker}`,
        )
      }
    >
      <div className={`${styles.Image} position-relative`}>
        {data.type !== 'CONVERT' ? (
          <img
            src={getTokenImageUrl(data.ticker, 'small')}
            alt={data.ticker}
            className={styles.img}
          />
        ) : data.from && data.into ? (
          <>
            <div className={styles.ImageConvert}>
              <img
                src={getTokenImageUrl(data.from.ticker, 'small')}
                alt={data.from.ticker}
                className={styles.img}
              />
              <img
                src={getTokenImageUrl(data.into.ticker, 'small')}
                alt={data.into.ticker}
                className={styles.img}
              />
            </div>
            <div className={styles.Icon}>
              <svg
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="13.5"
                  cy="13.4998"
                  r="12.5"
                  fill="#FF8D43"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M8.75195 11H16.9413L15.7216 12.2197C15.5809 12.3603 15.5019 12.5511 15.5019 12.75C15.5019 12.9489 15.5809 13.1397 15.7216 13.2803C15.8622 13.421 16.053 13.5 16.2519 13.5C16.4508 13.5 16.6416 13.421 16.7823 13.2803L19.2823 10.7803C19.3519 10.7107 19.4071 10.628 19.4448 10.537C19.4825 10.446 19.5019 10.3485 19.5019 10.25C19.5019 10.1515 19.4825 10.054 19.4448 9.96299C19.4071 9.87199 19.3519 9.78931 19.2823 9.71967L16.7823 7.21967C16.6416 7.07902 16.4508 7 16.2519 7C16.053 7 15.8622 7.07902 15.7216 7.21967C15.5809 7.36033 15.5019 7.5511 15.5019 7.75002C15.5019 7.94893 15.5809 8.1397 15.7216 8.28036L16.9413 9.50001H8.75195C8.55304 9.50001 8.36227 9.57903 8.22162 9.71968C8.08097 9.86033 8.00195 10.0511 8.00195 10.25C8.00195 10.4489 8.08097 10.6397 8.22162 10.7803C8.36227 10.921 8.55304 11 8.75195 11Z"
                  fill="white"
                />
                <path
                  d="M17.75 16H9.56067L10.7804 14.7804C10.921 14.6397 11 14.4489 11 14.25C11 14.0511 10.921 13.8603 10.7804 13.7197C10.6397 13.579 10.4489 13.5 10.25 13.5C10.0511 13.5 9.86033 13.579 9.71967 13.7197L7.21968 16.2197C7.15003 16.2893 7.09479 16.372 7.05709 16.463C7.0194 16.554 7 16.6515 7 16.75C7 16.8485 7.0194 16.946 7.05709 17.037C7.09479 17.128 7.15003 17.2107 7.21968 17.2803L9.71967 19.7803C9.86033 19.921 10.0511 20 10.25 20C10.4489 20 10.6397 19.921 10.7804 19.7803C10.921 19.6397 11 19.4489 11 19.25C11 19.0511 10.921 18.8603 10.7804 18.7197L9.56067 17.5H17.75C17.9489 17.5 18.1397 17.421 18.2803 17.2803C18.421 17.1397 18.5 16.9489 18.5 16.75C18.5 16.5511 18.421 16.3603 18.2803 16.2197C18.1397 16.079 17.9489 16 17.75 16Z"
                  fill="white"
                />
              </svg>
            </div>
          </>
        ) : null}
        <div className={styles.Icon}>
          {data.type === 'BUY' ? (
            <svg
              width="29"
              height="30"
              viewBox="0 0 29 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="14.192"
                cy="15.0309"
                r="13.0102"
                fill="#1EB691"
                stroke="white"
                strokeWidth="2.08163"
              />
              <path
                d="M18.5684 14.0956C18.158 14.4923 17.4942 14.4908 17.0857 14.0922L15.7625 12.79V19.7367C15.7625 20.299 15.2931 20.7549 14.714 20.7549C14.135 20.7549 13.6656 20.299 13.6656 19.7367V12.7899L12.3424 14.0922C11.9339 14.4908 11.2701 14.4923 10.8597 14.0956C10.4492 13.6989 10.4477 13.0542 10.8561 12.6556L13.9709 9.60502C14.3794 9.20745 15.0464 9.20526 15.4562 9.60405L18.572 12.6556C18.9804 13.0541 18.979 13.6988 18.5684 14.0956Z"
                fill="white"
              />
            </svg>
          ) : data.type === 'SELL' ? (
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="13.5"
                cy="13.5"
                r="12.5"
                fill="#266FDB"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M9.29676 14.3981C9.69109 14.017 10.3289 14.0185 10.7214 14.4014L11.9926 15.6525L11.9926 8.9783C11.9926 8.43798 12.4436 8 13 8C13.5564 8 14.0074 8.43798 14.0074 8.9783L14.0074 15.6526L15.2786 14.4014C15.6711 14.0184 16.3089 14.0169 16.7032 14.3981C17.0976 14.7793 17.0991 15.3987 16.7067 15.7816L13.714 18.7126C13.3215 19.0946 12.6807 19.0967 12.2869 18.7135L9.29334 15.7817C8.90097 15.3988 8.90233 14.7793 9.29676 14.3981Z"
                fill="white"
              />
            </svg>
          ) : null}
        </div>
      </div>
      <div className={styles.Info}>
        <div className={styles.transactionTitle}>
          <span
            style={{
              color: `${
                data.type === 'BUY'
                  ? '#1EB691'
                  : data.type === 'SELL'
                  ? '#266FDB'
                  : data.type === 'CONVERT'
                  ? '#F18138'
                  : '#333'
              }`,
            }}
          >
            {capitalizeFirstLetter(data.type)}
          </span>{' '}
          {data.type === 'CONVERT' && data.from && data.into
            ? `${data.from.quantity} ${data.from.ticker} → ${data.into.quantity} ${data.into.ticker}`
            : `${data.quantity} ${data.ticker}`}
        </div>
        <div className={styles.date}>
          {moment.unix(data.time).format('MMM DD, YYYY HH:mm')}
        </div>
      </div>
      {showComission && data.avgPrice ? (
        <div className={`${styles.comissions}`}>
          <div className={styles.comission}>{formatPrice(data.avgPrice)}</div>
          <span>per token</span>
        </div>
      ) : null}
      <div className={`${styles.summ} ml-auto text-right`}>
        <div className={styles.total}>
          {!data.amount ? '$0' : formatPrice(data.amount)}
        </div>
        <div
          className={`${styles.status} ${
            data.status === 'FAILED' ? styles.fail : ''
          }`}
        >
          {data.status === 'COMPLETE'
            ? 'Completed'
            : `Fail: ${data.statusMessage}`}
        </div>
      </div>
    </div>
  ) : null
}
export default Transaction
