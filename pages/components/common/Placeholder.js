import React from "react";
import styles from "../../../styles/components/common/Placeholder.module.scss";

const Placeholder = ({ width, height, className, opacity = 1 }) => {
  return (
    <div className={`${styles.placeholder} ${className}`} style={{ opacity: opacity, width: width, height: height }}></div>
  );
};

export default Placeholder;
