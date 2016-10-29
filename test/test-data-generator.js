const mocha = require('mocha');
const chai = require('chai');
const prePlugins = require('../lib/plugins').plugins;
function dataGenerator (schema) {
    this.usePlugins = function (plugins) {
        return [];
    };
    return {};
}

chai.use();

const testSchemaType = {
    sex: 'string',
    name: {
        chinese: {
            first: 'string',
            last: 'string'
        },
        english: {
            first: 'string',
            last: 'string'
        }
    },
    interest: ['string'],
    age: 'number'
};

const schemaKeys = ['sex', 'name', 'chinese', 'english', 'age', 'interest'];

describe('Data Generator?', () => {

    beforeEach((done) => {
        dataGenerator.usePlugins(prePlugins);
        done();
    });

    it('should generate random data for schema type', (done) => {
        const generator = dataGenerator(testSchemaType);
        const tmp = generator.generateRandomData();
        const tmp1 = generator.generateRandomData(3);

        console.log(tmp);
        tmp.should.have.any.keys(...schemaKeys);
        tmp.should.not.be['instanceof'](Array);
        console.log(tmp1);
        tmp1.should.have.lengthOf(3);
        done();
    });
});

