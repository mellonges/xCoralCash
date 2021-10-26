import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Scrollbar from "react-scrollbars-custom";
import { Button } from "reactstrap";
import { logOut } from "../../../functions/getBackendData";
import styles from "../../../styles/pages/account/left-side/LeftNavigationMobile.module.scss";
import AvatarHolder from "./Avatar";

const LeftNavigationMobile = ({ user, isOpen, toggle, setIsOpen }) => {
  const router = useRouter();
  useEffect(() => {
    if (isOpen) {
      document.documentElement.className =
        document.documentElement.className + "locked";
    }
    return () => {
      document.documentElement.className =
        document.documentElement.className.replace("locked", "");
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.documentElement.className =
        document.documentElement.className.replace("locked", "");
    };
  }, []);

  return (
    <div
      className={`backDrop-left-mobile-nav position-fixed h-100 w-100 ${
        isOpen ? "d-block" : "d-none"
      }`}
      onClick={() => toggle()}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={styles.mobileLeftNavWrapper}
        initial={{
          x: "-100%",
          opacity: 0,
        }}
        animate={
          isOpen
            ? {
                x: 0,
                opacity: 1,
              }
            : {
                x: "-100%",
                opaci: 0,
              }
        }
        transition={{
          type: "keyframes",
        }}
      >
        <Scrollbar className="h-100 w-100">
          <div className="h-100 d-flex flex-column">
            <div
              className={`${styles.user} d-flex align-items-center cursor-pointer`}
            >
              <div className={styles.userAvatar}>
                <AvatarHolder username={user && user.given_name} />
              </div>
              <strong className={`${styles.userName} mr-auto text-capitalize`}>
                {user && user.given_name}
              </strong>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
              >
                <svg
                  width="19"
                  height="19"
                  className="ml-auto"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.2407 9.50014L18.6389 2.10154C19.1204 1.6203 19.1204 0.842184 18.6389 0.360936C18.1577 -0.120312 17.3796 -0.120312 16.8983 0.360936L9.49989 7.75953L2.10167 0.360936C1.62021 -0.120312 0.842336 -0.120312 0.361098 0.360936C-0.120366 0.842184 -0.120366 1.6203 0.361098 2.10154L7.75932 9.50014L0.361098 16.8987C-0.120366 17.38 -0.120366 18.1581 0.361098 18.6393C0.600928 18.8794 0.916268 19 1.23138 19C1.5465 19 1.86161 18.8794 2.10167 18.6393L9.49989 11.2407L16.8983 18.6393C17.1384 18.8794 17.4535 19 17.7686 19C18.0837 19 18.3988 18.8794 18.6389 18.6393C19.1204 18.1581 19.1204 17.38 18.6389 16.8987L11.2407 9.50014Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
            <div className={styles.settingsBtn}>
              <Button
                className={styles.btn}
                color="primary"
                onClick={() => router.push("/account/settings")}
              >
                Settings
              </Button>
              <Link href="https://humanbace.tawk.help">
                <a target="_blank">
                  <Button className={styles.btn} color="primary">
                    Help Center
                  </Button>
                </a>
              </Link>
            </div>
            <div
              className={`${styles.logOutWrapper} mt-auto d-flex align-items-center cursor-pointer`}
              onClick={() =>
                logOut().then(() => {
                  router.push("/");
                })
              }
            >
              <svg
                width="21"
                className={styles.icon}
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.743 8.81947L16.0306 5.10718C15.9392 5.01577 15.8307 4.94326 15.7113 4.89378C15.5918 4.84431 15.4638 4.81885 15.3345 4.81885C15.2053 4.81885 15.0773 4.84431 14.9578 4.89378C14.8384 4.94326 14.7299 5.01577 14.6385 5.10718C14.4539 5.29179 14.3502 5.54217 14.3502 5.80324C14.3502 6.06431 14.4539 6.31469 14.6385 6.49929L16.6704 8.53117H8.92188C8.6608 8.53117 8.41042 8.63488 8.22582 8.81948C8.04121 9.00409 7.9375 9.25447 7.9375 9.51554C7.9375 9.77661 8.04121 10.027 8.22582 10.2116C8.41042 10.3962 8.6608 10.4999 8.92188 10.4999H16.6704L14.6385 12.5318C14.4539 12.7164 14.3502 12.9668 14.3502 13.2279C14.3502 13.4889 14.4539 13.7393 14.6385 13.9239C14.8231 14.1085 15.0735 14.2122 15.3346 14.2122C15.5956 14.2122 15.846 14.1085 16.0306 13.9239L19.743 10.2116C19.9276 10.027 20.0313 9.77659 20.0313 9.51552C20.0313 9.25445 19.9276 9.00407 19.743 8.81947Z"
                  fill="#658796"
                />
                <path
                  d="M11.4844 16.0938C11.2233 16.0938 10.9729 16.1975 10.7883 16.3821C10.6037 16.5667 10.5 16.8171 10.5 17.0781V17.0625H1.96875V1.96875H10.5V1.95312C10.5 2.2142 10.6037 2.46458 10.7883 2.64918C10.9729 2.83379 11.2233 2.9375 11.4844 2.9375C11.7454 2.9375 11.9958 2.83379 12.1804 2.64918C12.365 2.46458 12.4688 2.2142 12.4688 1.95312V1.64062C12.4688 1.42518 12.4263 1.21183 12.3439 1.01278C12.2614 0.813735 12.1406 0.632874 11.9882 0.480528C11.8359 0.328182 11.655 0.207334 11.456 0.124885C11.2569 0.042436 11.0436 0 10.8281 0H1.64062C1.2055 0 0.788205 0.172851 0.480528 0.480528C0.172851 0.788205 0 1.2055 0 1.64062V17.3906C0 17.8257 0.172851 18.243 0.480528 18.5507C0.788205 18.8584 1.2055 19.0312 1.64062 19.0312H10.8281C11.0436 19.0312 11.2569 18.9888 11.456 18.9064C11.655 18.8239 11.8359 18.7031 11.9882 18.5507C12.1406 18.3984 12.2614 18.2175 12.3439 18.0185C12.4263 17.8194 12.4688 17.6061 12.4688 17.3906V17.0781C12.4688 16.8171 12.365 16.5667 12.1804 16.3821C11.9958 16.1975 11.7454 16.0938 11.4844 16.0938Z"
                  fill="#658796"
                />
              </svg>
              <span>Log out</span>
            </div>
          </div>
        </Scrollbar>
      </motion.div>
    </div>
  );
};

export default LeftNavigationMobile;
