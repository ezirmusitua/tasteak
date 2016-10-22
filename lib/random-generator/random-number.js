const INFINITY = 9999999999;
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
const randomFloat = (start, end, included = false, isFloat = false, fixed = null) => {
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
    if (fixed != null) {
        returnFloat = returnFloat.toFixed(fixed);
    }
    return returnFloat;
};

exports.randomInteger = randomInteger;
exports.randomFloat = randomFloat;
