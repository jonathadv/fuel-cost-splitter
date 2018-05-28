const asNumber = value => {
    const strNumber = value.toString();
    if (strNumber.indexOf(',') > -1) {
        return Number(strNumber.replace(',', '.'));
    }
    return Number(value);
};

const asCurrency = (value, decimalSeparator) => {
    const strNumber = value.toString();
    return strNumber.replace('.', decimalSeparator);
};

const gtZero = value => {
    return asNumber(value) > 0;
};

module.exports = {
    asNumber,
    asCurrency,
    gtZero
}
