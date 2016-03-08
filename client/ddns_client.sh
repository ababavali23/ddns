#!/bin/bash

# This is a client for ddns. It loops your ip and sends it to ddns.

# Your network interface to monitor: wlan0, eth0 ect
NETWORK_INTERFACE="pppoe-wan"

# How offen does it check your ip, defaults to be 5 min.
let LOOP_DURATION=5*60

# Your ddns server address(with port).
SERVER_ADDR="your.server:port"

# Your domain name.
DOMAIN_NAME="your.domain"

# Your domain token.
DOMAIN_TOKEN="your_token"

# Save the recently ip for comparation. Do not modify it.
LAST_IP=""

getIp() {
    ifconfig $NETWORK_INTERFACE | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*'
}

sendIp() {
    curl $SERVER_ADDR -s -X POST -H 'Content-type: application/json' -w '%{http_code}' -d '{domain_name:"'$DOMAIN_NAME'",domain_token:"'$DOMAIN_TOKEN'",domain_address:"'$1'"}'
}

while true
do
    CURRENT_IP=`getIp`
    if [ "$CURRENT_IP" != "$LAST_IP" ]
    then
        if [ `sendIp $CURRENT_IP` -eq 200 ]
        then
            LAST_IP=$CURRENT_IP
            echo success: $CURRENT_IP
        else
            LAST_IP="" # Reset $LAST_IP to try again next loop.
            echo failed: $CURRENT_IP
        fi
    fi
    sleep $LOOP_DURATION
done
