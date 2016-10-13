const randexp = require('randexp').randexp;
const fs = require('fs');
const chineseArray = fs.readFileSync('./data/chinese_chars.json');
const CHINESE_ARRAY = JSON.parse(chineseArray.toString());
const CHINESE_ARRAY_LENGTH = CHINESE_ARRAY.length;

exports.randString = (regex) => randexp(regex);

exports.randChinese = (len) => {
    let returnString = '';

    for (let i = 0; i < len; i += 1) {
        returnString += CHINESE_ARRAY[randNumber(0, CHINESE_ARRAY_LENGTH)];
    }
    return returnString;
};

const randNumber = (start, end, included = false, isFloat = false, fixed = null) => {
    let returnNumber = Math.random();
    if (start != null && end != null) {
        if (!isFloat) {
            start = Math.ceil(start);
            end = Math.floor(end);
            if (included) {
                returnNumber = Math.floor((returnNumber * (end - start)) + start);
            } else {
                returnNumber = Math.floor((returnNumber * (end - start - 1)) + start);
            }
        }
    } else if (start == null && end == null) {
        returnNumber *= 1;
    } else {
        throw new Error('start and end must exist or un-exist at same time');
    }
    if (fixed != null) {
        returnNumber = returnNumber.toFixed(fixed);
    }
    console.log(returnNumber);
    return returnNumber;
};

exports.randNumber = randNumber;
