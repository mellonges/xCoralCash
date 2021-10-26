import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useRef } from 'react'
import { Table, Button } from 'reactstrap'
import { getTokenImageUrl } from '../../../functions/getBackendData'
import { AccountContext, formatPrice } from '../../../functions/helpers'

import Placeholder from '../common/Placeholder'
import PriceChangePercent from '../common/PriceChangePercent'
import TokenChart from '../Home/TokenChart'
import Select from 'react-select'
import { ChangeAccountTradeModalState } from '../../../functions/observers'

// eslint-disable-next-line react/display-name
const TokensList = React.forwardRef(
  ({ people, sort, setSort, styles, disableSort }, ref) => {
    const router = useRouter()

    const sortMobileTypeRef = useRef()
    const sortMobileOrderRef = useRef()

    const isAccount = router.pathname.match('/account')

    return people && people.length ? (
      <>
        <Table
          className={`${styles && styles.tokensListTable} d-none d-lg-table`}
          borderless={true}
          innerRef={ref}
        >
          <thead className={`${styles && styles.heading}`}>
            <tr>
              <th
                className={`${styles && styles.divTableCol} ${
                  styles && styles.headingText
                } ${!disableSort ? 'cursor-pointer' : ''}`}
                width="55%"
                onClick={() =>
                  !disableSort &&
                  setSort({
                    name: !sort.name || sort.name === 'desc' ? 'asc' : 'desc',
                  })
                }
              >
                Name
                <span
                  className={`${
                    sort.name && !disableSort ? 'd-inline-block' : 'd-none'
                  } ${styles && styles.sortArrow} ${
                    sort.name && sort.name === 'asc'
                      ? styles && styles.arrowAsc
                      : styles && styles.arrowDesc
                  }`}
                >
                  <svg
                    width="7"
                    height="5"
                    viewBox="0 0 7 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.15001 4.63159L6.81188 0.933475C6.93489 0.762689 7 0.59061 7 0.447579C7 0.171055 6.76666 -1.01996e-08 6.37608 -2.72723e-08L0.623012 -2.78747e-07C0.232886 -2.958e-07 -7.46765e-09 0.170839 -1.95266e-08 0.446716C-2.57881e-08 0.589963 0.0651626 0.759293 0.188518 0.930457L2.85033 4.6303C3.02179 4.86823 3.25252 5 3.50031 5C3.74793 5.00005 3.97861 4.8698 4.15001 4.63159Z"
                      fill="#678086"
                    />
                  </svg>
                </span>
              </th>
              <th
                className={`${styles && styles.divTableCol} ${
                  styles && styles.headingText
                } ${!disableSort ? 'cursor-pointer' : ''}`}
                onClick={() =>
                  !disableSort &&
                  setSort({
                    price:
                      !sort.price || sort.price === 'desc' ? 'asc' : 'desc',
                  })
                }
              >
                price
                <span
                  className={`${
                    sort.price && !disableSort ? 'd-inline-block' : 'd-none'
                  } ${styles && styles.sortArrow} ${
                    sort.price && sort.price === 'asc'
                      ? styles && styles.arrowAsc
                      : styles && styles.arrowDesc
                  }`}
                >
                  <svg
                    width="7"
                    height="5"
                    viewBox="0 0 7 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.15001 4.63159L6.81188 0.933475C6.93489 0.762689 7 0.59061 7 0.447579C7 0.171055 6.76666 -1.01996e-08 6.37608 -2.72723e-08L0.623012 -2.78747e-07C0.232886 -2.958e-07 -7.46765e-09 0.170839 -1.95266e-08 0.446716C-2.57881e-08 0.589963 0.0651626 0.759293 0.188518 0.930457L2.85033 4.6303C3.02179 4.86823 3.25252 5 3.50031 5C3.74793 5.00005 3.97861 4.8698 4.15001 4.63159Z"
                      fill="#678086"
                    />
                  </svg>
                </span>
              </th>
              <th
                className={`${styles && styles.divTableCol} ${
                  styles && styles.headingText
                } ${!disableSort ? 'cursor-pointer' : ''}`}
                onClick={() =>
                  !disableSort &&
                  setSort({
                    price_ch:
                      !sort.price_ch || sort.price_ch === 'desc'
                        ? 'asc'
                        : 'desc',
                  })
                }
              >
                change
                <span
                  className={`${
                    sort.price_ch && !disableSort ? 'd-inline-block' : 'd-none'
                  } ${styles && styles.sortArrow} ${
                    sort.price_ch && sort.price_ch === 'asc'
                      ? styles && styles.arrowAsc
                      : styles && styles.arrowDesc
                  }`}
                >
                  <svg
                    width="7"
                    height="5"
                    viewBox="0 0 7 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.15001 4.63159L6.81188 0.933475C6.93489 0.762689 7 0.59061 7 0.447579C7 0.171055 6.76666 -1.01996e-08 6.37608 -2.72723e-08L0.623012 -2.78747e-07C0.232886 -2.958e-07 -7.46765e-09 0.170839 -1.95266e-08 0.446716C-2.57881e-08 0.589963 0.0651626 0.759293 0.188518 0.930457L2.85033 4.6303C3.02179 4.86823 3.25252 5 3.50031 5C3.74793 5.00005 3.97861 4.8698 4.15001 4.63159Z"
                      fill="#678086"
                    />
                  </svg>
                </span>
              </th>
              <th
                className={`${styles && styles.divTableCol} ${
                  styles && styles.headingText
                } `}
              >
                graph
              </th>
              <th
                className={`${styles && styles.divTableCol} ${
                  styles && styles.headingText
                } `}
              >
                trade
              </th>
            </tr>
          </thead>
          <tbody className={styles && styles.tableBody}>
            {people.map((item) => (
              <tr
                className={`${styles && styles.tokenItem} ${
                  styles && styles.divTableRow
                }`}
                key={item.ticker}
                onClick={() =>
                  router.push(
                    !isAccount
                      ? '/persons/[token]'
                      : '/account/persons/[token]',
                    !isAccount
                      ? `/persons/${item.ticker}`
                      : `/account/persons/${item.ticker}`,
                  )
                }
              >
                <td
                  className={`${styles && styles.divTableCol} ${
                    styles && styles.tokenName
                  }`}
                  width="55%"
                  valign="center"
                >
                  <div className={styles && styles.tokenNameInner}>
                    <img
                      src={getTokenImageUrl(item.ticker, 'small')}
                      alt={item.ticker}
                      className={styles && styles.Image}
                    />
                    <strong className={styles && styles.tokenTitle}>
                      {item.name}
                    </strong>
                    <span className={styles && styles.tokenTicker}>
                      {item.ticker}
                    </span>
                  </div>
                </td>
                <td
                  className={`${styles && styles.divTableCol} ${
                    styles && styles.Price
                  }`}
                >
                  {formatPrice(item.price)}
                </td>
                <td
                  className={`${styles && styles.divTableCol} ${
                    styles && styles.PercentChange
                  }`}
                >
                  <PriceChangePercent
                    className={styles && styles.percent}
                    percent={item.priceChange}
                    positiveClass={styles && styles.positive}
                    negativeClass={styles && styles.negative}
                    neutralClass={styles && styles.neutral}
                  />
                </td>
                <td
                  className={`${styles && styles.divTableCol} ${
                    styles && styles.tokenChart
                  }`}
                >
                  {item['1M'] ? (
                    <TokenChart
                      className={styles && styles.chart}
                      data={item['1M'].map((d) => ({ x: d[0], y: d[1] }))}
                    />
                  ) : null}
                </td>
                <td
                  className={`${styles && styles.divTableCol} ${
                    styles && styles.tradeBtn
                  }`}
                >
                  {!isAccount ? (
                    <Link
                      href={'/persons/[token]'}
                      as={`/persons/${item.ticker}`}
                    >
                      <a
                        className={`btn btn-primary ${
                          styles && styles.tradeButton
                        }`}
                      >
                        Trade
                      </a>
                    </Link>
                  ) : (
                    <a
                      className={`btn btn-primary cursor-pointer ${
                        styles && styles.tradeButton
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        ChangeAccountTradeModalState({
                          isOpen: true,
                          token: item,
                        })
                      }}
                    >
                      Trade
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {!disableSort ? (
          <div
            className={`sortSelectWrapper d-flex justify-content-between d-lg-none ${
              styles && styles.sortSelectWrapper
            }`}
          >
            <Select
              ref={sortMobileTypeRef}
              classNamePrefix="pricesPageSortMobile"
              className={styles && styles.sortSelect}
              isSearchable={false}
              onChange={(v) => {
                setSort({
                  [v.value]: Object.values(sort)[0],
                })
              }}
              placeholder="Sort"
              value={{
                label:
                  Object.keys(sort)[0] === 'price_ch'
                    ? 'Price Change'
                    : Object.keys(sort)[0],
                value: Object.keys(sort)[0],
              }}
              options={[
                {
                  label: 'Name',
                  value: 'name',
                },

                {
                  label: 'Price',
                  value: 'price',
                },

                {
                  label: 'Price Change',
                  value: 'price_ch',
                },
              ]}
            />
            <Select
              classNamePrefix="pricesPageSortMobile"
              className={styles && styles.sortSelect}
              ref={sortMobileOrderRef}
              isSearchable={false}
              onChange={(v) => {
                setSort({
                  [Object.keys(sort)[0]]: v.value,
                })
              }}
              placeholder="Sort"
              value={{
                label:
                  Object.values(sort)[0] === 'asc' ? 'Ascending' : 'Descending',
                value: Object.values(sort)[0],
              }}
              options={[
                {
                  label: 'Ascending',
                  value: 'asc',
                },
                {
                  label: 'Descending',
                  value: 'desc',
                },
              ]}
            />
          </div>
        ) : null}
        <div
          className={`d-block d-lg-none ${styles && styles.tokensListMobile}`}
        >
          {people.map((item) => (
            <div
              className={`${
                styles && styles.tokenItem
              } d-flex align-items-center`}
              key={item.ticker}
              onClick={() =>
                router.push(
                  !isAccount ? '/persons/[token]' : '/account/persons/[token]',
                  !isAccount
                    ? `/persons/${item.ticker}`
                    : `/account/persons/${item.ticker}`,
                )
              }
            >
              <div
                className={`${
                  styles && styles.titleColumn
                } d-flex align-items-center `}
              >
                <img
                  src={getTokenImageUrl(item.ticker, 'small')}
                  alt={item.ticker}
                  className={styles && styles.Image}
                />
                <div className={`${styles && styles.info} d-flex flex-column`}>
                  <strong className={styles && styles.tokenTitle}>
                    {item.name}
                  </strong>
                  <span className={styles && styles.tokenTicker}>
                    {item.ticker}
                  </span>
                </div>
              </div>
              <div
                className={`${styles && styles.tokenChart} d-md-block d-none`}
              >
                <TokenChart
                  className={styles && styles.chart}
                  data={item['1M'].map((d) => ({ x: d[0], y: d[1] }))}
                />
              </div>
              <div className={`${styles && styles.priceContainer}  text-right`}>
                <strong className={`d-block ${styles && styles.Price}`}>
                  {formatPrice(item.price)}
                </strong>
                <PriceChangePercent
                  className={styles && styles.percent}
                  percent={item.priceChange}
                  positiveClass={styles && styles.positive}
                  negativeClass={styles && styles.negative}
                  neutralClass={styles && styles.neutral}
                />
              </div>
            </div>
          ))}
        </div>
      </>
    ) : people && !people.length ? (
      <div
        className={`text-center ${
          styles && styles.notFoundText
        } w-100 d-flex flex-column align-items-center`}
      >
        <div className={styles && styles.Icon}>
          <svg
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31.4555 29.7515L25.9932 24.3202C28.1925 21.7058 29.3974 18.4164 29.3974 14.9919C29.3974 6.99104 22.888 0.481567 14.8871 0.481567C6.88619 0.481567 0.376709 6.99104 0.376709 14.9919C0.376709 22.9928 6.88619 29.5023 14.8871 29.5023C17.8907 29.5023 20.753 28.5963 23.2003 26.8766L28.7276 32.3753C29.0878 32.7495 29.5723 32.9558 30.0915 32.9558C30.583 32.9558 31.0492 32.7684 31.4032 32.4277C32.1552 31.7041 32.1791 30.5041 31.4555 29.7515ZM14.8871 4.26688C20.801 4.26688 25.6121 9.07801 25.6121 14.9919C25.6121 20.9059 20.801 25.717 14.8871 25.717C8.97316 25.717 4.16202 20.9059 4.16202 14.9919C4.16202 9.07801 8.97316 4.26688 14.8871 4.26688Z"
              fill="#678086"
            />
          </svg>
        </div>
        <div className={styles && styles.title}>No results to show</div>
        <div className={styles && styles.descr}>
          Don’t see a person you want to trade? Let us know and we’ll get them
          listed in 24 hours.
        </div>
        <Button color="primary" className={styles && styles.requestBtn}>
          Request a person listing
        </Button>
      </div>
    ) : (
      <>
        <Table
          className={`${styles && styles.tokensListTable}  d-none d-lg-table`}
          borderless={true}
          innerRef={ref}
        >
          <thead className={`${styles && styles.heading}`}>
            <tr>
              <th
                className={`${styles && styles.divTableCol} ${
                  styles && styles.headingText
                }`}
                width="55%"
              >
                Name
              </th>
              <th
                className={`${styles && styles.divTableCol} ${
                  styles && styles.headingText
                } `}
              >
                price
              </th>
              <th
                className={`${styles && styles.divTableCol} ${
                  styles && styles.headingText
                } `}
              >
                change
              </th>
              <th
                className={`${styles && styles.divTableCol} ${
                  styles && styles.headingText
                } `}
              >
                graph
              </th>
              <th
                className={`${styles && styles.divTableCol} ${
                  styles && styles.headingText
                } `}
              >
                trade
              </th>
            </tr>
          </thead>
          <tbody className={styles && styles.tableBody}>
            {[...Array(20)].map((v, i) => (
              <tr
                className={`${styles && styles.tokenItem} ${
                  styles && styles.divTableRow
                }`}
                key={i}
              >
                <td
                  className={`${styles && styles.divTableCol} ${
                    styles && styles.tokenName
                  }`}
                  width="55%"
                  valign="center"
                >
                  <div className={styles && styles.tokenNameInner}>
                    <Placeholder key={v} className={styles && styles.Image} />
                    <strong className={styles && styles.tokenTitle}>
                      <Placeholder width="100px" height="20px" />
                    </strong>
                    <span className={styles && styles.tokenTicker}>
                      <Placeholder width="50px" height="18px" />
                    </span>
                  </div>
                </td>
                <td
                  className={`${styles && styles.divTableCol} ${
                    styles && styles.Price
                  }`}
                >
                  <Placeholder width="100px" height="22px" />
                </td>
                <td
                  className={`${styles && styles.divTableCol} ${
                    styles && styles.PercentChange
                  }`}
                >
                  <Placeholder width="100px" height="22px" />
                </td>
                <td
                  className={`d-none d-md-block ${
                    styles && styles.divTableCol
                  } ${styles && styles.tokenChart}`}
                >
                  <Placeholder width="76px" height="25px" />
                </td>
                <td
                  className={`${styles && styles.divTableCol} ${
                    styles && styles.tradeBtn
                  }`}
                >
                  <Placeholder width="41px" height="20px" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div
          className={`d-block d-lg-none ${styles && styles.tokensListMobile}`}
        >
          {[...Array(20)].map((v, i) => (
            <div
              className={`${
                styles && styles.tokenItem
              } d-flex align-items-center`}
              key={i}
            >
              <div
                className={`${
                  styles && styles.titleColumn
                } d-flex align-items-center `}
              >
                <Placeholder className={styles && styles.Image} />
                <div className={`${styles && styles.info} d-flex flex-column`}>
                  <strong className={styles && styles.tokenTitle}>
                    {' '}
                    <Placeholder width="60px" height="15px" />
                  </strong>
                  <span className={styles && styles.tokenTicker}>
                    <Placeholder width="40px" height="13px" />
                  </span>
                </div>
              </div>
              <div className={styles && styles.tokenChart}>
                <Placeholder width="76px" height="25px" />
              </div>
              <div
                className={`${
                  styles && styles.priceContainer
                } d-flex align-items-end flex-column  text-right`}
              >
                <strong className={`d-block ${styles && styles.Price}`}>
                  <Placeholder width="60px" height="16px" />
                </strong>
                <Placeholder width="40px" height="15px" />
              </div>
            </div>
          ))}
        </div>
      </>
    )
  },
)

export default TokensList
