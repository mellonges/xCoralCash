import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import styles from '../../../styles/components/Prices/Pagination.module.scss'

const PaginationNav = ({
  onChange,
  currentPage,
  totalPages,
  className = '',
}) => {
  return (
    <div className={`${styles.Pagination} ${className} `}>
      <Pagination aria-label="Page navigation example" className="text-center">
        <PaginationItem
          className={`${styles.paginationItem} ${styles.paginationPrev} ${
            currentPage === 1 ? styles.disabled : ''
          }`}
        >
          <PaginationLink
            previous
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onChange(currentPage - 1 >= 1 ? currentPage - 1 : currentPage)
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M10.3657 14.9999L12.1344 13.2311L6.40318 7.49988L12.1344 1.76865L10.3657 -0.000123858L2.8657 7.49988L10.3657 14.9999Z"
                  fill="#003D56"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect
                    width="15"
                    height="15"
                    fill="white"
                    transform="translate(15 14.9999) rotate(180)"
                  />
                </clipPath>
              </defs>
            </svg>
          </PaginationLink>
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((v) => (
          <PaginationItem key={v} className={styles.paginationItem}>
            <PaginationLink
              href="#"
              className={currentPage === v ? styles.active : ''}
              onClick={(e) => {
                e.preventDefault()
                if (currentPage !== v) {
                  onChange(v)
                }
              }}
            >
              {v}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem
          className={`${styles.paginationItem} ${styles.paginationNext} ${
            currentPage === totalPages ? styles.disabled : ''
          }`}
        >
          <PaginationLink
            next
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onChange(
                currentPage + 1 <= totalPages ? currentPage + 1 : currentPage,
              )
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.63431 0L2.8656 1.76877L8.59683 7.5L2.8656 13.2312L4.63431 15L12.1343 7.5L4.63431 0Z"
                fill="#003D56"
              />
            </svg>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </div>
  )
}

export default PaginationNav
