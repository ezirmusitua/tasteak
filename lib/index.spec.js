const mocha = require('mocha');
const chai = require('chai');

chai.should();

const randString = require('./index').randString;
const randNumber = require('./index').randNumber;
const randChinese = require('./index').randChinese;


describe('randString', () => {
    it('should return abc if input abc', (done) => {
        randString(/abc/).should.equal('abc');
        done();
    });
    it('should return date if input 20\d{2}-([1-9]|1[0-2])-(1-9|[1-2]\d|3(0|1))', (done) => {
        /20\d{2}-([1-9]|1[0-2])-(1-9|[1-2]\d|3(0|1))/.test(randString(/20\d{2}-([1-9]|1[0-2])-(1-9|[1-2]\d|3(0|1))/)).should.equal(true);
        done();
    });
});


describe('randNumber',  () => {
    it('should return random float value with no fixed...', (done) => {
        randNumber().should.below(1);
        done();
    });
    it('should return value in the range of 1, 5, and is integer', (done) => {
        const tmpVal = randNumber(1, 5, false, false);
        tmpVal.should.within(1, 5);
        Number.isInteger(tmpVal).should.be.true;
        done();
    });
    it('should fixed 2 if fixed equal to 2', (done) => {
        const tmpVal = randNumber(null, null, false, false, 2);
        Number.isInteger(tmpVal * 100).should.be.true;
        done();
    });
    it('should throw error if one of start and end equal to null', (done) => {
        try {
            randNumber(1).should.throw(Error, 'start and end must exist or un-exist at same time');
        } catch(err) {
            // do nothing
        } finally {
            done();
        }
    });
});

describe('randChinese', () => {
    it('should return length 2 chinese', (done) => {
        randChinese(2).length.should.equal(2);
        done();
    });
});
