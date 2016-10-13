const randNumber = require('./random-number').randNumber;
const randString = require('./random-string').randString;
const randChinese = require('./random-chinese').randChinese;
const stringPlugins = require('./random-string').plugins;

exports.randGen = {
    randNumber,
    randChinese,
    randString,
    stringPlugins,
};
