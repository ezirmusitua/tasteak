const prePluginType = ['string', 'integer', 'float', 'boolean', 'date', 'chiese'];
const constructSchemaType = require('./type-constructor').constructSchemaType;
const randString = require('./plugins').plugins.string;
const isArray = Array.isArray;
const getRandValue = (key, _type, pluginDict) => {
    const _returnJson = null;
    const generateMethod = null;
};

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

function dataGenerator (schema) {
    const self = this;

    this.typeStructure = constructSchemaType(schema);

    function usePlugins (plugins) {
        if (!isArray(plugins)) {
            throw new Error('plugins must be array');
        }
        self.plugins = plugins;
    }
    function generateRandomData (count) {
        if (count !== null && typeof count !== 'number') {
            throw new Error('data count must be number');
        }
        let data = [];

        if (count === null) {
            data = _generateData(self.typeStructure, self.plugins);
        } else {
            data = Array.from({length: count}, () => _generateData(
                self.typeStructure, self.plugins));
        }
    }
    function saveRandomDataToFile (filePath, count) {

    }

    this.plugins = [];
    this.use = usePlugins;
    this.generate = generateRandomData;
    this.save = saveRandomDataToFile();
}
exports.generateRandData = generateRandData;
