import React from 'react';
import styles from "../styles/components/common/Placeholder.module.scss";

export const LoadingWalletInfo = () => {
    return (
        <>
            <div className={styles.walletWrapper}>
                <div className={`d-flex align-items-center cursor-pointer ${styles.walletInner}`}>
                    <div className={styles.placeholder}>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoadingWalletInfo;