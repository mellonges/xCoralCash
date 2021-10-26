import { Container } from "reactstrap";
import LayoutMain from "../layouts/layoutMain";
import Header from "./components/Header/Header";
import styles from "../styles/pages/SignUp.module.scss";
import { useEffect, useState } from "react";
import ForgotPasswordSent from "./components/SignIn/ForgotPasswordSent";
import SignUpForm from "./components/SignUp/SignUpForm";
import Verification from "./components/SignUp/Verification";
import { useRouter } from "next/router";

const SignIn = () => {
  const [activePage, setActivePage] = useState(0);

  const [registeredData, setRegisteredData] = useState({
    email: "asdfasd@danialart.biz",
  });

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", checkUrlIsChanged);

    return () => {
      router.events.off("routeChangeComplete", checkUrlIsChanged);
    };
  }, []);

  const checkUrlIsChanged = (url) => {
    if (url.match("signup")) setActivePage(0);
  };

  return (
    <LayoutMain title="Sign Up | Humanbace">
      <div className={styles.signUpWrapper}>
        <Header color="dark" />
        <div className={styles.signUpInner}>
          <Container>
            <div className={styles.signUp}>
              {activePage === 0 ? (
                <SignUpForm
                  setActivePage={setActivePage}
                  setRegisteredData={setRegisteredData}
                />
              ) : activePage === 1 ? (
                <Verification registeredData={registeredData} />
              ) : null}
            </div>
          </Container>
        </div>
      </div>
    </LayoutMain>
  );
};
export default SignIn;
