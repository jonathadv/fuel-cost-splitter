const asNumber = value => {
    const strNumber = value.toString();
    if (strNumber.indexOf(',') > -1) {
        return Number(strNumber.replace(',', '.'));
    }
    return Number(value);
};

const asDistance = (value, i18n) => {
    let strNumber = value.toString();
    if (strNumber.indexOf('.') > -1) {
        strNumber =  strNumber.replace('.', i18n.math.decimalSeparator);
    }
    return strNumber;
};


const asCurrency = (value, i18n) => {
    const strNumber = value.toString();
    return strNumber.replace('.', i18n.math.decimalSeparator);
};

const gtZero = value => {
    return asNumber(value) > 0;
};

module.exports = {
    asNumber,
    asDistance,
    asCurrency,
    gtZero
}
