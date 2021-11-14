export default function getCoinName(address) {
    switch (address) {
        case process.env.NEXT_PUBLIC_DAI: {
            return "DAI"
        }
        case process.env.NEXT_PUBLIC_USDC: {
            return "USDC"
        }
        case process.env.NEXT_PUBLIC_XCORAL_DAI_UNI_LP: {
            return "xCORAL-DAI SLP"
        }
        case process.env.NEXT_PUBLIC_SUIKO: {
            return "SUIKO"
        }
        case process.env.NEXT_PUBLIC_WETH: {
            return "wETH"
        }
        case process.env.NEXT_PUBLIC_XCORAL: {
            return "xCOral"
        }
        default:
            return "coin_name";
    }
}