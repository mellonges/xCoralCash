import { Container } from "reactstrap";
import styles from "../../../styles/components/Header/Header.module.scss";
import Link from "next/link";
import { Button } from "reactstrap";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import MobileNavigation from "./MobileNavigation";
import SearchForm from "../Home/SearchForm";
import { getCurrentUser } from "../../../functions/getBackendData";

const Header = ({ color }) => {
  const router = useRouter();

  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [currentUser, setCurrentUser] = useState();

  const searchFormRef = useRef();

  useEffect(() => {
    if (showMobileNav) {
      document.body.className = "locked";
      document.documentElement.className = "locked";
    } else {
      document.body.className = "";
      document.documentElement.className = "";
    }
  }, [showMobileNav]);

  useEffect(() => {
    getCurrentUser()
      .then((user) => user && setCurrentUser(user.attributes))
      .catch(() => {});
  }, []);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        searchFormRef.current &&
        !searchFormRef.current.contains(event.target)
      ) {
        setShowSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchFormRef]);

  const navItems = [
    // {
    //   link: "/prices",
    //   title: "Prices",
    // },
    {
      link: "/docs",
      title: "Docs",
    },
  ];

  // if (!currentUser)
  //   navItems.push({
  //     link: "/signin",
  //     title: "Sign In",
  //   });

  return (
    <div
      className={`${styles.header} ${
        color === "dark" ? styles.headerDark : styles.headerLight
      }`}
    >
      <Container>
        <nav className={`d-flex align-items-center ${styles.navbar}`}>
          <Link href="/">
            <a className={styles.logotype}>
              xcoral.<span>cash</span>
            </a>
          </Link>
          <div className="mr-auto">
            {color === "dark" ? (
              <span className={`${styles.description}`}>the perpetual token</span>
            ) : null}
          </div>
          <ul className={`${styles.headerNavigation} d-none d-lg-flex`}>
            {color === "light" && (
              <div className={styles.searchFormContainer} ref={searchFormRef}>
                <div
                  className={`${styles.headerSearchFormWrapper} ${
                    showSearch ? "d-block" : "d-none"
                  }`}
                >
                  {/*<SearchForm classes={styles} />*/}
                </div>
                <div
                  className={`${styles.searchIcon} ${
                    showSearch ? "d-none" : ""
                  } cursor-pointer`}
                  onClick={() => setShowSearch(true)}
                >
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
                </div>
              </div>
            )}
            {navItems.map((item, i) => (
              <li key={i}>
                <Link href={`${item.link}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
          {/*{!currentUser ? (*/}
          {/*  <Button*/}
          {/*    className={`${styles.getStartedBtn}`}*/}
          {/*    onClick={() => router.push("/signup")}*/}
          {/*  >*/}
          {/*    Get started*/}
          {/*  </Button>*/}
          {/*) : (*/}
            <Button
              className={`${styles.getStartedBtn}`}
              onClick={() => router.push("/dashboard")}
            >
              Launch App
            </Button>
          {/*)}*/}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowMobileNav(true);
              e.target.blur();
            }}
            className={`d-block d-lg-none ${styles.mobileNavToggler}`}
          >
            {color === "light" ? (
              <svg
                width="24"
                height="20"
                viewBox="0 0 24 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.0073 16.7012H1.15349C0.604883 16.7012 0.160156 17.3501 0.160156 18.1505C0.160156 18.951 0.604883 19.5999 1.15349 19.5999H23.0072C23.5558 19.5999 24.0006 18.951 24.0006 18.1505C24.0006 17.3501 23.5559 16.7012 23.0073 16.7012Z"
                  fill="#003D56"
                />
                <path
                  d="M23.0073 8.2666H1.15349C0.604883 8.2666 0.160156 8.91554 0.160156 9.71598C0.160156 10.5164 0.604883 11.1653 1.15349 11.1653H23.0072C23.5558 11.1653 24.0006 10.5164 24.0006 9.71598C24.0006 8.91554 23.5559 8.2666 23.0073 8.2666Z"
                  fill="#003D56"
                />
                <path
                  d="M22.8471 0H0.993337C0.444727 0 0 0.648886 0 1.44934C0 2.2498 0.444727 2.89869 0.993337 2.89869H22.8471C23.3957 2.89869 23.8404 2.2498 23.8404 1.44934C23.8405 0.648886 23.3957 0 22.8471 0Z"
                  fill="#003D56"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="20"
                viewBox="0 0 24 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.0073 16.7012H1.15349C0.604883 16.7012 0.160156 17.3501 0.160156 18.1505C0.160156 18.951 0.604883 19.5999 1.15349 19.5999H23.0072C23.5558 19.5999 24.0006 18.951 24.0006 18.1505C24.0006 17.3501 23.5559 16.7012 23.0073 16.7012Z"
                  fill="white"
                />
                <path
                  d="M23.0073 8.2666H1.15349C0.604883 8.2666 0.160156 8.91554 0.160156 9.71598C0.160156 10.5164 0.604883 11.1653 1.15349 11.1653H23.0072C23.5558 11.1653 24.0006 10.5164 24.0006 9.71598C24.0006 8.91554 23.5559 8.2666 23.0073 8.2666Z"
                  fill="white"
                />
                <path
                  d="M22.8471 0H0.993337C0.444727 0 0 0.648886 0 1.44934C0 2.2498 0.444727 2.89869 0.993337 2.89869H22.8471C23.3957 2.89869 23.8404 2.2498 23.8404 1.44934C23.8405 0.648886 23.3957 0 22.8471 0Z"
                  fill="white"
                />
              </svg>
            )}
          </a>
          <MobileNavigation
            showNav={showMobileNav}
            items={navItems}
            user={currentUser}
            setShowMobileNav={setShowMobileNav}
          />
        </nav>
      </Container>
    </div>
  );
};

export default Header;
