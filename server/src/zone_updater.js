/*
    Update the domain zone file with the new domain address & restart named.
*/

'use strict';

let fs = require('fs');
let exec = require('child_process').exec;

module.exports = (zone, address) => {
    fs.readFile(zone, 'utf-8', (error, data) => {
        if (error) return;
        data = data.replace(/^\s*@\s+IN\s+A\s+.+/gm, t => `${t.match(/(^\s*@\s+IN\s+A\s+).+/)[1]}${address}`);
        fs.writeFile(zone, data, 'utf-8', (error) => {
            if (!error) {
                exec('service named restart', (error, stdout, stderr) => console.log(stdout));
                console.log(`${new Date()}: ${zone} updated to ${address}`);
            }
        });
    });
}
