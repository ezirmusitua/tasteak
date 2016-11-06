const prePluginType = ['string', 'integer', 'float', 'boolean', 'date', 'chinese'];
const constructSchemaType = require('./type-constructor').constructSchemaType;
const Plugin = require('./plugins').plugins;
const randString = Plugin.string.type;
const isArray = Array.isArray;
const getRandValue = (key, _type, pluginDict) => {
    const _returnJson = null;
    const generateMethod = null;
};

/**
 * @function checkIsValidPluginDict
 * @description validate input plugin dict
 * @param {Dictionary} pluginDict - plugin dictionary
 * @returns {{valid: Boolean, desc: String}}
 */
function checkIsValidPluginDict (pluginDict) {
    const checkResult = {valid: true};

    if (typeof pluginDict !== 'object') {
        checkResult.valid = false;
        checkResult.desc = 'plugin dict must be an object';
    }
    if (Array.isArray(pluginDict)) {
        checkResult.valid = false;
        checkResult.desc = 'plugin dict can not be an array object';
    }
    if (pluginDict instanceof Date) {
        checkResult.valid = false;
        checkResult.desc = 'plugin dict can not be an date object';
    }
    if (pluginDict instanceof RegExp) {
        checkResult.valid = false;
        checkResult.desc = 'plugin dict can not be an regex object';
    }
    return checkResult;
}

/**
 * @function checkIsValidPlugin
 * @description check is input plugin object valid
 * @param {Object} plugin - plugin object
 * @returns {{valid: Boolean, desc: String}}
 */
function checkIsValidPlugin (plugin) {
    const checkResult = {valid: true};

    if (typeof plugin !== 'object') {
        checkResult.valid = false;
        checkResult.desc = 'plugins must be an object: ' + plugin;
    }
    const hasTypekey = Object.keys(plugin).indexOf('type') > -1;

    if (!hasTypekey) {
        checkResult.valid = false;
        checkResult.desc = 'plugin ' + plugin + 'must have key `type`';
    }
    if (plugin.hasOwnProperty('params')) {
        if (!Array.isArray(plugin.params)) {
            checkResult.valid = false;
            checkResult.desc = 'params property must be an array';
        }
    }
    if (plugin.hasOwnProperty('count')) {
        if (typeof plugin.count !== 'number') {
            checkResult.valid = false;
            checkResult.desc = 'count property must be an number';
        }
    }
    return checkResult;
}

/**
 * @function convertToFunction
 * @param {constant | regex | reserved} target - the target that need to convert to function
 * @description convert target to function
 */
function convertToFunction (plugin) {
    let typeGenerator = null;

    if (plugin.type instanceof RegExp) {
        typeGenerator = () => randString(plugin.type);
    } else if (typeof plugin.type === 'string' && prePluginType.indexOf(plugin.type) > -1) {
        typeGenerator = Plugin[plugin.type].type;
    } else if (typeof plugin.type === 'function') {
        if (plugin.hasOwnProperty('params')) {
            typeGenerator = () => plugin.type(...plugin.params);
        } else {
            typeGenerator = () => plugin.type();
        }
    } else {
        typeGenerator = () => plugin.type;
    }
    return typeGenerator;
}

/**
 * @function _generateRandomData
 * @description generate random data using given type and plugins
 * @param {Object} typeStructure - object use to indicate type
 * @param {Object} pluginDict - object that contain plugin use to generate specific type data
 * @returns {Object}
 */
function _generateRandomData (typeStructure, pluginDict) {
    const result = {};

    if (typeof typeStructure !== 'object') {
        return pluginDict[typeStructure].type();
    }
    for (const key in typeStructure) {
        if (!typeStructure.hasOwnProperty(key)) {
            continue;
        }
        const _type = typeStructure[key];

        if (pluginDict.hasOwnProperty(key)) {
            const _plugin = pluginDict[key];
            if (_plugin.hasOwnProperty('count')) {
                result[key] = Array.from({
                    length: _plugin.count
                }, (v, k) => _plugin.type());
            } else {
                result[key] = _plugin.type();
            }
        } else if (Array.isArray(_type)) {
            result[key] = Array.from({
                length: 3
            }, (v, k) => _generateRandomData(_type[0], pluginDict));
        } else if (typeof _type === 'object') {
            result[key] = _generateRandomData(_type, pluginDict);
        } else {
            result[key] = pluginDict[_type].type();
        }
    }
    return result;
}

const _generateData = (typeJson, pluginDict) => {
    const returnJson = {};

    if (typeof typeJson !== 'object') {
        return getRandValue(typeJson, pluginDict);
    }

    for (const key in typeJson) {
        if (!typeJson.hasOwnProperty(key)) {
            continue;
        }
        const _type = typeJson[key];

        if (isArray(_type)) {
            returnJson[key] = [];
            for (let i = 0; i < 12; i += 1) {
                returnJson[key].push(_generateData(key, pluginDict));
            }
        }
        if (typeof _type !== 'object' && !isArray(_type)) {
            returnJson[key] = getRandValue(_type, pluginDict);
        }

        if (typeof _type === 'object' && !isArray(_type)) {
            returnJson[key] = _generateData(_type, pluginDict);
        }
    }
    return returnJson;
};

function DataGenerator (schema) {
    const self = this;

    /**
     * @function usePlugins
     * @description convert read in plugins to self plugin dict
     * (ALL type attribute in plugin will be convert to function)
     * @param {Dictionary} pluginDict - plugin dictionary
     * @returns
     */
    function usePlugins (pluginDict) {
        const pluginDictValidation = checkIsValidPluginDict(pluginDict);

        if (!pluginDictValidation.valid) {
            throw new Error(pluginDictValidation.desc);
        }
        for (const key in pluginDict) {
            if (!pluginDict.hasOwnProperty(key)) {
                continue;
            }
            const plugin = pluginDict[key];
            const pluginValidation = checkIsValidPlugin(plugin);

            if (!pluginValidation.valid) {
                throw new Error(pluginValidation.desc);
            }
            self.pluginDict[key] = {};
            if (plugin.hasOwnProperty('count')) {
                self.pluginDict[key].count = plugin.count;
            }
            self.pluginDict[key].type = convertToFunction(plugin);
        }
    }

    /**
     * @function generateRandomData
     * @description generate special count of random data using given schema and plugins
     * @param {Integer} count - count of random data
     * @returns {Any} - Array/Object/Else
     */
    function generateRandomData (count = 1) {
        const tmp = Array.from({
            length: count
        }, (v, k) => _generateRandomData(self.typeStructure, self.pluginDict));

        return count === 1 ? tmp[0] : tmp;
    }

    /**
     * @function saveRandomDataToFile
     * @description save generated random data to file
     * @param {String} filePath - where you want to save the file
     * @param {Integer} count - count of random data
     */
    function saveRandomDataToFile (filePath, count) {
        return;
    }

    this.pluginDict = {};
    this.typeStructure = constructSchemaType(schema);
    this.use = usePlugins;
    this.generate = generateRandomData;
    this.save = saveRandomDataToFile;

    return this;
}

exports.DataGenerator = DataGenerator;
