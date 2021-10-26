import React, { useEffect, useState } from "react";
import { Form, Input, InputGroup, InputGroupText } from "reactstrap";
import {
  getTokenImageUrl,
  searchTokensRequest,
} from "../../../../../functions/getBackendData";
import { formatPrice } from "../../../../../functions/helpers";
import styles from "../../../../../styles/components/Account/modals/trade-modules/ChooseToken.module.scss";
import Placeholder from "../../../common/Placeholder";

const ChooseToken = ({
  title,
  isOpen,
  setShowTokensList,
  selectToken,
  isSell,
  isConvert,
  holdings,
  defaultTokens,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const PLACEHOLDER = "Search by person name";

  const [searchInputActive, setSearchInputActive] = useState(false);

  const [tokensList, setTokensList] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSell && !isConvert && defaultTokens) setTokensList(defaultTokens);
  }, [defaultTokens]);

  useEffect(() => {
    if ((isSell || isConvert) && holdings)
      setTokensList(
        holdings
          .filter((token) => token.ticker !== "USD")
          .sort((a, b) => (a.quantity > b.quantity ? -1 : 1))
      );
  }, [holdings, isConvert, isSell, isOpen]);

  useEffect(() => {
    if (isOpen && searchValue !== "") setSearchValue("");
  }, [isOpen]);

  let timeout;
  useEffect(() => {
    if (searchValue.trim().length && !loading) {
      if (!isSell && !isConvert)
        timeout = setTimeout(() => {
          setLoading(true);

          searchTokensRequest({ query: searchValue })
            .then((res) => res.data.payload.results)
            .then((res) => {
              setTokensList(res);
              setLoading(false);
            })
            .catch((error) => {
              console.error(error);
              setLoading(false);
            });
        }, 600);
      else {
        // Search without backend
      }
    } else
      setTokensList(
        isSell && holdings
          ? holdings
              .filter((token) => token.ticker !== "USD")
              .sort((a, b) => (a.quantity > b.quantity ? -1 : 1))
          : defaultTokens
      );

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [searchValue]);

  return (
    <div className={`${styles.ChooseToken} ${isOpen ? "d-block" : "d-none"}`}>
      <div className={`${styles.top}`}>
        <div className="d-flex align-items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowTokensList(false);
            }}
          >
            <svg
              width="18"
              height="13"
              viewBox="0 0 18 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.308137 7.24217L0.309083 7.24317L5.78705 12.6947C6.19744 13.1031 6.86122 13.1016 7.26972 12.6912C7.67816 12.2808 7.67659 11.617 7.2662 11.2085L3.58829 7.54845L16.2055 7.54845C16.7845 7.54845 17.2539 7.07909 17.2539 6.50008C17.2539 5.92106 16.7845 5.4517 16.2055 5.4517L3.58835 5.4517L7.26615 1.79162C7.67654 1.38317 7.67811 0.719391 7.26966 0.309005C6.86116 -0.101487 6.19733 -0.102901 5.787 0.305441L0.30903 5.75699L0.308086 5.75799C-0.102511 6.1678 -0.101201 6.83372 0.308137 7.24217Z"
                fill="#678086"
              />
            </svg>
          </a>
          <div className={`${styles.title} ml-auto mr-auto`}>{title}</div>
        </div>
        {!isSell && !isConvert ? (
          <Form className={styles.searchForm}>
            <InputGroup className={styles.searchFormGroup}>
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={styles.searchInput}
                placeholder={searchInputActive ? "" : PLACEHOLDER}
                onFocus={() => setSearchInputActive(true)}
                onBlur={() => setSearchInputActive(false)}
              />
              <InputGroupText className={styles.inputText}>
                {loading ? (
                  <img src="/images/Rolling-0.9s-200px.svg" width="21" />
                ) : (
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 7.48644C0 3.35853 3.35853 0 7.48645 0C11.6146 0 14.9729 3.35853 14.9729 7.48644C14.9729 9.30217 14.3232 10.969 13.2441 12.2666L16.798 15.8205C17.068 16.0902 17.068 16.5279 16.798 16.7977C16.663 16.9326 16.4861 17.0001 16.3094 17.0001C16.1325 17.0001 15.9558 16.9326 15.8208 16.7977L12.2669 13.2438C10.9693 14.3231 9.30234 14.9729 7.48645 14.9729C3.35853 14.9729 0 11.6146 0 7.48644ZM1.38212 7.48647C1.38212 10.8524 4.12055 13.5908 7.48645 13.5908C10.8524 13.5908 13.5908 10.8523 13.5908 7.48644C13.5908 4.12054 10.8524 1.38211 7.48645 1.38211C4.12055 1.38211 1.38212 4.12057 1.38212 7.48647Z"
                      fill="#678086"
                    />
                  </svg>
                )}
              </InputGroupText>
            </InputGroup>
          </Form>
        ) : null}
      </div>
      <div className={styles.tokensList}>
        {tokensList && tokensList.length ? (
          <>
            {tokensList.map((token) => (
              <div
                key={token.ticker}
                className={`${styles.tokenItem} d-flex align-items-center`}
                onClick={() => {
                  selectToken(token);
                  setShowTokensList(false);
                }}
              >
                <img
                  src={getTokenImageUrl(token.ticker, "small")}
                  alt={token.ticker}
                  className={styles.Image}
                />
                <div className={styles.tokenName}>
                  {token.title || token.ticker}
                </div>
                <div className={`${styles.price} ml-auto`}>
                  {!isSell && !isConvert
                    ? formatPrice(token.price)
                    : token.quantity}
                </div>
              </div>
            ))}
            {!isSell && !isConvert && searchValue === "" && !loading ? (
              <div className={styles.textBottom}>and many more...</div>
            ) : null}
          </>
        ) : tokensList && !tokensList.length ? (
          <div
            className={`${styles.noResults} d-flex justify-content-center flex-column align-items-center`}
          >
            <span>Sorry, we can't find "{searchValue}"</span>
          </div>
        ) : tokensList !== false ? (
          [...Array(9)].map((v, i) => (
            <div
              key={i}
              className={`${styles.tokenItem} d-flex align-items-center`}
            >
              <Placeholder className={styles.Image} />
              <div className={styles.tokenName}>
                <Placeholder width="140px" height="14px" />
              </div>
              <div className={`${styles.price} ml-auto`}>
                <Placeholder width="54px" height="15px" />
              </div>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default ChooseToken;
