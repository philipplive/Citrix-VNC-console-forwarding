'use strict';

const net = require('net');
const tls = require('tls');

const server = net.createServer((serverSocket) => {
    const options = {
        host: '123.123.123.123',
        port: 443,
        rejectUnauthorized: false
    };

    const xenSocket = tls.connect(options, () => {
        // Set http parameters
        xenSocket.write(
            [
                'CONNECT /console?uuid=1234b76b-1234-1234-1234-12341e556adb HTTP/1.1',
                'Host: 123.123.123.123',
                'Cookie: session_id=OpaqueRef:1234b58c-1234-1234-1234-1234c89aed86',
                '',
                '',
            ].join('\r\n')
        )
    });

    let passthrough = false;
    let cache = '';

    xenSocket.on('data', (data) => {
        if (passthrough)
            serverSocket.write(data);
        else {
            cache += data.toString();

            if (cache.includes('\r\n\r\n')) {
                passthrough = true;
                serverSocket.write(cache.split('\r\n\r\n')[1]);
            }
        }
    });

    xenSocket.on('end', () => {
    })

    xenSocket.on('error', (error) => {
    })

    serverSocket.on('data', (data) => {
        xenSocket.write(data);
    });

    serverSocket.on('end', () => {
    });

    serverSocket.on('error', (error) => {
    })
});

server.listen(1234, '127.0.0.1');