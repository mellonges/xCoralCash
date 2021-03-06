import React, {useEffect, useState} from "react";
import { Modal, ModalBody } from "reactstrap";
import styles from "../../../../styles/components/Account/modals/TradeModal.module.scss";
import TradeBuyStep from "./TradeBuyStep";
import TradeSellStep from "./TradeSellStep";
import { useDispatch, useSelector } from "react-redux";
import { openAndCloseModalWindow, setActiveOperationForRedeemButton } from "../../../../redux/reducers/rootReducer";
const TradeModal = () => {
  const dispatch = useDispatch()
  const isAvailable = useSelector(({ store }) => store.modalWindow.data.isAvailable)
  const isOpen = useSelector(({ store }) => store.modalWindow.isOpen)
  const activeOperation = useSelector(({ store }) => store.modalWindow.activeOperation)
  const iconAddress = useSelector(({ store }) => store.modalWindow.data.iconAddress)
  const assetName = useSelector(({ store }) => store.modalWindow.data.assetName)
  const deposited = useSelector(({ store }) => store.modalWindow.data.deposited)
  const expiration = useSelector(({ store }) => store.modalWindow.data.expiration)
  const available = useSelector(({ store }) => store.modalWindow.data.available)
  const decimals = useSelector(({ store }) => store.modalWindow.data.decimals)
  const APY = useSelector(({ store }) => store.modalWindow.data.APY)
  const coinAddress = useSelector(({ store }) => store.modalWindow.data.coinAddress)
  const Loading = useSelector(({ store }) => store.modalWindow.data.Loading)
  const totalPayout = useSelector(({ store }) => store.modalWindow.data.totalPayout)
  const inputValue = useSelector(({ store }) => store.modalWindow.data.inputValue)
  const allowance = useSelector(({ store }) => store.modalWindow.data.allowance)
  const loadingButton = useSelector(({ store }) => store.modalWindow.data.loadingButton)
  const termsID = useSelector(({ store }) => store.modalWindow.data.termsID)
  const redeemable_xcoral = useSelector(({ store }) => store.modalWindow.data.redeemable_xcoral)

  const [switchOffTabs, setSwitchOffTabs] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState();
  const [tokensList, setTokensList] = useState();

  const toggle = () => dispatch(openAndCloseModalWindow())

  const [operationCompleted, setOperationCompleted] = useState(false);

  // useEffect(() => {
  //   const subscription = AccountTradeModalObserver.subscribe((data) => {
  //     setIsOpen(isOpenStore);
  //     setSelectedToken(data.token);
  //   });



  useEffect(() => console.log("RENDER RENDER RENDER!!!"))
  //     getTokensList({
  //       page: 1,
  //       sort: "price_desc",
  //     })
  //       .then((res) => res.data.payload)
  //       .then((data) => {
  //         setTokensList(data.results);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         setTokensList(false);
  //       });

  //     return () => subscription.unsubscribe();
  //   }, []);
  // }

  return (
    <Modal
      isOpen={isOpen}
      modalTransition={{
        timeout: 100,
      }}
      backdropTransition={{
        timeout: 100,
      }}
      toggle={() => {
        toggle();
        if (operationCompleted) /* Router.reload() */ console.log("reload()");
      }}
      // onClosed={() => dispatch(setActiveOperation({isAvailable: true, operation: 1}))}
      centered={true}
      className={styles.tradeModal}
    >
      <a
        className={`closeBtn curspor-pointer`}
        onClick={() => {
          toggle();
          if (operationCompleted) /* Router.reload() */ console.log("reload()");
        }}
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.2407 9.50014L18.6389 2.10154C19.1204 1.6203 19.1204 0.842184 18.6389 0.360936C18.1577 -0.120312 17.3796 -0.120312 16.8983 0.360936L9.49989 7.75953L2.10167 0.360936C1.62021 -0.120312 0.842336 -0.120312 0.361098 0.360936C-0.120366 0.842184 -0.120366 1.6203 0.361098 2.10154L7.75932 9.50014L0.361098 16.8987C-0.120366 17.38 -0.120366 18.1581 0.361098 18.6393C0.600928 18.8794 0.916268 19 1.23138 19C1.5465 19 1.86161 18.8794 2.10167 18.6393L9.49989 11.2407L16.8983 18.6393C17.1384 18.8794 17.4535 19 17.7686 19C18.0837 19 18.3988 18.8794 18.6389 18.6393C19.1204 18.1581 19.1204 17.38 18.6389 16.8987L11.2407 9.50014Z"
            fill="white"
          />
        </svg>
      </a>
      <section
        className={`${styles.operationTabs} ${switchOffTabs ? "d-none" : "d-flex"
          } flex-wrap`}
      >
        <div
          className={`${styles.tabItem} ${activeOperation === 1 ? styles.active : ""
            }`}
          onClick={() => dispatch(setActiveOperationForRedeemButton({ isAvailable, operation: 1 }))}
        >
          Deposit
        </div>
        <div
          className={`${styles.tabItem} ${activeOperation === 2 ? styles.active : ""
            } `}
          onClick={() => dispatch(setActiveOperationForRedeemButton({ isAvailable, operation: 2 }))}
        >
          Redeem
        </div>
        {/*<div*/}
        {/*  className={`${styles.tabItem} ${*/}
        {/*    activeOperation === 3 ? styles.active : ""*/}
        {/*  }`}*/}
        {/*  onClick={() => setActiveOperation(3)}*/}
        {/*>*/}
        {/*  Convert*/}
        {/*</div>*/}
      </section>
      <ModalBody>
        {activeOperation === 1 ? (
          <TradeBuyStep
            setSwitchOffTabs={setSwitchOffTabs}
            toggle={toggle}
            assetName={assetName}
            iconAddress={iconAddress}
            Loading={Loading}
            deposited={deposited}
            expiration={expiration}
            APY={APY}
            decimals={decimals}
            available={available}
            coinAddress={coinAddress}
            totalPayout={totalPayout}
            inputValue={inputValue}
            allowance={allowance}
            loadingButton={loadingButton}
            termsID={termsID}


          // selectedToken={selectedToken}
          />
        ) : activeOperation === 2 ? (
          <TradeSellStep
            setSwitchOffTabs={setSwitchOffTabs}
            toggle={toggle}
            selectedToken={selectedToken}
            tokensList={tokensList}
            assetName={assetName}
            iconAddress={iconAddress}
            deposited={deposited}
            expiration={expiration}
            decimals={decimals}
            available={available}
            termsID={termsID}
            loadingButton={loadingButton}
            coinAddress={coinAddress}
            redeemable_xcoral={redeemable_xcoral}
          />
        ) : null}

      </ModalBody>
    </Modal>
  );
};

export default TradeModal;
