import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { getCurrentUser, getUserData } from "../../functions/getBackendData";
import { formatPrice } from "../../functions/helpers";
import {
  ChangeAccountTradeModalState,
  ChangeTransactionsModalState,
} from "../../functions/observers";
import AccountLayout from "../../layouts/MaintLayout";
import styles from "../../styles/pages/account/Portfolio.module.scss";
import AssetsTable from "../components/account/AssetsTable";
import RecentTransactions from "../components/account/RecentTransactions";
import Placeholder from "../components/common/Placeholder";
import Graph from "../components/Person/Graph";

const Portfolio = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (typeof res === "object") {
          let user = res.attributes;

          setUser(user);
        }
      })
      .catch((err) => {
        console.error(err);
        setUser(false);
      });

    getUserData([
      {
        type: "transactions",
        params: {
          lastTransactionDate: moment().unix(),
        },
      },

      {
        type: "holdings",
      },
      {
        type: "portfolio_history",
      },
    ])
      .then((res) => {
        if (res.data) {
          let data = {};

          res.data.payload.processedData.map(
            (dataset) => (data = { ...data, ...dataset, type: undefined })
          );

          setUser((user) => ({
            ...user,
            data,
          }));
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return user ? (
    <AccountLayout user={user} pageTitle="Portfolio">
      <div className={styles.AccountPortfolio}>
        <h1 className={styles.pageTitle}>Portfolio</h1>
        <div className={styles.portfolioGraph}>
          {user.data ? (
            <Graph
              data={user.data.portfolioHistory}
              defaultValue="1M"
              defaultPeriods={[
                {
                  label: "1M",
                  value: "1M",
                },
                {
                  label: "1Y",
                  value: "1Y",
                },
              ]}
              hasNoData={!user.data.holdings.length}
              noDataPlaceholder={
                <div className={styles.noDataHolder}>
                  <div className={styles.Icon}>
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="50" height="50" rx="20.614" fill="#EAF1F5" />
                      <path
                        d="M14 33.9486C14 34.4972 14.4448 34.942 14.9934 34.942H18.9834C19.532 34.942 19.9768 34.4972 19.9768 33.9486V15.9934C19.9768 15.4448 19.532 15 18.9834 15H14.9934C14.4448 15 14 15.4448 14 15.9934V33.9486ZM15.9868 16.9868H17.9901V32.9553H15.9868V16.9868Z"
                        fill="#678086"
                      />
                      <path
                        d="M23.0051 34.9413H26.9952C27.5438 34.9413 27.9885 34.4965 27.9885 33.9479V21.9778C27.9885 21.4291 27.5438 20.9844 26.9952 20.9844H23.0051C22.4565 20.9844 22.0117 21.4291 22.0117 21.9778V33.9479C22.0117 34.4965 22.4565 34.9413 23.0051 34.9413ZM23.9985 22.9711H26.0018V32.9545H23.9985V22.9711Z"
                        fill="#678086"
                      />
                      <path
                        d="M31.0168 34.9421H35.0069C35.5555 34.9421 36.0002 34.4973 36.0002 33.9487V17.9885C36.0002 17.4399 35.5555 16.9951 35.0069 16.9951H31.0168C30.4682 16.9951 30.0234 17.4399 30.0234 17.9885V33.9487C30.0234 34.4973 30.4682 34.9421 31.0168 34.9421ZM32.0102 18.9819H34.0135V32.9553H32.0102V18.9819Z"
                        fill="#678086"
                      />
                    </svg>
                  </div>
                  <strong className={styles.main}>You have no assets</strong>
                  <span className={styles.descr}>
                    Trade your first token. It&apos;s easy
                  </span>
                  <Button
                    color="primary"
                    className={styles.pricesBtn}
                    onClick={() =>
                      ChangeAccountTradeModalState({
                        isOpen: true,
                      })
                    }
                  >
                    Trade
                  </Button>
                </div>
              }
              headings={
                <div className={`${styles.grapMaininfo} d-flex flex-column`}>
                  <div className={styles.heading}>Portfolio balance</div>
                  <strong className={styles.totalPrice}>
                    {formatPrice(user.data.portfolioMarketValue)}
                  </strong>
                </div>
              }
            />
          ) : (
            <Placeholder className={styles.graph} width="100%" height="344" />
          )}
        </div>

        <div
          className={`${styles.recentTransactionsMobile} d-flex justify-content-between align-items-center d-lg-none cursor-pointer`}
          onClick={() =>
            ChangeTransactionsModalState({
              isOpen: true,
            })
          }
        >
          <h2 className={styles.secondaryTitle}>Recent transactions</h2>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.0002 8.29764L5.98999 0.287559C5.80472 0.102146 5.55741 0 5.2937 0C5.03 0 4.78268 0.102146 4.59741 0.287559L4.00752 0.87731C3.62367 1.2616 3.62367 1.88618 4.00752 2.26988L10.7339 8.99627L4.00005 15.7301C3.81479 15.9155 3.71249 16.1627 3.71249 16.4263C3.71249 16.6901 3.81479 16.9373 4.00005 17.1228L4.58995 17.7124C4.77536 17.8979 5.02253 18 5.28624 18C5.54994 18 5.79726 17.8979 5.98252 17.7124L14.0002 9.69504C14.1859 9.50904 14.2879 9.26071 14.2873 8.99671C14.2879 8.73169 14.1859 8.48349 14.0002 8.29764Z"
              fill="#11343F"
            />
          </svg>
        </div>
        <div className={`d-flex ${styles.assetsWrapper}`}>
          <div className={`${styles.Table} `}>
            <h2 className={styles.secondaryTitle}>Your assets</h2>
            <AssetsTable
              assets={user.data && user.data.holdings}
              portfolioMarketValue={user.data && user.data.portfolioMarketValue}
            />
          </div>
          <div className={`${styles.rightCol} d-none d-lg-block`}>
            <h2 className={styles.secondaryTitle}>Recent transactions</h2>
            <RecentTransactions
              transations={user.data && user.data.transactions}
              hasMore={user.data && user.data.hasMore}
            />
          </div>
        </div>
      </div>
    </AccountLayout>
  ) : null;
};
export default Portfolio;
