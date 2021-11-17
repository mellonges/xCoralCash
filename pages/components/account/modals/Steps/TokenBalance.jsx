import React from 'react'
import styles from '../../../../../styles/components/Account/modals/trade-modules/TokenBalance.module.scss'

const TokenBalance = ({ text,balance }) => {
  return (
    <div className={`${styles.balance} d-flex align-items-center`}>
      <span>{text}</span>
      <div className={`${styles.balanceSumm} ml-auto`}>
          {balance}
      </div>
    </div>
  )
}
export default TokenBalance
