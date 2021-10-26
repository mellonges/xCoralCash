import { useEffect, useState } from "react";
import { getCurrentUser, getUserData } from "../../functions/getBackendData";
import AccountLayout from "../../layouts/MaintLayout";
import styles from "../../styles/pages/account/Invite.module.scss";
import InviteForm from "../components/account/InviteForm";
import TrackInvitesBlock from "../components/account/TrackInvitesBlock";

const Invite = () => {
  const [user, setUser] = useState();
  const [invitesData, setInvitesData] = useState();

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

    getUserData([
      {
        type: "invites",
      },
    ])
      .then((res) => res.data.payload.processedData[0].invites)
      .then((data) => setInvitesData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <AccountLayout user={user} pageTitle="Invite Friends">
      <div className={styles.AccountInvite}>
        <div className={`d-flex flex-wrap ${styles.wrapper}`}>
          <div className={styles.leftCol}>
            <div className={styles.Icon}>
              <svg
                width="86"
                height="72"
                viewBox="0 0 86 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M54.6429 22.4101C52.9461 20.24 51.2018 19.2943 49.4579 19.5982C47.4504 19.948 45.6513 21.9516 44.109 25.5562C43.9117 26.0176 43.7315 26.4759 43.5684 26.9164C43.266 26.557 42.9414 26.1866 42.5991 25.8193C39.9297 22.9487 37.5583 21.6718 35.5508 22.0216C33.8069 22.3255 32.4847 23.8056 31.6225 26.4216C30.9782 28.3794 31.5472 29.6057 32.1378 30.2891C33.2022 31.5209 35.2074 32.1267 38.2677 32.1392C40.6177 32.1499 43.0397 31.79 44.2742 31.5749L44.2749 31.5748C44.3096 31.5687 44.3437 31.5628 44.3772 31.5569C44.4113 31.551 44.4453 31.5451 44.4802 31.539C45.7147 31.3238 48.1156 30.8433 50.3236 30.0384C53.1986 28.9916 54.8807 27.7432 55.4671 26.2238C55.7903 25.3811 55.9123 24.0344 54.6429 22.4101Z"
                  fill="#00C9A5"
                />
                <path
                  d="M64.3163 34.8292C64.144 33.8405 63.202 33.1792 62.2132 33.3515L28.1987 39.2788C27.21 39.4511 26.5478 40.392 26.7201 41.3807L30.4138 62.5771C30.5861 63.5657 31.5274 64.2271 32.5161 64.0549L66.5307 58.1275C67.5194 57.9552 68.1824 57.0142 68.0101 56.0256L64.3164 34.8292L64.3163 34.8292Z"
                  fill="#0F8D84"
                />
                <path
                  d="M67.2647 35.8661C67.437 36.8547 66.7741 37.7958 65.7854 37.9681L26.4001 44.8313C25.4114 45.0035 24.4699 44.3421 24.2976 43.3534L22.7377 34.4016C22.5654 33.4129 23.2274 32.4706 24.2161 32.2983L63.6015 25.4351C64.5902 25.2628 65.5325 25.9254 65.7048 26.9142L67.2648 35.866L67.2647 35.8661Z"
                  fill="#28B6AC"
                />
                <path
                  d="M48.3864 28.0856L39.4336 29.6458L41.6173 42.177L50.5701 40.6169L48.3864 28.0856Z"
                  fill="#49E9CC"
                />
                <path
                  d="M27.6028 46.4455L65.7947 43.3124L64.9004 38.1802L27.3042 44.7317L27.6028 46.4455Z"
                  fill="#0D6660"
                />
                <path
                  d="M50.5705 40.6179L41.6177 42.178L45.0495 61.872L54.0023 60.3118L50.5705 40.6179Z"
                  fill="#49E9CC"
                />
                <path
                  d="M42.1503 45.2514L51.2448 44.5056L50.5774 40.6755L41.6248 42.2356L42.1503 45.2514Z"
                  fill="#31A691"
                />
                <path
                  d="M22.6375 64.9653L23.2041 64.9396C23.952 64.9057 24.1135 63.8696 23.4115 63.6095L22.8796 63.4125C21.5395 62.9162 20.6266 61.666 20.5618 60.2384L20.5361 59.6718C20.5022 58.9239 19.4661 58.7624 19.2061 59.4644L19.0091 59.9963C18.5127 61.3364 17.2625 62.2493 15.8349 62.314L15.2683 62.3397C14.5204 62.3737 14.3589 63.4098 15.0609 63.6698L15.5928 63.8668C16.9329 64.3632 17.8458 65.6134 17.9105 67.041L17.9362 67.6076C17.9702 68.3554 19.0063 68.517 19.2663 67.815L19.4633 67.2831C19.9597 65.943 21.2099 65.0301 22.6375 64.9653Z"
                  fill="#FFD43E"
                />
                <path
                  d="M72.9871 12.1589L75.1117 10.8767C76.1147 10.2713 75.5629 8.72598 74.4033 8.8928L71.947 9.24632C69.5265 9.59465 67.1326 8.46054 65.8691 6.36686L64.5868 4.24224C63.9815 3.23927 62.4361 3.79107 62.603 4.95065L62.9565 7.40689C63.3048 9.82738 62.1707 12.2213 60.077 13.4849L57.9524 14.7671C56.9494 15.3725 57.5012 16.9178 58.6608 16.751L61.117 16.3975C63.5375 16.0491 65.9314 17.1832 67.195 19.2769L68.4772 21.4015C69.0826 22.4045 70.6279 21.8527 70.4611 20.6931L70.1076 18.2369C69.7592 15.8164 70.8934 13.4226 72.9871 12.1589Z"
                  fill="#FFD43E"
                />
                <path
                  d="M17.4118 29.1335L19.4644 28.7577C20.4335 28.5804 20.4597 27.2007 19.4981 26.9867L17.4611 26.5332C15.4539 26.0864 13.909 24.4818 13.5387 22.459L13.1629 20.4064C12.9855 19.4373 11.6058 19.4111 11.3919 20.3728L10.9385 22.4097C10.4916 24.4169 8.88702 25.9618 6.86422 26.3321L4.81158 26.7079C3.84251 26.8853 3.81632 28.265 4.77797 28.479L6.81487 28.9324C8.82216 29.3793 10.3671 30.9838 10.7373 33.0066L11.1131 35.0593C11.2905 36.0283 12.6702 36.0545 12.8841 35.0929L13.3376 33.056C13.7844 31.0488 15.3892 29.5038 17.4118 29.1335Z"
                  fill="#FFD43E"
                />
              </svg>
            </div>
            <div className={styles.colTitle}>Invite Friends. Earn Rewards</div>
            <div className={styles.text}>
              Both you and your friend will be eligible for <strong>$5</strong>{" "}
              worth of tokens of random person traded on the platform. Once your
              friend signs up with a referral link and spends at least $10
              purchasing any asset on the platform, both they and you will
              immediately receive a reward.
            </div>
            <div className={styles.inviteFormContainer}>
              <div className={styles.label}>
                Send your friend an invite email
              </div>
              <InviteForm styles={styles} />
            </div>
          </div>
          <div className={styles.rightCol}>
            <TrackInvitesBlock data={invitesData} />
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default Invite;
