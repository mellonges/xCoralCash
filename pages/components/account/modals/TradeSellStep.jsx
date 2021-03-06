import React, { useEffect, useState } from "react";
import {
  getTradeInfo,
  getUserData,
} from "../../../../functions/getBackendData";
import styles from "../../../../styles/components/Account/modals/Buying.module.scss";
import OperationStatus from "./Steps/OperationStatus";
import SelectSumm from "./Steps/SelectSumm";
import ConfirmSelling from "./Steps/Sell/ConfirmSelling";
import Redeem from "../../../../components/Redeem";

const TradeSellStep = ({
  setSwitchOffTabs,
  toggle,
  selectedToken,
  tokensList,
  assetName,
  iconAddress,
  deposited,
  expiration,
  available,
    loadingButton,
  decimals,
    termsID,
    coinAddress,
  redeemable_xcoral,
}) => {
  const [selectedWays, setSelectedWays] = useState({});

  const [paymentMethods, setPaymentMethods] = useState();

  const [holdings, setHoldings] = useState();

  const [summ, setSumm] = useState("");

  const [buyingInformation, setBuyingInformation] = useState();

  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(false);

  // useEffect(() => {
  //   setSelectedWays({
  //     ...selectedWays,
  //     token:
  //       holdings && selectedToken
  //         ? holdings.find((token) => token.ticker === selectedToken.ticker)
  //         : selectedToken,
  //   });
  // }, [selectedToken, holdings]);

  // useEffect(() => {
  //   setFirstLoading(true);
  //   getUserData([
  //     {
  //       type: "payment_methods",
  //     },
  //     {
  //       type: "holdings",
  //     },
  //   ])
  //     .then((res) => res.data.payload.processedData)
  //     .then((res) => {
  //       res.map((data) => {
  //         if (data.holdings) setHoldings(data.holdings);
  //         else if (data.paymentMethods) setPaymentMethods(data.paymentMethods);
  //       });
  //     })
  //     .catch((error) => console.error(error))
  //     .finally(() => setFirstLoading(false));
  // }, []);

  // useEffect(() => {
  //   if (paymentMethods && paymentMethods.length && !selectedWays.paywith) {
  //     let paymentMethodsSorted = paymentMethods.sort((a, b) =>
  //       a.dateLastUsed && b.dateLastUsed
  //         ? a.dateLastUsed > b.dateLastUsed
  //           ? -1
  //           : 1
  //         : 0
  //     );
  //     setSelectedWays({
  //       ...selectedWays,
  //       paywith:
  //         paymentMethodsSorted.find(
  //           (method) => method.type === "wallet" && method.quantity > 0
  //         ) || paymentMethodsSorted.find((method) => method.type !== "wallet"),
  //     });
  //   }
  // }, [paymentMethods]);

  const [activeStep, setActiveStep] = useState("selectSumm");

  // const
  //     sendPreview = () => {
  //   setLoading(true);
  //   getTradeInfo("sell", selectedWays.token.ticker, undefined, +summ)
  //     .then((res) => res.data.payload)
  //     .then((data) => {
  //       setBuyingInformation(data);
  //       setActiveStep("confirmSell");
  //       setSwitchOffTabs(true);
  //     })
  //     .catch((err) => console.error(err))
  //     .finally(() => setLoading(false));
  // };

  return (
    <div className={styles.buying}>
      {firstLoading ? (
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
          {activeStep === "selectSumm" ? (
            <Redeem
              selectedWays={selectedWays}
              summ={summ}
              isSell={true}
              loading={loading}
              setSumm={setSumm}
              tokensList={tokensList}
              setSelectedWays={setSelectedWays}
              paymentMethods={paymentMethods}
              setSwitchOffTabs={setSwitchOffTabs}
              holdings={holdings}
              deposited={deposited}
              iconAddress={iconAddress}
              assetName={assetName}
              expiration={expiration}
              termsID={termsID}
              available={available}
              decimals={decimals}
              loadingButton={loadingButton}
              coinAddress={coinAddress}
              redeemable_xcoral={redeemable_xcoral}


            // sendPreview={sendPreview}
            />
          ) : null}
          {activeStep === "confirmSell" ? (

            <ConfirmSelling
              setActiveStep={setActiveStep}
              setSwitchOffTabs={setSwitchOffTabs}
              title="Order preview"
              selectedWays={selectedWays}
              buyingInformation={buyingInformation}
              holdings={holdings}
              paymentMethods={paymentMethods}
              summ={summ}
              setBuyingInformation={setBuyingInformation}
            />
          ) : null}
        </>
      )}
    </div>
  );
};
export default TradeSellStep;
