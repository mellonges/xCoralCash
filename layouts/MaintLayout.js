import Head from "next/head";
import LeftSidePanel from "../components/LeftSidePanel";
import styles from "../styles/pages/account/Layout.module.scss";
import React, { useEffect } from "react";
import { useState } from "react";
import BottomNavigationMobile from "../pages/components/account/BottomNavigationMobile";
import TagManager from "react-gtm-module";
import Navbar from "../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Onboard from "bnc-onboard";
import Web3 from "web3";


const tagManagerArgs = {
  gtmId: "GTM-56RM2D3",
};
if (typeof document !== "undefined") TagManager.initialize(tagManagerArgs);

const MainLayout = ({ children, pageTitle = "Dashboard" }) => {

  const [showMobileNav, setShowMobileNav] = useState(false);

  const toggle = () => setShowMobileNav(!showMobileNav);

  return (
    <>
      <div className={styles.AccountWrapper}>
        <Head>
          <title>{pageTitle} | xCORAL</title>
        </Head>
        <div className={styles.contentInner}>{children}</div>
        <Navbar toggle={toggle} />
        <LeftSidePanel
        // user={user}
        // isOpen={showMobileNav}
        // toggle={toggle}
        // setShowMobileNav={setShowMobileNav}
        />
        <BottomNavigationMobile />
      </div>
      {/*<AuthFooter />*/}
    </>
  );
};

export default MainLayout;
