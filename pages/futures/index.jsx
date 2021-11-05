import React, {useRef} from 'react';
import MainLayout from "../../layouts/MaintLayout";
import styles from "../../styles/pages/account/Wallet.module.scss"
import stylesFutures from "../../styles/pages/account/Futures/Futures.module.scss"
import {Button, Table} from "reactstrap";
import TransfersMobileTable from "@/components/account/wallet/TransfersMobileTable";
import TableBody from "../../components/Table/TableBody";

const Index = () => {
    const headlineRef = useRef({});
    return (
        <div>
            <MainLayout pageTitle={"Futures"}>
                <h2 className={stylesFutures.HeaderTitle}>Coral Futures</h2>
                <p className={stylesFutures.HeaderSubTitle}>Purchasing Coral futures enables you to maximize your gains. Instead of purchasing xCORAL tokens from SushiSwap or Uniswap, just deposit your assets directly into the Coral Treasury — this will yield you an equivalent amount of xCORAL tokens (principal) plus some bonus. The resulting rewards xCORAL tokens will be redeemable progressively as the future contract vests, up until it fully expires. Principal xCORAL tokens though will only become redeemable all at one tranche according to the principal term set by the contract.</p>
                <a className={stylesFutures.HeaderHrefBTN} href="#">How Futures works?</a>
                <h2 ref={headlineRef} className={styles.title}>
                    Assets
                </h2>
                <Table
                    borderless={true}
                    className={stylesFutures.TableFutures}
                >
                    <thead className={stylesFutures.HeadTable}>
                    <tr>
                        <th>ASSET</th>
                        <th>YIELD</th>
                        <th>DEPOSITED</th>
                        <th>REDEEMABLE XCORAL</th>
                        <th>MANAGE</th>
                    </tr>
                    </thead>
                        <TableBody disabled={false} nameCoin={"Bitcoin"} />
                        <TableBody disabled={false}  nameCoin={"Ethereum"}/>
                        <TableBody disabled={true}  nameCoin={"Solana"} />
                </Table>
            </MainLayout>
        </div>
    );
};

export default Index;