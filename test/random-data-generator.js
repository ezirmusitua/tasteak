const mocha = require('mocha');
const chai = require('chai');
const constructTypeStructure = require(
    '../lib/data-generator/index'
).constructTypeStructure;
const generateRandData = require(
    '../lib/data-generator/index'
).generateRandData;
const DataGenerator = require('../lib/data-generator/index').DataGenerator;


chai.should();

const testVal1 = {
    sex: () => '',
    name: {
        chinese: {
            first: () => '',
            last: () => ''
        },
        english: {
            first: () => '',
            last: () => ''
        }
    },
    interest: [() => ''],
    age: () => 0,
};

const testVal2 = {
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

describe('Type constructor', () => {
    it('should return type structure ', (done) => {
        const constructResult = constructTypeStructure(testVal1);
        console.log(constructResult);
        constructResult.should.deep.equal(testVal2);
        done();
    });
});


describe('Random Json Generator', () => {
    it('should return random json data', (done) => {
        const constructResult = constructTypeStructure(testVal1);
        const randJson = generateRandData(constructResult, {sex: 'Email', chinese: {first: 'chinese', last: 'chinese'}});
        console.log(randJson);
        done();
    });
});


describe('Data Generator?', () => {
    it('generator random data using class', (done) => {
        const dataGenerator = new DataGenerator(testVal1);
        const oneRandData = dataGenerator.create();
        const mulitRandData = dataGenerator.create(3);
        mulitRandData.should.have.lengthOf(3);
        console.log('single data', oneRandData);
        console.log('==========');
        for (const val of mulitRandData) {
            console.log('---------');
            console.log(val);
        }
        done();
    });
});
