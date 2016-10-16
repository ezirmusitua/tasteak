const schemaTypeChecker = (value) => {
    if (typeof value === 'function') {
        return typeof value();
    }
    return typeof value;
};

const typeConstructor = (schema) => {
    console.log(123123);
    if (typeof schema !== 'object') {
        return typeof schema;
    }
    const returnType = {};
    for (const key in schema) {
        if (schema.hasOwnProperty(key)) {
            const _schema = schema[key];
            if (schemaTypeChecker(_schema) === 'number') {
                returnType[key] = 'number';
            }
            if (schemaTypeChecker(_schema) === 'string') {
                returnType[key] = 'string';
            }
            if (schemaTypeChecker(_schema) === 'boolean') {
                returnType[key] = 'boolean';
            }
            if (Array.isArray(_schema)) {
                returnType[key].type = 'array';
                returnType[key].subType = typeConstructor(_schema);
            }
            if (schemaTypeChecker(_schema) === 'object' && !Array.isArray(_schema)) {
                returnType[key].type = 'object';
                returnType[key].subType = typeConstructor(_schema);
            }
        }
    }
    return returnType;
};

exports.typeConstructor = typeConstructor;