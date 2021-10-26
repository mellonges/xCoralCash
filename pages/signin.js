import { Container } from "reactstrap";
import LayoutMain from "../layouts/layoutMain";
import Header from "./components/Header/Header";
import styles from "../styles/pages/SignIn.module.scss";
import LoginForm from "./components/SignIn/LoginForm";
import ForgotPassword from "./components/SignIn/ForgotPassword";
import { useEffect, useState } from "react";
import ForgotPasswordSent from "./components/SignIn/ForgotPasswordSent";
import { useRouter } from "next/router";

const SignIn = () => {
  const [activePage, setActivePage] = useState(0);

  const [userEmail, setUserEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", checkUrlIsChanged);

    return () => {
      router.events.off("routeChangeComplete", checkUrlIsChanged);
    };
  }, []);

  const checkUrlIsChanged = (url) => {
    if (url.match("signin")) setActivePage(0);
  };
  return (
    <LayoutMain title="Sign In | Humanbace">
      <div className={styles.signInWrapper}>
        <Header color="dark" />
        <div className={styles.signInInner}>
          <Container>
            <div className={styles.signIn}>
              {activePage === 0 ? (
                <LoginForm setActivePage={setActivePage} />
              ) : activePage === 1 ? (
                <ForgotPassword
                  setActivePage={setActivePage}
                  setUserEmail={setUserEmail}
                />
              ) : activePage === 2 ? (
                <ForgotPasswordSent
                  setActivePage={setActivePage}
                  email={userEmail}
                />
              ) : null}
            </div>
          </Container>
        </div>
      </div>
    </LayoutMain>
  );
};
export default SignIn;
