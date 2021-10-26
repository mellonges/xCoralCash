import React, { useState } from "react";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import styles from "../../../styles/pages/Prices.module.scss";

const SearchForm = ({ onChange, loading }) => {
  const PLACEHOLDER = "Search by person name";

  const [placeholder, setPlaceholder] = useState(PLACEHOLDER);

  return (
    <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
      {/* Preloading */}
      <img
        src="/images/Rolling-0.9s-200px.svg"
        width="21"
        style={{ position: "absolute", opacity: 0, left: -9999 }}
      />
      <InputGroup
        className={`${styles.searchInputWrapper} ${
          placeholder !== PLACEHOLDER ? styles.active : ""
        }`}
      >
        <Input
          className={styles.searchInput}
          placeholder={placeholder}
          onFocus={() => setPlaceholder("")}
          onBlur={() => setPlaceholder(PLACEHOLDER)}
          onChange={(e) => onChange(e.target.value)}
        />
        <InputGroupText className={styles.searchIcon}>
          {loading ? (
            <img src="/images/Rolling-0.9s-200px.svg" width="21" />
          ) : (
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.7" clipPath="url(#clip0)">
                <path
                  d="M8.48644 1.03418C4.35853 1.03418 1 4.39271 1 8.52062C1 12.6488 4.35853 16.0071 8.48644 16.0071C12.6146 16.0071 15.9729 12.6488 15.9729 8.52062C15.9729 4.39271 12.6146 1.03418 8.48644 1.03418ZM8.48644 14.625C5.12054 14.625 2.38211 11.8866 2.38211 8.52065C2.38211 5.15475 5.12054 2.41629 8.48644 2.41629C11.8523 2.41629 14.5908 5.15472 14.5908 8.52062C14.5908 11.8865 11.8523 14.625 8.48644 14.625Z"
                  fill="#678086"
                />
                <path
                  d="M17.798 16.855L13.8359 12.8929C13.5659 12.6229 13.1287 12.6229 12.8587 12.8929C12.5888 13.1627 12.5888 13.6003 12.8587 13.8701L16.8208 17.8321C16.9558 17.9671 17.1325 18.0346 17.3094 18.0346C17.4861 18.0346 17.663 17.9671 17.798 17.8321C18.0679 17.5624 18.0679 17.1247 17.798 16.855Z"
                  fill="#678086"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect
                    width="18"
                    height="19"
                    fill="white"
                    transform="translate(0 0.0341797)"
                  />
                </clipPath>
              </defs>
            </svg>
          )}
        </InputGroupText>
      </InputGroup>
    </form>
  );
};

export default SearchForm;
