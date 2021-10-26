import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { getTokenImageUrl } from "../../../../functions/getBackendData";
import styles from "../../../../styles/components/Account/modals/InvitationsModal.module.scss";

const InvitationsModal = ({ isOpen, setOpenModal, data }) => {
  const toggle = () => setOpenModal(!isOpen);

  const [sort, setSort] = useState({
    type: "status",
    value: "DESC",
  });

  useEffect(() => {}, []);
  return (
    <Modal isOpen={isOpen} toggle={toggle} className={styles.InvitationsModal}>
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
      <ModalHeader className={`${styles.header} border-0`}>
        Invitations
      </ModalHeader>
      <ModalBody>
        {data && data.length ? (
          <Table
            bordered={false}
            className={`${styles.InvitationsList} d-none d-md-table`}
          >
            <thead>
              <tr>
                <th className={` text-uppercase`}>email</th>
                <th className={` text-uppercase `}>status</th>
                <th className={` text-uppercase `}>Reward earned</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.userInvited} className={`${styles.item}`}>
                  <td className="border-0">
                    <span className={styles.email}>{item.userInvited}</span>
                  </td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        item.status === "Registered" ? styles.active : ""
                      }`}
                    >
                      {item.status === "Registered" ? "Registered" : "Invited"}
                    </span>
                  </td>
                  <td>
                    {item.reward ? (
                      <div className={styles.rewardBlock}>
                        <img
                          className={styles.Image}
                          src={getTokenImageUrl(item.reward.ticker, "small")}
                          alt={item.reward.ticker}
                        />
                        <span className={styles.quantity}>
                          +{item.reward.quantity} {item.reward.ticker}
                        </span>
                      </div>
                    ) : (
                      "No Rewards Yet"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div
            className={`${styles.noNotificationsHolder} d-flex flex-column align-items-center justify-content-center`}
          >
            <div className={styles.Icon}>
              <svg
                width="29"
                height="23"
                viewBox="0 0 29 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5 2.125L2 8.375L14.5 14.625L27 8.375L14.5 2.125Z"
                  stroke="#678086"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 14.625L14.5 20.875L27 14.625"
                  stroke="#678086"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <strong className={styles.name}>You have no invitations</strong>
          </div>
        )}
        {data && data.length ? (
          <div className={`${styles.InvitationsList} d-block d-md-none`}>
            {data.map((item) => (
              <div
                className={`${styles.item} d-flex align-items-center justify-content-between`}
                key={item.userInvited}
              >
                <div className={styles.column}>
                  <span className={styles.email}>{item.userInvited}</span>
                  <span
                    className={`${styles.status} d-block ${
                      item.status === "Registered" ? styles.active : ""
                    }`}
                  >
                    {item.status === "Registered" ? "Registered" : "Invited"}
                  </span>
                </div>
                <div className={styles.column}>
                  {item.reward ? (
                    <div className={styles.rewardBlock}>
                      <img
                        className={styles.Image}
                        src={getTokenImageUrl(item.reward.ticker, "small")}
                        alt={item.reward.ticker}
                      />
                      <span className={styles.quantity}>
                        +{item.reward.quantity} {item.reward.ticker}
                      </span>
                    </div>
                  ) : (
                    "No Rewards Yet"
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </ModalBody>
    </Modal>
  );
};
export default InvitationsModal;
