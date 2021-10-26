import { Container } from "reactstrap";
import Link from "next/link";
import { Button } from "reactstrap";

import styles from "../../../styles/components/common/AuthFooter.module.scss";

const AuthFooter = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={`${styles.inner}`}>
          <span className={styles.copyright}>HumanBace ©2021</span>
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
          <Link href="https://d24va9fw68seps.cloudfront.net/hb_cookies.pdf">
            <a className={styles.Link} target="_blank">
              Cookies Policy
            </a>
          </Link>
          <Link href="https://d24va9fw68seps.cloudfront.net/hb_aml.pdf">
            <a className={styles.Link} target="_blank">
              AML/KYC
            </a>
          </Link>
          <Link href="https://d24va9fw68seps.cloudfront.net/hb_fees.pdf">
            <a className={styles.Link} target="_blank">
              Fees
            </a>
          </Link>
          <Link href="https://humanbace.tawk.help">
            <a className={styles.Link} target="_blank">
              Help Center
            </a>
          </Link>
        </div>
        <Button
          className={`${styles.chatBtn}`}
          onClick={() => {
            window?.Tawk_API?.toggle();
          }}
        >
          Chat with support
        </Button>
      </Container>
    </footer>
  );
};

export default AuthFooter;
