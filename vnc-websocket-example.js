'use strict';

const ws = require('ws');
const tls = require('tls');

const server = new ws.Server({
    port: 1234
});

server.on('connection', (serverSocket, req) => {
    const options = {
        host: '185.66.108.5',
        port: 443,
        rejectUnauthorized: false
    };

    const client = tls.connect(options, () => {
        client.write(
            [
                'CONNECT /console?uuid=a6d0b76b-a889-56a7-17d8-93931e556adb HTTP/1.1',
                'Host: 185.66.108.5',
                'Cookie: session_id=OpaqueRef:c8df316e-3524-48ab-9488-829915e85cee',
                '',
                '',
            ].join('\r\n')
        )
    });

    let passthrough = false;
    let cache = '';

    client.on('data', (data) => {
        if (passthrough)
            serverSocket.send(data);
        else {
            cache += data.toString();

            if (cache.includes('\r\n\r\n')) {
                passthrough = true;
                serverSocket.send(cache.split('\r\n\r\n')[1]);
            }
        }
    });

    client.on('end', () => {
    })

    client.on('error', (error) => {
    })

    serverSocket.on('message', (data) => {
        client.write(data);
    });

    serverSocket.on('end', () => {
    });

    serverSocket.on('error', (error) => {
    })
});