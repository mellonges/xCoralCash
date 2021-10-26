import { motion } from "framer-motion";

import { getTokenImageUrl } from "../../../functions/getBackendData";
import { formatPrice, formatPercent } from "../../../functions/helpers";
import styles from "../../../styles/components/Home/TokensFilter.module.scss";
import PriceChangePercent from "../common/PriceChangePercent";
import TokenChart from "./TokenChart";
import { useRouter } from "next/router";

const TokenFilterItem = ({ token, activeCategory, mobile }) => {
  const router = useRouter();

  return token ? (
    !mobile ? (
      <motion.div
        key={token.ticker}
        className={`${styles.tokenColumn} cursor-pointer ${
          !mobile ? "col-md-6 col-lg-4" : ""
        }`}
        onClick={() =>
          router.push("/persons/[token]", `/persons/${token.ticker}`)
        }
        initial={
          activeCategory && activeCategory.firstTime
            ? {
                x: 0,
              }
            : {
                x: -2000,
              }
        }
        animate={{
          x: 0,
        }}
        transition={{
          duration: 0.4,
          // delay: index / 4,
        }}
      >
        <div className={`${styles.tokenItem} d-flex align-items-start`}>
          <img
            src={getTokenImageUrl(token.ticker, "small")}
            alt={token.ticker}
            className={styles.tokenImage}
          />

          <div className={styles.information}>
            <div className="d-flex align-items-center">
              <div className={styles.ticker}>{token.ticker}</div>
              <PriceChangePercent
                percent={token.priceChange}
                className={`${styles.priceChange} ml-auto`}
                positiveClass={styles.positive}
                negativeClass={styles.negative}
                neutralClass={styles.neutral}
              />
            </div>
            <h4 className={styles.tokenName}>{token.name}</h4>
            <strong className={styles.tokenPrice}>
              {formatPrice(token.price)}
            </strong>
            <TokenChart
              data={token["1M"].map((p) => ({
                x: p[0],
                y: p[1],
              }))}
              className={styles.tokenChart}
            />
          </div>
        </div>
      </motion.div>
    ) : (
      <div
        className={`${styles.tokenColumnMobile} d-flex align-items-center cursor-pointer`}
        onClick={() =>
          router.push("/persons/[token]", `/persons/${token.ticker}`)
        }
      >
        <img
          src={getTokenImageUrl(token.ticker, "small")}
          alt={token.ticker}
          key={getTokenImageUrl(token.ticker, "small")}
          className={styles.tokenImage}
        />
        <div className={styles.tokenInfo}>
          <strong className={`d-block ${styles.title}`}>{token.name}</strong>
          <span className={styles.ticker}>{token.ticker}</span>
        </div>
        <TokenChart data={token["1M"]} className={styles.tokenChart} />
        <div className={`${styles.tokenPrice} ml-auto text-right`}>
          <div className={styles.price}>{formatPrice(token.price)}</div>
          <PriceChangePercent
            percent={token.priceChange}
            className={`${styles.priceChange} ml-auto`}
            positiveClass={styles.positive}
            negativeClass={styles.negative}
            neutralClass={styles.neutral}
          />
        </div>
      </div>
    )
  ) : null;
};
export default TokenFilterItem;
