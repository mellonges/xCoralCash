import React from 'react';
import styles from "../styles/components/common/Placeholder.module.scss";

export const LoadingWalletInfo = () => {
    return (
        <div className={`d-flex align-items-center cursor-pointer ${styles.placeholderWrapper}`}>
            <div className={styles.placeholder}>
            </div>  
        </div>
    );
};

export default LoadingWalletInfo;