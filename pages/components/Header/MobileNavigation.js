import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import styles from "../../../styles/components/Header/MobileNavigation.module.scss";

const MobileNavigation = ({ items, showNav, setShowMobileNav, user }) => {
  return (
    <AnimatePresence>
      {showNav ? (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            left: 700,
          }}
          transition={{
            type: "spring",
            duration: 0.5,
          }}
          className={`${styles.mobileNavigation}`}
        >
          <div className={`${styles.top} d-flex align-items-center`}>
            <Link href="/">
              <a className={styles.logotype}>
                xcoral.<span>cash</span>
              </a>
            </Link>
            <div
              className={`${styles.closeNav} ml-auto cursor-pointer`}
              onClick={() => setShowMobileNav(false)}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2298 9.49074L18.6208 2.09946C19.1018 1.61869 19.1018 0.841351 18.6208 0.360579C18.1401 -0.120193 17.3627 -0.120193 16.882 0.360579L9.49069 7.75186L2.09963 0.360579C1.61864 -0.120193 0.84152 -0.120193 0.360748 0.360579C-0.120249 0.841351 -0.120249 1.61869 0.360748 2.09946L7.7518 9.49074L0.360748 16.882C-0.120249 17.3628 -0.120249 18.1401 0.360748 18.6209C0.600346 18.8607 0.915381 18.9812 1.23019 18.9812C1.545 18.9812 1.85981 18.8607 2.09963 18.6209L9.49069 11.2296L16.882 18.6209C17.1218 18.8607 17.4366 18.9812 17.7514 18.9812C18.0662 18.9812 18.381 18.8607 18.6208 18.6209C19.1018 18.1401 19.1018 17.3628 18.6208 16.882L11.2298 9.49074Z"
                  fill="#11343F"
                />
              </svg>
            </div>
          </div>
          <div className={styles.registerButtons}>
            {/*{!user ? (*/}
            {/*  <>*/}
            {/*    <Link href="/signup">*/}
            {/*      <a className={`${styles.getStarted} btn btn-primary`}>*/}
            {/*        Get started*/}
            {/*      </a>*/}
            {/*    </Link>*/}
            {/*    <Link href="/signin">*/}
            {/*      <a className={styles.logIn}>Sign in</a>*/}
            {/*    </Link>*/}
            {/*  </>*/}
            {/*) : (*/}
              <Link href="/dashboard">
                <a className={`${styles.getStarted} btn btn-primary`}>Launch App</a>
              </Link>
            {/*)}*/}
          </div>
          <div className={styles.navigation}>
                  <a href="https://docs.xcoral.cash" target="_blank" className={`${styles.navItem} btn btn-secondary`}>
                    Docs
                  </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default MobileNavigation;
