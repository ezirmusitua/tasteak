const isArray = Array.isArray;

const schemaTypeChecker = (value) => {
    if (typeof value === 'function') {
        return typeof value();
    }
    return typeof value;
};

const getSchemaType = (_schema) => {
    let returnVal = 'undefined';
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

const constructTypeStructure = (schema) => {
    const returnType = {};

    if (typeof schema !== 'object') {
        return schemaTypeChecker(schema);
    }
    for (const key in schema) {
        if (schema.hasOwnProperty(key)) {
            const _schema = schema[key];

            returnType[key] = getSchemaType(_schema);
            if (isArray(returnType[key])) {
                returnType[key].push(constructTypeStructure(_schema[0]));
            }
            if (typeof returnType[key] === 'object' && !isArray(returnType[key])) {
                returnType[key] = constructTypeStructure(_schema);
            }
        }
    }
    return returnType;
};

exports.constructTypeStructure = constructTypeStructure;
