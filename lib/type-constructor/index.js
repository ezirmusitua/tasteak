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
        returnVal = {};
    }
    if (schemaTypeChecker(_schema) === 'object' && !isArray(_schema)) {
        returnVal = {};
    }
    return returnVal;
};

const typeConstructor = (schema) => {
    const returnType = {};

    if (typeof schema !== 'object') {
        return typeof schema;
    }
    for (const key in schema) {
        if (!schema.hasOwnProperty(key)) {
            continue;
        }
        const _schema = schema[key];
        returnType[key] = getSchemaType(_schema);
        if (typeof returnType[key] === 'object') {
            returnType[key] = typeConstructor(_schema);
        }
    }
    return returnType;
};

exports.typeConstructor = typeConstructor;
