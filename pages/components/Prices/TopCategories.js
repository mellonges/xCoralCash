import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Container, Row } from 'reactstrap'
import shortid from 'shortid'
import { getCategoryImageUrl } from '../../../functions/getBackendData'
import styles from '../../../styles/components/Prices/TopCategories.module.scss'
import Placeholder from '../common/Placeholder'

const TopCategories = ({ categories, isAccount = false, className = '' }) => {
  const [categoriesBig, setCategoriesBig] = useState()
  const [smallCategories, setSmallCategories] = useState()

  useEffect(() => {
    if (categories && categories.length) {
      setCategoriesBig(categories.filter((cat) => cat.type === 'full'))
      setSmallCategories(categories.filter((cat) => cat.type === 'small'))
    }
  }, [categories])

  return (
    <div className={`${styles.topCategoriesBlock} ${className}`}>
      {isAccount ? (
        <>
          <ScrollContainer
            hideScrollbars={true}
            vertical={false}
            className={styles.scrollContainer}
          >
            <div className={`${styles.topCategories}`}>
              {categoriesBig
                ? categoriesBig.map((cat) => (
                    <Link
                      key={cat.id}
                      href={
                        isAccount
                          ? '/account/prices/categories/[category]'
                          : '/prices/categories/[category]'
                      }
                      as={
                        isAccount
                          ? `/account/prices/categories/${cat.id}`
                          : `/prices/categories/${cat.id}`
                      }
                    >
                      <a className={styles.column}>
                        <div
                          className={`${styles.topCategoriesItemBig} d-flex align-items-end position-relative`}
                          style={{
                            backgroundColor: `rgba(${cat.bgColor.join(', ')})`,
                          }}
                        >
                          <div
                            className={`${styles.icon} position-absolute`}
                          ></div>
                          <strong className={styles.title}>{cat.name}</strong>
                        </div>
                      </a>
                    </Link>
                  ))
                : [...Array(5)].map((i) => (
                    <div className={styles.column} key={shortid.generate()}>
                      <Placeholder
                        className={styles.topCategoriesItemBig}
                        width="100%"
                        height="100px"
                      />
                    </div>
                  ))}
            </div>
          </ScrollContainer>
          <div className={`${styles.categoriesSmall}`}>
            <ScrollContainer
              vertical={false}
              hideScrollbars={true}
              className="d-flex"
            >
              {smallCategories
                ? smallCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={
                        isAccount
                          ? '/account/prices/categories/[category]'
                          : '/prices/categories/[category]'
                      }
                      as={
                        isAccount
                          ? `/account/prices/categories/${cat.id}`
                          : `/prices/categories/${cat.id}`
                      }
                    >
                      <a
                        className={`${styles.smallCategoryItem} d-flex align-items-center`}
                      >
                        <img
                          className={styles.categoryImage}
                          alt={cat.id}
                          src={getCategoryImageUrl(cat.id)}
                        />

                        <div className={styles.title}>{cat.name}</div>
                      </a>
                    </Link>
                  ))
                : [...Array(5)].map((i) => (
                    <Placeholder
                      className={styles.smallCategoryItem}
                      height="44px"
                      key={shortid.generate()}
                      width="125px"
                    />
                  ))}
            </ScrollContainer>
          </div>
        </>
      ) : (
        <Container>
          <ScrollContainer
            hideScrollbars={true}
            vertical={false}
            className={styles.scrollContainer}
          >
            <div className={`${styles.topCategories}`}>
              {categoriesBig
                ? categoriesBig.map((cat) => (
                    <Link
                      key={cat.id}
                      href={
                        isAccount
                          ? '/account/prices/categories/[category]'
                          : '/prices/categories/[category]'
                      }
                      as={
                        isAccount
                          ? `/account/prices/categories/${cat.id}`
                          : `/prices/categories/${cat.id}`
                      }
                    >
                      <a className={styles.column}>
                        <div
                          className={`${styles.topCategoriesItemBig} d-flex align-items-end position-relative`}
                          style={{
                            backgroundColor: `rgba(${cat.bgColor.join(', ')})`,
                          }}
                        >
                          <div
                            className={`${styles.icon} position-absolute`}
                          ></div>
                          <strong className={styles.title}>{cat.name}</strong>
                        </div>
                      </a>
                    </Link>
                  ))
                : [...Array(5)].map((i) => (
                    <div className={styles.column} key={shortid.generate()}>
                      <Placeholder
                        className={styles.topCategoriesItemBig}
                        width="100%"
                        height="100px"
                      />
                    </div>
                  ))}
            </div>
          </ScrollContainer>
          <div className={`${styles.categoriesSmall}`}>
            <ScrollContainer
              vertical={false}
              hideScrollbars={true}
              className="d-flex"
            >
              {smallCategories
                ? smallCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={
                        isAccount
                          ? '/account/prices/categories/[category]'
                          : '/prices/categories/[category]'
                      }
                      as={
                        isAccount
                          ? `/account/prices/categories/${cat.id}`
                          : `/prices/categories/${cat.id}`
                      }
                    >
                      <a
                        className={`${styles.smallCategoryItem} d-flex align-items-center`}
                      >
                        <img
                          className={styles.categoryImage}
                          alt={cat.id}
                          src={getCategoryImageUrl(cat.id)}
                        />

                        <div className={styles.title}>{cat.name}</div>
                      </a>
                    </Link>
                  ))
                : [...Array(5)].map((i) => (
                    <Placeholder
                      className={styles.smallCategoryItem}
                      height="44px"
                      key={shortid.generate()}
                      width="125px"
                    />
                  ))}
            </ScrollContainer>
          </div>
        </Container>
      )}
    </div>
  )
}
export default TopCategories
