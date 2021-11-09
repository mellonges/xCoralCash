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
      link: "/docs",
      icon: (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.5 1L1 5.25L9.5 9.5L18 5.25L9.5 1Z" stroke="#658796" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1 13.75L9.5 18L18 13.75" stroke="#658796" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1 9.5L9.5 13.75L18 9.5" stroke="#658796" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      ),
      title: "Docs",
    },
    { MISC: true,
      link: "/",
        icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={styles.strokeIcon}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1L1 6.5L12 12L23 6.5L12 1Z"
            stroke="#658796"
            strokeWidth="1.936"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 17.5L12 23L23 17.5"
            stroke="#658796"
            strokeWidth="1.936"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 12L12 17.5L23 12"
            stroke="#658796"
            strokeWidth="1.936"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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
            <p className={StylesBalance.NameValLeftSidePanel}>xCORAL</p>
            <p className={StylesBalance.ValLeftSidePanel}>
              <CountUp end={xCoralBalance} duration={1} separator={","} />
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
