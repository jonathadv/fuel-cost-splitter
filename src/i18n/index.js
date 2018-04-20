const get = require('lodash.get');

const langs = {
    pt: require('./pt_br'),
    en: require('./en_us'),
};

module.exports = lang => {
    return get(langs, lang.substring(0, 2), langs['en']);
};
