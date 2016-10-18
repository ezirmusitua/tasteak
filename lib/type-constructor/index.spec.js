const mocha = require('mocha');
const chai = require('chai');

chai.should();

const typeConstructor = require('./index').typeConstructor;
const generateRandData = require('./index').generateRandData;

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
        const constructResult = typeConstructor(testVal1);
        console.log(constructResult);
        constructResult.should.deep.equal(testVal2);
        done();
    });
});


describe('Random Json Generator', () => {
    it('should return random json data', (done) => {
        const constructResult = typeConstructor(testVal1);
        const randJson = generateRandData(constructResult, {sex: 'Email', chinese: {first: 'chinese', last: 'chinese'}});
        console.log(randJson);
        done();
    });
});
