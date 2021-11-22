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
import {useDispatch, useSelector} from "react-redux";
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
    loadingButton,
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
    useEffect(() => {
        selectSUmmRef.current.focus()
    }, [])

    return (
        <>
            <div
            >
                <div
                    className={`d-flex align-items-center justify-content-center ${styles.summWrapper}`}
                    onClick={() => selectSUmmRef.current && selectSUmmRef.current.focus()}
                >
                    <AutosizeInput
                        className={`${styles.summInput}`}
                        placeholder="0"
                        ref={selectSUmmRef}
                        value={summ}
                        autoFocus
                        onFocus={() => setSummFocused(true)}
                        onBlur={e => {
                            setSummFocused(false);
                        }}
                        style={{}}
                        onChange={(e) => {
                            console.log(e.target.value)
                            if (
                                e.target.value != "" &&
                                /^\d{0,9}(\.?)(\d{1,5})?$/.test(e.target.value)
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
                            disabled={direction || summ === "" || loadingButton}
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

