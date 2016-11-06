const mocha = require('mocha');
const chai = require('chai');
const prePlugin = require('../lib/plugins').plugins;
const DataGenerator = require('../lib/data-generator').DataGenerator;

chai.should();

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

describe('Data Generator?', () => {
    describe('Use Plugin', () => {
        const tmp = DataGenerator(testSchemaType);
        beforeEach((done) => {
            tmp.use({});
            done();
        });

        it('should convert to pre plugin function in Plugin', (done) => {
            tmp.use({name: {type: 'chinese'}});
            tmp.pluginDict.name.type.should.equal(prePlugin.chinese.type);
            done();
        });

        it('should convert to generate constant function', (done) => {
            tmp.use({name: {type: 'abc'}, age: {type: 20}, isMale: {type: true}});
            tmp.pluginDict.name.type().should.equal('abc');
            tmp.pluginDict.age.type().should.equal(20);
            tmp.pluginDict.isMale.type().should.equal(true);
            done();
        });

        it('should convert regex to generate random regex function', (done) => {
            tmp.use({name: {type: /ab[cde]/}});
            ['abc', 'abd', 'abe'].indexOf(tmp.pluginDict.name.type()).should.above(-1);
            done();
        });

        it('should convert function with params if given params', (done) => {
            tmp.use({age: {type: (count) => count, params: [1]}});
            tmp.pluginDict.age.type().should.equal(1);
            done();
        });
    });

    describe('Generate Random For Given Schema?', () => {
        let tmp = DataGenerator(testSchemaType);
        beforeEach((done) => {
            tmp.use(prePlugin);
            done();
        });
        it('should generate random data', (done) => {
            console.log(tmp.generate());
            done();
        });
        it('should using given default to generate data', (done) => {
            tmp.use({first: {type: 'chinese'}});
            console.log('result: ', tmp.generate());
            done();
        });
        it('should using given default to generate data', (done) => {
            tmp.use({interest: {type: () => ['eat', 'sleep']}});
            console.log('result: ', tmp.generate());
            done();
        });
        it('should using given default to generate data', (done) => {
            tmp.use({interest: {type: () => ['eat', 'sleep']}});
            console.log('result: ', tmp.save('./test.json', 3));
            done();
        });
    });
});

