export const formatBalance = (number) => {
    const options = { style: "currency", currency: "USD" };
    const numberFormat = new Intl.NumberFormat("en-US", options);

    return numberFormat.format(number);
};