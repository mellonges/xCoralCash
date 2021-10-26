import React from "react";
import styles from "../../../styles/components/Account/AllocationProgressBar.module.scss";

const AllocationProgressBar = ({ percent, className }) => {
  return (
    <div className={`${styles.progressBar} ${className}`}>
      <div
        className={styles.progressBarLine}
        style={{
          width: `${Math.ceil(percent)}%`,
        }}
      ></div>
    </div>
  );
};
export default AllocationProgressBar;
