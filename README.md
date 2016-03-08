This is a nodejs ddns project.

## How does the server run?
It starts up a http server which receives your domain information(name, address...), then modifies the config file of bind9 & restart it.

## Server Precondition
You should have nodejs and bind9 installed before start.

## Server Installation
1. Clone this project to your server, navigate to the server folder and run:``npm start``
2. Open domain\_config.json and config it. To gain your token's md5, run:``md5 -s 'your_token'``
3. run:``npm run server``

## Client
There is a bash in client folder. Feel free to config and run it on your client.
