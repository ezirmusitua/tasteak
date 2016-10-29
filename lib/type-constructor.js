const isArray = Array.isArray;

/**
 * @function schemaTypeChecker
 * @description check is _schema's type if target type
 * @param {Function | Any} _schema - schema need to check type
 * @param {String} target - target type
 * @return {Boolean} return true if _schema type equal to target, else false
 */
const schemaTypeChecker = (_schema, target) => {
    const _type = typeof _schema === 'function' ? _schema() : _schema;

    return (typeof _type) === target;
};

/**
 * @function getSchemaType
 * @description return schema's type
 * @param {Function | Any} _schema - schema need to judge type
 * @returns {String | Array | Object} -
 * return _schema type or [] if _schema is array or {} if _schema is object
 */
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

/**
 * @function constructSchemaType
 * @description construct schema's type recursively
 * @param {Any} schema - an mongoose schema object
 * @returns {Any} return an Object that contain schema's type info, can be use to generate random data
 */
const constructSchemaType = (schema) => {
    const returnType = {};

    if (!schemaTypeChecker(schema, 'object')) {
        const isFunction = typeof schema === 'function';
        return typeof (isFunction ? schema() : schema);
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

exports.constructSchemaType = constructSchemaType;
