/*
    Starts up a http server to reveive data.
*/

'use strict';

let http = require('http');
let dataHandler = require('./data_handler');

module.exports = http.createServer((request, response) => {
    if (request.method === 'POST') {
        var data = '';
        request.on('data', chunk => data += chunk.toString());
        request.on('end', () => {
            if (dataHandler(data))
                response.writeHead(200, 'Success');
            else
                response.writeHead(402, 'Bad Request');
            response.end();
        });
    } else {
        response.writeHead(405, 'Method Not Allowed');
        response.end();
    }
});
