import { useState } from "react";
import { Button } from "reactstrap";
import styles from "../../../styles/components/Account/TrackInvitesBlock.module.scss";
import InvitationsModal from "./modals/InvitationsModal";

const TrackInvitesBlock = ({ data }) => {
  const countInvited = data
    ? data.filter((item) => item.status === "Invited").length
    : 0;
  const countRegistered = data
    ? data.filter((item) => item.status === "Registered").length
    : 0;

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={styles.TrackInvitesBlock}>
      <div className={styles.title}>Track your referrals</div>
      <div className={`${styles.item} d-flex justify-content-between`}>
        <div className={styles.label}>Pending Registration</div>
        <div className={styles.label}>{countInvited}</div>
      </div>
      <div className={`${styles.item} d-flex justify-content-between`}>
        <div className={styles.label}>Registered</div>
        <div className={styles.label}>{countRegistered}</div>
      </div>
      <Button
        className={`${styles.seeMore} w-100`}
        color="primary"
        onClick={() => setOpenModal(true)}
      >
        See People Invited
      </Button>
      <InvitationsModal
        isOpen={openModal}
        setOpenModal={setOpenModal}
        data={data}
      />
    </div>
  );
};
export default TrackInvitesBlock;
