const randNumber = require('./random-number').randNumber;
const fs = require('fs');
const chineseArray = fs.readFileSync('./data/chinese_chars.json');
const CHINESE_ARRAY = JSON.parse(chineseArray.toString());
const CHINESE_ARRAY_LENGTH = CHINESE_ARRAY.length;

exports.randChinese = (len) => {
    let returnString = '';

    for (let i = 0; i < len; i += 1) {
        returnString += CHINESE_ARRAY[randNumber(0, CHINESE_ARRAY_LENGTH)];
    }
    return returnString;
};
