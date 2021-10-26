import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Arrow, useLayer } from "react-laag";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  changeUserAttributes,
  getCurrentUserInfo,
  getUserData,
} from "../../../functions/getBackendData";
import styles from "../../../styles/pages/account/left-side/Notifications.module.scss";
import NotificationItem from "./NotificationItem";
import moment from "moment";
import NotificationsModalMobile from "./modals/NotificationsModalMobile";
import { Button } from "reactstrap";

const Notifications = ({ color = "dark" }) => {
  const [haveNewNotifications, setHaveNewNotifications] = useState();

  const [notifications, setNotifications] = useState();
  const [hasMore, setHasMore] = useState(true);

  const [isOpen, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  const [loading, setLoading] = useState(false);

  const toggleMobileModal = () => setOpenMobile(!openMobile);

  function close() {
    setOpen(false);
  }

  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen,
    onOutsideClick: close, // close the menu when the user clicks outside
    onDisappear: close, // close the menu when the menu gets scrolled out of sight

    placement: "right-start", // we prefer to place the menu "top-end"
    triggerOffset: 18, // keep some distance to the trigger
    containerOffset: 16, // give the menu some room to breath relative to the container
    arrowOffset: 0, // let the arrow have some room to breath also
  });

  useEffect(() => {
    getCurrentUserInfo().then((res) =>
      setHaveNewNotifications(+res.attributes["custom:notifications_unread"])
    );
  }, []);

  useEffect(() => {
    if (isOpen) loadNotifications();
    else setNotifications();
  }, [isOpen]);

  useEffect(() => {
    if (openMobile) loadNotifications();
  }, [openMobile]);

  const loadNotifications = () => {
    setLoading(true);
    getUserData([
      {
        type: "notifications",
        params: {
          lastNotificationDate:
            notifications && notifications.length
              ? notifications.slice(-1).pop().timestamp
              : moment().unix(),
        },
      },
    ])
      .then((res) => res.data.payload.processedData[0])
      .then((res) => {
        setHasMore(res.hasMore);
        if (res.notifications.length) {
          if (notifications)
            setNotifications([...notifications, ...res.notifications]);
          else {
            setNotifications(res.notifications);
            markNotificationsAsRead();
          }
        } else {
          if (!notifications) setNotifications([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setNotifications();
      })
      .finally(() => setLoading(false));
  };

  const markNotificationsAsRead = () => {
    if (haveNewNotifications)
      changeUserAttributes({
        "custom:notifications_unread": "0",
      })
        .then((res) => setHaveNewNotifications(false))
        .catch((error) => console.error(error));
  };

  return (
    <div className={styles.notificationsWrapper}>
      <div
        className={`${styles.notificationBtn} d-block d-lg-none ml-auto position-relative cursor-pointer`}
        onClick={() => setOpenMobile(!openMobile)}
      >
        {haveNewNotifications ? (
          <div className={styles.newNotifications}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="6"
                cy="6"
                r="5.28462"
                fill="#FF2828"
                stroke="white"
                strokeWidth="1.43077"
              />
            </svg>
          </div>
        ) : null}
        {color === "dark" ? (
          <svg
            width="17"
            height="20"
            viewBox="0 0 17 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.50127 19.0498C9.54627 19.0498 10.4013 18.1948 10.4013 17.1498H6.60127C6.60127 18.1948 7.45627 19.0498 8.50127 19.0498ZM14.6763 13.3498V8.12481C14.6763 5.1798 12.6813 2.8048 9.92627 2.1398V1.4748C9.92627 0.714805 9.26127 0.0498047 8.50127 0.0498047C7.74127 0.0498047 7.07627 0.714805 7.07627 1.4748V2.1398C4.32127 2.8048 2.32627 5.1798 2.32627 8.12481V13.3498L0.42627 15.2498V16.1998H16.5763V15.2498L14.6763 13.3498ZM12.7763 14.2998H4.22627V8.12481C4.22627 5.7498 6.12627 3.8498 8.50127 3.8498C10.8763 3.8498 12.7763 5.7498 12.7763 8.12481V14.2998Z"
              fill="#658796"
            />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M8.62236 18C9.57068 18 10.3466 17.2241 10.3466 16.2758H6.89814C6.89814 17.2241 7.67404 18 8.62236 18ZM14.2261 12.8273V8.08574C14.2261 5.4132 12.4156 3.25793 9.91553 2.65445V2.05098C9.91553 1.36129 9.31205 0.757812 8.62236 0.757812C7.93267 0.757812 7.3292 1.36129 7.3292 2.05098V2.65445C4.82908 3.25793 3.01865 5.4132 3.01865 8.08574V12.8273L1.29443 14.5516V15.4137H15.9503V14.5516L14.2261 12.8273ZM12.5019 13.6895H4.74287V8.08574C4.74287 5.93047 6.46709 4.20625 8.62236 4.20625C10.7776 4.20625 12.5019 5.93047 12.5019 8.08574V13.6895Z"
                fill="#8AAAB4"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect
                  width="17.2422"
                  height="17.2422"
                  fill="white"
                  transform="translate(0 0.757812)"
                />
              </clipPath>
            </defs>
          </svg>
        )}
      </div>
      <div
        className={`${styles.notificationBtn} ${
          isOpen ? styles.active : ""
        } d-none d-lg-block ml-auto position-relative cursor-pointer`}
        {...triggerProps}
        onClick={() => setOpen(!isOpen)}
      >
        {haveNewNotifications ? (
          <div className={styles.newNotifications}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="7"
                cy="7"
                r="6.16538"
                fill="#FF2828"
                stroke="#03212E"
                strokeWidth="1.66923"
              />
            </svg>
          </div>
        ) : null}
        {color === "dark" ? (
          <svg
            width="17"
            height="20"
            viewBox="0 0 17 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.50127 19.0498C9.54627 19.0498 10.4013 18.1948 10.4013 17.1498H6.60127C6.60127 18.1948 7.45627 19.0498 8.50127 19.0498ZM14.6763 13.3498V8.12481C14.6763 5.1798 12.6813 2.8048 9.92627 2.1398V1.4748C9.92627 0.714805 9.26127 0.0498047 8.50127 0.0498047C7.74127 0.0498047 7.07627 0.714805 7.07627 1.4748V2.1398C4.32127 2.8048 2.32627 5.1798 2.32627 8.12481V13.3498L0.42627 15.2498V16.1998H16.5763V15.2498L14.6763 13.3498ZM12.7763 14.2998H4.22627V8.12481C4.22627 5.7498 6.12627 3.8498 8.50127 3.8498C10.8763 3.8498 12.7763 5.7498 12.7763 8.12481V14.2998Z"
              fill="#658796"
            />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M8.62236 18C9.57068 18 10.3466 17.2241 10.3466 16.2758H6.89814C6.89814 17.2241 7.67404 18 8.62236 18ZM14.2261 12.8273V8.08574C14.2261 5.4132 12.4156 3.25793 9.91553 2.65445V2.05098C9.91553 1.36129 9.31205 0.757812 8.62236 0.757812C7.93267 0.757812 7.3292 1.36129 7.3292 2.05098V2.65445C4.82908 3.25793 3.01865 5.4132 3.01865 8.08574V12.8273L1.29443 14.5516V15.4137H15.9503V14.5516L14.2261 12.8273ZM12.5019 13.6895H4.74287V8.08574C4.74287 5.93047 6.46709 4.20625 8.62236 4.20625C10.7776 4.20625 12.5019 5.93047 12.5019 8.08574V13.6895Z"
                fill="#8AAAB4"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect
                  width="17.2422"
                  height="17.2422"
                  fill="white"
                  transform="translate(0 0.757812)"
                />
              </clipPath>
            </defs>
          </svg>
        )}
      </div>
      {renderLayer(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              {...layerProps}
              className={`${styles.notificationsDropdownWrapper} d-none d-lg-block`}
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
                size={8}
                roundness={0}
                borderWidth={0}
                borderColor="#000"
                backgroundColor="#FFF"
                {...arrowProps}
              />
              <div className={styles.notificationsDropdown}>
                {!notifications ? (
                  <div className={styles.loadingWrapper}>
                    <div className={styles.ldsRing}>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                ) : notifications && notifications.length ? (
                  <>
                    <div className={styles.heading}>Notifications</div>
                    <div
                      className={styles.content}
                      id="NotificationsContentScrollable"
                    >
                      <InfiniteScroll
                        className={styles.notificationItems}
                        hasMore={hasMore}
                        next={loadNotifications}
                        dataLength={notifications.length}
                        scrollableTarget="NotificationsContentScrollable"
                        loader={
                          <div className={styles.loadingWrapperMin}>
                            <div className={styles.ldsRing}>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                            </div>
                          </div>
                        }
                      >
                        {notifications.map((notif, i) => (
                          <NotificationItem notification={notif} key={i} />
                        ))}
                      </InfiniteScroll>
                    </div>
                  </>
                ) : (
                  <div
                    className={`${styles.noNotificationsHolder} d-flex flex-column align-items-center justify-content-center`}
                  >
                    <div className={styles.Icon}>
                      <svg
                        width="29"
                        height="23"
                        viewBox="0 0 29 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5 2.125L2 8.375L14.5 14.625L27 8.375L14.5 2.125Z"
                          stroke="#678086"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 14.625L14.5 20.875L27 14.625"
                          stroke="#678086"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <strong className={styles.name}>
                      You have no notifications
                    </strong>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      <NotificationsModalMobile
        isOpen={openMobile}
        toggle={toggleMobileModal}
        afterClose={() => setNotifications()}
        content={
          !notifications ? (
            <div className={styles.loadingWrapper}>
              <div className={styles.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : notifications && notifications.length ? (
            <>
              <div id="scrollableContent" className={styles.scrollableContent}>
                {notifications.map((notif, i) => (
                  <NotificationItem notification={notif} key={i} />
                ))}
              </div>
              {hasMore ? (
                <Button
                  color="primary"
                  onClick={() => loadNotifications()}
                  disabled={loading}
                  className={`${styles.loadMoreNotificationsMobile} d-flex align-items-center justify-content-center`}
                >
                  {loading ? (
                    <>
                      <span>Loading... </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${styles.loadingCircleIcon} ml-2`}
                        width="200px"
                        height="200px"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          fill="none"
                          stroke="#003d56"
                          strokeWidth="10"
                          r="35"
                          strokeDasharray="164.93361431346415 56.97787143782138"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            repeatCount="indefinite"
                            dur="0.9345794392523364s"
                            values="0 50 50;360 50 50"
                            keyTimes="0;1"
                          ></animateTransform>
                        </circle>
                      </svg>
                    </>
                  ) : (
                    "Older notifications"
                  )}
                </Button>
              ) : null}
            </>
          ) : (
            <div
              className={`${styles.noNotificationsHolder} d-flex flex-column align-items-center justify-content-center`}
            >
              <div className={styles.Icon}>
                <svg
                  width="29"
                  height="23"
                  viewBox="0 0 29 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.5 2.125L2 8.375L14.5 14.625L27 8.375L14.5 2.125Z"
                    stroke="#678086"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 14.625L14.5 20.875L27 14.625"
                    stroke="#678086"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <strong className={styles.name}>You have no notifications</strong>
              <span className={styles.descr}>
                Start building your portfolio
              </span>
            </div>
          )
        }
      />
    </div>
  );
};
export default Notifications;
