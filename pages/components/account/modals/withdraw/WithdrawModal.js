import React, { useEffect, useState } from "react";
import Router from "next/router";
import { Modal, ModalBody } from "reactstrap";

import { AccountWithdrawModalObserver } from "@/functions/observers";
import DefaultView from "./DefaultView";
import PayWithView from "./PayWithView";
import PreviewView from "./PreviewView";
import styles from "@/styles/components/Account/modals/TransactModals.module.scss";

const WithdrawModal = () => {
  // 1 - default | 2 - pay with | 3 - deposit preview
  const [activeView, setActiveView] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [amount, setAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [fee, setFee] = useState(0);
  const [token, setToken] = useState("");
  const [operationCompleted, setOperationCompleted] = useState(false);

  // Note: paymentTypeId is crypto id for now
  const handlePaymentSelect = (payment) => {
    openDefaultView();
    setPaymentMethod(payment);
  };

  const handleAmountChange = (a) => {
    setAmount(a);
  };

  const handleTokenChange = (t) => {
    setToken(t);
  };

  const openPayWithView = () => {
    setActiveView(2);
  };

  const openPreviewView = () => {
    setActiveView(3);
  };

  const openDefaultView = () => {
    setActiveView(1);
  };

  // Subscribe to open event
  useEffect(() => {
    const subscription = AccountWithdrawModalObserver.subscribe((data) => {
      setIsOpen(data.isOpen);
    });

    return () => subscription.unsubscribe();
  }, []);

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
        setAmount("");
        setActiveView(1);
        setToken("");
        setPaymentMethod(null);
        if (operationCompleted) Router.reload();
      }}
      onClosed={() => {
        setAmount("");
        setActiveView(1);
        setToken("");
        setPaymentMethod(null);
        operationCompleted ? Router.reload() : setActiveView(1);
      }}
      centered={true}
      className={styles.depositModal}
    >
      <a
        className={`closeBtn curspor-pointer`}
        onClick={() => {
          toggle();
          if (operationCompleted) Router.reload();
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
      <ModalBody style={{ padding: 0 }}>
        {activeView === 1 ? (
          <DefaultView
            requestOpenPayWith={openPayWithView}
            requestOpenPreview={openPreviewView}
            updateAmount={handleAmountChange}
            updateToken={handleTokenChange}
            updateWithdrawalAmount={(a) => setWithdrawalAmount(a)}
            updateFee={(f) => setFee(f)}
            amount={amount}
            token={token}
            paymentMethod={paymentMethod}
          />
        ) : activeView === 2 ? (
          <PayWithView
            onSelect={handlePaymentSelect}
            requestBack={openDefaultView}
            paymentMethod={paymentMethod}
            showWithdraw={true}
            title={"Pay to"}
          />
        ) : activeView === 3 ? (
          <PreviewView
            amount={amount}
            fee={fee}
            withdrawalAmount={withdrawalAmount}
            paymentMethod={paymentMethod}
            token={token}
            requestBack={openDefaultView}
            complete={() => setOperationCompleted(true)}
          />
        ) : null}
      </ModalBody>
    </Modal>
  );
};

export default WithdrawModal;
