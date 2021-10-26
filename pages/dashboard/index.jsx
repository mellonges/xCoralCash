import React from 'react';
import MainLayout from "../../layouts/MaintLayout";
import WalletTopBlock from "@/components/account/WalletTopBlock";
import styles from "@/styles/pages/account/Wallet.module.scss";
import {Button, Table} from "reactstrap";
import shortid from "shortid";
import moment from "moment";
import {formatPrice, getTokenIconUrl} from "@/functions/helpers";
import TooltipComponent from "@/components/common/Tooltip";
import Placeholder from "@/components/common/Placeholder";
import TransfersMobileTable from "@/components/account/wallet/TransfersMobileTable";
import Graph from "../../components/Graph/Graph";

const Index = () => {
    return (
        <div>
            <MainLayout pageTitle={"Dashboard"}>
                <div className={styles.Wallet}>
                    <h1 className={styles.pageTitle}>Wallet</h1>

                    <WalletTopBlock  />

                    <div className={styles.contentInner}>

                        {/*<Graph />*/}

                        </div>
                    </div>
            </MainLayout>
        </div>
    );
};

export default Index;