'use strict';

let ddnsServer = require('./ddns_server');

ddnsServer.listen(2016);
console.log('Server is listening');
