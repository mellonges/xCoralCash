import { useState } from "react";
import AutosizeInput from "react-input-autosize";

import styles from "@/styles/components/Account/modals/TransactModals.module.scss";

const SelectSum = ({ amount, onChange }) => {
  const [active, setActive] = useState(false);

  return amount !== undefined ? (
    <div className={styles.SelectSum}>
      <sup
        className={`${styles.dollarSymbol} ${
          active || (amount.length && amount !== "0") ? styles.active : ""
        } `}
      >
        $
      </sup>
      <AutosizeInput
        className={styles.sumInput}
        placeholder="0"
        value={amount}
        onBlur={() => {
          setActive(false);
        }}
        onFocus={() => {
          setActive(true);
        }}
        onChange={(e) => {
          if (
            e.target.value != "" &&
            /^\d{0,8}(\.?)(\d{1,2})?$/.test(e.target.value)
          ) {
            onChange(e.target.value.replace(/^[0|.]/, ""));
          } else if (e.target.value === "") onChange("");
        }}
      />
    </div>
  ) : null;
};

export default SelectSum;
