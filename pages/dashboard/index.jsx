import React from 'react';
import MainLayout from "../../layouts/MaintLayout";
import WalletTopBlock from "@/components/account/WalletTopBlock";
import styles from "@/styles/pages/account/Wallet.module.scss";


const Index = () => {
    return (
        <div>
            <MainLayout pageTitle={"Dashboard"}>
                <div className={styles.Wallet}>
                    <h1 className={styles.pageTitle}>Wallet</h1>

                    <WalletTopBlock  />

                    <div className={styles.contentInner}>


                        </div>
                    </div>
            </MainLayout>
        </div>
    );
};

export default Index;