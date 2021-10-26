import { Modal, ModalBody, ModalHeader } from "reactstrap";
import styles from "../../../../styles/components/Account/modals/NotificationsModalMobile.module.scss";

const NotificationsModalMobile = ({ content, isOpen, toggle, afterClose }) => {
  return (
    <Modal
      unmountOnClose={false}
      className={styles.NotificationsModalMobile}
      modalTransition={{
        timeout: 100,
      }}
      backdropTransition={{
        timeout: 100,
      }}
      toggle={toggle}
      centered={true}
      onClosed={afterClose}
      isOpen={isOpen}
    >
      <a
        className={`closeBtn curspor-pointer`}
        onClick={() => {
          toggle();
        }}
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.2407 9.50014L18.6389 2.10154C19.1204 1.6203 19.1204 0.842184 18.6389 0.360936C18.1577 -0.120312 17.3796 -0.120312 16.8983 0.360936L9.49989 7.75953L2.10167 0.360936C1.62021 -0.120312 0.842336 -0.120312 0.361098 0.360936C-0.120366 0.842184 -0.120366 1.6203 0.361098 2.10154L7.75932 9.50014L0.361098 16.8987C-0.120366 17.38 -0.120366 18.1581 0.361098 18.6393C0.600928 18.8794 0.916268 19 1.23138 19C1.5465 19 1.86161 18.8794 2.10167 18.6393L9.49989 11.2407L16.8983 18.6393C17.1384 18.8794 17.4535 19 17.7686 19C18.0837 19 18.3988 18.8794 18.6389 18.6393C19.1204 18.1581 19.1204 17.38 18.6389 16.8987L11.2407 9.50014Z"
            fill="white"
          />
        </svg>
      </a>
      <ModalHeader>Notifications</ModalHeader>
      <ModalBody className="h-100">{content}</ModalBody>
    </Modal>
  );
};
export default NotificationsModalMobile;
