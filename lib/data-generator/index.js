const fs = require('fs');
const constructType = require('./type-constructor').constructTypeStructure;
const generateData = require('./random-data-generator').generateRandData;

class DataGenerator {
    constructor (schema, plugins = {}) {
        this.updateType(schema);
        this.plugins = plugins;
    }

    updateType (newSchema) {
        if (!newSchema) {
            throw new Error('Invalid schema input!');
        }
        this.typeStructure = constructType(newSchema);
    }

    addPlugin (newPlugin) {
        if (newPlugin) {
            Object.assign(this.plugins, newPlugin);
        }
    }

    _generateOne () {
        return generateData(this.typeStructure, this.plugins);
    }

    create (count = 1) {
        if (count < 1) {
            throw new Error('Invalid count');
        }
        let returnVal = null;

        if (count === 1) {
            returnVal = this._generateOne();
        } else {
            returnVal = Array.from({length: count}, () => this._generateOne());
        }
        return returnVal;
    }

    save (count, filePath) {
        if (count < 1) {
            throw new Error('Invalid count');
        }
        const randomData = this.create(!count ? 1 : count);

        fs.writeFile(filePath, JSON.stringify(randomData));
    }
}

exports.DataGenerator = DataGenerator;
exports.constructTypeStructure = constructType;
exports.generateRandData = generateData;
