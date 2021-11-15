import { useRouter } from "next/router";
import React from "react";
import styles from "../../../styles/pages/account/BottomNavMobile.module.scss";

const BottomNavigationMobile = () => {
  const router = useRouter();
  const links = [
    {
      icon: (
        <svg
          width="19"
          height="22"
          viewBox="0 0 19 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.8808 6.92899L10.995 0.578073C10.1599 -0.192122 8.84145 -0.19326 8.00511 0.578073L1.11922 6.92899C0.472379 7.52556 0 8.59901 0 9.47643V19.0028C0 20.167 0.949656 21.1111 2.11128 21.1111H7.40575C7.98872 21.1111 8.4613 20.6386 8.4613 20.0556V15.3482C8.4613 15.0567 8.6976 14.8204 8.98908 14.8204H10.0334C10.3249 14.8204 10.5612 15.0567 10.5612 15.3482V20.0556C10.5612 20.6386 11.0338 21.1111 11.6168 21.1111H16.8854C18.052 21.1111 19 20.1694 19 19.0028V9.47643C19 8.59881 18.529 7.52675 17.8808 6.92899ZM16.8859 18.4751C16.8856 18.7664 16.6494 19.0001 16.3582 19.0001H13.2002C12.9087 19.0001 12.6724 18.7638 12.6724 18.4723V13.2371C12.6724 12.9457 12.4361 12.7094 12.1446 12.7094H6.878C6.58652 12.7094 6.35022 12.9457 6.35022 13.2371V18.4724C6.35022 18.7639 6.11379 19.0001 5.82236 19.0002C4.28114 19.0008 3.21995 19.0016 2.6388 19.0022C2.34703 19.0025 2.11113 18.7661 2.11113 18.4743V9.47643C2.11113 9.1898 2.33607 8.67858 2.55051 8.48081L9.43639 2.12994C9.46366 2.10481 9.53654 2.10486 9.5637 2.12994L16.4496 8.48081C16.665 8.67952 16.889 9.18915 16.889 9.47643C16.8887 14.3349 16.8868 17.3345 16.8859 18.4751Z"
            fill="#658796"
          />
        </svg>
      ),
      text: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: (
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.2344 22.1252C21.0557 22.1252 22.562 20.743 22.7781 18.9647C22.7955 18.8929 22.8047 18.8179 22.8047 18.7407V18.524V7.97328C22.8047 5.98795 21.2036 4.37213 19.2344 4.37213H15.5977V4.33815C15.5977 2.35282 13.9966 0.737 12.0273 0.737H10.8848C8.91554 0.737 7.31445 2.35282 7.31445 4.33815V4.37213H3.76562C1.7964 4.37213 0.195312 5.98795 0.195312 7.97328V18.524C0.195312 20.5093 1.7964 22.1252 3.76562 22.1252H19.2344ZM19.9195 11.6539C20.2988 11.3452 20.6377 11.0367 20.9375 10.7406V18.524C20.9375 19.472 20.1729 20.2426 19.2344 20.2426H3.76562C2.82708 20.2426 2.0625 19.472 2.0625 18.524V10.6824C2.38795 10.998 2.75945 11.3297 3.17753 11.6611C5.98624 13.8888 8.77234 15.0276 11.5589 15.0372C14.3457 15.0469 17.1249 13.9273 19.9195 11.6539L19.885 11.6115L19.9195 11.6539ZM9.18164 4.33815C9.18164 3.3902 9.94622 2.61961 10.8848 2.61961H12.0273C12.9659 2.61961 13.7305 3.3902 13.7305 4.33815V4.37213H9.18164V4.33815ZM11.5879 12.7506C8.9449 12.7506 6.52102 11.9001 4.38235 10.2213C3.15541 9.25824 2.37619 8.28165 2.06633 7.85872C2.12508 6.96406 2.86517 6.25473 3.76562 6.25473H19.2344C20.1386 6.25473 20.8814 6.97005 20.9343 7.87017C20.2643 8.83048 17.1836 12.7506 11.5879 12.7506Z"
            fill="#658796"
            stroke="#658796"
            strokeWidth="0.109375"
          />
        </svg>
      ),
      text: "Futures",
      link: "/futures",
    },
    // {
    //   icon: (
    //       <svg
    //           width="11"
    //           height="22"
    //           viewBox="0 0 11 22"
    //           fill="none"
    //           xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //             d="M5.5 9.71429C3.71591 9.71429 2.27273 8.46305 2.27273 6.91626C2.27273 5.37931 3.71591 4.11823 5.5 4.11823C7.28409 4.11823 8.72727 5.36946 8.72727 6.91626C8.72727 7.45813 9.23864 7.90148 9.86364 7.90148C10.4886 7.90148 11 7.45813 11 6.91626C11 4.6601 9.18182 2.71921 6.63636 2.2463V0.985222C6.63636 0.44335 6.125 0 5.5 0C4.875 0 4.36364 0.44335 4.36364 0.985222V2.2463C1.39773 2.78818 -0.511365 5.3202 0.124999 7.90148C0.65909 10.1084 2.90909 11.6749 5.5 11.6847C7.28409 11.6847 8.72727 12.936 8.72727 14.4828C8.72727 16.0296 7.28409 17.2808 5.5 17.2808C3.71591 17.2808 2.27273 16.0296 2.27273 14.4828C2.27273 13.9409 1.76136 13.4975 1.13636 13.4975C0.511364 13.4975 0 13.9409 0 14.4828C0 16.7291 1.81818 18.6798 4.36364 19.1429V21.0148C4.36364 21.5567 4.875 22 5.5 22C6.125 22 6.63636 21.5567 6.63636 21.0148V19.1429C9.60227 18.5911 11.5 16.0591 10.875 13.4877C10.3409 11.2906 8.10227 9.71429 5.5 9.71429Z"
    //             fill="#658796"
    //         />
    //       </svg>
    //   ),
    //   text: "Add token",
    //   link: "/",
    // },
    // {
    //   icon: (
    //     <svg
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       className={styles.strokeIcon}
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M12 1L1 6.5L12 12L23 6.5L12 1Z"
    //         stroke="#658796"
    //         strokeWidth="1.936"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //       <path
    //         d="M1 17.5L12 23L23 17.5"
    //         stroke="#658796"
    //         strokeWidth="1.936"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //       <path
    //         d="M1 12L12 17.5L23 12"
    //         stroke="#658796"
    //         strokeWidth="1.936"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //     </svg>
    //   ),
    //   text: "Docs",
    //   link: "/docs",
    // },
    // {
    //   icon: (
    //     <svg
    //       width="27"
    //       height="20"
    //       viewBox="0 0 21 18"
    //          className={styles.strokeIcon}
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M14.8788 16.5405L14.8684 14.8173C14.8629 13.9033 14.4945 13.0289 13.8443 12.3865C13.1941 11.7441 12.3154 11.3863 11.4014 11.3918L4.50878 11.4333C3.59477 11.4388 2.72038 11.8072 2.07798 12.4574C1.43557 13.1076 1.07776 13.9864 1.08327 14.9004L1.09365 16.6235"
    //         stroke="#658796"
    //         strokeWidth="1.55093"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //       <path
    //         d="M7.9341 7.96457C9.83743 7.95311 11.3711 6.40086 11.3596 4.49753C11.3482 2.5942 9.7959 1.06054 7.89257 1.07201C5.98924 1.08348 4.45559 2.63573 4.46705 4.53906C4.47852 6.44239 6.03077 7.97604 7.9341 7.96457Z"
    //         stroke="#658796"
    //         strokeWidth="1.55093"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //       <path
    //         d="M20.0473 16.5096L20.0369 14.7865C20.0318 14.0229 19.7731 13.2827 19.3017 12.682C18.8302 12.0813 18.1726 11.6542 17.4321 11.4678"
    //         stroke="#658796"
    //         strokeWidth="1.55093"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //       <path
    //         d="M13.9243 1.14941C14.6668 1.33475 15.3264 1.76192 15.7993 2.36358C16.2721 2.96524 16.5313 3.70716 16.5359 4.47239C16.5405 5.23761 16.2903 5.9826 15.8247 6.58991C15.3592 7.19723 14.7047 7.63232 13.9645 7.82659"
    //         stroke="#658796"
    //         strokeWidth="1.55093"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //     </svg>
    //   ),
    //   text: "Invite",
    //   link: "/account/invite",
    // },
  ];

  const isActive = (link) => {
    return router.pathname.match(new RegExp(`^${link}$`, "gm"));
  };

  return (
    <div
      className={`${styles.bottomMobileNav} d-flex d-lg-none position-fixed justify-content-center`}
    >
      {links.map((navItem, k) => (
        <div
          key={k}
          className={`${styles.navItem} ${
            isActive(navItem.link) ? styles.active : ""
          } cursor-pointer d-flex flex-column align-items-center justify-content-center`}
          onClick={() => router.push(navItem.link)}
        >
          <div className={styles.icon}>{navItem.icon}</div>
          <span className={styles.linkText}>{navItem.text}</span>
        </div>
      ))}

        <a className={`${styles.navItem} 
           cursor-pointer d-flex flex-column align-items-center justify-content-center`} target="_blank" href="https://docs.xcoral.cash/">

        <div className={styles.icon}><svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={styles.strokeIcon}
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M12 1L1 6.5L12 12L23 6.5L12 1Z"
              stroke="#658796"
              strokeWidth="1.936"
              strokeLinecap="round"
              strokeLinejoin="round"
          />
          <path
              d="M1 17.5L12 23L23 17.5"
              stroke="#658796"
              strokeWidth="1.936"
              strokeLinecap="round"
              strokeLinejoin="round"
          />
          <path
              d="M1 12L12 17.5L23 12"
              stroke="#658796"
              strokeWidth="1.936"
              strokeLinecap="round"
              strokeLinejoin="round"
          />
        </svg></div>
        <span className={styles.linkText}>Docs</span>
        </a>
      </div>
  );
};
export default BottomNavigationMobile;
