/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import AutosizeInput from "react-input-autosize";

import ChooseToken from "./ChooseToken";
import styles from "../../../../../styles/components/Account/modals/trade-modules/SelectSumm.module.scss";
import ChoosePayment from "./ChoosePayment";
import { getTokenImageUrl } from "../../../../../functions/getBackendData";
import { Button } from "reactstrap";
import TokenBalance from "./TokenBalance";
import styles2 from "../../../../../styles/components/Account/modals/trade-modules/ConfirmBuying.module.scss";
import { formatPrice } from "../../../../../functions/helpers";
import { useDispatch } from "react-redux";
import { getTotalPayout } from "../../../../../redux/reducers/asyncActions/getTotalPayout";



const SelectSumm = ({
    selectedWays,
    setSelectedWays,
    setSwitchOffTabs,
    paymentMethods,
    holdings,
    sendPreview,
    selectedToken,
    isSell = false,
    isConvert = false,
    tokensList,
    Loading,
    deposited,
    assetName,
    iconAddress,
    expiration,
    decimals,
    available,
    coinAddress,




}) => {
    const [focused, setSummFocused] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch()
    const selectSUmmRef = useRef();
    const [summ, setSumm] = useState("")
    const [direction, setDirection] = useState(0)


    const availableFormat = available / 10 ** decimals
    console.log(decimals + "its decimals")
    console.log(available / 10 ** decimals + " its available")
    useEffect(() => {
        if (direction) setValidationErrors({});
    }, [direction]);


    return (
        <>
            <div
            >
                {/*{selectedWays && selectedWays.token && !isSell && !isConvert ? (*/}
                {/*  <div*/}
                {/*    onClick={() => setDirection(direction > 1 ? 1 : 2)}*/}
                {/*    className={`${styles.direction} d-flex align-items-center justify-content-end`}*/}
                {/*  >*/}
                {/*    <svg*/}
                {/*      width="12"*/}
                {/*      height="15"*/}
                {/*      viewBox="0 0 12 15"*/}
                {/*      fill="none"*/}
                {/*      xmlns="http://www.w3.org/2000/svg"*/}
                {/*    >*/}
                {/*      <path*/}
                {/*        d="M8.78217 0L7.71733 1.06484L9.44207 2.78209H1.50075C0.672455 2.78209 0.000976562 3.45357 0.000976562 4.28187V6.53153H1.50075V4.28187H9.44207L7.72483 5.99911L8.78217 7.05645L11.7817 4.0569C12.0725 3.76439 12.0725 3.29206 11.7817 2.99956L8.78217 0Z"*/}
                {/*        fill="#8AAAB4"*/}
                {/*      />*/}
                {/*      <path*/}
                {/*        d="M10.4991 10.2809H2.55773L4.27497 8.56369L3.21763 7.50635L0.218077 10.5059C-0.0726923 10.7984 -0.0726923 11.2707 0.218077 11.5632L3.21763 14.5628L4.27497 13.5055L2.55773 11.7807H10.4991C11.3273 11.7807 11.9988 11.1092 11.9988 10.2809V8.03127H10.4991V10.2809Z"*/}
                {/*        fill="#8AAAB4"*/}
                {/*      />*/}
                {/*    </svg>*/}
                {/*    {direction === 1*/}
                {/*      ? selectedWays && selectedWays.token.ticker*/}
                {/*      : "USD"}*/}
                {/*  </div>*/}
                {/*) : null}*/}
                <div
                    className={`d-flex align-items-center justify-content-center ${styles.summWrapper}`}
                    onClick={() => selectSUmmRef.current && selectSUmmRef.current.focus()}
                >
                    <AutosizeInput
                        className={`${styles.summInput}`}
                        placeholder="0"
                        ref={selectSUmmRef}
                        value={summ}
                        onFocus={() => setSummFocused(true)}
                        onBlur={(e) => {
                            setSummFocused(false);
                        }}
                        onChange={(e) => {
                            console.log(e.target.value)
                            if (
                                e.target.value != "" &&
                                /^\d{0,9}(\.?)(\d{1,2})?$/.test(e.target.value)
                            ) {
                                if (e.target.value > availableFormat) {
                                    setSumm(e.target.value);
                                    setDirection(4)
                                    return
                                }
                                if (e.target.value == 0) {
                                    console.log(e.target.value)
                                    setSumm(e.target.value);
                                    setDirection(2)
                                    return
                                }
                                setSumm(e.target.value);
                                setDirection(0)

                            } else if (e.target.value === "") {
                                setSumm("");
                                setDirection(0)
                            }
                        }}
                    />
                    <sup
                        className={`${styles.dollarSymbol} ${focused || (summ.length && summ !== "0") ? styles.active : ""
                            } `}
                    >
                        {assetName}
                    </sup>

                </div>
                {direction ? (
                    <div className="text-center">
                        <div className={styles.validationError}>
                            {direction === 2 && "Must be greater than 0"}
                            {direction === 4 && `Not enough ${assetName}`}
                        </div>
                    </div>
                ) : null}

                <div className={`${styles2.ConfirmBuying}`}>
                    <div className={styles2.confirmInfo}>
                        <div
                            className={`${styles2.row} d-flex justify-content-between align-items-center`}
                        >
                            <div className={styles2.label}>Asset</div>
                            <div className={styles2.value}>
                                <div className={styles2.cardLogo}>

                                    <img width="21px" height="21px" src={`/coins_icons/coin_${iconAddress}.png`} />
                                    {assetName}
                                </div>
                                {/*{selectedWays.paywith.title}*/}
                            </div>
                        </div>
                        <div
                            className={`${styles2.row} d-flex justify-content-between align-items-center`}
                        >
                            <div className={styles2.label}>Expiration term</div>
                            <div className={styles2.value}>
                                {/*{formatPrice(buyingInformation.avgPrice)}*/}
                                {expiration}
                            </div>
                        </div>
                        {/* <div
          className={`${styles.row} d-flex justify-content-between align-items-center`}
        >
          <div className={styles.label}>Purchase</div>
          <div className={styles.value}>
            {formatPrice(buyingInformation.amountSpend)}
          </div>
        </div> */}
                    </div>
                        <Button
                            color="primary"
                            className={styles.previewBtn}
                            onClick={() => {
                                sendPreview();
                                dispatch(getTotalPayout({ assetAddress: coinAddress, amount: summ, decimals: decimals }))

                            }}
                            disabled={direction || summ === ""}
                        >
                            Preview Deposit
                        </Button>

                    <TokenBalance text={"Available"} balance={formatPrice(available / 10 ** decimals).slice(1) + " " + assetName} />
                    <TokenBalance
                        text={"Deposited"}
                        balance={formatPrice(deposited).slice(1) + " " + assetName}
                    />
                </div>
            </div>
        </>
    );
};
export default SelectSumm;

