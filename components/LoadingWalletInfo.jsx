import React from 'react';
import styles from "@/styles/pages/account/Wallet.module.scss";
import Placeholder from "@/components/common/Placeholder";

export const LoadingWalletInfo = () => {
    return (
        <>
            <div className={styles.walletWrapper}>
                <div className={`d-flex align-items-center cursor-pointer ${styles.walletInner}`}>
                    <Placeholder height="52px" width="165px" />
                </div>
            </div>
        </>
    );
};

export default LoadingWalletInfo;