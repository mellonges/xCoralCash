import Link from "next/link";
import React from "react";
import {Container } from "reactstrap";
import styles from "../../styles/components/Footer/Footer.module.scss";

const Footer = () => {
  const footerNavCol1 = [
    { title: "Buy on SushiSwap", url: "#" },
    { title: "Twitter", url: "/prices" },
    {title: "Telegram", url: "#"},
    {title: "Use App", url: "/dashboard"},
  ];

  const footerNavCol2 = [
    {title: "Discord", url: "#"},
    {title: "Medium", url: "#"},
    {title: "DexTools", url: "#" },
    {title: "Docs", url: "https://docs.xcoral.cash"}
  ];

  return (
    <footer className={styles.footerWrapper}>
      <Container>
        <div
          className={`d-flex justify-content-between align-items-center ${styles.wrapper}`}
        >
          <div className={styles.footerLogo}>
            xcoral.<span>cash</span>
          </div>

          <nav className={styles.footerNav}>
            {footerNavCol1.map((navItem, i) => (
              <Link key={i} href={navItem.url}>
                <a>{navItem.title}</a>
              </Link>
            ))}
          </nav>
          <nav  className={styles.footerNav}>
            {footerNavCol2.map((navItem, i) => (
                  <a key={i} target="_blank" href={navItem.url}>{navItem.title}</a>
            ))}
          </nav>
        </div>

        <div className={styles.copyright}>
          <span>xcoral.cash ©2021</span>
          <Link href="https://d24va9fw68seps.cloudfront.net/hb_privacy.pdf">
            <a className={styles.Link} target="_blank">
              Privacy Notice
            </a>
          </Link>
          <Link href="https://d24va9fw68seps.cloudfront.net/hb_terms.pdf">
            <a className={styles.Link} target="_blank">
              Terms of Service
            </a>
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;