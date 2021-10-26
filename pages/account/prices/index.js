import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  getCurrentUser,
  getTokensList,
  getUserData,
  searchTokensRequest,
} from "../../../functions/getBackendData";
import {
  actualizeGraphData,
  calcPriceChange,
} from "../../../functions/helpers";
import AccountLayout from "../../../layouts/MaintLayout";
import styles from "../../../styles/pages/account/Prices.module.scss";
import PaginationNav from "../../components/Prices/Pagination";
import SearchForm from "../../components/Prices/SearchForm";
import TokensList from "../../components/Prices/TokensList";
import TopCategories from "../../components/Prices/TopCategories";
import tokensListStyles from "../../../styles/components/Prices/TokensList.module.scss";

const Prices = () => {
  const [pricesData, setPricesData] = useState({});
  const [user, setUser] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [disableSort, setDisableSort] = useState(false);

  const router = useRouter();

  const [sort, setSort] = useState({
    price: "desc",
  });

  useEffect(() => {
    loadTokens();
  }, [currentPage, sort]);
  const itemsRef = useRef();

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
  }, []);

  const loadTokens = () => {
    getTokensList({
      page: currentPage,
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
  };

  const switchPage = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      window.scroll({
        top: itemsRef.current.offsetTop - 52,
        left: 0,
      });
    }
  };

  let timeout = useRef();

  const searchTokens = (searchValue) => {
    if (searchValue.trim().length) {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setLoading(true);
        searchTokensRequest({
          query: searchValue,
          page: currentPage,
          chart: true,
        })
          .then((res) => res.data.payload)
          .then((data) => {
            setLoading(false);
            setPricesData(data);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      }, 700);

      setDisableSort(true);
    } else {
      if (timeout) clearTimeout(timeout);
      loadTokens();
      setDisableSort(false);
    }
  };

  if (user === false) router.push("/");

  return user ? (
    <AccountLayout user={user} pageTitle="Prices">
      <div className={styles.AccountPrice}>
        <TopCategories
          categories={pricesData.categories}
          isAccount={true}
          className={styles.topCategories}
        />
        <div
          className={`${styles.titleBlock} d-block d-lg-flex align-items-center`}
        >
          <div className="mr-auto">
            <h2 className={`${styles.secondaryTitle}`}>
              <Link href="/account/prices">
                <a>Prices</a>
              </Link>
            </h2>
            <small className={styles.descrText}>Prices are 5 min delayed</small>
          </div>
          <SearchForm onChange={searchTokens} loading={loading} />
        </div>
        <TokensList
          people={pricesData.results}
          ref={itemsRef}
          sort={sort}
          setSort={setSort}
          styles={tokensListStyles}
          disableSort={disableSort}
        />
        {pricesData.totalPages ? (
          <PaginationNav
            onChange={switchPage}
            className={styles.PaginationNav}
            currentPage={currentPage}
            totalPages={pricesData.totalPages}
          />
        ) : null}
      </div>
    </AccountLayout>
  ) : null;
};
export default Prices;
