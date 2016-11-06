const CHINESE = require('./chinese-chars').CHINESE;
const randexp = require('randexp').randexp;
const INFINITY = 9999999999;

/**
 * @function generateRandomInteger
 * @param {Integer} start - random integer's min value
 * @param {Integer} end - random integer's max value
 * @param {Boolean} [included=false] - will result include max value
 * @returns {Integer} random integer
 * @description Generate random integer in range[start, end]
 */
const generateRandomInteger = (start, end, included = false) => {
    let returnInt = Math.random();
    let _start = start;
    let _end = end;

    if (_start === null) {
        _start = -INFINITY;
    }
    if (_end === null) {
        _end = INFINITY;
    }
    _start = Math.ceil(_start);

    _end = Math.floor(_end);

    if (included) {
        returnInt = Math.floor((returnInt * (_end - _start)) + _start);
    } else {
        returnInt = Math.floor((returnInt * (_end - _start - 1)) + _start);
    }
    return returnInt;
};

/**
 * @function generateRandomFloat
 * @param {Integer} start - random float's min value
 * @param {Integer} end - random float's ceil value
 * @param {Boolean} fixed - if given will set fix for return float
 * @returns {Integer} random float
 * @description Generate random float in range[start, end]
 */
const generateRandomFloat = (start, end, fixed = null) => {
    let returnFloat = Math.random();
    let _start = start;
    let _end = end;

    if (_start === null) {
        _start = -INFINITY;
    }
    if (_end === null) {
        _end = INFINITY;
    }
    if (fixed && !Number.isInteger(fixed)) {
        throw new Error('fixed should be an integer');
    }
    returnFloat = (returnFloat * (_end - _start - 1)) + _start;
    if (fixed) {
        returnFloat = parseFloat(returnFloat.toFixed(fixed));
    }

    return returnFloat;
};

/**
 * @function randomBoolean
 * @returns {Integer} random boolean
 * @description Generate random boolean
 */
const generateRandomBoolean = () => Math.random() > 0.5;

/**
 * @function generateRandomChinese
 * @param {Integer} len - length of the return chinese string
 * @returns {Integer} random chinese string
 * @description Generate random chinese string with specific length
 */
const generateRandomChinese = (len = 3) => {
    let returnString = '';

    for (let i = 0; i < len; i += 1) {
        returnString += CHINESE[generateRandomInteger(0, CHINESE.length)];
    }
    return returnString;
};

/**
 * @function generateRandomString
 * @param {regex} regex - the regex pattern of expected string
 * @returns {Integer} random string
 * @description Generate random string match the given regex
 */
const generateRandomString = (regex = /\w{1,8}/) => randexp(regex);

/**
 * @function getTimeStampWithStr
 * @param {String} dateStr - a string used to indicate a date
 * @returns {Integer} timestamp accord to input date string
 * @description get date timestamp accord to input date string
 */
const getTimeStampWithDateStr = (dateStr, defaultTime = 0) => {
    let timeStamp = defaultTime;

    if (dateStr !== null) {
        if (typeof dateStr !== 'string') {
            throw new Error('start date must be a string');
        }
        timeStamp = (new Date(dateStr)).getTime();
    }
    return timeStamp;
};

/**
 * @function generateRandomDate
 * @param {String} startDateStr - the floor of random date
 * @param {String} endDateStr - the ceil of random date
 * @param {Boolean} [included=false] - will result include max value
 * @returns {Integer} random integer
 * @description generate random Date object, if no dateRange parameter,
 * the default date range was 1969/12/31 19:00:00 to 2099/12/30 11:59:00
 */
const generateRandomDate = (startDateStr = null, endDateStr = null) => {
    const startTimeStamp = getTimeStampWithDateStr(startDateStr);
    const endTimeStamp = getTimeStampWithDateStr(endDateStr, 4102333140000);

    return new Date(generateRandomInteger(startTimeStamp, endTimeStamp));
};

exports.plugins = {
    integer: { type: generateRandomInteger },
    float: { type: generateRandomFloat },
    boolean: { type: generateRandomBoolean },
    chinese: { type: generateRandomChinese },
    string: { type: generateRandomString },
    date: { type: generateRandomDate },
};
