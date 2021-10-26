import React, { useEffect, useState } from "react";
import {
  getTradeInfo,
  getUserData,
} from "../../../../functions/getBackendData";
import styles from "../../../../styles/components/Account/modals/Buying.module.scss";
import ConfirmConvert from "./Steps/Convert/ConfirmConvert";
import OperationStatus from "./Steps/OperationStatus";
import SelectSumm from "./Steps/SelectSumm";

const TradeConvertStep = ({
  setSwitchOffTabs,
  toggle,
  selectedToken,
  tokensList,
}) => {
  const [selectedWays, setSelectedWays] = useState({});

  const [holdings, setHoldings] = useState();

  const [summ, setSumm] = useState("");

  const [buyingInformation, setBuyingInformation] = useState();

  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(false);

  useEffect(() => {
    setSelectedWays({
      ...selectedWays,
      token:
        holdings && selectedToken
          ? holdings.find((token) => token.ticker === selectedToken.ticker)
          : selectedToken,
    });
  }, [selectedToken]);

  useEffect(() => {
    setFirstLoading(true);
    getUserData([
      {
        type: "holdings",
      },
    ])
      .then((res) => res.data.payload.processedData)
      .then((res) => {
        res.map((data) => {
          if (data.holdings) setHoldings(data.holdings);
        });
      })
      .catch((error) => console.error(error))
      .finally(() => setFirstLoading(false));
  }, []);

  useEffect(() => {
    if (holdings)
      setSelectedWays({
        ...selectedWays,
        token:
          selectedToken &&
          holdings.some((token) => token.ticker === selectedToken.ticker)
            ? holdings.find((token) => token.ticker === selectedToken.ticker)
            : undefined,
      });
  }, [holdings]);

  const [activeStep, setActiveStep] = useState("selectSumm");

  const sendPreview = () => {
    setLoading(true);
    getTradeInfo(
      "convert",
      selectedWays.token.ticker,
      undefined,
      +summ,
      selectedWays.paywith.ticker
    )
      .then((res) => res.data.payload)
      .then((data) => {
        setBuyingInformation(data);
        setActiveStep("confirmSell");
        setSwitchOffTabs(true);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

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
            <SelectSumm
              selectedWays={selectedWays}
              summ={summ}
              isConvert={true}
              setSumm={setSumm}
              setSelectedWays={setSelectedWays}
              setSwitchOffTabs={setSwitchOffTabs}
              holdings={holdings}
              sendPreview={sendPreview}
              loading={loading}
              tokensList={tokensList}
            />
          ) : null}
          {activeStep === "confirmSell" ? (
            <ConfirmConvert
              setActiveStep={setActiveStep}
              setSwitchOffTabs={setSwitchOffTabs}
              title="Order preview"
              selectedWays={selectedWays}
              buyingInformation={buyingInformation}
              holdings={holdings}
              summ={summ}
              setBuyingInformation={setBuyingInformation}
            />
          ) : null}
          {activeStep === "finishOrError" ? (
            <OperationStatus
              info={buyingInformation}
              setActiveStep={setActiveStep}
              selectedWays={selectedWays}
              toggle={toggle}
              isConvert={true}
            />
          ) : null}
        </>
      )}
    </div>
  );
};
export default TradeConvertStep;
