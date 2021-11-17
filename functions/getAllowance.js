import XCORAL_ABI from "../ABI/xcoral.json";
import Web3 from "web3";
const web3 = new Web3(process.env.INFURA_NET)
const ERC20_CONTRACTS = {
    DAI: new web3.eth.Contract(XCORAL_ABI, process.env.NEXT_PUBLIC_DAI),
    USDC: new web3.eth.Contract(XCORAL_ABI, process.env.NEXT_PUBLIC_USDC),
    XCORAL_DAI_UNI_LP: new web3.eth.Contract(XCORAL_ABI, process.env.NEXT_PUBLIC_XCORAL_DAI_UNI_LP),
    SUIKO: new web3.eth.Contract(XCORAL_ABI, process.env.NEXT_PUBLIC_SUIKO),
    WETH: new web3.eth.Contract(XCORAL_ABI, process.env.NEXT_PUBLIC_WETH),
    xCORAL: new web3.eth.Contract(XCORAL_ABI, process.env.xCORAL),
}


export async function getAllowance(userAddress, ERC20) {
    switch (ERC20) {
        case process.env.NEXT_PUBLIC_DAI: {
            let result = await ERC20_CONTRACTS.DAI.methods.allowance(userAddress, process.env.NEXT_PUBLIC_FUTURES).call()
            return result
        }
        case  process.env.NEXT_PUBLIC_USDC: {
            let result = await ERC20_CONTRACTS.USDC.methods.allowance(userAddress, process.env.NEXT_PUBLIC_).call()
            return result
        }
        case process.env.NEXT_PUBLIC_XCORAL_DAI_UNI_LP: {
            let result = await ERC20_CONTRACTS.XCORAL_DAI_UNI_LP.methods.allowance(userAddress, process.env.NEXT_PUBLIC_FUTURES).call()
            return result
        }
        case process.env.NEXT_PUBLIC_SUIKO: {
            let result = await ERC20_CONTRACTS.SUIKO.methods.allowance(userAddress, process.env.NEXT_PUBLIC_FUTURES).call()
            return result
        }
        case process.env.NEXT_PUBLIC_WETH: {
            let result = await  ERC20_CONTRACTS.WETH.methods.allowance(userAddress, process.env.NEXT_PUBLIC_FUTURES).call()
            return result
        }
        case process.env.NEXT_PUBLIC_XCORAL: {
            let result = await ERC20_CONTRACTS.xCORAL.methods.allowance(userAddress, process.env.NEXT_PUBLIC_FUTURES).call()
            return result
        }
        default: return null
    }
}