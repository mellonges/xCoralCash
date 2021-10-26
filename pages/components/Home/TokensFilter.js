import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import styles from "../../../styles/components/Home/TokensFilter.module.scss";
import Placeholder from "../common/Placeholder";
import TokenFilterItem from "./TokenFilterItem";
import TokensFilterCatNav from "./TokensFilterCatNav";

const TokensFilter = ({ people }) => {
  const [categoriesList, setCategoriesList] = useState([]);

  const [activeCategory, setActiveCategory] = useState({
    name: "Most Popular",
    firstTime: true,
  });

  const [catItems, setCatItems] = useState([]);

  useEffect(() => {
    if (people && people.length && !categoriesList.length) {
      let categories = ["Most Popular"];

      people.map(
        (token) =>
          !categories.find(
            (cat) =>
              cat === token.category ||
              (cat === "Most Popular" && token.category === "popular")
          ) &&
          token.category !== "featured" &&
          categories.push(token.category)
      );

      setCategoriesList(categories);
    }
  }, [people]);

  useEffect(() => {
    if (activeCategory.name && people && people.length) {
      setCatItems(
        people
          .filter(
            (item) =>
              (categoriesList.length &&
                activeCategory.name === item.category) ||
              (activeCategory.name === "Most Popular" &&
                item.category === "popular")
          )
          .slice(0, 6)
      );
    }
  }, [activeCategory, people]);

  return (
    <div className={styles.tokensFilter}>
      <Container>
        <div className={styles.navigation}>
          <TokensFilterCatNav
            categoriesList={categoriesList}
            setActiveCategory={setActiveCategory}
            activeCategory={activeCategory}
          />
        </div>
        <div className={`${styles.tokensList} d-none d-md-block`}>
          <AnimatePresence>
            <Row
              className={`align-items-stretch ${styles.tokenListRow} justify-content-center`}
            >
              {catItems && catItems.length ? (
                catItems.map((token) => (
                  <TokenFilterItem
                    key={token.ticker}
                    token={token}
                    activeCategory={activeCategory}
                  />
                ))
              ) : (
                <>
                  {[...Array(6).keys()].map((k) => (
                    <div
                      key={k}
                      className={` ${styles.tokenColumn} col-md-6 col-lg-4`}
                    >
                      <Placeholder width="100%" height="264px" />
                    </div>
                  ))}
                </>
              )}
            </Row>
          </AnimatePresence>
        </div>
        <div className={`${styles.tokensListMobile} d-block d-md-none`}>
          {catItems && catItems.length ? (
            catItems.map((token) => (
              <TokenFilterItem
                key={token.ticker}
                token={token}
                mobile={true}
                activeCategory={activeCategory}
              />
            ))
          ) : (
            <>
              {[...Array(6).keys()].map((k) => (
                <div key={k} className={` ${styles.tokenColumnMobile}`}>
                  <Placeholder width="100%" height="85px" />
                </div>
              ))}
            </>
          )}
        </div>

        <div className={`text-center ${styles.seeAllTokensBtnWrapper}`}>
          <Link href="/prices">
            <a className={`${styles.seeAllTokensBtn} d-flex mx-auto`}>
              <span className="ml-auto">View all</span>
              <svg
                width="16"
                className="ml-auto"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.65 9.43751L0.65 9.78751L1 9.78751L10.5644 9.78751L5.92596 14.4259L5.67847 14.6734L5.92595 14.9209L7.25249 16.2475L7.49997 16.495L7.74747 16.2475L15.2475 8.74747L15.495 8.49998L15.2475 8.25249L7.74747 0.752511L7.49998 0.505025L7.25249 0.752512L5.92596 2.07905L5.67847 2.32653L5.92596 2.57402L10.5644 7.21249L1 7.21249L0.65 7.21249L0.65 7.56249L0.65 9.43751Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="0.7"
                />
              </svg>
            </a>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default TokensFilter;
