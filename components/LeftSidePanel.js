import Link from "next/link";
import { useRouter } from "next/router";
import React, {useEffect, useState} from "react";
import Scrollbar from "react-scrollbars-custom";
import styles from "@/styles/pages/account/Layout.module.scss";
import LeftNavigationMobile from "@/components/account/LeftNavigationMobile";
import LeftSideUser from "@/components/account/LeftSideUser";
import Notifications from "@/components/account/Notifications";
import StylesBalance from "../styles/pages/account/left-side/LeftSideBalance.module.scss";
import {useSelector} from "react-redux";
import CountUp from "react-countup";

const LeftSidePanel = () => {
  const router = useRouter();
  const xCoralBalance = useSelector(({store}) => store.xCoralBalance)
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
    // {
    //   link: "/account/prices",
    //   icon: (
    //     <svg
    //       width="19"
    //       height="19"
    //       className={styles.priceIcon}
    //       viewBox="0 0 19 19"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M9.5 1L1 5.25L9.5 9.5L18 5.25L9.5 1Z"
    //         stroke="#658796"
    //         strokeWidth="1.7"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //       <path
    //         d="M1 13.75L9.5 18L18 13.75"
    //         stroke="#658796"
    //         strokeWidth="1.7"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //       <path
    //         d="M1 9.5L9.5 13.75L18 9.5"
    //         stroke="#658796"
    //         strokeWidth="1.7"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //     </svg>
    //   ),
    //   title: "Prices",
    // },
    // {
    //   link: "/account/wallet",
    //   icon: (
    //     <svg
    //       width="10"
    //       height="20"
    //       viewBox="0 0 10 20"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M5 8.83117C3.3781 8.83117 2.06612 7.69369 2.06612 6.28751C2.06612 4.89028 3.3781 3.74384 5 3.74384C6.6219 3.74384 7.93388 4.88133 7.93388 6.28751C7.93388 6.78012 8.39876 7.18316 8.96694 7.18316C9.53512 7.18316 10 6.78012 10 6.28751C10 4.23645 8.34711 2.47201 6.03306 2.0421V0.895656C6.03306 0.403045 5.56818 0 5 0C4.43182 0 3.96694 0.403045 3.96694 0.895656V2.0421C1.27066 2.53471 -0.464877 4.83654 0.113635 7.18316C0.599173 9.18943 2.64463 10.6135 5 10.6225C6.6219 10.6225 7.93388 11.76 7.93388 13.1661C7.93388 14.5723 6.6219 15.7098 5 15.7098C3.3781 15.7098 2.06612 14.5723 2.06612 13.1661C2.06612 12.6735 1.60124 12.2705 1.03306 12.2705C0.464876 12.2705 0 12.6735 0 13.1661C0 15.2082 1.65289 16.9816 3.96694 17.4026V19.1043C3.96694 19.597 4.43182 20 5 20C5.56818 20 6.03306 19.597 6.03306 19.1043V17.4026C8.72934 16.901 10.4545 14.5992 9.88636 12.2615C9.40083 10.2642 7.3657 8.83117 5 8.83117Z"
    //         fill="#658796"
    //       />
    //     </svg>
    //   ),
    //   title: "Wallet",
    // },
    // {
    //   MISC: true,
    //   link: "/account/invite",
    //   title: "Invite friends",
    //   icon: (
    //     <svg
    //       width="21"
    //       height="18"
    //       viewBox="0 0 21 18"
    //       className={styles.priceIcon}
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M14.8788 16.5405L14.8684 14.8173C14.8629 13.9033 14.4945 13.0289 13.8443 12.3865C13.1941 11.7441 12.3154 11.3863 11.4014 11.3918L4.50878 11.4333C3.59477 11.4388 2.72038 11.8072 2.07798 12.4574C1.43557 13.1076 1.07776 13.9864 1.08327 14.9004L1.09365 16.6235"
    //         stroke="#658796"
    //         strokeWidth="1.55093"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //       <path
    //         d="M7.9341 7.96457C9.83743 7.95311 11.3711 6.40086 11.3596 4.49753C11.3482 2.5942 9.7959 1.06054 7.89257 1.07201C5.98924 1.08348 4.45559 2.63573 4.46705 4.53906C4.47852 6.44239 6.03077 7.97604 7.9341 7.96457Z"
    //         stroke="#658796"
    //         strokeWidth="1.55093"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //       <path
    //         d="M20.0473 16.5096L20.0369 14.7865C20.0318 14.0229 19.7731 13.2827 19.3017 12.682C18.8302 12.0813 18.1726 11.6542 17.4321 11.4678"
    //         stroke="#658796"
    //         strokeWidth="1.55093"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //       <path
    //         d="M13.9243 1.14941C14.6668 1.33475 15.3264 1.76192 15.7993 2.36358C16.2721 2.96524 16.5313 3.70716 16.5359 4.47239C16.5405 5.23761 16.2903 5.9826 15.8247 6.58991C15.3592 7.19723 14.7047 7.63232 13.9645 7.82659"
    //         stroke="#658796"
    //         strokeWidth="1.55093"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //     </svg>
    //   ),
    // },


    {  MISC: true,
      link: "docs.xcoral.cash",
      icon: (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.5 1L1 5.25L9.5 9.5L18 5.25L9.5 1Z" stroke="#658796" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M1 13.75L9.5 18L18 13.75" stroke="#658796" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M1 9.5L9.5 13.75L18 9.5" stroke="#658796" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      ),
      title: "Docs",
    },
    { MISC: true,
      link: "/",
        icon: (
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <rect width="17" height="17" fill="url(#pattern0)"/>
              <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlinkHref="#image0_2376:16517" transform="scale(0.00390625)"/>
                </pattern>
                <image id="image0_2376:16517" width="256" height="256" xlinkHref="data:image/png;base64,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"/>
              </defs>
            </svg>


      ), title: "Add xCORAL",

    },



    // {
    //   MISC: true,
    //   link: "/account/MISC",
    //   title: "MISC",
    //   icon: (
    //     <svg
    //       width="22"
    //       height="16"
    //       viewBox="0 0 22 16"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M11.5871 1.23006C11.4283 1.04698 11.1979 0.941818 10.9556 0.941818C10.7132 0.941818 10.4828 1.04698 10.324 1.23006L6.35972 5.8008L2.14373 3.74835L2.14372 3.74835C1.84475 3.60285 1.48804 3.64828 1.23516 3.86409C0.982284 4.07989 0.881302 4.42506 0.97798 4.74314L0.977981 4.74314L3.93354 14.4654C4.04058 14.8175 4.36531 15.0582 4.73334 15.0582H17.1778C17.5458 15.0582 17.8705 14.8175 17.9776 14.4654L20.9331 4.74318C21.0298 4.4251 20.9288 4.07993 20.6759 3.86413C20.4231 3.64832 20.0664 3.60285 19.7674 3.74839L19.7929 3.8007L19.7674 3.74839L15.5514 5.80084L11.5871 1.23006ZM11.5871 1.23006L11.5431 1.26818L11.5871 1.23006L11.5871 1.23006ZM5.35292 13.3863L3.13505 6.0905L6.20486 7.58498L6.20487 7.58499C6.54526 7.75067 6.9543 7.66699 7.20229 7.3811L7.15834 7.34297L7.20229 7.38109L10.9556 3.05366L14.7089 7.38109C14.9568 7.66704 15.366 7.75063 15.7063 7.58499L18.7761 6.0905L16.5581 13.3863H5.35292Z"
    //         fill="#658796"
    //         stroke="#658796"
    //         strokeWidth="0.116364"
    //       />
    //     </svg>
    //   ),
    // },
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
              className={`${styles.top} d-flex justify-content-between align-items-center`}
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
                        className={`${styles.navLink} ${
                          isActive(navItem.link) ? styles.active : ""
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
                  {navigation
                    .filter((navItem) => navItem.MISC)
                    .map((navItem, key) => (
                      <li key={key} className={styles.listItem}>
                        <Link href={navItem.link}>
                          <a
                            className={`${styles.navLink} ${
                              isActive(navItem.link) ? styles.active : ""
                            }`}
                          >
                            <span className={styles.navIcon}>
                              {navItem.icon}
                            </span>
                            {navItem.title}
                          </a>
                        </Link>
                      </li>
                    ))}
                </ul>
              </>
            ) : null}
          </div>
          {xCoralBalance === null ? null : <div className={StylesBalance.balanceleftsidepanel}>
          <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14.9702" cy="11" r="11" fill="#007585" fill-opacity="0.25"/>
            <circle cx="11" cy="11" r="11" fill="#007585"/>
            <path d="M10.78 11.592C9.596 13.264 9.004 14.404 9.004 15.012L6.832 15V14.736C7.32 14.472 7.84 13.952 8.392 13.176C9.232 11.984 9.8 11.168 10.096 10.728L9.112 9.228C8.216 7.852 7.536 7.064 7.072 6.864V6.6L9.784 6.612V6.876C9.784 7.148 9.872 7.46 10.048 7.812C10.248 8.212 10.608 8.796 11.128 9.564C12.104 8.18 12.592 7.192 12.592 6.6H14.704V6.864C14.456 6.992 14.224 7.168 14.008 7.392C13.8 7.616 13.452 8.06 12.964 8.724C12.476 9.38 12.084 9.936 11.788 10.392C13.156 12.4 13.996 13.596 14.308 13.98C14.628 14.356 14.908 14.608 15.148 14.736V15H12.46V14.736C12.46 14.608 12.412 14.452 12.316 14.268C12.228 14.084 12.152 13.936 12.088 13.824C12.032 13.704 11.98 13.604 11.932 13.524C11.884 13.444 11.82 13.34 11.74 13.212C11.66 13.076 11.6 12.972 11.56 12.9L10.78 11.592Z" fill="white"/>
          </svg>
            <p className={StylesBalance.NameValLeftSidePanel}>
              xCORAL
              <p className={StylesBalance.ValLeftSidePanel}>
                {xCoralBalance}
              </p>
            </p>
          </div> }
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
