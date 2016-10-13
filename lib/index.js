const randexp = require('randexp').randexp;

exports.randexp = randexp;

exports.randString = (regex) => {
    return randexp(regex);
};

exports.randNumber = (start, end, included = false, isFloat = false, fixed = null) => {
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
}
