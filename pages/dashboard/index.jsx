import React from 'react';
import MainLayout from "../../layouts/MaintLayout";
import WalletTopBlock from "../../components/WalletTopBlock";
import styles from "@/styles/pages/account/Wallet.module.scss";
import Graph from "../../components/Graph/Graph";
import WalletMini from "../../components/WalletMini";
import BonusBlock from "../../components/BonusBlock";


const Index = () => {
    return (
        <div>
            <MainLayout pageTitle={"Dashboard"}>
                <div className={styles.Wallet}>
                    <h1 className={styles.pageTitle}>Wallet</h1>

                    <WalletTopBlock  />
                    <BonusBlock />

                    <div className={styles.contentInner}>
                    <div style={{display: "flex", justifyContent: "space-around"}} >
                        <WalletMini walletInfo={{
                                "paymentMethodID": "USD",
                                "type": "wallet",
                                "title": "test text",
                                "quantity": 42,
                                "amount": 42,
                                "header": "Current Price",
                        }} />
                        <WalletMini walletInfo={{
                                "paymentMethodID": "USD",
                                "type": "wallet",
                                "title": "test text",
                                "quantity": 42,
                                "amount": 42,
                                "header": "Target Price"
                        }} />
                        <WalletMini walletInfo={{
                                "paymentMethodID": "USD",
                                "type": "wallet",
                                "title": "test text",
                                "quantity": 42,
                                "amount": 42,
                                "header": "Current APY",
                        }} />
                        <WalletMini walletInfo={{
                                "paymentMethodID": "USD",
                                "type": "wallet",
                                "title": "test text",
                                "quantity": 42,
                                "amount": 42,
                                "header": "Next Rebase In",
                        }} />
                    </div>

                {/*<Graph />*/}
                                </div>
                            </div>
            </MainLayout>
        </div>
    );
};

export default Index;