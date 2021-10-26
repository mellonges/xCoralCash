import React from 'react'
import { formatPercent } from '../../../functions/helpers'

const PriceChangePercent = ({
  percent,
  className,
  positiveClass,
  negativeClass,
  neutralClass,
}) => {
  return (
    <span
      className={`${className} ${
        percent > 0 ? positiveClass : percent < 0 ? negativeClass : neutralClass
      } `}
    >
      {percent > 0 ? '+' : percent < 0 ? '' : ''}
      {formatPercent(percent)}
    </span>
  )
}

export default PriceChangePercent
