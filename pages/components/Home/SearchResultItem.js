import Link from "next/link";
import { getTokenImageUrl } from "../../../functions/getBackendData";
import styles from "../../../styles/components/Home/SearchResultItem.module.scss";
import { formatPrice } from "../../../functions/helpers";
import PriceChangePercent from "../common/PriceChangePercent";
import { useRouter } from "next/router";
import React from "react";

const SearchResultItem = ({
  item,
  setShowSearchRes,
  setSearchQuery,
  hideTicker,
}) => {
  const router = useRouter();

  const isAccount = router.pathname.match("/account");

  return item ? (
    <Link
      href={!isAccount ? "/persons/[token]" : "/account/persons/[token]"}
      as={`${
        !isAccount
          ? `/persons/${item.ticker}`
          : `/account/persons/${item.ticker}`
      }`}
    >
      <a
        className={`${styles.searchItem} d-flex align-items-center`}
        onClick={() => {
          setShowSearchRes(false);
          setSearchQuery("");
        }}
      >
        <img
          src={getTokenImageUrl(item.ticker, "small")}
          alt={item.ticker}
          className={styles.tokenImage}
        />
        <span className={styles.tokenFullName}>{item.name}</span>
        {!hideTicker ? (
          <span className={styles.tokenTicker}>{item.ticker}</span>
        ) : null}
        <div
          className={`${styles.tokenPrice} ml-auto d-flex align-items-center`}
        >
          <span className={styles.currentPrice}>{formatPrice(item.price)}</span>
          <PriceChangePercent
            className={`${styles.changePercent} d-none d-md-block`}
            negativeClass={styles.negative}
            positiveClass={styles.positive}
            neutralClass={styles.neutral}
            percent={item.priceChange}
          />
        </div>
      </a>
    </Link>
  ) : null;
};

export default SearchResultItem;
