const randGen = require('../random-generator/index').randGen;
const isArray = Array.isArray;

const schemaTypeChecker = (value) => {
    if (typeof value === 'function') {
        return typeof value();
    }
    return typeof value;
};

const getSchemaType = (_schema) => {
    let returnVal;
    if (schemaTypeChecker(_schema) === 'number') {
        returnVal = 'number';
    }
    if (schemaTypeChecker(_schema) === 'string') {
        returnVal = 'string';
    }
    if (schemaTypeChecker(_schema) === 'boolean') {
        returnVal = 'boolean';
    }
    if (isArray(_schema)) {
        returnVal = [];
    }
    if (schemaTypeChecker(_schema) === 'object' && !isArray(_schema)) {
        returnVal = {};
    }
    return returnVal;
};

const typeConstructor = (schema) => {
    const returnType = {};

    if (typeof schema !== 'object') {
        return schemaTypeChecker(schema);
    }
    for (const key in schema) {
        if (!schema.hasOwnProperty(key)) {
            continue;
        }
        const _schema = schema[key];

        returnType[key] = getSchemaType(_schema);
        if (isArray(returnType[key])) {
            returnType[key].push(typeConstructor(_schema[0]));
        }
        if (typeof returnType[key] === 'object' && !isArray(returnType[key])) {
            returnType[key] = typeConstructor(_schema);
        }
    }
    return returnType;
};

const getRandValue = (_type) => {
    let _returnJson = 'wrong';

    if (_type === 'string') {
        _returnJson = randGen.randString(/[\w\d]{1,30}/);
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

// todo: extract walk method
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

exports.typeConstructor = typeConstructor;
exports.generateRandData = generateRandData;
