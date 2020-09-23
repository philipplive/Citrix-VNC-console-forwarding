'use strict';

const ws = require('ws');
const tls = require('tls');

const server = new ws.Server({
    port: 1234
});

server.on('connection', (serverSocket, req) => {
    const options = {
        host: '123.123.123.123',
        port: 443,
        rejectUnauthorized: false
    };

    const xenSocket = tls.connect(options, () => {
        xenSocket.write(
            [
                'CONNECT /console?uuid=1234b76b-1234-1234-1234-12341e556adb HTTP/1.1',
                'Host: 123.123.123.123',
                'Cookie: session_id=OpaqueRef:1234316e-1234-1234-1234-123415e85cee',
                '',
                '',
            ].join('\r\n')
        )
    });

    let passthrough = false;
    let cache = '';

    xenSocket.on('data', (data) => {
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

    xenSocket.on('end', () => {
    })

    xenSocket.on('error', (error) => {
    })

    serverSocket.on('message', (data) => {
        xenSocket.write(data);
    });

    serverSocket.on('end', () => {
    });

    serverSocket.on('error', (error) => {
    })
});