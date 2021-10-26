import { useEffect, useState } from "react";

import { getCurrentUser } from "../../functions/getBackendData";
import AccountLayout from "../../layouts/MaintLayout";
import PasswordSection from "@/components/account/settings/PasswordSection";

import styles from "../../styles/pages/account/Settings.module.scss";

const Settings = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (typeof res === "object") {
          let user = res.attributes;

          setUser(user);
        }
      })
      .catch((err) => {
        console.error(err);
        setUser(false);
      });
  }, []);

  return (
    <AccountLayout user={user} pageTitle="Settings">
      <div className={styles.AccountSettings}>
        <h2 className={styles.pageTitle}>Settings</h2>
        <PasswordSection styles={styles} />
      </div>
    </AccountLayout>
  );
};

export default Settings;
