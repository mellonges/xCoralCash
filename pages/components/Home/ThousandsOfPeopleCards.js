import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getTokenImageUrl } from "../../../functions/getBackendData";
import { shuffle } from "../../../functions/helpers";
import styles from "../../../styles/components/Home/ThousandsOfPeopleCards.module.scss";
import Placeholder from "../common/Placeholder";

const ThousandsOFPeopleCards = ({ randomToken }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  const firstCard = {
    animate: {
      rotate: -1.52,
      marginTop: "29.6px",
      transition: {
        delay: 0.5,
        duration: 0.3,
      },
    },
  };
  const secondCard = {
    animate: {
      rotate: 4.8,
      marginTop: "20.2px",
      transition: {
        delay: 0.5,

        duration: 0.3,
      },
    },
  };

  const thirdCard = {
    animate: {
      rotate: -7.3,
      transition: {
        delay: 0.5,
        duration: 0.3,
      },
    },
  };

  useEffect(() => {
    if (inView) controls.start("animate");
  }, [controls, inView]);

  return (
    <div className={styles.Cards} ref={ref}>
      {randomToken && Object.keys(randomToken).length ? (
        <>
          <motion.div
            variants={firstCard}
            animate={controls}
            className={`${styles.cardPlaceholder} ${styles.first}`}
          ></motion.div>
          <motion.div
            variants={secondCard}
            animate={controls}
            className={`${styles.cardPlaceholder} ${styles.second}`}
          ></motion.div>
          <motion.div
            variants={thirdCard}
            animate={controls}
            className={styles.mainCard}
          >
            <img
              className={styles.cardImage}
              src={getTokenImageUrl(randomToken.ticker, "full")}
              alt=""
            />

            <div className={styles.coinCardBg}>
              <div className={styles.cardInformation}>
                <div className={`${styles.category} text-uppercase`}>
                  {randomToken.category}
                </div>
                <strong className={styles.coinTitle}>{randomToken.name}</strong>
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <div className={`${styles.cardPlaceholder} ${styles.first}`}></div>
          <div className={`${styles.cardPlaceholder} ${styles.second}`}></div>

          <div className={styles.mainCard}>
            <Placeholder height="100%" width="100%" opacity={0.9} />
          </div>
        </>
      )}
    </div>
  );
};

export default ThousandsOFPeopleCards;
