const mocha = require('mocha');
const chai = require('chai');
const plugins = require('../lib/plugins').plugins;

chai.should();


describe('Plugins', () => {
    describe('Integer', () => {
        it('should return an integer', (done) => {
            for (let i = 0; i < 10000; i += 1) {
                const tmp = plugins.integer.type(1, 32, true);

                Number.isInteger(tmp).should.equal(true, 'not integer');
            }
            done();
        });

        it('should return integer in range [1, 32]', (done) => {
            for (let i = 0; i < 10000; i += 1) {
                const tmp = plugins.integer.type(1, 32, true);

                tmp.should.within(1, 32, 'integer out of range');
            }
            done();
        });
    });
    describe('Float', () => {
        it('should return a float', (done) => {
            for (let i = 0; i < 10000; i += 1) {
                const tmp = plugins['float'].type(1, 32);

                tmp.should.be.a('number', 'float is not a number');
            }
            done();
        });

        it('should return float in range (1, 32)', (done) => {
            for (let i = 0; i < 10000; i += 1) {
                const tmp = plugins['float'].type(1, 32);

                tmp.should.within(1, 32, 'float out of range');
            }
            done();
        });

        it('hard to test fix if using * 100', (done) => {
            done();
        });
    });
    describe('Boolean', () => {
        it('return ', (done) => {
            for (let i = 0; i < 10000; i += 1) {
                const tmp = plugins['boolean'].type();

                tmp.should.be.a('boolean', 'not only boolean');
            }
            done();
        });
    });
    describe('Chinese', () => {
        it('return chinese', (done) => {
            console.log(plugins.chinese.type());
            done();
        });
        it('has length of 2', (done) => {
            for (let i = 0; i < 10000; i += 1) {
                const tmp = plugins.chinese.type(2);

                tmp.should.have.lengthOf(2);
            }
            done();
        });
    });
    describe('String', () => {
        it('return string', (done) => {
            for (let i = 0; i < 10000; i += 1) {
                const tmp = plugins.string.type();

                tmp.should.be.a('string', 'not string');
            }
            done();
        });
        it('return string with pattern', (done) => {
            for (let i = 0; i < 10000; i += 1) {
                const tmp1 = plugins.string.type(/abc\d/);
                const tmp2 = plugins.string.type('abc\\d');
                tmp1.should.match(/abc\d/, 'regex pattern not match /abc\d/');
                tmp2.should.match(/abc\d/, 'string pattern not match /abc\d/');
            }
            done();
        });
    });
    describe('Date', () => {
        it('should return date', (done) => {
            for (let i = 0; i < 10000; i += 1) {
                const tmp = plugins.date.type();

                tmp.should.be['instanceof'](Date);
            }
            done();
        });
        it('should return date in range 2016-10-01 ~ 2016-10-31', (done) => {
            for (let i = 0; i < 10000; i += 1) {
                const tmp = plugins.date.type('2016-10-01', '2016-10-31');

                tmp.should.within(new Date('2016-10-01'), new Date('2016-10-31'));
            }
            done();
        });
    });
});


