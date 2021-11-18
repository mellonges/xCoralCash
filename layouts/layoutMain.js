import Head from "next/head";
import React from "react";
import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: "GTM-56RM2D3",
};
if (typeof document !== "undefined") TagManager.initialize(tagManagerArgs);

const LayoutMain = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="wrapper">{children}</div>
    </>
  );
};

export default LayoutMain;
