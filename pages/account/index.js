import styles from "../../styles/pages/account/Home.module.scss";
import {
  getCurrentUser,
  getTokensList,
  getUserData,
} from "../../functions/getBackendData";
import React, { useEffect, useState } from "react";
import AccountLayout from "../../layouts/MaintLayout";
import { useRouter } from "next/router";
import UncompletedTasks from "../components/account/UncompletedTasks";
import Graph from "../components/Person/Graph";
import {
  formatPrice,
  actualizeGraphData,
  calcPriceChange,
} from "../../functions/helpers";
import WalletMini from "../components/account/WalletMini";
import AccountAssets from "../components/account/AccountAssets";
import Placeholder from "../components/common/Placeholder";
import TokensList from "../components/Prices/TokensList";
import tokensListStyles from "../../styles/components/Prices/TokensList.module.scss";
import { Button } from "reactstrap";
import InviteFriendBlock from "../components/account/InviteFriendBlock";
import { ChangeAccountTradeModalState } from "../../functions/observers";

const Home = () => {
  const [user, setUser] = useState();

  const [pricesData, setPricesData] = useState({});

  const [sort, setSort] = useState({
    price: "desc",
  });

  const router = useRouter();

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
        type: "payment_methods",
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

    getTokensList({
      page: 1,
      sort: Object.keys(sort).length
        ? `${Object.keys(sort)[0]}_${Object.values(sort)[0]}`
        : undefined,
    })
      .then((res) => res.data.payload)
      .then((data) => {
        // set price change
        data.results.map((token) => {
          let dataActual = actualizeGraphData(
            token["1M"].map((d) => ({
              x: d[0],
              y: d[1],
            })),
            { period: "1M" }
          );
          token.priceChange = calcPriceChange(
            dataActual[0].y,
            dataActual[dataActual.length - 1].y
          );

          return token;
        });

        setPricesData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (user === false) router.push("/");

  return user ? (
    <AccountLayout user={user} pageTitle="Home">
      <div className={styles.AccountHome}>
        <h1 className={styles.pageTitle}>Hello, {user.given_name}</h1>
        <UncompletedTasks user={user} />
        <div className={`${styles.assetsWrapper} d-flex`}>
          <div className={`${styles.graph}`}>
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
                        <rect
                          width="50"
                          height="50"
                          rx="20.614"
                          fill="#EAF1F5"
                        />
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
              <Placeholder className={styles.graph} width="100%" height="311" />
            )}
          </div>
          <div className={styles.rightSide}>
            <WalletMini
              walletInfo={
                user.data &&
                user.data.paymentMethods.find(
                  (method) => method.paymentMethodID === "USD"
                )
              }
            />
            <AccountAssets
              assets={user.data && user.data.holdings}
              portfolioMarketValue={user.data && user.data.portfolioMarketValue}
            />
          </div>
        </div>
        <InviteFriendBlock />
        <div className={styles.featuredPeople}>
          <h1 className={`${styles.pageTitle} mr-auto`}>Featured people</h1>
          <div className="tokensListWrapper">
            <TokensList
              people={pricesData.results}
              sort={sort}
              setSort={setSort}
              disableSort={true}
              styles={tokensListStyles}
            />
            <Button
              color="primary"
              onClick={() => {
                router.push("/account/prices");
              }}
              className={`d-flex align-items-center ${styles.seePricesBtn}`}
            >
              <span className="ml-auto">See Prices</span>
              <svg
                className="ml-auto"
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.92155 5.58263L1.53229 0.193469C1.40764 0.0687232 1.24125 0 1.06383 0C0.886411 0 0.720019 0.0687232 0.595372 0.193469L0.19849 0.590252C-0.0597635 0.848801 -0.0597635 1.26902 0.19849 1.52717L4.72398 6.05267L0.193469 10.5832C0.0688217 10.7079 0 10.8742 0 11.0515C0 11.2291 0.0688217 11.3954 0.193469 11.5202L0.59035 11.9169C0.715096 12.0416 0.88139 12.1104 1.05881 12.1104C1.23623 12.1104 1.40262 12.0416 1.52727 11.9169L6.92155 6.5228C7.04649 6.39766 7.11512 6.23058 7.11472 6.05296C7.11512 5.87465 7.04649 5.70767 6.92155 5.58263Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </AccountLayout>
  ) : null;
};

export default Home;
