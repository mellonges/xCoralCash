import {Button, Col, Container, Row} from "reactstrap";
import LayoutMain from "../layouts/layoutMain";
import React from "react";
import IntroSection from "./components/Home/IntroSection";
import TokensFilter from "./components/Home/TokensFilter";
import styles from "../styles/pages/Home.module.scss";
import Footer from "../components/Footer/Footer";
const HomePage = () => {
    const pageTitle = "Home page";

    return (
        <LayoutMain title={pageTitle}>
            <div className={styles.homePage}>
                <IntroSection />
                {/*<TokensFilter people={people} />*/}
                <div className={styles.howWorks}>
                    <Container>
                        <h3 className={styles.blockTitle}>How xCORAL Works?</h3>
                        <Row
                            className={`${styles.items} justify-content-between align-items-center`}
                        >
                            <Col className={`${styles.item} d-flex`}>
                                <div className={styles.icon}>
                                    <svg
                                        width="21"
                                        height="18"
                                        viewBox="0 0 21 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19.1865 0.192738C18.2819 -0.292499 17.273 0.643316 16.6815 1.19787C15.3247 2.51494 14.1765 4.03997 12.8892 5.42637C11.4627 6.9514 10.1406 8.47643 8.67936 9.96686C7.84435 10.7987 6.93976 11.6998 6.38309 12.7396C5.13058 11.5265 4.05203 10.2094 2.66035 9.13502C1.65138 8.37251 -0.0186319 7.81795 0.0161601 9.65492C0.085744 12.0465 2.20805 14.6113 3.77369 16.2403C4.43474 16.9335 5.30454 17.6613 6.3135 17.696C7.53122 17.7653 8.78373 16.3096 9.51436 15.5124C10.8017 14.126 11.8455 12.5663 13.0284 11.1453C14.5592 9.27366 16.1248 7.43663 17.6209 5.53035C18.5603 4.35191 21.5176 1.44043 19.1865 0.192738ZM1.54695 9.51628C1.51216 9.51628 1.47737 9.51628 1.40778 9.55088C1.26861 9.51628 1.16424 9.48156 1.02507 9.41224C1.12945 9.34292 1.30341 9.37758 1.54695 9.51628Z"
                                            fill="#1AB0C4"
                                        />
                                    </svg>
                                </div>
                                <div className={styles.Info}>
                                    <strong className="d-block">Safe haven</strong>
                                    <span>xCORAL is the elastic-supply rebase currency that always appreciates in value. It’s a perfect place to park your wealth — think Bitcon, but risk- and volatility-free.</span>
                                </div>
                            </Col>
                            <Col className={`${styles.item} d-flex`}>
                                <div className={styles.icon}>
                                    <svg
                                        width="21"
                                        height="18"
                                        viewBox="0 0 21 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19.1865 0.192738C18.2819 -0.292499 17.273 0.643316 16.6815 1.19787C15.3247 2.51494 14.1765 4.03997 12.8892 5.42637C11.4627 6.9514 10.1406 8.47643 8.67936 9.96686C7.84435 10.7987 6.93976 11.6998 6.38309 12.7396C5.13058 11.5265 4.05203 10.2094 2.66035 9.13502C1.65138 8.37251 -0.0186319 7.81795 0.0161601 9.65492C0.085744 12.0465 2.20805 14.6113 3.77369 16.2403C4.43474 16.9335 5.30454 17.6613 6.3135 17.696C7.53122 17.7653 8.78373 16.3096 9.51436 15.5124C10.8017 14.126 11.8455 12.5663 13.0284 11.1453C14.5592 9.27366 16.1248 7.43663 17.6209 5.53035C18.5603 4.35191 21.5176 1.44043 19.1865 0.192738ZM1.54695 9.51628C1.51216 9.51628 1.47737 9.51628 1.40778 9.55088C1.26861 9.51628 1.16424 9.48156 1.02507 9.41224C1.12945 9.34292 1.30341 9.37758 1.54695 9.51628Z"
                                            fill="#1AB0C4"
                                        />
                                    </svg>
                                </div>
                                <div className={styles.Info}>
                                    <strong className="d-block">Perpetually rising in value</strong>
                                    <span>
                    Liquidity pools with xCORAL are rebased several times per day to ensure price growing at a neccessary rate. APY is flexible (40-150%), but always positive
                  </span>
                                </div>
                            </Col>
                            <Col className={`${styles.item} d-flex`}>
                                <div className={styles.icon}>
                                    <svg
                                        width="21"
                                        height="18"
                                        viewBox="0 0 21 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19.1865 0.192738C18.2819 -0.292499 17.273 0.643316 16.6815 1.19787C15.3247 2.51494 14.1765 4.03997 12.8892 5.42637C11.4627 6.9514 10.1406 8.47643 8.67936 9.96686C7.84435 10.7987 6.93976 11.6998 6.38309 12.7396C5.13058 11.5265 4.05203 10.2094 2.66035 9.13502C1.65138 8.37251 -0.0186319 7.81795 0.0161601 9.65492C0.085744 12.0465 2.20805 14.6113 3.77369 16.2403C4.43474 16.9335 5.30454 17.6613 6.3135 17.696C7.53122 17.7653 8.78373 16.3096 9.51436 15.5124C10.8017 14.126 11.8455 12.5663 13.0284 11.1453C14.5592 9.27366 16.1248 7.43663 17.6209 5.53035C18.5603 4.35191 21.5176 1.44043 19.1865 0.192738ZM1.54695 9.51628C1.51216 9.51628 1.47737 9.51628 1.40778 9.55088C1.26861 9.51628 1.16424 9.48156 1.02507 9.41224C1.12945 9.34292 1.30341 9.37758 1.54695 9.51628Z"
                                            fill="#1AB0C4"
                                        />
                                    </svg>
                                </div>
                                <div className={styles.Info}>
                                    <strong className="d-block">Amplify your gains</strong>
                                    <span>
                                    Coral Futures enable you to maximize your gains by avoiding slippage and earning deposit bonuses while keeeping long-terms goals of the holders aligned
                  </span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <section className={styles.BuySellBlock}>
                    <Container>
                        <Row className={styles.buySellRow}>
                            <Col lg="5">
                                <div className={styles.textBlock}>
                                    <h2 className={styles.title}>
                                        Reinventing, <span>Stock Market</span>
                                    </h2>
                                    <div className={styles.text}>
                                        Savings have been fundamentally broken due to inexorable money printing conducted by central banks. Simply holding your hard-earned cash is not working anymore — the modern money is designed in a way that makes it lose its value with an increasing pace.
                                            <br/>
                                        <br/>
                                        In an attempt to solve the problems of money, we are presenting a brand new type of asset designed to appreciate at a predetermined rate.
                                    </div>
                                    <div className={`${styles.iconItem} d-flex `}>
                                        <div className={styles.Icon}>
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                <rect width="22" height="22" fill="url(#pattern0)"/>
                                                <defs>
                                                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                        <use xlinkHref="#image0_2375:16515" transform="scale(0.00390625)"/>
                                                    </pattern>
                                                    <image id="image0_2375:16515" width="256" height="256" xlinkHref="data:image/png;base64,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"/>
                                                </defs>
                                            </svg>
                                            {/*<MoneyBagSVG />*/}
                                        </div>
                                        <div  className={styles.info}>
                                            <span>Protocol Controlled Value</span>
                                            We aim to own at least 90% of liquidity pool & treasury funds, eliminating mercenary capital
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className={styles.imageWrapper}>
                                    <img src="images/screen-main.svg" alt=""/>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className={styles.tradeAssets}>
                    <Container>
                        <Row className={styles.tradeAssetsRow}>
                            <Col lg="6">
                                <div className={styles.textBlock}>
                                    <h2 className={styles.title}>
                                        The Pinnacle Of
                                        <br/>
                                        <span>Passive Investing</span>
                                    </h2>
                                    <div className={styles.text}>
                                        Passive investing is what defines the today’s stock market. More than 90% of capital injected into the market is being allocated towards passively managed ETFs tracking indices like S&P 500 and NASDAQ 100. Historical performance of benchmarks proves that those trying to “beat the market” tend to lose most of the time to those who just buy & hold.
                                    </div>
                                    <div className={`${styles.iconItem} d-flex `}>
                                        <div className={styles.Icon}>
                                            <svg
                                                width="29"
                                                height="29"
                                                viewBox="0 0 29 29"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M14.5 0C6.50438 0 0 6.50438 0 14.5C0 22.4956 6.50438 29 14.5 29C22.4956 29 29 22.4956 29 14.5C29 6.50438 22.4956 0 14.5 0ZM21.396 22C21.1604 22.2356 20.8511 22.3542 20.5417 22.3542C20.2324 22.3542 19.9229 22.2356 19.6875 22L13.6457 15.9585C13.4185 15.7326 13.2917 15.4255 13.2917 15.1042V7.25C13.2917 6.58182 13.8329 6.04174 14.5 6.04174C15.1671 6.04174 15.7083 6.58182 15.7083 7.25V14.604L21.396 20.2915C21.8684 20.7641 21.8684 21.5276 21.396 22V22Z"
                                                    fill="#FAFDFF"
                                                />
                                            </svg>
                                        </div>
                                        <div className={styles.info}>
                                            <span>Bringing coordination to investing</span>
                                            We keep xCORAL appreciating regardless of market conditions, and prevent irrational actors from disrupting system sustainability
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="6">
                                <div className={styles.textBlock}>
                                    <h2 className={styles.title}>
                                        Not A Typical
                                        <br/>
                                        <span>Rebase Currency</span>
                                    </h2>
                                    <div className={styles.text}>
                                        Most rebase currencies do not let you capitalize on their price; the reason being that their rebases affect your personal wallet in addition to LP pools, meaning that any price appreciation is immediately getting offset by dilution in your holdings.
                                    </div>
                                    <div className={styles.text}>This is not the case with <span style={{color: "#1ab0c4"}}>xCORAL</span> — our rebases only affect the liquidity pools, leaving your wallets intact.</div>
                                    <div className={`${styles.iconItem} d-flex `}>
                                        <Button className={styles.submitPerson}>Buy xCoral on SushiSwap</Button>
                                        {/*<div className={styles.Icon}>*/}
                                        {/*    <svg*/}
                                        {/*        width="29"*/}
                                        {/*        height="29"*/}
                                        {/*        viewBox="0 0 29 29"*/}
                                        {/*        fill="none"*/}
                                        {/*        xmlns="http://www.w3.org/2000/svg"*/}
                                        {/*    >*/}
                                        {/*        <path*/}
                                        {/*            d="M14.5 0C6.50438 0 0 6.50438 0 14.5C0 22.4956 6.50438 29 14.5 29C22.4956 29 29 22.4956 29 14.5C29 6.50438 22.4956 0 14.5 0ZM21.396 22C21.1604 22.2356 20.8511 22.3542 20.5417 22.3542C20.2324 22.3542 19.9229 22.2356 19.6875 22L13.6457 15.9585C13.4185 15.7326 13.2917 15.4255 13.2917 15.1042V7.25C13.2917 6.58182 13.8329 6.04174 14.5 6.04174C15.1671 6.04174 15.7083 6.58182 15.7083 7.25V14.604L21.396 20.2915C21.8684 20.7641 21.8684 21.5276 21.396 22V22Z"*/}
                                        {/*            fill="#FAFDFF"*/}
                                        {/*        />*/}
                                        {/*    </svg>*/}
                                        {/*</div>*/}
                                        {/*<div className={styles.info}>*/}
                                        {/*    <span>Plenty of information</span>*/}
                                        {/*    ... to make investment decisions. Social media,*/}
                                        {/*    newspapers, TV — you'll find a lot of data to confirm your*/}
                                        {/*    buy or sell decision.*/}
                                        {/*</div>*/}
                                    </div>
                                </div>

                            {/*<Col lg="6">*/}
                            {/*    <div className={`${styles.imageBlockWrapper} w-100 h-100`}>*/}
                            {/*        <div className={styles.imageBlock}>*/}
                            {/*            <div className={styles.twitterBlock}>*/}
                            {/*                <div className={styles.postText}>*/}
                            {/*                    This is the mist corrupt election in our lifetime. Where*/}
                            {/*                    is the DOJ and AG? <a>#hashtag</a>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/*<section className={styles.thousandsOfPeople}>*/}
                {/*    <Container>*/}
                {/*        <Row>*/}
                {/*            <Col lg="6">*/}
                {/*                <ThousandsOFPeopleCards randomToken={randomToken}/>*/}
                {/*            </Col>*/}
                {/*            <Col lg="6">*/}
                {/*                <div className={styles.textBlock}>*/}
                {/*                    <h2 className={styles.title}>*/}
                {/*                        Thousands <span>of people</span>*/}
                {/*                    </h2>*/}
                {/*                    <div className={styles.text}>*/}
                {/*                        Politicians, comedians, media personalities, TikTokers,*/}
                {/*                        influencers — you name it. Don’t see a person you want to*/}
                {/*                        buy in? Let us know, and we’ll get them listed within a day.*/}
                {/*                    </div>*/}
                {/*                    <div className={`d-flex ${styles.points}`}>*/}
                {/*                        <div className={styles.infoItem}>*/}
                {/*                            {["Sport", "Politicans", "TikTokers"].map((point) => (*/}
                {/*                                <div*/}
                {/*                                    key={point}*/}
                {/*                                    className={`${styles.point} d-flex align-items-start`}*/}
                {/*                                >*/}
                {/*          <span className={styles.icon}>*/}
                {/*            <svg*/}
                {/*                width="25"*/}
                {/*                height="22"*/}
                {/*                viewBox="0 0 25 22"*/}
                {/*                fill="none"*/}
                {/*                xmlns="http://www.w3.org/2000/svg"*/}
                {/*            >*/}
                {/*              <path*/}
                {/*                  d="M23.9083 0.168633C22.7801 -0.436511 21.5218 0.730554 20.7842 1.42215C19.0921 3.06468 17.6602 4.96657 16.0548 6.69555C14.2758 8.59744 12.627 10.4993 10.8046 12.358C9.7633 13.3954 8.63517 14.5193 7.94094 15.816C6.37892 14.3031 5.03384 12.6606 3.29827 11.3207C2.03997 10.3697 -0.0427222 9.67812 0.000667293 11.969C0.0874462 14.9516 2.7342 18.1502 4.68673 20.1817C5.51113 21.0462 6.59587 21.9539 7.85416 21.9971C9.37279 22.0836 10.9348 20.2682 11.846 19.274C13.4515 17.545 14.7532 15.5998 16.2283 13.8277C18.1375 11.4936 20.09 9.20258 21.9557 6.82523C23.1273 5.35559 26.8154 1.72465 23.9083 0.168633ZM1.90973 11.7961C1.86634 11.7961 1.82295 11.7961 1.73617 11.8393C1.56262 11.7961 1.43245 11.7528 1.25889 11.6664C1.38906 11.5799 1.60601 11.6232 1.90973 11.7961Z"*/}
                {/*                  fill="#00ADB6"*/}
                {/*              />*/}
                {/*            </svg>*/}
                {/*          </span>*/}
                {/*                                    <span className={styles.pointText}>{point}</span>*/}
                {/*                                </div>*/}
                {/*                            ))}*/}
                {/*                        </div>*/}
                {/*                        <div className={styles.infoItem}>*/}
                {/*                            {["Comedians", "Entrepreneurs", "and more..."].map(*/}
                {/*                                (point, i) => (*/}
                {/*                                    <div*/}
                {/*                                        key={point}*/}
                {/*                                        className={`${styles.point} d-flex align-items-start`}*/}
                {/*                                    >*/}
                {/*            <span className={styles.icon}>*/}
                {/*              {i != 2 && (*/}
                {/*                  <svg*/}
                {/*                      width="25"*/}
                {/*                      height="22"*/}
                {/*                      viewBox="0 0 25 22"*/}
                {/*                      fill="none"*/}
                {/*                      xmlns="http://www.w3.org/2000/svg"*/}
                {/*                  >*/}
                {/*                      <path*/}
                {/*                          d="M23.9083 0.168633C22.7801 -0.436511 21.5218 0.730554 20.7842 1.42215C19.0921 3.06468 17.6602 4.96657 16.0548 6.69555C14.2758 8.59744 12.627 10.4993 10.8046 12.358C9.7633 13.3954 8.63517 14.5193 7.94094 15.816C6.37892 14.3031 5.03384 12.6606 3.29827 11.3207C2.03997 10.3697 -0.0427222 9.67812 0.000667293 11.969C0.0874462 14.9516 2.7342 18.1502 4.68673 20.1817C5.51113 21.0462 6.59587 21.9539 7.85416 21.9971C9.37279 22.0836 10.9348 20.2682 11.846 19.274C13.4515 17.545 14.7532 15.5998 16.2283 13.8277C18.1375 11.4936 20.09 9.20258 21.9557 6.82523C23.1273 5.35559 26.8154 1.72465 23.9083 0.168633ZM1.90973 11.7961C1.86634 11.7961 1.82295 11.7961 1.73617 11.8393C1.56262 11.7961 1.43245 11.7528 1.25889 11.6664C1.38906 11.5799 1.60601 11.6232 1.90973 11.7961Z"*/}
                {/*                          fill="#00ADB6"*/}
                {/*                      />*/}
                {/*                  </svg>*/}
                {/*              )}*/}
                {/*            </span>*/}
                {/*                                        <span className={styles.pointText}>{point}</span>*/}
                {/*                                    </div>*/}
                {/*                                )*/}
                {/*                            )}*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <Button*/}
                {/*                        className={styles.submitPerson}*/}
                {/*                        onClick={() => alert("Gonna be popup modal")}*/}
                {/*                    >*/}
                {/*                        + Submit a person request*/}
                {/*                    </Button>*/}
                {/*                </div>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*    </Container>*/}
                {/*</section>*/}
                {/*<section className={styles.buildPortfolio}>*/}
                {/*    <div className={styles.bg}>*/}
                {/*        <Container>*/}
                {/*            <h2 className={`${styles.blockTitle} text-center`}>*/}
                {/*                Build a portfolio of people <span>you believe in</span>*/}
                {/*            </h2>*/}
                {/*            <div className={`${styles.items}`}>*/}
                {/*                <BuildPortfolioCards people={people}/>*/}
                {/*            </div>*/}
                {/*            /!* <div className={styles.text}>*!/*/}
                {/*            /!*  Just like with stock trading: buy people that you think are*!/*/}
                {/*            /!*  undervalued and see their price grow. Sell when you think they*!/*/}
                {/*            /!*  are overvalued*!/*/}
                {/*            /!*</div>*!/*/}
                {/*        </Container>*/}
                {/*    </div>*/}
                {/*</section>*/}
                {/*<section className={styles.confidenceBlock}>*/}
                {/*    <Container>*/}
                {/*        <h2 className={styles.blockTitle}>*/}
                {/*            Trade with <span>confidence</span>*/}
                {/*        </h2>*/}
                {/*        <div className={styles.description}>*/}
                {/*            Safeguarding your funds is our biggest priority*/}
                {/*        </div>*/}
                {/*        <div className={styles.items}>*/}
                {/*            <Row className="align-items-lg-stretch">*/}
                {/*                <Col md="4">*/}
                {/*                    <div className={`${styles.item} d-flex flex-column`}>*/}
                {/*                        <div className={styles.iconWrapper}>*/}
                {/*                            <img*/}
                {/*                                src="/images/icon1.png"*/}
                {/*                                alt=""*/}
                {/*                                className={styles.Icon}*/}
                {/*                            />*/}
                {/*                        </div>*/}
                {/*                        <div className={styles.title}>Intuitive Experience</div>*/}
                {/*                        <div className={styles.description}>*/}
                {/*                            HumanBace was built to make it easy and safe to trade*/}
                {/*                            people you respect. Get started in minutes*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </Col>*/}
                {/*                <Col md="4">*/}
                {/*                    <div className={`${styles.item} d-flex flex-column`}>*/}
                {/*                        <div className={styles.iconWrapper}>*/}
                {/*                            <img*/}
                {/*                                src="/images/icon2.png"*/}
                {/*                                alt=""*/}
                {/*                                className={styles.Icon}*/}
                {/*                            />*/}
                {/*                        </div>*/}
                {/*                        <div className={styles.title}>Advanced Security</div>*/}
                {/*                        <div className={styles.description}>*/}
                {/*                            We take a comprehensive approach in protecting our users*/}
                {/*                            including cold storage and regular third-party audits*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </Col>*/}
                {/*                <Col md="4">*/}
                {/*                    <div className={`${styles.item} d-flex flex-column`}>*/}
                {/*                        <div className={styles.iconWrapper}>*/}
                {/*                            <img*/}
                {/*                                src="/images/icon3.png"*/}
                {/*                                alt=""*/}
                {/*                                className={styles.Icon}*/}
                {/*                            />*/}
                {/*                        </div>*/}
                {/*                        <div className={styles.title}>Always there for you</div>*/}
                {/*                        <div className={styles.description}>*/}
                {/*                            We offer global extensive support to ensure all concerns*/}
                {/*                            are addressed in a timely manner*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </Col>*/}
                {/*            </Row>*/}
                {/*        </div>*/}
                {/*    </Container>*/}
                {/*</section>*/}
                <Footer/>
            </div>
        </LayoutMain>
    );
};

export default HomePage;
