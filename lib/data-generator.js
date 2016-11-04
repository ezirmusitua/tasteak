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
    const hasTypekey = Object.keys(plugin).indexOf('type');

    if (!hasTypekey) {
        checkResult.valid = false;
        checkResult.desc = 'plugin ' + plugin + 'must have key `type`';
    }
    const hasValidParams = plugin.hasOwnProperty('params') && Array.isArray(plugin.params);

    if (hasValidParams) {
        checkResult.valid = false;
        checkResult.desc = 'params property must be an array';
    }
    const hasValidCount = plugin.hasOwnProperty('count') && typeof plugin.count === 'number';

    if (hasValidCount) {
        checkResult.valid = false;
        checkResult.desc = 'count property must be an number';
    }
    return checkResult;
}

/**
 * @function convertToFunction
 * @param {constant | regex | reserved} target - the target that need to convert to function
 * @description convert target to function
 */
function convertToFunction (target) {
    if (target instanceof RegExp) {
        return () => randString(target);
    }
    if (typeof target === 'string' && prePluginType.indexOf(target) > -1) {
        return Plugin[target].type;
    }
    return () => target;
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
            self.pluginDict[key] = plugin;
            if (typeof plugin.type !== 'function') {
                self.pluginDict[key].type = convertToFunction(plugin.type);
            }
        }
    }

    /**
     * @function generateRandomData
     * @description generate special count of random data according to given schema
     * @param {Integer} count - count of random data
     * @returns {Any} - Array/Object/Else
     */
    function generateRandomData (count) {
        for (const key in self.typeStructure) {
            if (!self.typeStructure.hasOwnProperty(key)) {
                continue;
            }
            const _type = self.typeStructure[key];
            // TODO: judge is object or array at first
            // if object, call method recursively
            // if array, call multi times
            // else call generator
            let _generator = self.pluginDict[_type].type;
            if (self.pluginDict.hasOwnProperty(key)) {
                _generator = self.pluginDict[key].type;
            }
            _generator();
        }
        return;
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
