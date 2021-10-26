import Link from "next/link";
import React, { useEffect, useState } from "react";

import { getTokenImageUrl } from "../../../functions/getBackendData";
import { formatPrice } from "../../../functions/helpers";
import styles from "../../../styles/components/Account/AccountAssets.module.scss";
import Placeholder from "../common/Placeholder";
import { useRouter } from "next/router";
import AllocationProgressBar from "./AllocationProgressBar";

const AccountAssets = ({ assets, portfolioMarketValue }) => {
  const router = useRouter();

  const [userAssets, setAssets] = useState();

  useEffect(() => {
    if (assets)
      setAssets(
        assets.length
          ? assets.length > 4
            ? assets
                .sort((a, b) =>
                  a.marketValue / portfolioMarketValue <
                  b.marketValue / portfolioMarketValue
                    ? 1
                    : -1
                )
                .splice(0, 4)
            : assets.sort((a, b) =>
                a.marketValue / portfolioMarketValue <
                b.marketValue / portfolioMarketValue
                  ? 1
                  : -1
              )
          : true
      );
  }, [assets]);

  return (
    <div className={styles.assetsWrapper}>
      <div className={`${styles.top} d-flex align-items-center`}>
        <div className={styles.title}>Top assets</div>
        {userAssets && userAssets.length ? (
          <Link href="/account/portfolio">
            <a className={`${styles.moreLink} ml-auto`}>See more</a>
          </Link>
        ) : null}
      </div>
      <div className={styles.holdings}>
        {userAssets && userAssets.length ? (
          userAssets.map((token) => (
            <div
              key={token.ticker}
              className={`${styles.token} d-flex align-items-center cursor-pointer`}
              onClick={() =>
                router.push(
                  "/account/persons/[token]",
                  `/account/persons/${token.ticker}`
                )
              }
            >
              <img
                className={styles.Image}
                src={getTokenImageUrl(token.ticker, "small")}
                alt={token.ticker}
              />
              <div className={`${styles.info} mr-auto`}>
                <span className={styles.name}>
                  {" "}
                  {token.quantity} {token.ticker}
                </span>
                <div className={styles.quantity}>
                  <span className={styles.totalPrice}>
                    {formatPrice(token.marketValue)}
                  </span>
                </div>
              </div>
              <div className={`${styles.percent}`}>
                <AllocationProgressBar
                  percent={(token.marketValue / portfolioMarketValue) * 100}
                />
                <div className={`${styles.percentValue} ml-0`}>
                  {((token.marketValue / portfolioMarketValue) * 100).toFixed(
                    2
                  )}
                  %
                </div>
              </div>
            </div>
          ))
        ) : userAssets ? (
          <div
            className={`${styles.noAssetsHolder} d-flex flex-column align-items-center justify-content-center`}
          >
            <div className={styles.Icon}>
              <svg
                width="29"
                height="23"
                viewBox="0 0 29 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5 2.125L2 8.375L14.5 14.625L27 8.375L14.5 2.125Z"
                  stroke="#678086"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 14.625L14.5 20.875L27 14.625"
                  stroke="#678086"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <strong className={styles.name}>You have no assets</strong>
            <span className={styles.descr}>Start building your portfolio</span>
          </div>
        ) : (
          [...Array(4)].map((v, i) => (
            <div
              key={i}
              className={`${styles.token} d-flex align-items-center`}
            >
              <Placeholder className={styles.Image} />
              <div className={styles.info}>
                <span className={styles.name}>
                  <Placeholder height="13px" width="55px" />
                </span>
                <div className={`${styles.quantity} d-flex`}>
                  <Placeholder height="13px" width="35px" />
                  <span className={styles.totalPrice}>
                    <Placeholder height="13px" width="25px" />
                  </span>
                </div>
              </div>
              <div className={`${styles.percent} text-right`}>
                <Placeholder width="75px" height="7px" className="ml-auto" />
                <div className={`${styles.percentValue} ml-auto`}>
                  <Placeholder width="35px" height="15px" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AccountAssets;
