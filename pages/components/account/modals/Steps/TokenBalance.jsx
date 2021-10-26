import React from 'react'
import styles from '../../../../../styles/components/Account/modals/trade-modules/TokenBalance.module.scss'

const TokenBalance = ({ quantity, ticker }) => {
  return (
    <div className={`${styles.balance} d-flex align-items-center`}>
      <span>Balance</span>
      <div className={`${styles.balanceSumm} ml-auto`}>
        {quantity} {ticker ? ticker : 'USD'}
      </div>
    </div>
  )
}
export default TokenBalance
