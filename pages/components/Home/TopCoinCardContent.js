import React from "react";
import { getTokenImageUrl } from "../../../functions/getBackendData";
import { formatPrice } from "../../../functions/helpers";
import styles from "../../../styles/pages/Home.module.scss";
import PriceChangePercent from "../common/PriceChangePercent";

const TopCoinCardContent = ({ data }) => {
  return data ? (
    <>
      <img
        className={styles.cardImage}
        src={getTokenImageUrl(data.ticker, "full")}
        alt=""
      />

      <div className={styles.coinCardBg}>
        <div className={styles.cardPrice}>
          <span className={styles.cardCurrentPrice}>
            {formatPrice(data.price)}
          </span>
          <PriceChangePercent
            percent={data.priceChange}
            className={styles.cardPriceChanged}
            negativeClass={styles.negative}
            positiveClass={styles.positive}
            neutralClass={styles.neutral}
          />
        </div>
        <div className={styles.cardInformation}>
          <div className={`${styles.category} text-uppercase`}>
            {data.category}
          </div>
          <strong className={styles.coinTitle}>{data.name}</strong>
        </div>
      </div>
    </>
  ) : null;
};

export default TopCoinCardContent;
