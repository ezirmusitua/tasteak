const CHINESE = require('./chinese-chars').CHINESE;
const randexp = require('randexp').randexp;
const INFINITY = 9999999999;

/**
 * @function randomInteger
 * @param {Integer} start - random integer's min value
 * @param {Integer} end - random integer's max value
 * @param {Boolean} [included=false] - will result include max value
 * @returns {Integer} random integer
 * @description Generate random integer in range[start, end]
 */
const randomInteger = (start, end, included = false) => {
    let returnInt = Math.random();
    let _start = start;
    let _end = end;

    if (_start === null) {
        _start = -INFINITY;
    }
    if (_end === null) {
        _end = INFINITY;
    }
    _start = Math.ceil(start);
    _end = Math.floor(end);

    if (included) {
        returnInt = Math.floor((returnInt * (_end - _start)) + _start);
    } else {
        returnInt = Math.floor((returnInt * (_end - _start - 1)) + _start);
    }
    return returnInt;
};

const randomFloat = (start, end, fixed = null) => {
    let returnFloat = Math.random();
    let _start = start;
    let _end = end;

    if (_start === null) {
        _start = -INFINITY;
    }
    if (_end === null) {
        _end = INFINITY;
    }
    returnFloat = (returnFloat * (_end - _start - 1)) + _start;
    if (fixed !== null) {
        returnFloat = returnFloat.toFixed(Math.floor(fixed));
    }
    return returnFloat;
};

const randomBoolean = () => Math.random() > 0.5;

const randomChinese = (len = 3) => {
    let returnString = '';

    for (let i = 0; i < len; i += 1) {
        returnString += CHINESE[randomInteger(0, CHINESE.length)];
    }
    return returnString;
};

const randomString = (regex) => randexp(regex);
