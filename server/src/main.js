/*
    The entry file.
*/

'use strict';

let ddnsServer = require('./ddns_server');
let DEFAULT_PORT = 2016;

let port = process.argv[2] || DEFAULT_PORT;

ddnsServer.listen(port);

console.log(`Ddns server is listening on port ${port}...`);
