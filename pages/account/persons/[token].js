import {
  faImdb,
  faInstagram,
  faTwitter,
  faWikipediaW,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "reactstrap";
import {
  getCurrentUser,
  getTokenImageUrl,
  getTokenInformation,
} from "../../../functions/getBackendData";
import { ChangeAccountTradeModalState } from "../../../functions/observers";

import AccountLayout from "../../../layouts/MaintLayout";
import styles from "../../../styles/pages/account/Token.module.scss";
import Placeholder from "../../components/common/Placeholder";

import Graph from "../../components/Person/Graph";

const Token = ({ token }) => {
  const [user, setUser] = useState();
  const [tokenInformation, setTokenInformation] = useState();
  const [fullTextActive, setFullTextActive] = useState();
  const [userBalance, setUserBalance] = useState(0);
  const router = useRouter();

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

  useEffect(() => {
    if (token)
      getTokenInformation(token, true)
        .then((res) => res.data.payload)
        .then((data) => {
          if (data.tickerInfo) setTokenInformation(data.tickerInfo);
          if (data.userHoldingQuantity)
            setUserBalance(data.userHoldingQuantity);
        })
        .catch((error) => {
          console.error(error);
          setTokenInformation({});
        });
  }, [token]);

  if (user === false) router.push("/");

  return user ? (
    <AccountLayout
      user={user}
      pageTitle={
        tokenInformation ? `${tokenInformation.name} Token` : "Loading..."
      }
    >
      <div className={styles.tokenPage}>
        <div
          className={`${styles.imageTitle} d-flex align-items-center  w-100`}
        >
          {tokenInformation ? (
            <img
              src={getTokenImageUrl(tokenInformation.ticker, "small")}
              alt={tokenInformation.ticker}
              className={styles.Image}
            />
          ) : (
            <Placeholder className={styles.Image} width="95px" height="95px" />
          )}
          <div className={styles.Title}>
            <strong className="d-block">
              {tokenInformation ? (
                tokenInformation.name
              ) : (
                <Placeholder width="200px" height="42px" />
              )}
            </strong>
            <span>
              {tokenInformation ? (
                `(${tokenInformation.ticker})`
              ) : (
                <Placeholder width="90px" height="30px" />
              )}
            </span>
          </div>
        </div>

        {tokenInformation ? (
          <div className={`${styles.balanceBlock} d-block d-md-none`}>
            <div
              className={`${styles.balance} d-flex align-items-center justify-content-between`}
            >
              <span>Balance</span>
              <div className={styles.amount}>
                {userBalance} {tokenInformation.ticker}
              </div>
            </div>
            <Button
              className={`${styles.tradeBtn} d-block w-100`}
              color="primary"
              onClick={() => {
                ChangeAccountTradeModalState({
                  isOpen: true,
                  token: tokenInformation,
                });
              }}
            >
              Trade {tokenInformation.name} token
            </Button>
          </div>
        ) : null}

        <div className="d-flex flex-wrap align-items-sm-start">
          <div className={styles.leftColumn}>
            <div className={styles.tokenGraphFull}>
              {tokenInformation ? (
                <Graph data={tokenInformation} />
              ) : (
                <Placeholder width="100%" height="311px" />
              )}
            </div>
            <div
              className={`${styles.aboutInformation} ${
                fullTextActive ? styles.activeText : ""
              }`}
            >
              <h2>About</h2>
              {tokenInformation ? (
                tokenInformation.description.length > 642 && !fullTextActive ? (
                  tokenInformation.description.substr(0, 642) + "..."
                ) : (
                  tokenInformation.description
                )
              ) : (
                <>
                  <Placeholder
                    width="100%"
                    className={styles.textRowPlaceholder}
                    height="20px"
                  />
                  <Placeholder
                    width="70%"
                    className={styles.textRowPlaceholder}
                    height="20px"
                  />
                  <Placeholder
                    className={styles.textRowPlaceholder}
                    width="75%"
                    height="20px"
                  />
                  <Placeholder
                    width="50%"
                    height="20px"
                    className={styles.textRowPlaceholder}
                  />
                  <Placeholder
                    width="90%"
                    height="20px"
                    className={styles.textRowPlaceholder}
                  />
                </>
              )}
            </div>
            {tokenInformation && tokenInformation.description.length > 642 ? (
              <a
                href="#"
                className={styles.showMoreTextBtn}
                onClick={(e) => {
                  e.preventDefault();
                  setFullTextActive(!fullTextActive);
                }}
              >
                {fullTextActive ? "Show less" : "Show more"}
              </a>
            ) : null}
            {tokenInformation && tokenInformation.social && (
              <div className={styles.socLnks}>
                <div className={styles.title}>Resources</div>
                {tokenInformation.social.tw && (
                  <a
                    href={tokenInformation.social.tw}
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles.socLink} tw-link`}
                  >
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className={styles.socIcon}
                    />
                    Twitter
                  </a>
                )}
                {tokenInformation.social.wiki && (
                  <a
                    href={tokenInformation.social.wiki}
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles.socLink} wiki-link`}
                  >
                    <FontAwesomeIcon
                      icon={faWikipediaW}
                      className={styles.socIcon}
                    />
                    Wikipedia
                  </a>
                )}
                {tokenInformation.social.inst && (
                  <a
                    href={tokenInformation.social.inst}
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles.socLink} wiki-link`}
                  >
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className={styles.socIcon}
                    />
                    Instagram
                  </a>
                )}
                {tokenInformation.social.imdb && (
                  <a
                    href={tokenInformation.social.imdb}
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles.socLink} wiki-link`}
                  >
                    <FontAwesomeIcon icon={faImdb} className={styles.socIcon} />
                    IMDb
                  </a>
                )}
              </div>
            )}
          </div>

          {tokenInformation ? (
            <div className={`${styles.balanceBlock} d-none d-md-block`}>
              <div className={`${styles.Info} d-flex align-items-center`}>
                <img
                  src={getTokenImageUrl(tokenInformation.ticker, "small")}
                  alt={tokenInformation.ticker}
                  className={styles.Image}
                />
                <div className={styles.title}>
                  <strong className={styles.name}>
                    {tokenInformation.name}
                  </strong>
                  <span className={styles.ticker}>
                    ({tokenInformation.ticker})
                  </span>
                </div>
              </div>
              <div
                className={`${styles.balance} d-flex align-items-center justify-content-between`}
              >
                <span>Balance</span>
                <div className={styles.amount}>
                  {userBalance} {tokenInformation.ticker}
                </div>
              </div>
              <Button
                className={`${styles.tradeBtn} d-block w-100`}
                color="primary"
                onClick={() => {
                  ChangeAccountTradeModalState({
                    isOpen: true,
                    token: tokenInformation,
                  });
                }}
              >
                Trade {tokenInformation.name} token
              </Button>
            </div>
          ) : null}
        </div>
        <div className={styles.informationBottom}>
          These materials and any information contained therein are provided for
          informational purposes only. They are not a recommendation by
          Humanbace to buy, sell, or hold any of the referenced tokens or
          instruments and should not be construed as investment, financial,
          trading or other advice. These materials may contain references to
          assets listed on the Humanbace exchange and a number of other
          cryptocurrency exchanges. Some of the content was prepared by third
          parties not affiliated with Humanbace or any of its subsidiaries.
          Humanbace is not responsible for such content. Humanbace is not
          responsible for any errors or delays in the submission of materials,
          or for any action taken based on those materials. Your acts or
          non-acts related to any aspect of the information involves known and
          unknown risks and uncertainties. Any trading you make based on any
          part of the information provided on this page may incur losses, and
          any final judgement on this shall be made by you. The responsibility
          for any acts or non-acts done by you in relation to this information
          shall be your sole responsibility. We, Humanbace, and any of our
          respective affiliates, officers, directors, employees, and agents
          shall not be liable or responsible for any losses, damages,
          liabilities, and indemnities in any kinds including, without
          limitation, costs, expenses, reasonable legal fees arising out of any
          claim or complaints in connection with your acts or non-acts related
          to the the information on this page.
        </div>
      </div>
    </AccountLayout>
  ) : null;
};

export default Token;

export async function getStaticProps(context) {
  return {
    props: {
      token: context.params.token,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          token: "PUTIN",
        },
      },
      {
        params: {
          token: "BEZOS",
        },
      },
      {
        params: {
          token: "KANYE",
        },
      },
      {
        params: {
          token: "ELON",
        },
      },
      {
        params: {
          token: "ADELE",
        },
      },
      {
        params: {
          token: "BILL",
        },
      },
      {
        params: {
          token: "BORIS",
        },
      },
      {
        params: {
          token: "BUFET",
        },
      },
      {
        params: {
          token: "BRITN",
        },
      },
      {
        params: {
          token: "CARDI",
        },
      },
      {
        params: {
          token: "DWAYN",
        },
      },
      {
        params: {
          token: "ELSA",
        },
      },
      {
        params: {
          token: "GOMEZ",
        },
      },
      {
        params: {
          token: "INDIL",
        },
      },
      {
        params: {
          token: "JAYZ",
        },
      },
      {
        params: {
          token: "JEN",
        },
      },
      {
        params: {
          token: "JORDY",
        },
      },
      {
        params: {
          token: "BEYON",
        },
      },
      {
        params: {
          token: "LOPEZ",
        },
      },
      {
        params: {
          token: "MA",
        },
      },
      {
        params: {
          token: "MACR",
        },
      },
      {
        params: {
          token: "MERK",
        },
      },
      {
        params: {
          token: "MESSI",
        },
      },
      {
        params: {
          token: "MODI",
        },
      },
      {
        params: {
          token: "NICKI",
        },
      },
      {
        params: {
          token: "PERRY",
        },
      },
      {
        params: {
          token: "PITT",
        },
      },
      {
        params: {
          token: "QUEEN",
        },
      },
      {
        params: {
          token: "QUENT",
        },
      },
      {
        params: {
          token: "REID",
        },
      },
      {
        params: {
          token: "RODG",
        },
      },
      {
        params: {
          token: "RONAL",
        },
      },
      {
        params: {
          token: "KHAB",
        },
      },
      {
        params: {
          token: "SEREN",
        },
      },
      {
        params: {
          token: "SCARL",
        },
      },
      {
        params: {
          token: "SOROS",
        },
      },
      {
        params: {
          token: "TRUD",
        },
      },
      {
        params: {
          token: "LEO",
        },
      },
      {
        params: {
          token: "REEV",
        },
      },
      {
        params: {
          token: "FLOYD",
        },
      },
    ],
    fallback: false,
  };
}
