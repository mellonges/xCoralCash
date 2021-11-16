import React, { useEffect, useState } from 'react'

import styles from '../../../../styles/components/Account/modals/Buying.module.scss'

import SelectSumm from './Steps/SelectSumm'
import { getTradeInfo, getUserData } from '../../../../functions/getBackendData'
import ConfirmBuying from './Steps/ConfirmBuying'
import OperationStatus from './Steps/OperationStatus'

const TradeBuyStep = ({
  setSwitchOffTabs,
  toggle,
  selectedToken,
  tokensList,
}) => {
  const [direction, setDirection] = useState(1)

  const [selectedWays, setSelectedWays] = useState({})

  const [paymentMethods, setPaymentMethods] = useState()

  const [holdings, setHoldings] = useState()

  const [summ, setSumm] = useState('')

  const [buyingInformation, setBuyingInformation] = useState()

  const [loading, setLoading] = useState(false)
  const [firstLoading, setFirstLoading] = useState(false)

  // useEffect(() => {
  //   setSelectedWays({
  //     ...selectedWays,
  //     token: selectedToken,
  //   })
  // }, [selectedToken])
  //
  // useEffect(() => {
  //   setFirstLoading(true)
  //   getUserData([
  //     {
  //       type: 'payment_methods',
  //     },
  //     {
  //       type: 'holdings',
  //     },
  //   ])
  //     .then((res) => res.data.payload.processedData)
  //     .then((res) => {
  //       res.map((data) => {
  //         if (data.holdings) setHoldings(data.holdings)
  //         else if (data.paymentMethods) setPaymentMethods(data.paymentMethods)
  //       })
  //     })
  //     .catch((error) => console.error(error))
  //     .finally(() => setFirstLoading(false))
  // }, [])
  //
  // useEffect(() => {
  //   if (paymentMethods && paymentMethods.length && !selectedWays.paywith) {
  //     let paymentMethodsSorted = paymentMethods.sort((a, b) =>
  //       a.dateLastUsed && b.dateLastUsed
  //         ? a.dateLastUsed > b.dateLastUsed
  //           ? -1
  //           : 1
  //         : 0,
  //     )
  //
  //     setSelectedWays({
  //       ...selectedWays,
  //       paywith:
  //         paymentMethodsSorted.find(
  //           (method) => method.type === 'wallet' && method.quantity > 0,
  //         ) || paymentMethodsSorted.find((method) => method.type !== 'wallet'),
  //     })
  //   }
  // }, [paymentMethods])
  //
  const [activeStep, setActiveStep] = useState('selectSumm')
  //
  // useEffect(() => {
  //   if (activeStep === 'selectSumm' && summ.length) {
  //     setSumm('')
  //   }
  // }, [activeStep])
  //
  // const sendPreview = () => {
  //   setLoading(true)
  //   getTradeInfo(
  //     'buy',
  //     selectedWays.token.ticker,
  //     direction === 1 ? +summ : undefined,
  //     direction === 2 ? +summ : undefined,
  //   )
  //     .then((res) => res.data.payload)
  //     .then((data) => {
  //       setBuyingInformation(data)
  //       setActiveStep('confirmBuying')
  //       setSwitchOffTabs(true)
  //     })
  //     .catch((err) => console.error(err))
  //     .finally(() => setLoading(false))
  // }

  return (
    <div className={`${styles.buying} position-relative`}>
      {!firstLoading ? (
        <div className={styles.loadingWrapper}>
          <div className={styles.ldsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>

          <p>trade buy step</p>
          {activeStep === 'selectSumm' ? (
            <SelectSumm
              direction={direction}
              setDirection={setDirection}
              selectedWays={selectedWays}
              summ={summ}
              setSumm={setSumm}
              setSelectedWays={setSelectedWays}
              paymentMethods={paymentMethods}
              setSwitchOffTabs={setSwitchOffTabs}
              holdings={holdings}
              sendPreview={sendPreview}
              loading={loading}
              tokensList={tokensList}
            />
          ) : null}
          {activeStep === 'confirmBuying' ? (
            <ConfirmBuying
              setActiveStep={setActiveStep}
              setSwitchOffTabs={setSwitchOffTabs}
              title="Order preview"
              selectedWays={selectedWays}
              buyingInformation={buyingInformation}
              holdings={holdings}
              direction={direction}
              paymentMethods={paymentMethods}
              setBuyingInformation={setBuyingInformation}
            />
          ) : null}
          {activeStep === 'finishOrError' ? (
            <OperationStatus
              info={buyingInformation}
              setActiveStep={setActiveStep}
              selectedWays={selectedWays}
              toggle={toggle}
            />
          ) : null}
        </>
      )}
    </div>
  )
}
export default TradeBuyStep
