import { useState, useEffect } from "react";
import { Form, Input, InputGroup, InputGroupText } from "reactstrap";
import {
  getSupportedCrypto,
  getCoinImageURL,
} from "@/functions/getBackendData";
import styles from "@/styles/components/Account/modals/TransactModals.module.scss";
import { map } from "rxjs/operators";

const PayWithView = ({
  title = "Pay with",
  paymentMethod,
  requestBack,
  onSelect,
  showWithdraw = false,
}) => {
  const PLACEHOLDER = "Search by coin name or ticker";
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [cryptoList, setCryptoList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState(
    paymentMethod ? paymentMethod.id : null
  );
  const [searchInputActive, setSearchInputActive] = useState(false);

  // Filter list of currencies
  useEffect(() => {
    let timeout;
    setLoading(false);

    if (searchValue.trim().length) {
      setLoading(true);

      setFilteredList(() => {
        const needle = searchValue.toLowerCase();
        return cryptoList.filter((c) => {
          let terms = [...c.title.split(" "), c.ticker];
          for (let t of terms) {
            if (t.toLowerCase().indexOf(needle) === 0) {
              return true;
            }
          }

          return false;
        });
      });

      timeout = setTimeout(() => {
        setLoading(false);
      }, 600);
    } else {
      setLoading(false);
    }

    return () => {
      setFilteredList([]);
      if (timeout) clearTimeout(timeout);
    };
  }, [searchValue]);

  // Retrieve all supported coins
  useEffect(() => {
    setListLoading(true);
    getSupportedCrypto()
      .then((res) => res.data.coins)
      .then((coins) =>
        coins.map((c) => ({ ...c, img: getCoinImageURL(c.ticker) }))
      )
      .then((coins) =>
        showWithdraw ? coins.filter((c) => c.withdraw === true) : coins
      )
      .then((coins) => setCryptoList(coins))
      .catch((err) => console.error(err))
      .finally(() => setListLoading(false));

    return () => {
      setSearchInputActive(false);
      setSearchValue("");
    };
  }, []);

  const handleItemClick = (payment) => {
    if (payment.id === selectedPaymentId) setSelectedPaymentId(null);
    setSelectedPaymentId(payment.id === selectedPaymentId ? null : payment.id);
    onSelect(payment);
  };

  const methodList = searchValue === "" ? cryptoList : filteredList;

  return (
    <div className={styles.payWithView}>
      <a
        href="#"
        className={styles.back}
        onClick={(e) => {
          e.preventDefault();
          requestBack();
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
      <div className={styles.modalHeadline}>{title}</div>
      <div className={styles.payWithSearch}>
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
      </div>
      <div className={styles.cryptoList}>
        {listLoading ? (
          <div className={styles.loadingWrapper}>
            <div className={styles.ldsRing}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : methodList.length ? (
          methodList.map((item) => (
            <div
              key={item.id}
              className={styles.cryptoItem}
              onClick={() => handleItemClick(item)}
            >
              <div className={styles.cryptoItemImage}>
                <img src={item.img} />
              </div>
              <div className={styles.cryptoItemTitle}>
                <div>{item.ticker}</div>
                <div>{item.title}</div>
              </div>
              <div
                className={`${styles.cryptoItemCheckbox} ${
                  selectedPaymentId === item.id ? styles.checked : ""
                }`}
              >
                <svg
                  width="13"
                  height="10"
                  viewBox="0 0 13 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.4283 2.60619L6.09647 8.93758C5.62759 9.40655 4.867 9.40655 4.39767 8.93758L1.12914 5.66881C0.660079 5.19984 0.660079 4.43915 1.12914 3.9701C1.59828 3.50095 2.35882 3.50095 2.82776 3.96992L5.24732 6.38951L10.7294 0.907391C11.1986 0.438244 11.9592 0.4386 12.4281 0.907391C12.8971 1.37645 12.8971 2.13687 12.4283 2.60619Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.methodsNotFoundMessage}>
            <span>Sorry, we can't find "{searchValue}"</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayWithView;
