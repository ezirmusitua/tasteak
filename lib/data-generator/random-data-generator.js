const randGen = require('../random-generator/index').randGen;
const isArray = Array.isArray;
const getRandValue = (_type) => {
    let _returnJson = null;

    if (_type === 'string') {
        _returnJson = randGen.randString(/[\w\d]{1,5}/);
    } else if (_type === 'number') {
        _returnJson = randGen.randNumber(0, 200);
    } else if (_type === 'boolean') {
        _returnJson = randGen.randBoolean();
    } else if (_type === 'chinese') {
        _returnJson = randGen.randChinese(5);
    } else {
        _returnJson = randGen.stringPlugins[_type]();
    }

    return _returnJson;
};

const generateRandData = (typeJson, pluginDict) => {
    const returnJson = {};
    if (typeof typeJson !== 'object') {
        return getRandValue(typeJson);
    }

    for (const key in typeJson) {
        if (!typeJson.hasOwnProperty(key)) {
            continue;
        }
        let _type = typeJson[key];

        if (pluginDict[key]) {
            _type = pluginDict[key];
        }

        if (typeof _type !== 'object' && !isArray(_type)) {
            returnJson[key] = getRandValue(_type);
        }
        if (isArray(_type)) {
            returnJson[key] = [];
            for (let i = 0; i < 12; i += 1) {
                returnJson[key].push(generateRandData(_type[0], pluginDict));
            }
        }
        if (typeof _type === 'object' && !isArray(_type)) {
            returnJson[key] = generateRandData(_type, pluginDict);
        }
    }
    return returnJson;
};

exports.generateRandData = generateRandData;
