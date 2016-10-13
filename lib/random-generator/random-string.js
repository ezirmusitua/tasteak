const randexp = require('randexp').randexp;
const plugins = require('./plugins').stringPlugins;
const randString = (regex) => randexp(regex);

exports.randString = randString;
exports.plugins = {
    YMDWithSlashDate: () => randString(plugins.YMDWithSlashDate),
    YMDWithDashDate: () => randString(plugins.YMDWithDashDate),
    MDYWithSlashDate: () => randString(plugins.MDYWithSlashDate),
    MDYWithDashDate: () => randString(plugins.MDYWithDashDate),
    Ipv4Addr: () => randString(plugins.Ipv4Addr),
    Ipv6Addr: () => randString(plugins.Ipv6Addr),
    Email: () => randString(plugins.Email),
};
