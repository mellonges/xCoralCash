import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import { getTokenImageUrl } from '../../../functions/getBackendData'
import {
  calculateAllocationAndAddToArray,
  formatPrice,
} from '../../../functions/helpers'
import styles from '../../../styles/components/Account/AssetsTable.module.scss'
import Placeholder from '../common/Placeholder'
import AllocationProgressBar from './AllocationProgressBar'
import Select from 'react-select'
import { useRouter } from 'next/router'

const AssetsTable = ({ assets, portfolioMarketValue }) => {
  const [assetsRes, setAssets] = useState(
    calculateAllocationAndAddToArray(assets, portfolioMarketValue),
  )
  const [sort, setSort] = useState({
    allocation: 'DESC',
    sorted: false,
  })

  const router = useRouter()

  useEffect(() => {
    setAssets(calculateAllocationAndAddToArray(assets, portfolioMarketValue))
  }, [assets])

  useEffect(() => {
    if (assetsRes && assetsRes.length && sort && !sort.sorted) {
      setAssets(
        [...assetsRes].sort((a, b) => {
          if (sort.allocation)
            if (sort.allocation === 'DESC')
              return a.allocation > b.allocation ? -1 : 1
            else return a.allocation < b.allocation ? -1 : 1
          else if (sort.balance)
            if (sort.balance === 'DESC')
              return a.marketValue > b.marketValue ? -1 : 1
            else return a.marketValue < b.marketValue ? -1 : 1
          else if (sort.name)
            if (sort.name === 'DESC')
              return a.meta && b.meta && a.meta.name > b.meta.name ? -1 : 1
            else return a.meta && b.meta && a.meta.name < b.meta.name ? -1 : 1
          else if (sort.price)
            if (sort.price === 'DESC') return a.price > b.price ? -1 : 1
            else return a.price < b.price ? -1 : 1
          else return 0
        }),
      )

      setSort({
        ...sort,
        sorted: true,
      })
    }
  }, [sort, assetsRes])

  return assetsRes && assetsRes.length ? (
    <>
      <Table
        className={`${styles.AssetsTable} d-none d-lg-table`}
        bordered={false}
      >
        <thead className={styles.heading}>
          <tr>
            <th
              className={`${styles.headCol} ${sort.name ? styles.active : ''} `}
              onClick={() =>
                setSort({
                  name: sort.name && sort.name === 'DESC' ? 'ASC' : 'DESC',
                  sorted: false,
                })
              }
            >
              Asset
              <span
                className={`${sort.name ? 'd-inline-block' : 'd-none'} ${
                  styles && styles.sortArrow
                } ${
                  sort.name && sort.name === 'ASC'
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
              className={`${styles.headCol} ${
                sort.balance ? styles.active : ''
              } text-right`}
              onClick={() =>
                setSort({
                  balance:
                    sort.balance && sort.balance === 'DESC' ? 'ASC' : 'DESC',
                  sorted: false,
                })
              }
            >
              balance
              <span
                className={`${sort.balance ? 'd-inline-block' : 'd-none'} ${
                  styles && styles.sortArrow
                } ${
                  sort.balance && sort.balance === 'ASC'
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
              className={`${styles.headCol} ${
                sort.price ? styles.active : ''
              } text-right`}
              onClick={() =>
                setSort({
                  price: sort.price && sort.price === 'DESC' ? 'ASC' : 'DESC',
                  sorted: false,
                })
              }
            >
              price
              <span
                className={`${sort.price ? 'd-inline-block' : 'd-none'} ${
                  styles && styles.sortArrow
                } ${
                  sort.price && sort.price === 'ASC'
                    ? styles && styles.arrowAsc
                    : styles && styles.arrowDesc
                } `}
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
              className={`${styles.headCol} ${
                sort.allocation ? styles.active : ''
              } text-right`}
              onClick={() =>
                setSort({
                  allocation:
                    sort.allocation && sort.allocation === 'DESC'
                      ? 'ASC'
                      : 'DESC',
                  sorted: false,
                })
              }
            >
              allocation %
              <span
                className={`${sort.allocation ? 'd-inline-block' : 'd-none'} ${
                  styles && styles.sortArrow
                } ${
                  sort.allocation && sort.allocation === 'ASC'
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
          </tr>
        </thead>
        <tbody>
          {assetsRes
            .filter((a) => a.ticker !== 'USD')
            .map((asset) => (
              <tr
                key={asset.ticker}
                className={`${styles.tableRow} cursor-pointer`}
                onClick={() =>
                  router.push(
                    '/account/persons/[token]',
                    `/account/persons/${asset.ticker}`,
                  )
                }
              >
                <td className={styles.tableCol}>
                  <div className="d-flex align-items-center">
                    <img
                      src={getTokenImageUrl(asset.ticker, 'small')}
                      alt={asset.ticker}
                      className={`${styles.Image}`}
                    />
                    <div className={styles.info}>
                      <strong className={`${styles.tokenName} d-block`}>
                        {asset.meta.name}
                      </strong>
                      <span className={styles.ticker}>{asset.ticker}</span>
                    </div>
                  </div>
                </td>
                <td className={styles.tableCol}>
                  <div className={`${styles.price} text-right`}>
                    <div className={styles.count}>{asset.quantity}</div>
                    <div className={styles.totalPrice}>
                      {formatPrice(asset.marketValue)}
                    </div>
                  </div>
                </td>
                <td className={styles.tableCol}>
                  <div className={`${styles.priceChange} text-right`}>
                    <strong className={styles.actualPrice}>
                      {formatPrice(asset.price)}
                    </strong>
                    {/* <PriceChangePercent
                      className={styles.changePercent}
                      negativeClass={styles.negative}
                      positiveClass={styles.positive}
                      neutralClass={styles.neutral}
                      percent={2.5}
                    /> */}
                  </div>
                </td>
                <td className={styles.tableCol}>
                  <div className={`${styles.allocation}`}>
                    <AllocationProgressBar
                      className={styles.progressBar}
                      percent={asset.allocation}
                    />
                    <div className={styles.percent}>
                      {asset.allocation.toFixed(2)}%
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div
        className={`sortSelectWrapper d-flex justify-content-between d-lg-none ${styles.sortSelectWrapper}`}
      >
        <Select
          classNamePrefix="pricesPageSortMobile"
          className={styles.sortSelect}
          isSearchable={false}
          onChange={(v) => {
            setSort({
              [v.value]: Object.values(sort)[0],
              sorted: false,
            })
          }}
          placeholder="Sort"
          value={{
            label: Object.keys(sort)[0],
            value: Object.keys(sort)[0],
          }}
          options={[
            {
              label: 'Name',
              value: 'name',
            },

            {
              label: 'Balance',
              value: 'balance',
            },

            {
              label: 'Price',
              value: 'price',
            },
            {
              label: 'Allocation %',
              value: 'allocation',
            },
          ]}
        />
        <Select
          classNamePrefix="pricesPageSortMobile"
          className={styles.sortSelect}
          isSearchable={false}
          onChange={(v) => {
            setSort({
              [Object.keys(sort)[0]]: v.value,
              sorted: false,
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
      <div className={`${styles.assetsTableMobile} d-block d-lg-none`}>
        {assetsRes
          .filter((a) => a.ticker !== 'USD')
          .map((asset) => (
            <div
              className={`${styles.tokenItem} d-flex align-items-center`}
              key={asset.ticker}
              onClick={() =>
                router.push(
                  '/account/persons/[token]',
                  `/account/persons/${asset.ticker}`,
                )
              }
            >
              <div
                className={`${
                  styles && styles.titleColumn
                } d-flex align-items-center `}
              >
                <img
                  src={getTokenImageUrl(asset.ticker, 'small')}
                  alt={asset.ticker}
                  className={styles && styles.Image}
                />
                <div className={`${styles && styles.info} d-flex flex-column`}>
                  <strong className={styles && styles.tokenTitle}>
                    {asset.meta.name}
                  </strong>
                  <span className={styles && styles.tokenTicker}>
                    {asset.ticker}
                  </span>
                </div>
              </div>
              <div className={`${styles.priceColumn} ml-auto`}>
                <div className={styles.count}>{asset.quantity}</div>
                <div className={styles.totalPrice}>
                  {formatPrice(asset.marketValue)}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  ) : assetsRes ? (
    <>
      <Table
        className={`${styles && styles.AssetsTable}  d-none d-lg-table`}
        borderless={true}
      >
        <thead className={`${styles && styles.heading}`}>
          <tr>
            <th
              className={`${styles && styles.headCol} ${
                styles && styles.headingText
              }`}
              width="55%"
            >
              Asset
            </th>
            <th
              className={`${styles && styles.headCol} ${
                styles && styles.headingText
              } `}
            >
              Balance
            </th>
            <th
              className={`${styles && styles.headCol} ${
                styles && styles.headingText
              } `}
            >
              Price
            </th>
            <th
              className={`${styles && styles.headCol} ${
                styles && styles.headingText
              } `}
            >
              allocation %
            </th>
          </tr>
        </thead>
      </Table>
      <div
        className={`${styles.noResults} d-flex align-items-center justify-content-center`}
      >
        <div
          className={`${styles.noAssetsHolder} d-flex flex-column align-items-center justify-content-center`}
        >
          <div className={styles.Icon}>
            <svg
              width="29"
              height="23"
              viewBox="0 0 29 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5 2.125L2 8.375L14.5 14.625L27 8.375L14.5 2.125Z"
                stroke="#678086"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 14.625L14.5 20.875L27 14.625"
                stroke="#678086"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <strong className={styles.name}>You have no assets</strong>
          <span className={styles.descr}>Start building your portfolio</span>
        </div>
      </div>
    </>
  ) : (
    <Table
      className={`${styles && styles.AssetsTable}  d-none d-lg-table`}
      borderless={true}
    >
      <thead className={`${styles && styles.heading}`}>
        <tr>
          <th
            className={`${styles && styles.headCol} ${
              styles && styles.headingText
            }`}
            width="55%"
          >
            Asset
          </th>
          <th
            className={`${styles && styles.headCol} ${
              styles && styles.headingText
            } `}
          >
            Balance
          </th>
          <th
            className={`${styles && styles.headCol} ${
              styles && styles.headingText
            } `}
          >
            Price
          </th>
          <th
            className={`${styles && styles.headCol} ${
              styles && styles.headingText
            } `}
          >
            allocation %
          </th>
        </tr>
      </thead>
      <tbody>
        {[...Array(12)].map((v, i) => (
          <tr key={i}>
            <td
              className={`${styles && styles.tableCol} ${
                styles && styles.tokenName
              }`}
            >
              <div className="d-flex align-items-center">
                <Placeholder className={styles && styles.Image} />
                <div className={styles.info}>
                  <strong className={`${styles.tokenName} d-block`}>
                    <Placeholder width="100px" height="20px" />
                  </strong>
                  <span className={styles.ticker}>
                    {' '}
                    <Placeholder width="50px" height="18px" />
                  </span>
                </div>
              </div>
            </td>
            <td
              className={`${styles && styles.tableCol} ${
                styles && styles.Price
              }`}
            >
              <Placeholder width="100px" height="22px" />
            </td>
            <td
              className={`${styles && styles.tableCol} ${
                styles && styles.PercentChange
              }`}
            >
              <Placeholder width="100px" height="22px" />
            </td>
            <td
              className={`d-none d-md-block ${styles && styles.tableCol} ${
                styles && styles.tokenChart
              }`}
            >
              <Placeholder width="76px" height="25px" />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
export default AssetsTable
