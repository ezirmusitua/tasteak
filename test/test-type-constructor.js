const mocha = require('mocha');
const chai = require('chai');
const constructType = require('../lib/type-constructor').constructSchemaType;

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

describe('Type Constructor', () => {
    it('should return type structure ', (done) => {
        const tmp = constructType(testVal1);
        console.log(tmp);

        tmp.should.deep.equal(testVal2);
        done();
    });
});
