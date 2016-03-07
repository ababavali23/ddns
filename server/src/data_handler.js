/*
    Handle the data read from http server, verify it and pass it to zone_updater.
*/

'use strict';

let md5 = require('md5');
let domainConfig = require('../domain_config.json');
let updateZone = require('./zone_updater');

module.exports = data => {
    try {
        data = eval(`(${data})`);
        if (!data.domain_name || !data.domain_token || !data.domain_address)
            return false;
        let config = domainConfig[data.domain_name];
        if (!config || config.domain_token != md5(data.domain_token)) return false;
        updateZone(config.domain_zone, data.domain_address);
        return true;
    } catch (e) {
        return false;
    }
};
