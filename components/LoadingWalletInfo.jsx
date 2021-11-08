import React from 'react';
import styles from "@/styles/pages/account/Wallet.module.scss";
import Placeholder from "@/components/common/Placeholder";

export const LoadingWalletInfo = () => {
    return (
        <>
            <div className={styles.walletWrapper}>
                <h2 className={styles.title}>Loading...</h2>
                <div
                    className={`d-flex align-items-center cursor-pointer ${styles.walletInner}`}
                >
                    <Placeholder height="60px" width="100%" />
                </div>
            </div>
        </>
    );
};

export default LoadingWalletInfo;