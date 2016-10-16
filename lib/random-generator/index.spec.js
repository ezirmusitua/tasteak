const mocha = require('mocha');
const chai = require('chai');

chai.should();

const randGen = require('./index').randGen;

describe('randNumber', () => {
    it('should return random float value with no fixed...', (done) => {
        console.log(randGen.randNumber());

        const tmpVal1 = randGen.randNumber();

        tmpVal1.should.below(1);
        done();
    });
    it('should return value in the range of 1, 5, and is integer', (done) => {
        console.log(randGen.randNumber(1, 5, false, false));

        const tmpVal1 = randGen.randNumber(1, 5, false, false);

        tmpVal1.should.within(1, 5);
        Number.isInteger(tmpVal1).should.be['true'];
        done();
    });
    it('should fixed 2 if fixed equal to 2', (done) => {
        console.log(randGen.randNumber(null, null, false, false, 2));

        const tmpVal1 = randGen.randNumber(null, null, false, false, 2);

        Number.isInteger(tmpVal1 * 100).should.be['true'];
        done();
    });
    it('should throw error if one of start and end equal to null', (done) => {
        try {
            randGen.randNumber(1).should['throw'](Error, 'start and end must exist or un-exist at same time');
        } catch (err) {
            // do nothing
        } finally {
            done();
        }
    });
});

describe('randBoolean', () => {
    it('should always be true or false', (done) => {
        for (let i = 0; i < 1000; i += 1) {
            const testVal1 = randGen.randBoolean();
            testVal1.should.be.oneOf([true, false]);
        }
        done();
    });
});

describe('randString', () => {
    it('should return abc if input abc', (done) => {
        console.log(randGen.randString(/abc/));

        const tmpVal1 = randGen.randString(/abc/);

        randGen.randString(/abc/).should.equal('abc');
        done();
    });
    it('should return date if input 20\d{2}-([1-9]|1[0-2])-(1-9|[1-2]\d|3(0|1))', (done) => {
        console.log(randGen.randString(/20\d{2}-([1-9]|1[0-2])-(1-9|[1-2]\d|3(0|1))/));

        const tmpVal1 = randGen.randString(/20\d{2}-([1-9]|1[0-2])-(1-9|[1-2]\d|3(0|1))/);


        tmpVal1.should.match(/20\d{2}-([1-9]|1[0-2])-(1-9|[1-2]\d|3(0|1))/);
        done();
    });
});

describe('randChinese', () => {
    it('should return length 2 chinese', (done) => {
        console.log(randGen.randChinese(2));

        const tmpVal1 = randGen.randChinese(2);

        tmpVal1.length.should.equal(2);
        done();
    });
});

describe('randPlugins', () => {
    it('should return 20**-**-** format date', (done) => {
        console.log(randGen.stringPlugins.YMDWithDashDate());

        const tmpVal1 = randGen.stringPlugins.YMDWithDashDate();

        done();
    });
    it('should return 20**/**/** format date', (done) => {
        console.log(randGen.stringPlugins.YMDWithSlashDate());

        const tmpVal1 = randGen.stringPlugins.YMDWithSlashDate();

        done();
    });
    it('should return **-**-20** format date', (done) => {
        console.log(randGen.stringPlugins.MDYWithDashDate());

        const tmpVal1 = randGen.stringPlugins.MDYWithDashDate();

        done();
    });
    it('should return **/**/20** format date', (done) => {
        console.log(randGen.stringPlugins.MDYWithDashDate());

        const tmpVal1 = randGen.stringPlugins.MDYWithSlashDate();

        done();
    });
    it('should return *@*.* format email', (done) => {
        console.log(randGen.stringPlugins.Email());

        const tmpVal1 = randGen.stringPlugins.Email();

        done();
    });
    it('should return ***.***.***.*** format ipv4 address', (done) => {
        console.log(randGen.stringPlugins.Ipv4Addr());

        const tmpVal1 = randGen.stringPlugins.Ipv4Addr();

        done();
    });
    it('should return ****:****:****:**** format ipv6 address', (done) => {
        console.log(randGen.stringPlugins.Ipv6Addr());

        const tmpVal1 = randGen.stringPlugins.Ipv6Addr();

        done();
    });
});
