import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Scrollbar from "react-scrollbars-custom";
import styles from "@/styles/pages/account/Layout.module.scss";
import StylesBalance from "../styles/pages/account/left-side/LeftSideBalance.module.scss";
import { useSelector } from "react-redux";
import addTokenForMetaMask from "@/functions/addTokenForMetaMask";
const LeftSidePanel = () => {
  const router = useRouter();
  const xCoralBalance = useSelector(({ store }) => store.xCoralBalance)
  const isActive = (link) => {
    return router.pathname.match(new RegExp(`^${link}$`, "gm"));
  };
  const navigation = [
    {
      link: "/dashboard",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.2467 5.90785L10.3756 0.492882C9.66358 -0.163809 8.53945 -0.164779 7.82636 0.492882L1.95526 5.90785C1.40374 6.41651 1.00098 7.33177 1.00098 8.07988V16.2024C1.00098 17.195 1.81068 18 2.80112 18H7.21533C7.76761 18 8.21533 17.5522 8.21533 17V13.1363C8.21533 12.8602 8.43919 12.6363 8.71533 12.6363H9.50576C9.78191 12.6363 10.0058 12.8602 10.0058 13.1363V17C10.0058 17.5522 10.4535 18 11.0058 18H15.3979C16.3927 18 17.2009 17.197 17.2009 16.2024V8.07988C17.201 7.3316 16.7993 6.41752 16.2467 5.90785ZM15.3984 15.701C15.3982 15.9769 15.1744 16.2 14.8985 16.2H12.3058C12.0297 16.2 11.8058 15.9761 11.8058 15.7V11.3364C11.8058 11.0602 11.582 10.8364 11.3058 10.8364H6.91536C6.63922 10.8364 6.41536 11.0602 6.41536 11.3364V15.7001C6.41536 15.9762 6.19085 16.2001 5.91476 16.2002C4.67108 16.2006 3.79996 16.2013 3.30139 16.2018C3.02498 16.2021 2.80099 15.9781 2.80099 15.7017V8.07988C2.80099 7.83548 2.99277 7.3996 3.17561 7.23098L9.04672 1.81605C9.06996 1.79462 9.1321 1.79466 9.15526 1.81605L15.0264 7.23098C15.2101 7.4004 15.401 7.83494 15.401 8.07988C15.4008 12.1513 15.3992 14.6917 15.3984 15.701Z"
            fill="#658796"
          />
        </svg>
      ),
      title: "Dashboard",
    },
    {
      link: "/futures",
      icon: (
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.9967 18.3611C18.5294 18.3611 19.7977 17.2081 19.9799 15.7238C19.9945 15.6636 20.0023 15.6007 20.0023 15.5359V15.3555V6.56992C20.0023 4.91253 18.6541 3.5643 16.9967 3.5643H13.9484V3.54297C13.9484 1.88557 12.6002 0.537344 10.9428 0.537344H9.98301C8.32561 0.537344 6.97738 1.88557 6.97738 3.54297V3.5643H4.00293C2.34553 3.5643 0.997305 4.91253 0.997305 6.56992V15.3555C0.997305 17.0129 2.34553 18.3611 4.00293 18.3611H16.9967ZM17.5761 9.64033C17.8903 9.38687 18.1715 9.13352 18.4207 8.89015V15.3555C18.4207 16.1406 17.7818 16.7795 16.9967 16.7795H4.00293C3.2178 16.7795 2.57887 16.1406 2.57887 15.3555V8.84151C2.84976 9.1013 3.15833 9.37394 3.50502 9.64637C5.86515 11.502 8.20681 12.4509 10.5493 12.459C12.8919 12.4671 15.2278 11.5341 17.5761 9.64034L17.5432 9.59947L17.5761 9.64033ZM4.52486 8.4362L4.49262 8.47763L4.52486 8.43619C3.4969 7.63637 2.84333 6.82531 2.58225 6.47235C2.63264 5.73258 3.25058 5.14586 4.00293 5.14586H16.9967C17.7523 5.14586 18.3725 5.73761 18.4179 6.48196C17.8526 7.28444 15.2669 10.5411 10.5736 10.5411C8.35492 10.5411 6.32021 9.83325 4.52486 8.4362ZM8.55894 3.54297C8.55894 2.75784 9.19787 2.11891 9.98301 2.11891H10.9428C11.7279 2.11891 12.3668 2.75784 12.3668 3.54297V3.5643H8.55894V3.54297Z"
            fill="#658796"
            stroke="#658796"
            strokeWidth="0.105"
          />
        </svg>
      ),
      title: "Futures",
    },


    {
      MISC: true,
      link: "docs.xcoral.cash",
      icon: (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 1L1 5.25L9.5 9.5L18 5.25L9.5 1Z" stroke="#658796" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 13.75L9.5 18L18 13.75" stroke="#658796" strokeWidth="1.7" strokeLinecap="round"
            strokeLinejoin="round" />
          <path d="M1 9.5L9.5 13.75L18 9.5" stroke="#658796" strokeWidth="1.7" strokeLinecap="round"
            strokeLinejoin="round" />
        </svg>

      ),
      title: "Docs",
    },
    {
      MISC: true,
      link: "/",
      icon: (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink">
          <rect width="17" height="17" fill="url(#pattern0)" />
          <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlinkHref="#image0_2376:16517" transform="scale(0.00390625)" />
            </pattern>
          </defs>
        </svg>


      ), title: "Add xCORAL",

    },

  ];

  return (
    <>
      <div
        className={`${styles.leftSide} left-side-account flex-column d-none d-lg-flex`}
      >
        <Scrollbar
          className={`${styles.scrollBarWrapper} h-100 w-100`}
          scrollbarWidth={4}
          removeTracksWhenNotUsed={true}
        >
          <div className={styles.leftSideNav}>
            <div
              className={`${styles.top}  tracking-in-expand  d-flex justify-content-between align-items-center`}
            >
              <Link href="/">
                <a className={styles.logotype}>
                  xcoral.<span>cash</span>
                </a>
              </Link>

              {/* <Notifications /> */}
            </div>
            <ul className={styles.listNavigation}>
              {navigation
                .filter((navItem) => !navItem.MISC)
                .map((navItem, key) => (
                  <li key={key} className={styles.listItem}>
                    <Link href={navItem.link}>
                      <a
                        className={`${styles.navLink} ${isActive(navItem.link) ? styles.active : ""
                          }  `}
                      >
                        <span className={styles.navIcon}>{navItem.icon}</span>
                        {navItem.title}
                      </a>
                    </Link>
                  </li>
                ))}
            </ul>
            {navigation.filter((navItem) => navItem.MISC).length ? (
              <>
                <div className={styles.navTitle}>MISC</div>
                <ul className={styles.listNavigation}>

                  <li className={styles.listItem}>
                    {/*<Link>*/}
                    <a href="https://docs.xcoral.cash" target="_blank" className={styles.navLink}>
                      <span className={styles.navIcon}>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.5 1L1 5.25L9.5 9.5L18 5.25L9.5 1Z" stroke="#658796" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M1 13.75L9.5 18L18 13.75" stroke="#658796" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M1 9.5L9.5 13.75L18 9.5" stroke="#658796" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg></span>
                      Docs
                    </a>
                  </li>
                  <li className={styles.listItem}>
                    <a href="#" onClick={() => addTokenForMetaMask()} className={styles.navLink}>
                      <span className={styles.navIcon}>
                        {/* ебаное svg */}
                        <img src="SVG/add.svg" alt=""/>
                        {/* ебаное svg */}
                      </span>
                      Add xCORAL
                    </a>
                  </li>

                </ul>
              </>
            ) : null}
          </div>
          {xCoralBalance === null ? null : <div className={StylesBalance.balanceleftsidepanel}>
            <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14.9702" cy="11" r="11" fill="#007585" fillOpacity="0.25" />
              <circle cx="11" cy="11" r="11" fill="#007585" />
              <path
                d="M10.78 11.592C9.596 13.264 9.004 14.404 9.004 15.012L6.832 15V14.736C7.32 14.472 7.84 13.952 8.392 13.176C9.232 11.984 9.8 11.168 10.096 10.728L9.112 9.228C8.216 7.852 7.536 7.064 7.072 6.864V6.6L9.784 6.612V6.876C9.784 7.148 9.872 7.46 10.048 7.812C10.248 8.212 10.608 8.796 11.128 9.564C12.104 8.18 12.592 7.192 12.592 6.6H14.704V6.864C14.456 6.992 14.224 7.168 14.008 7.392C13.8 7.616 13.452 8.06 12.964 8.724C12.476 9.38 12.084 9.936 11.788 10.392C13.156 12.4 13.996 13.596 14.308 13.98C14.628 14.356 14.908 14.608 15.148 14.736V15H12.46V14.736C12.46 14.608 12.412 14.452 12.316 14.268C12.228 14.084 12.152 13.936 12.088 13.824C12.032 13.704 11.98 13.604 11.932 13.524C11.884 13.444 11.82 13.34 11.74 13.212C11.66 13.076 11.6 12.972 11.56 12.9L10.78 11.592Z"
                fill="white" />
            </svg>
            <p className={StylesBalance.NameValLeftSidePanel}>
              xCORAL
              <p className={StylesBalance.ValLeftSidePanel}>
                {xCoralBalance}
              </p>
            </p>
          </div>}
        </Scrollbar>
        {/*<LeftSideUser user={user} />*/}
      </div>
      {/*<LeftNavigationMobile*/}
      {/*  user={user}*/}
      {/*  isOpen={isOpen}*/}
      {/*  toggle={toggle}*/}
      {/*  setIsOpen={setShowMobileNav}*/}
      {/*/>*/}
    </>
  );
};
export default LeftSidePanel;
