import React, { useEffect, useState } from "react";
import styles from "../../../styles/components/Account/UncompletedTasks.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "reactstrap";
import { useRouter } from "next/router";

const UncompletedTasks = ({ user }) => {
  const [activeTask, setActiveTask] = useState();
  const [showPopup, setShowPopup] = useState(true);
  const router = useRouter();

  const openTradeModal = () => {};

  let tasks;

  if (user && user.data)
    tasks = [
      {
        icon: (
          <svg
            width="27"
            height="24"
            viewBox="0 0 27 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.99989 7.99982C14.1507 7.99982 17.9994 5.96362 17.9994 4.14293C17.9994 2.32242 14.1506 0.286133 8.99989 0.286133C3.84917 0.286133 0.000427246 2.32242 0.000427246 4.14293C0.000427246 5.96362 3.84908 7.99982 8.99989 7.99982Z"
              fill="white"
            />
            <path
              d="M8.99954 18.2859C9.02595 18.2859 9.05192 18.2855 9.07824 18.2854C9.02552 17.864 8.998 17.4347 8.998 16.9993C8.998 16.564 9.02543 16.135 9.07824 15.7139C9.05192 15.7139 9.02586 15.7149 8.99954 15.7149C6.05639 15.7149 3.26925 15.1317 1.15153 14.0728C0.734482 13.8643 0.350696 13.6403 0 13.4033V14.429C8.57238e-05 16.2496 3.84874 18.2859 8.99954 18.2859Z"
              fill="white"
            />
            <path
              d="M8.99954 13.1432C9.25466 13.1432 9.50634 13.1381 9.75486 13.1283C10.154 12.1491 10.6994 11.2446 11.3645 10.4425C10.5945 10.5274 9.8032 10.5724 8.99954 10.5724C6.05639 10.5724 3.26925 9.98919 1.15153 8.93033C0.734482 8.72176 0.350696 8.49785 0 8.26074V9.28651C8.57238e-05 11.1071 3.84874 13.1432 8.99954 13.1432Z"
              fill="white"
            />
            <path
              d="M12.8567 11.7364C12.3003 12.5728 11.9028 13.5234 11.7073 14.5449C11.617 15.0158 11.5693 15.5016 11.5693 15.9983C11.5693 16.3718 11.5966 16.7391 11.6481 17.0985C11.7747 17.9816 12.0514 18.8165 12.4513 19.5771C12.8711 20.3753 13.4263 21.0915 14.0866 21.6946C15.4589 22.948 17.2839 23.7135 19.2845 23.7135C23.5386 23.7135 26.9996 20.2525 26.9996 15.9983C26.9996 11.7441 23.5386 8.2832 19.2845 8.2832C18.8448 8.2832 18.4137 8.32075 17.9938 8.39173C15.8552 8.7534 14.0132 9.99802 12.8567 11.7364Z"
              fill="white"
            />
          </svg>
        ),
        title: "Deposit money in your wallet",
        description:
          "We support all credit cards and 50 most popular cryptocurrencies, including stable coins",
        link: "/account/wallet",
        btnText: "Deposit money",
        isCompleted: user.data.paymentMethods.filter(
          (method) => method.paymentMethodID === "USD" && method.amount != 0
        ).length,
      },
      {
        icon: (
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.6807 9.67702C24.6342 9.4754 24.5828 9.27572 24.5267 9.07798C24.3863 8.58366 24.2162 8.10183 24.0185 7.63451C23.9394 7.44756 23.856 7.26297 23.7682 7.08083C23.7244 6.98976 23.6794 6.89928 23.6333 6.80939C21.5627 2.76678 17.3549 0 12.5009 0H12.5008H12.5008C7.64687 0 3.43898 2.76678 1.36847 6.8093C1.32243 6.89911 1.27748 6.98968 1.23355 7.08075C1.10192 7.35396 0.979902 7.63274 0.868003 7.91657C0.718749 8.29494 0.587455 8.68249 0.475134 9.07789C0.418974 9.27572 0.36762 9.4754 0.321073 9.67694C0.111695 10.5842 0.000976562 11.5291 0.000976562 12.5C0.000976562 13.4708 0.111695 14.4157 0.321073 15.323C0.36762 15.5246 0.418974 15.7243 0.475134 15.922C0.587455 16.3174 0.718833 16.705 0.868003 17.0834C0.979902 17.3673 1.10192 17.646 1.23355 17.9193C1.27748 18.0103 1.32243 18.1008 1.36847 18.1907C3.43906 22.2332 7.64687 25 12.5008 25H12.5009H12.501C17.355 25 21.5628 22.2333 23.6334 18.1907C23.6794 18.1009 23.7244 18.0103 23.7683 17.9193C23.8561 17.7371 23.9395 17.5524 24.0186 17.3656C24.2163 16.8983 24.3863 16.4164 24.5267 15.9221C24.5829 15.7243 24.6343 15.5246 24.6808 15.3231C24.8902 14.4158 25.0009 13.4709 25.0009 12.5C25.0009 11.5292 24.8901 10.5843 24.6807 9.67702ZM17.6472 11.8941C17.9197 12.252 17.9197 12.7479 17.6472 13.1058L13.2965 18.8195C12.8963 19.3451 12.1054 19.3451 11.7052 18.8195L7.35455 13.1058C7.08203 12.7479 7.08203 12.252 7.35455 11.8941L11.7052 6.18041C12.1054 5.65483 12.8963 5.65483 13.2965 6.18041L17.6472 11.8941Z"
              fill="white"
            />
          </svg>
        ),
        title: "Buy your first token",
        btnText: "Buy token",
        description:
          "Choose from thousands of people — singers, actors, politicians",
        action: openTradeModal,
        isCompleted:
          user.data && user.data.holdings && user.data.holdings.length,
      },
    ];

  useEffect(() => {
    if (tasks) {
      let uncompleted = tasks.find((task) => !task.isCompleted);

      if (uncompleted) setActiveTask(uncompleted);
    }
  }, [user]);

  return (
    <AnimatePresence>
      {activeTask && showPopup && (
        <motion.div
          className={`${styles.tasksWrapper} d-flex`}
          exit={{ opacity: 0 }}
        >
          <div className={styles.Icon}>{activeTask.icon}</div>
          <div className={styles.taskInfo}>
            <div className={styles.taskTitle}>{activeTask.title}</div>
            <div className={styles.taskDescription}>
              {activeTask.description}
            </div>
            <div
              className={`${styles.actionBtn} ${styles.actionBtnMobile} align-self-center d-block d-lg-none`}
            >
              <Button
                color="primary"
                className={styles.btn}
                onClick={() =>
                  activeTask.link
                    ? router.push(activeTask.link)
                    : activeTask.action()
                }
              >
                {activeTask.btnText}
              </Button>
            </div>
            <div
              className={`${styles.tasksProgress} d-none d-lg-flex aign-items-center`}
            >
              {tasks &&
                tasks.map((task, key) => (
                  <div
                    key={key}
                    style={{
                      width: `${100 / tasks.length}%`,
                    }}
                    className={`${styles.taskProgress} ${
                      task.isCompleted ? styles.active : ""
                    }`}
                  ></div>
                ))}
            </div>
          </div>
          <div
            className={`${styles.actionBtn} align-self-center ml-auto d-none d-lg-block`}
          >
            <Button
              color="primary"
              className={styles.btn}
              onClick={() =>
                activeTask.link
                  ? router.push(activeTask.link)
                  : activeTask.action()
              }
            >
              {activeTask.btnText}
            </Button>
          </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowPopup(false);
            }}
            className={`${styles.close}`}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.7"
                d="M8.87422 7.50011L14.7149 1.65911C15.095 1.27918 15.095 0.664882 14.7149 0.28495C14.335 -0.0949832 13.7207 -0.0949832 13.3408 0.28495L7.49991 6.12595L1.65921 0.28495C1.27911 -0.0949832 0.665002 -0.0949832 0.285077 0.28495C-0.0950257 0.664882 -0.0950257 1.27918 0.285077 1.65911L6.12578 7.50011L0.285077 13.3411C-0.0950257 13.721 -0.0950257 14.3353 0.285077 14.7153C0.474417 14.9048 0.72337 15 0.972145 15C1.22092 15 1.46969 14.9048 1.65921 14.7153L7.49991 8.87428L13.3408 14.7153C13.5303 14.9048 13.7791 15 14.0279 15C14.2766 15 14.5254 14.9048 14.7149 14.7153C15.095 14.3353 15.095 13.721 14.7149 13.3411L8.87422 7.50011Z"
                fill="#003D56"
              />
            </svg>
          </a>
          <div
            className={`${styles.tasksProgress} w-100 d-flex d-lg-none aign-items-center`}
          >
            {tasks.map((task, key) => (
              <div
                key={key}
                style={{
                  width: `${100 / tasks.length}%`,
                }}
                className={`${styles.taskProgress} ${
                  task.isCompleted ? styles.active : ""
                }`}
              ></div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default UncompletedTasks;
