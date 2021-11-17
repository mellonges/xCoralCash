import React, { useEffect, useRef } from 'react';
import MainLayout from "../../layouts/MaintLayout";
import styles from "../../styles/pages/account/Wallet.module.scss"
import stylesFutures from "../../styles/pages/account/Futures/Futures.module.scss"
import { Button, Table } from "reactstrap";
import TransfersMobileTable from "@/components/account/wallet/TransfersMobileTable";
import TableBody from "../../components/Table/TableBody";
import TooltipComponent from "../../components/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import TableVoid from "../../components/TableVoid";
import { getFuturesTableInfo } from "../../redux/reducers/asyncActions/getFuturesTableInfo/getFuturesTableInfo";

const Index = () => {
    const dispatch = useDispatch()
    const isConnected = useSelector(({ store }) => store.isConnected)
    const address = useSelector(({ store }) => store.address)
    const futuresTableInfo = useSelector(({ store }) => store.futuresTableInfo)
    useEffect(() => {
        dispatch(getFuturesTableInfo())
    }, [isConnected, address])
    const headlineRef = useRef({});
    return (
        <div>
            <MainLayout pageTitle={"Futures"}>
                <h2 className={stylesFutures.HeaderTitle}>xCORAL Futures</h2>
                <p className={stylesFutures.HeaderSubTitle}>Purchasing Coral futures enables you to maximize your gains. Instead of purchasing xCORAL tokens from SushiSwap or Uniswap, just deposit your assets directly into the Coral Treasury — this will yield you an equivalent amount of xCORAL tokens (principal) plus some bonus. The resulting rewards xCORAL tokens will be redeemable progressively as the future contract vests, up until it fully expires. Principal xCORAL tokens though will only become redeemable all at one tranche according to the principal term set by the contract.</p>

                <a className={stylesFutures.HeaderHrefBTN} href="#">  How Futures works?</a>
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
                            <th>YIELD <TooltipComponent id={1} tooltTipContent={"ROI (Return on Investment) indicates the yield you’ll make after 15 days of bonding the asset of your choice. APY is calculated assuming you would reinvest bonding proceeds each 15 days (current ROI is assumed to not change during the year)"} /> </th>
                            <th>DEPOSITED <TooltipComponent id={2} tooltTipContent={"Indicates how many tokens that are pending all rewards to be accrued you have bonded"} /> </th>
                            <th>REDEEMABLE XCORAL <TooltipComponent id={3} tooltTipContent={"How many xCORAL tokens can be redeemed now, and how many are upcoming"} /> </th>
                            <th>MANAGE</th>
                        </tr>

                    </thead>
                    {/*<TableBody disabled={!isConnected} nameCoin={"Bitcoin"}  />*/}
                    {futuresTableInfo.init ? futuresTableInfo?.data.map(i => <TableBody disabled={isConnected && i.DEPOSITED_AND_REDEEMABLE.redeemable_xcoral} coinAddress={i?.coinAddress} asset={i?.DEPOSITED_AND_REDEEMABLE.asset} expiration={i.expiration} APY={i.yield} key={i.termsID} termsID={i.termsID} deposited={i?.DEPOSITED_AND_REDEEMABLE.deposited} redeemable_xcoral={i?.DEPOSITED_AND_REDEEMABLE.redeemable_xcoral} upcoming_xcoral={i?.DEPOSITED_AND_REDEEMABLE.upcoming_xcoral} />)
                        : [...Array(12)].map((v, i) => (
                            <tbody>
                                <tr key={i}>
                                    <td>
                                        <TableVoid width="39px" height="14px" />
                                    </td>
                                    <td>
                                        <div className="d-flex">
                                            <TableVoid
                                                width="32px"
                                                className={`rounded-circle ${styles.operationIcon}`}
                                                height="32px"
                                            />
                                            <div>
                                                <span className={styles.operationType}>
                                                    <TableVoid width="92px" height="15px" />
                                                </span>
                                                <span className={`${styles.date} d-block`}>
                                                    <TableVoid width="119px" height="15px" />
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <TableVoid height="40px" width="150px" />
                                    </td>
                                    <td className="text-right">
                                        <TableVoid
                                            width="92px"
                                            className="ml-auto"
                                            height="15px"
                                        />
                                        <span className={styles.equivalent}>
                                            <TableVoid
                                                width="119px"
                                                className="ml-auto"
                                                height="15px"
                                            />
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                </Table>
            </MainLayout>
        </div>
    );
};

export default Index;