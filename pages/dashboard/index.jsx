import React, {useEffect, useState} from 'react';
import MainLayout from "../../layouts/MaintLayout";
import WalletTopBlock from "../../components/WalletTopBlock";
import styles from "@/styles/pages/account/Wallet.module.scss";
import WalletMini from "../../components/WalletMini";
import BonusBlock from "../../components/BonusBlock";
import BonusBlockMobile from "../../components/BonusBlockMobile";
import {useDispatch, useSelector} from "react-redux";
import {getWalletInfo} from "../../redux/reducers/asyncActions/getWalletInfo/getCurrentPriceReducer";
import LoadingWalletInfo from "../../components/LoadingWalletInfo";


const Index = () => {
const dispatch = useDispatch()
    const xCoralBalance = useSelector(({store}) => store.xCoralBalance)
    const currentPrice = useSelector(({store}) => store.walletMiniInfo.currentPrice)
    const targetPrice = useSelector(({store}) => store.walletMiniInfo.targetPrice)
    const currentAPY = useSelector(({store}) => store.walletMiniInfo.currentAPY)
    const nextRebaseIn = useSelector(({store}) => store.walletMiniInfo.nextRebaseIn)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        dispatch(getWalletInfo())
    }, [currentPrice, targetPrice])

    return (

            <MainLayout pageTitle={"Dashboard"}>
                <div className={styles.Wallet}>
                    <h1 className={styles.pageTitle}>Wallet</h1>
                    <div className={styles.WalletMobile}>
                        <WalletTopBlock xCoralBalance={xCoralBalance}  />
                    </div>
                    <div className={styles.BonusMobile}>
                        <BonusBlock />
                    </div>
                    <div className={styles.BonusesMobile}>
                        <BonusBlockMobile />
                    </div>

                    <div className={styles.contentInner}>
                    <div className={styles.Wallet_Block}>

                        {  currentPrice && targetPrice &&  currentPrice && nextRebaseIn ? <>
                         <WalletMini walletInfo={{
                                "paymentMethodID": "USD",
                                "type": "wallet",
                                "amount": currentPrice,
                                "header": "Current Price",
                                "tooltipContent": "Average price of xCORAL as seen in the liquidity pools. Will be brought to the target price during the next rebase",
                        }} />
                         <WalletMini walletInfo={{
                                "paymentMethodID": "USD",
                                "type": "wallet",
                                "amount": targetPrice,
                                "header": "Target Price",
                                "tooltipContent": "The price that xCORAL should be worth at the moment. The target price keeps growing as time goes by. xCORAL real price will be brought to target during the next rebase",

                        }} />
                      <WalletMini walletInfo={{
                                "paymentMethodID": "USD",
                                "type": "wallet",
                                "amount": currentAPY,
                                "header": "Current APY",
                                "tooltipContent": "Current Annual Percentage Yield — in other words, how much your position will grow in a year. The APY represents the appreciation in xCORAL price. The value is changing constantly based on the protocol dynamics and external variables, but always stays positive — meaning that xCORAL price never goes down.",

                        }} />
                        <WalletMini walletInfo={{
                                "paymentMethodID": "USD",
                                "type": "wallet",
                                "amount": nextRebaseIn,
                                "header": "Next Rebase In",
                                "tooltipContent": "How soon the liquidity pool of xCORAL will be rebased, which will cause the price to reach its target level. Frequent rebases ensure that xCORAL continues to appreciate in value at a certain pace",
                        }} />
                            </> :
                        <>
                            <LoadingWalletInfo />
                            <LoadingWalletInfo />
                            <LoadingWalletInfo />
                            <LoadingWalletInfo />
                        </> }

                    </div>

                {/*<Graph />*/}
                                </div>
                            </div>
            </MainLayout>

    );
};

export default Index;