import { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { getTokenImageUrl } from "../../../functions/getBackendData";
import { formatPrice, shuffle } from "../../../functions/helpers";
import styles from "../../../styles/components/Home/BuildPortfolioCards.module.scss";
import Placeholder from "../common/Placeholder";
import PriceChangePercent from "../common/PriceChangePercent";

const BuildPortfolioCards = ({ people }) => {
  const [items, setItems] = useState();

  useEffect(() => {
    if (people) setItems(shuffle([...people].slice(0, 6)));
  }, [people]);

  return (
    <ScrollContainer hideScrollbars={true} vertical={false}>
      <div className={`${styles.portfolioCards} d-flex justify-content-center`}>
        {items
          ? items.map((token) => (
              <div
                className={`${styles.item} d-flex flex-column`}
                key={token.ticker}
              >
                <a href={`/persons/${token.ticker}`}>
                  <img
                    className={styles.image}
                    src={getTokenImageUrl(token.ticker, "small")}
                    alt={token.ticker}
                  />
                  <div className={styles.ticker}>{token.ticker}</div>
                  <div className={styles.price}>{formatPrice(token.price)}</div>
                  <PriceChangePercent
                    className={styles.changePercent}
                    negativeClass={styles.negative}
                    positiveClass={styles.positive}
                    neutralClass={styles.neutral}
                    percent={token.priceChange}
                  />
                </a>
              </div>
            ))
          : [...Array(6).keys()].map((k) => (
              <div className={`${styles.item} d-flex flex-column`} key={k}>
                <Placeholder
                  width="165.98px"
                  height="165.98px"
                  className={styles.image}
                />
              </div>
            ))}
      </div>
    </ScrollContainer>
  );
};

export default BuildPortfolioCards;
