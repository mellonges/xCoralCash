export default async  function addTokenForMetaMask() {
    try {
        console.log("work")
        const wasAdded = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: process.env.NEXT_PUBLIC_XCORAL, // The address that the token is at.
                    symbol: "XCORAL", // A ticker symbol or shorthand, up to 5 chars.
                    decimals: 9, // The number of decimals in the token
                    image: process.env.NEXT_PUBLIC_XCORAL_ICON_FOR_METAMASK, // A string url of the token logo
                },
            },
        });

        if (wasAdded) {
            console.log('Thanks for your interest!');
        } else {
            console.log('Your loss!');
        }
    } catch (error) {
        console.log(error);
    }
}