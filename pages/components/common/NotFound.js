import { Container } from "reactstrap";
import LayoutMain from "../../../layouts/layoutMain";
import Header from "../Header/Header";
import styles from "../../../styles/components/common/NotFound.module.scss";

const NotFound = ({ title, text }) => {
  return (
    <LayoutMain title={title}>
      <Header color="light" />
      <Container>
        <div className={`${styles.pageNotFound} text-center`}>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
      </Container>
    </LayoutMain>
  );
};

export default NotFound;
