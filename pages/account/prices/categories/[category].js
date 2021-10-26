import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "reactstrap";
import {
  getCurrentUser,
  getTokensList,
  getUserData,
} from "../../../../functions/getBackendData";
import AccountLayout from "../../../../layouts/MaintLayout";
import styles from "../../../../styles/pages/account/Category.module.scss";
import PaginationNav from "../../../components/Prices/Pagination";
import TokensList from "../../../components/Prices/TokensList";

const Category = ({ category }) => {
  const [user, setUser] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [pricesData, setPricesData] = useState({});

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

  const router = useRouter();

  const [sort, setSort] = useState({
    price: "desc",
  });

  const [currentCategory, setCurrentCategory] = useState({});
  const itemRef = useRef();

  useEffect(() => {
    if (pricesData.categories)
      setCurrentCategory(
        pricesData.categories.find((cat) => cat.id === category)
      );
  }, [pricesData]);

  const switchPage = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      window.scroll({
        top: itemsRef.current.offsetTop,
        left: 0,
      });
    }
  };

  useEffect(() => {
    if (category) {
      getTokensList({
        category: category,
        page: currentPage,
        sort: Object.keys(sort).length
          ? `${Object.keys(sort)[0]}_${Object.values(sort)[0]}`
          : undefined,
      })
        .then((res) => res.data.payload)
        .then((data) => {
          setPricesData(data);
        })
        .catch((err) => console.error(err));
    }
  }, [category, sort, currentPage]);

  return (
    <AccountLayout
      user={user}
      pageTitle={
        category &&
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
      }
    >
      <div className={styles.AccountCategory}>
        <div
          className={`${styles.topBlock} d-flex flex-column`}
          style={{
            backgroundColor: `rgb(${
              currentCategory.id && currentCategory.bgColor
                ? currentCategory.bgColor.join(",")
                : "0,0,0"
            })`,
          }}
        >
          <div className={styles.inner}>
            <Button
              color="secondary"
              className={styles.backBtn}
              onClick={(e) => {
                e.preventDefault();
                router.push("/account/prices");
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5888 6.14749H3.39377L7.61351 1.92776L6.54443 0.858643L0.5 6.90307L6.54443 12.9475L7.61351 11.8784L3.39377 7.65861H12.5888V6.14749Z"
                  fill="white"
                />
              </svg>
              Explore
            </Button>
            <h1 className={`d-block ${styles.heading}`}>
              {currentCategory.name}
            </h1>
            {currentCategory.description ? (
              <div className={styles.description}>
                {currentCategory.description}
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.tokensTableWrapper} ref={itemRef}>
          <TokensList
            people={pricesData.results}
            sort={sort}
            setSort={setSort}
            styles={styles}
          />
          {pricesData.totalPages ? (
            <PaginationNav
              onChange={switchPage}
              className={styles.pagination}
              currentPage={currentPage}
              totalPages={pricesData.totalPages}
            />
          ) : null}
        </div>
      </div>
    </AccountLayout>
  );
};

export default Category;
export async function getStaticProps(context) {
  return {
    props: {
      category: context.params.category,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          category: "PORN",
        },
      },
      {
        params: {
          category: "EUROPE",
        },
      },
      {
        params: {
          category: "BILLIONS",
        },
      },
      {
        params: {
          category: "UNDER_30",
        },
      },
      {
        params: {
          category: "TENNIS",
        },
      },
      {
        params: {
          category: "POLITICIANS",
        },
      },
      {
        params: {
          category: "RAPPERS",
        },
      },
      {
        params: {
          category: "ACTORS",
        },
      },
    ],
    fallback: false,
  };
}
