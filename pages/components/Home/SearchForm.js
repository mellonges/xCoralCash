import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Form, Input, InputGroup, InputGroupText } from "reactstrap";
import {
  actualizeGraphData,
  calcPriceChange,
} from "../../../functions/helpers";
import {
  getCurrentUser,
  searchTokensRequest,
} from "../../../functions/getBackendData";
import Link from "next/link";

import styles from "../../../styles/components/Home/SearchForm.module.scss";
import SearchResultItem from "./SearchResultItem";

const SearchForm = ({ classes }) => {
  const PLACEHOLDER = "Search by person name";
  const [active, setActive] = useState(false);
  const [searchResult, setSearchResult] = useState();
  const [showNotFound, setShowNotFound] = useState(false);
  const [placeholder, setPlaceholder] = useState(PLACEHOLDER);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setuser] = useState();
  const [showSearchRes, setShowSearchRes] = useState(false);
  const searchFormRef = useRef();

  useEffect(() => {
    if (active) setPlaceholder("");
    else setPlaceholder(PLACEHOLDER);
  }, [active]);

  let timeout = useRef();

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (!searchFormRef.current.contains(event.target)) {
        setShowSearchRes(false);
      }
    }
    if (searchFormRef.current)
      document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchFormRef]);

  useEffect(() => {
    if (showNotFound) setShowNotFound(false);

    setSearchResult();
    if (searchQuery.trim().length && !loading)
      timeout.current = setTimeout(() => {
        setLoading(true);
        searchTokensRequest({ query: searchQuery, chart: true })
          .then((res) => res.data.payload.results)
          .then((res) => {
            // set price change
            res.map((token) => {
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

            setSearchResult(res);
            setLoading(false);
            setShowSearchRes(true);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      }, 600);

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (searchResult !== undefined && !searchResult.length)
      setShowNotFound(true);
  }, [searchResult]);

  useEffect(() => {
    getCurrentUser().then((res) => setuser(res.attributes));
  }, []);

  return (
    <Form
      className={classes ? classes.searchFormWrapper : styles.searchFormWrapper}
      onSubmit={(e) => e.preventDefault()}
      innerRef={searchFormRef}
    >
      {/* Preloading */}
      <img
        src="/images/Rolling-0.9s-200px.svg"
        width="21"
        style={{ position: "absolute", opacity: 0, left: -9999 }}
      />
      <div
        className={`${classes ? classes.searchForm : styles.searchForm} ${
          active ? (classes ? classes.active : styles.active) : ""
        }`}
      >
        <InputGroup className={classes ? classes.InputGroup : ""}>
          <Input
            placeholder={placeholder}
            className={classes ? classes.Input : styles.Input}
            onFocus={() => {
              setActive(true);
              if (searchResult !== undefined) setShowSearchRes(true);
            }}
            onBlur={() => {
              setActive(false);
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputGroupText
            className={classes ? classes.InputIcon : styles.InputIcon}
          >
            {!loading ? (
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.24796 0C4.14877 0 0 4.14877 0 9.24796C0 14.3474 4.14877 18.4959 9.24796 18.4959C14.3474 18.4959 18.4959 14.3474 18.4959 9.24796C18.4959 4.14877 14.3474 0 9.24796 0ZM9.24796 16.7886C5.09008 16.7886 1.70732 13.4059 1.70732 9.248C1.70732 5.09012 5.09008 1.70732 9.24796 1.70732C13.4058 1.70732 16.7886 5.09008 16.7886 9.24796C16.7886 13.4058 13.4058 16.7886 9.24796 16.7886Z"
                  fill="#678086"
                />
                <path
                  d="M20.75 19.5429L15.8557 14.6486C15.5222 14.3151 14.9821 14.3151 14.6486 14.6486C14.3151 14.9818 14.3151 15.5224 14.6486 15.8557L19.5429 20.75C19.7096 20.9167 19.9279 21.0001 20.1464 21.0001C20.3647 21.0001 20.5832 20.9167 20.75 20.75C21.0835 20.4168 21.0835 19.8761 20.75 19.5429Z"
                  fill="#678086"
                />
              </svg>
            ) : (
              <img src="/images/Rolling-0.9s-200px.svg" width="21" />
            )}
          </InputGroupText>
        </InputGroup>
      </div>
      {/* Search results */}
      <AnimatePresence>
        {/* hideSearch flag in conditions will hide panel when user is focusing out */}
        {searchResult !== undefined && showSearchRes && (
          <motion.div
            initial={{
              opacity: 0,
              x: 0,
              y: 0,
              position: "absolute",
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              type: "spring",
            }}
            exit={{
              opacity: 0,
            }}
            className={classes ? classes.searchResults : styles.searchResults}
          >
            {searchResult.length
              ? searchResult.map((resItem) => (
                  <SearchResultItem
                    key={resItem.ticker}
                    item={resItem}
                    setSearchQuery={setSearchQuery}
                    setShowSearchRes={setShowSearchRes}
                    hideTicker={true}
                  />
                ))
              : showNotFound && (
                  <div
                    className={`${
                      classes ? classes.noResults : styles.noResults
                    } d-flex justify-content-center flex-column align-items-center`}
                  >
                    <span>Sorry, we can't find "{searchQuery}"</span>
                    <Link href={user ? "/account/prices" : "/prices"}>
                      <a
                        onClick={() => setShowSearchRes(false)}
                        className={`btn btn-secondary ${
                          classes ? classes.btnAllTokens : styles.btnAllTokens
                        }`}
                      >
                        View all Tokens
                      </a>
                    </Link>
                    <Link href="/">
                      <a>+ Suggest a person</a>
                    </Link>
                  </div>
                )}
          </motion.div>
        )}
      </AnimatePresence>
    </Form>
  );
};

export default SearchForm;
