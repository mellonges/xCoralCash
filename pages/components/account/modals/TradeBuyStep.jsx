import React, { useEffect, useState } from 'react'

import styles from '../../../../styles/components/Account/modals/Buying.module.scss'

import SelectSumm from './Steps/SelectSumm'
import { getTradeInfo, getUserData } from '../../../../functions/getBackendData'
import ConfirmBuying from './Steps/ConfirmBuying'
import OperationStatus from './Steps/OperationStatus'
import { useSelector } from "react-redux";
const TradeBuyStep = ({
    setSwitchOffTabs,
    iconAddress,
    assetName,
    Loading,
    deposited,
    expiration,
    APY,
    decimals,
    available,
    coinAddress,
    totalPayout

}) => {
    const [direction, setDirection] = useState(1)

    const [selectedWays, setSelectedWays] = useState({})

    const [paymentMethods, setPaymentMethods] = useState()

    const [holdings, setHoldings] = useState()

    const [summ, setSumm] = useState('')

    const [buyingInformation, setBuyingInformation] = useState()

    const [loading, setLoading] = useState(false)
    // const [firstLoading, setFirstLoading] = useState(false)


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
    const sendPreview = () => {
        setActiveStep("confirmBuying")
    }

    return (
        <div className={`${styles.buying} position-relative`}>
            {!Loading ? (
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

                    {activeStep === 'selectSumm' ? (
                        <SelectSumm
                            direction={direction}
                            setDirection={setDirection}
                            selectedWays={selectedWays}
                            setSumm={setSumm}
                            // setSelectedWays={setSelectedWays}
                            // paymentMethods={paymentMethods}
                            setSwitchOffTabs={setSwitchOffTabs}
                            // holdings={holdings}
                            sendPreview={sendPreview}
                            loading={loading}
                            iconAddress={iconAddress}
                            assetName={assetName}
                            deposited={deposited}
                            expiration={expiration}
                            available={available}
                            decimals={decimals}
                            coinAddress={coinAddress}
                        // tokensList={tokensList}
                            loadingButton={loadingButton}
                        />
                    ) : null}
                    {activeStep === 'confirmBuying' ? (
                        <ConfirmBuying
                            setActiveStep={setActiveStep}
                            setSwitchOffTabs={setSwitchOffTabs}
                            title="Order preview"
                            selectedWays={selectedWays}
                            buyingInformation={buyingInformation}
                            // holdings={holdings}
                            direction={direction}
                            paymentMethods={paymentMethods}
                            setBuyingInformation={setBuyingInformation}
                            assetName={assetName}
                            deposited={deposited}
                            iconAddress={iconAddress}
                            expiration={expiration}
                            available={available}
                            decimals={decimals}
                            APY={APY}
                            totalPayout={totalPayout}
                        />
                    ) : null}
                </>
            )}
        </div>
    )
}
export default TradeBuyStep
