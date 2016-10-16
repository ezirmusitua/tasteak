const mocha = require('mocha');
const chai = require('chai');

chai.should();

const typeConstructor = require('./index').typeConstructor;

const testVal1 = {
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
    interest: 'stringArray',
    age: 'number'
};


describe('Type constructor', () => {
    it('should return type structure ', (done) => {
        typeConstructor(testVal1).should.deep.equal(testVal2);
        done();
    });
});
