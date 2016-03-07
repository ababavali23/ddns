/*
    Update the domain zone file with the new domain address.
*/

'use strict';

let fs = require('fs');

module.exports = (zone, address) => {
    fs.readFile(zone, 'utf-8', (error, data) => {
        if (error) return;
        data = data.replace(/^\s*@\s+IN\s+A\s+.+/gm, t => `${t.match(/(^\s*@\s+IN\s+A\s+).+/)[1]}${address}`);
        fs.writeFile(zone, data, 'utf-8', (error) => {
            if (!error)
                console.log(`${zone} updated to ${address}`);
        });
    });
}
