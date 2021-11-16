import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import styles from "../../../styles/pages/Home.module.scss";
import Placeholder from "../common/Placeholder";
import Header from "../Header/Header";
import SearchForm from "./SearchForm";
import TopCoinCardContent from "./TopCoinCardContent";

const IntroSection = ({ twoCoins }) => {
  const router = useRouter();
  return (
    <div className={styles.introSection}>
      <Header color="dark" />
      <div className={styles.introSectionContent}>
        <Container>
          <Row className={`align-items-center ${styles.sectionRow}`}>
            <Col md="6">
              <h1 className={styles.title}>
                Pioneering <span>Deterministic Wealth</span>
              </h1>
              <h4 className={styles.description}>
                xcoral.cash is an experimental protocol powering xCORAL — the coin designed to continuously appreciate in value
              </h4>
              {/*<SearchForm />*/}
            </Col>
            <Col md="6">
              <div className={`${styles.coinCards} d-none d-md-flex`}>
                <div className="slide-in-blurred-top">
                <div className="vibrate-1">
                <img
                    // className="flicker-4"
                    width="340px" height="346px" src="/images/xcoral_logo_trans.png" alt=""/>
                </div>
                </div>

              {/*  {twoCoins && twoCoins.length ? (*/}
              {/*    <>*/}
              {/*      <motion.div*/}
              {/*        transition={{*/}
              {/*          delay: 0.5,*/}
              {/*          duration: 0.5,*/}
              {/*        }}*/}
              {/*        initial={{*/}
              {/*          rotate: 0,*/}
              {/*          marginRight: -268,*/}
              {/*        }}*/}
              {/*        animate={{*/}
              {/*          rotate: -13.38,*/}
              {/*          marginRight: -81,*/}
              {/*        }}*/}
              {/*        onClick={() => {*/}
              {/*          router.push(*/}
              {/*            "/persons/[token]",*/}
              {/*            `/persons/${twoCoins[0].ticker}`*/}
              {/*          );*/}
              {/*        }}*/}
              {/*        className={`${styles.coinCard} cursor-pointer`}*/}
              {/*      >*/}
              {/*        <TopCoinCardContent data={twoCoins[0]} />*/}
              {/*      </motion.div>*/}
              {/*      <motion.div*/}
              {/*        transition={{*/}
              {/*          delay: 0.5,*/}
              {/*          duration: 0.5,*/}
              {/*        }}*/}
              {/*        initial={{*/}
              {/*          rotate: 0,*/}
              {/*          marginTop: 0,*/}
              {/*        }}*/}
              {/*        animate={{*/}
              {/*          rotate: 0.74,*/}
              
              {/*          marginTop: 18,*/}
              {/*        }}*/}
              {/*        className={`${styles.coinCard} cursor-pointer`}*/}
              {/*        onClick={() => {*/}
              {/*          router.push(*/}
              {/*            "/persons/[token]",*/}
              {/*            `/persons/${twoCoins[1].ticker}`*/}
              {/*          );*/}
              {/*        }}*/}
              {/*      >*/}
              {/*        <TopCoinCardContent data={twoCoins[1]} />*/}
              {/*      </motion.div>*/}
              {/*    </>*/}
              {/*  ) : (*/}
              {/*    <>*/}
              {/*      <div className={`${styles.coinCard}`}>*/}
              {/*        <Placeholder width="100%" height="100%" opacity={0.8} />*/}
              {/*      </div>*/}
              {/*      <div className={`${styles.coinCard}`}>*/}
              {/*        <Placeholder width="100%" height="100%" opacity={0.8} />*/}
              {/*      </div>*/}
              {/*    </>*/}
              {/*  )}*/}
              {/*</div>*/}
              {/*<div className={`${styles.coinCards} d-flex d-md-none`}>*/}
              {/*  {twoCoins && twoCoins.length ? (*/}
              {/*    <>*/}
              {/*      <motion.div*/}
              {/*        transition={{*/}
              {/*          delay: 0.5,*/}
              {/*          duration: 0.5,*/}
              {/*        }}*/}
              {/*        initial={{*/}
              {/*          rotate: 0,*/}
              {/*          marginRight: -172,*/}
              {/*        }}*/}
              {/*        animate={{*/}
              {/*          rotate: -13.38,*/}
              {/*          marginRight: -81,*/}
              {/*        }}*/}
              {/*        className={styles.coinCard}*/}
              {/*      >*/}
              {/*        <TopCoinCardContent data={twoCoins[0]} />*/}
              {/*      </motion.div>*/}
              {/*      <motion.div*/}
              {/*        transition={{*/}
              {/*          delay: 0.5,*/}
              {/*          duration: 0.5,*/}
              {/*        }}*/}
              {/*        initial={{*/}
              {/*          rotate: 0,*/}
              {/*          marginTop: 0,*/}
              {/*        }}*/}
              {/*        animate={{*/}
              {/*          rotate: 0.74,*/}
              {/*          marginTop: 18,*/}
              {/*        }}*/}
              {/*        className={styles.coinCard}*/}
              {/*      >*/}
              {/*        <TopCoinCardContent data={twoCoins[1]} />*/}
              {/*      </motion.div>*/}
              {/*    </>*/}
              {/*  ) : (*/}
              {/*    <>*/}
              {/*      <div className={`${styles.coinCard}`}>*/}
              {/*        <Placeholder width="100%" height="100%" opacity={0.8} />*/}
              {/*      </div>*/}
              {/*      <div className={`${styles.coinCard}`}>*/}
              {/*        <Placeholder width="100%" height="100%" opacity={0.8} />*/}
              {/*      </div>*/}
              {/*    </>*/}
              {/*  )}*/}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default IntroSection;
