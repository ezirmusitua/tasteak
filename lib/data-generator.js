const isArray = Array.isArray;

const schemaTypeChecker = (_schema, target) => {
    const _type = typeof _schema === 'function' ? _schema() : _schema;

    return (typeof _type) === target;
};

const getSchemaType = (_schema) => {
    let returnVal = 'undefined';

    if (schemaTypeChecker(_schema, 'number')) {
        returnVal = 'number';
    }
    if (schemaTypeChecker(_schema, 'string')) {
        returnVal = 'string';
    }
    if (schemaTypeChecker(_schema, 'boolean')) {
        returnVal = 'boolean';
    }
    if (isArray(_schema)) {
        returnVal = [];
    }
    if (schemaTypeChecker(_schema, 'object') && !isArray(_schema)) {
        returnVal = {};
    }
    return returnVal;
};

const constructSchemaType = (schema) => {
    const returnType = {};

    if (!schemaTypeChecker(schema, 'object')) {
        return typeof schema === 'function' ? schema() : schema;
    }
    for (const key in schema) {
        if (schema.hasOwnProperty(key)) {
            const _schema = schema[key];

            returnType[key] = getSchemaType(_schema);
            if (isArray(returnType[key])) {
                returnType[key].push(constructSchemaType(_schema[0]));
            }
            if (typeof returnType[key] === 'object' && !isArray(returnType[key])) {
                returnType[key] = constructSchemaType(_schema);
            }
        }
    }
    return returnType;
};

// A singlton to save plugins and generate

// A function to generate data

// A interface
