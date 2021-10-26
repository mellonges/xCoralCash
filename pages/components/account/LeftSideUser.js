import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Arrow, useLayer } from "react-laag";
import { logOut } from "../../../functions/getBackendData";
import styles from "../../../styles/pages/account/left-side/LeftSideUser.module.scss";
import AvatarHolder from "./Avatar";

const LeftSideUser = ({ user }) => {
  const [isOpen, setOpen] = useState(false);
  function close() {
    setOpen(false);
  }

  const router = useRouter();

  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen,
    onOutsideClick: close, // close the menu when the user clicks outside
    onDisappear: close, // close the menu when the menu gets scrolled out of sight
    overflowContainer: false, // keep the menu positioned inside the container
    auto: true, // automatically find the best placement
    placement: "top-start", // we prefer to place the menu "top-end"
    triggerOffset: 12, // keep some distance to the trigger
    containerOffset: 16, // give the menu some room to breath relative to the container
    arrowOffset: 20, // let the arrow have some room to breath also
  });

  return user ? (
    <div className={styles.user}>
      <div
        className="d-flex align-items-center cursor-pointer"
        {...triggerProps}
        onClick={() => setOpen(!isOpen)}
      >
        <div className={styles.userAvatar}>
          <AvatarHolder username={`${user.given_name} ${user.family_name}`} />
        </div>
        <span className={`${styles.userName} d-flex align-items-center`}>
          {user.given_name}
          <svg
            className={styles.toggleIcon}
            width="7"
            height="5"
            viewBox="0 0 7 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.15001 4.63159L6.81188 0.933475C6.93489 0.762689 7 0.59061 7 0.447579C7 0.171055 6.76666 -1.01996e-08 6.37608 -2.72723e-08L0.623013 -2.78747e-07C0.232887 -2.958e-07 9.46207e-07 0.170839 9.34148e-07 0.446716C9.27886e-07 0.589963 0.0651636 0.759293 0.188519 0.930457L2.85033 4.6303C3.02179 4.86823 3.25252 5 3.50031 5C3.74793 5.00005 3.97861 4.8698 4.15001 4.63159Z"
              fill="white"
            />
          </svg>
        </span>
      </div>
      {renderLayer(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              {...layerProps}
              className={styles.userDropdownWrapper}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                stiffness: 300,
                duration: 0.1,
              }}
            >
              <Arrow
                angle={45}
                size={11}
                roundness={0}
                borderWidth={0}
                borderColor="#000"
                backgroundColor="#FFF"
                {...arrowProps}
              />
              <div className={styles.userDropdown}>
                <div className={`${styles.userInfo} d-flex`}>
                  <div className={styles.Avatar}>
                    <AvatarHolder
                      username={`${user.given_name} ${user.family_name}`}
                    />
                  </div>
                  <div className={styles.Info}>
                    <strong className={styles.userName}>
                      {user.given_name}
                    </strong>
                    <span className={styles.email}>{user.email}</span>
                    <Link href="/account/settings">
                      <a className={`${styles.settingBtn} btn btn-primary `}>
                        Settings
                      </a>
                    </Link>
                    <Link href="https://humanbace.tawk.help">
                      <a
                        className={`${styles.settingBtn} btn btn-primary clearfix`}
                        target="_blank"
                        onClick={(e) => {
                          e.preventDefault();
                          const url = "https://humanbace.tawk.help";
                          setOpen(!isOpen);
                          window.open(url, "_blank").focus();
                        }}
                      >
                        Help Center
                      </a>
                    </Link>
                  </div>
                </div>
                <hr className={styles.devider} />
                <a
                  className={styles.LogOut}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    logOut().then((res) => router.push("/"));
                  }}
                >
                  <svg
                    width="22"
                    height="21"
                    viewBox="0 0 22 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.7273 9.80384L17.015 6.09156C16.9236 6.00014 16.8151 5.92763 16.6956 5.87816C16.5762 5.82869 16.4482 5.80322 16.3189 5.80322C16.1897 5.80322 16.0616 5.82869 15.9422 5.87816C15.8228 5.92763 15.7143 6.00014 15.6228 6.09156C15.4382 6.27616 15.3345 6.52654 15.3345 6.78761C15.3345 7.04868 15.4382 7.29906 15.6228 7.48367L17.6548 9.51554H9.90625C9.64518 9.51554 9.3948 9.61925 9.21019 9.80386C9.02559 9.98846 8.92188 10.2388 8.92188 10.4999C8.92188 10.761 9.02559 11.0114 9.21019 11.196C9.3948 11.3806 9.64518 11.4843 9.90625 11.4843H17.6548L15.6228 13.5162C15.4382 13.7008 15.3345 13.9512 15.3345 14.2122C15.3345 14.4733 15.4383 14.7237 15.6229 14.9083C15.8075 15.0929 16.0579 15.1966 16.3189 15.1966C16.58 15.1966 16.8304 15.0929 17.015 14.9083L20.7273 11.196C20.9119 11.0113 21.0156 10.761 21.0156 10.4999C21.0156 10.2388 20.9119 9.98845 20.7273 9.80384Z"
                      fill="#11343F"
                    />
                    <path
                      d="M12.4688 17.0781C12.2077 17.0781 11.9573 17.1818 11.7727 17.3664C11.5881 17.5511 11.4844 17.8014 11.4844 18.0625V18.0469H2.95312V2.95312H11.4844V2.9375C11.4844 3.19857 11.5881 3.44895 11.7727 3.63356C11.9573 3.81816 12.2077 3.92188 12.4688 3.92188C12.7298 3.92188 12.9802 3.81816 13.1648 3.63356C13.3494 3.44895 13.4531 3.19857 13.4531 2.9375V2.625C13.4531 2.40955 13.4107 2.19621 13.3282 1.99716C13.2458 1.79811 13.1249 1.61725 12.9726 1.4649C12.8203 1.31256 12.6394 1.19171 12.4403 1.10926C12.2413 1.02681 12.028 0.984375 11.8125 0.984375H2.625C2.18988 0.984375 1.77258 1.15723 1.4649 1.4649C1.15723 1.77258 0.984375 2.18988 0.984375 2.625V18.375C0.984375 18.8101 1.15723 19.2274 1.4649 19.5351C1.77258 19.8428 2.18988 20.0156 2.625 20.0156H11.8125C12.028 20.0156 12.2413 19.9732 12.4403 19.8907C12.6394 19.8083 12.8203 19.6874 12.9726 19.5351C13.1249 19.3828 13.2458 19.2019 13.3282 19.0028C13.4107 18.8038 13.4531 18.5905 13.4531 18.375V18.0625C13.4531 17.8014 13.3494 17.5511 13.1648 17.3664C12.9802 17.1818 12.7298 17.0781 12.4688 17.0781Z"
                      fill="#11343F"
                    />
                  </svg>
                  Log out
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  ) : null;
};
export default LeftSideUser;
