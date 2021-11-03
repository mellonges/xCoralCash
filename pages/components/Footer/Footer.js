import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "reactstrap";
import { getCurrentUser } from "../../../functions/getBackendData";
import styles from "../../../styles/components/Footer/Footer.module.scss";

const Footer = () => {
  const footerNavCol1 = [
    { title: "Buy on SushiSwap", url: "#" },
    { title: "Twitter", url: "/prices" },
    {title: "Telegram", url: "#"},
    {title: "Use App", url: "#"},
  ];

  const footerNavCol2 = [
    {title: "Discord", url: "#"},
    {title: "Medium", url: "#"},
    {title: "DexTools", url: "#" },
    {title: "Docs", url: "#"}
  ];

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    getCurrentUser()
      .then((user) => user && setCurrentUser(user.attributes))
      .catch(() => {});
  }, []);

  return (
    <footer className={styles.footerWrapper}>
      <Container>
        <div
          className={`d-flex justify-content-between align-items-center ${styles.wrapper}`}
        >

            xcoral.<span>cash</span>
          </div>
          <div className="footer-nav-block">
          <nav className={styles.footerNav}>
            {footerNavCol1.map((navItem, i) => (
              <Link key={i} href={navItem.url}>
                <a>{navItem.title}</a>
              </Link>
            ))}
          </nav>
          <nav  className={styles.footerNav}>
            {footerNavCol2.map((navItem, i) => (
                <Link key={i} href={navItem.url}>
                  <a>{navItem.title}</a>
                </Link>
            ))}
          </nav>


          {/*<div className={styles.loginButtons}>*/}
          {/*  {!currentUser ? (*/}
          {/*    <>*/}
          {/*      <Link href="/signup">*/}
          {/*        <a className={`${styles.signUpBtn} ${styles.btn}`}>Sign Up</a>*/}
          {/*      </Link>*/}
          {/*      <Link href="/signin">*/}
          {/*        <a className={`${styles.logIn} ${styles.btn} `}>Sign In</a>*/}
          {/*      </Link>*/}
          {/*    </>*/}
          {/*  ) : (*/}
          {/*    <Link href="/account/">*/}
          {/*      <a className={`${styles.logIn} ${styles.btn} `}>Trade</a>*/}
          {/*    </Link>*/}

          {/*  )}*/}
          {/*</div>*/}
        </div>
        {/*<hr className={styles.footerLine} />*/}

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
          {/*<Link href="https://d24va9fw68seps.cloudfront.net/hb_cookies.pdf">*/}
          {/*  <a className={styles.Link} target="_blank">*/}
          {/*    Cookies Policy*/}
          {/*  </a>*/}
          {/*</Link>*/}
          {/*<Link href="https://d24va9fw68seps.cloudfront.net/hb_aml.pdf">*/}
          {/*  <a className={styles.Link} target="_blank">*/}
          {/*    AML/KYC*/}
          {/*  </a>*/}
          {/*</Link>*/}
          {/*<Link href="https://d24va9fw68seps.cloudfront.net/hb_fees.pdf">*/}
          {/*  <a className={styles.Link} target="_blank">*/}
          {/*    Fees*/}
          {/*  </a>*/}
          {/*</Link>*/}
          {/*<Link href="https://humanbace.tawk.help">*/}
          {/*  <a className={styles.Link} target="_blank">*/}
          {/*    Help Center*/}
          {/*  </a>*/}
          {/*</Link>*/}
          {/* <Button
            className={`${styles.chatBtn}`}
            onClick={() => {
              window?.Tawk_API?.toggle();
            }}
          >
            Chat with support
          </Button> */}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
