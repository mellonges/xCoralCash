import {Button, Col, Container, Row} from "reactstrap";
import LayoutMain from "../layouts/layoutMain";
import React, {useEffect, useState} from "react";
import IntroSection from "./components/Home/IntroSection";
import TokensFilter from "./components/Home/TokensFilter";
import styles from "../styles/pages/Home.module.scss";
import {getHomePageTokens} from "../functions/getBackendData";
import ThousandsOFPeopleCards from "./components/Home/ThousandsOfPeopleCards";
import BuildPortfolioCards from "./components/Home/BuildPortfolioCards";
import Footer from "../components/Footer/Footer";
import {shuffle} from "../functions/helpers";
const HomePage = () => {
    const pageTitle = "Home page";

    const [people, setPeoples] = useState();
    const [twoCoins, setTwoCoins] = useState([]);
    const [randomToken, setRandomToken] = useState({});

    useEffect(() => {
        getHomePageTokens()
            .then((res) => res.data)
            .then((res) => res.people && setPeoples(res.people))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (people) {
            let shuffledFeatured = shuffle(
                people.filter((t) => t.category === "featured")
            );
            setTwoCoins(
                // get two last
                shuffledFeatured.slice(-2)
            );
            setRandomToken(shuffledFeatured.slice(0, 1).pop());
        }
    }, [people]);

    return (
        <LayoutMain title={pageTitle}>
            <div className={styles.homePage}>
                <IntroSection twoCoins={twoCoins}/>
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
                                        xCORAL is building an ecosystem of Programmable Wealth, backed by powerful mechanisms of financial coordination. We identify and enforce the perfect Nash equilibrium benefiting all xCORAL holders, which ensures that the coin is able to sustainably appreciate in value in the long run.
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
                                    <div className={`${styles.iconItem} d-flex `}>
                                        <div className={styles.Icon}>
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                <rect width="21" height="21" fill="url(#pattern0)"/>
                                                <defs>
                                                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                        <use xlinkHref="#image0_2376:16516" transform="scale(0.00390625)"/>
                                                    </pattern>
                                                    <image id="image0_2376:16516" width="256" height="256" xlinkHref="data:image/png;base64,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"/>
                                                </defs>
                                            </svg>



                                            {/*<LaunchRocketSVG />*/}
                                        </div>
                                        <div className={styles.info}>
                                            <span>Bringing Next Trillion Dollars</span>
                                            xCORAL aims to accelerate the transition of wealth from CeFi to DeFi by offering unique monetary incentives to holders
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className={styles.imageWrapper}>
                                    {/*<img*/}
                                    {/*    src="/images/screen-main.svg"*/}
                                    {/*    alt="xCoin"*/}
                                    {/*    className={styles.image}*/}
                                    {/*/>*/}
                                    {/*<SvgMain />*/}

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
