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
// import {ReactComponent as SvgMain} from "../SVG/stock-market.svg"
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
                                            <svg
                                                width="29"
                                                height="29"
                                                viewBox="0 0 29 30"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M14.5 0.998779C6.50438 0.998779 0 7.50316 0 15.4988C0 23.4944 6.50438 29.9988 14.5 29.9988C22.4956 29.9988 29 23.4944 29 15.4988C29 7.50316 22.4956 0.998779 14.5 0.998779ZM21.396 22.9988C21.1604 23.2344 20.8511 23.353 20.5417 23.353C20.2324 23.353 19.9229 23.2344 19.6875 22.9988L13.6457 16.9573C13.4185 16.7314 13.2917 16.4243 13.2917 16.103V8.24878C13.2917 7.5806 13.8329 7.04052 14.5 7.04052C15.1671 7.04052 15.7083 7.5806 15.7083 8.24878V15.6028L21.396 21.2903C21.8684 21.7629 21.8684 22.5264 21.396 22.9988V22.9988Z"
                                                    fill="#FAFDFF"
                                                />
                                            </svg>
                                        </div>
                                        <div  className={styles.info}>
                                            <span>Protocol Controlled Value</span>
                                            We aim to own at least 90% of liquidity pool & treasury funds, eliminating mercenary capital
                                        </div>
                                    </div>
                                    <div className={`${styles.iconItem} d-flex `}>
                                        <div className={styles.Icon}>
                                            {/*<svg*/}
                                            {/*    width="29"*/}
                                            {/*    height="29"*/}
                                            {/*    viewBox="0 0 33 34"*/}
                                            {/*    fill="none"*/}
                                            {/*    xmlns="http://www.w3.org/2000/svg"*/}
                                            {/*>*/}
                                            {/*    <path*/}
                                            {/*        d="M32.3658 20.4792C32.3658 20.9052 32.0862 21.2716 31.6995 21.3973L22.7093 24.3422L19.7644 33.3325C19.6366 33.7192 19.2703 33.9988 18.8463 33.9988C18.4318 33.9988 18.0837 33.7378 17.9488 33.3806L10.2228 13.1016C10.1729 12.9941 10.1543 12.8792 10.1543 12.7535C10.1543 12.2221 10.5891 11.7872 11.1206 11.7872C11.2463 11.7872 11.3612 11.8059 11.4686 11.8557L31.7493 19.5817C32.1049 19.7149 32.3658 20.063 32.3658 20.4792Z"*/}
                                            {/*        fill="#FAFDFF"*/}
                                            {/*    />*/}
                                            {/*    <path*/}
                                            {/*        d="M11.8205 6.61714L12.1143 2.88377C12.1737 2.10563 12.8621 1.5223 13.6403 1.58168C14.4184 1.64107 15.0017 2.3295 14.9424 3.10765L14.6486 6.84102C14.4949 8.04475 13.5094 8.17015 13.1226 8.14311C12.3445 8.08372 11.7611 7.39528 11.8205 6.61714Z"*/}
                                            {/*        fill="#FAFDFF"*/}
                                            {/*    />*/}
                                            {/*    <path*/}
                                            {/*        d="M6.41312 9.30699L3.67002 6.75753C3.09714 6.22759 3.06769 5.32573 3.59762 4.75284C4.12756 4.17996 5.02942 4.15051 5.60231 4.68045L8.34541 7.22991C9.19324 8.09811 8.6793 8.94827 8.4178 9.2346C7.88787 9.80748 6.98601 9.83693 6.41312 9.30699Z"*/}
                                            {/*        fill="#FAFDFF"*/}
                                            {/*    />*/}
                                            {/*    <path*/}
                                            {/*        d="M5.87379 16.0669L2.38407 17.4256C1.65751 17.7105 0.83287 17.3442 0.548007 16.6176C0.263144 15.8911 0.629462 15.0664 1.35602 14.7815L4.84574 13.4228C5.99654 13.0378 6.53796 13.8707 6.6818 14.2308C6.96666 14.9574 6.60035 15.782 5.87379 16.0669Z"*/}
                                            {/*        fill="#FAFDFF"*/}
                                            {/*    />*/}
                                            {/*</svg>*/}
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
                                    <img
                                        src="/images/screen-main.svg"
                                        alt="xCoin"
                                        className={styles.image}
                                    />
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
