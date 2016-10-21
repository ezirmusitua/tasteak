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

    _generateOne () {
        return generateData(this.typeStructure, this.plugins);
    }

    run (count = 1) {
        let returnVal = null;

        if (count === 1) {
            returnVal = this._generateOne();
        } else {
            returnVal = Array.from({length: count}, () => this._generateOne());
        }
        return returnVal;
    }
}

exports.DataGenerator = DataGenerator;
