# Citrix VNC console forwarding
To forward the VNC-Service that are provided by the Citrix Hypervisor, you can use a simple node.js script. The procedure is documentated under https://developer-docs.citrix.com/projects/citrix-hypervisor-sdk/en/latest/xs-api-extensions/

The node.js script must be hosted on a guest-system on your cluster and they must have access to the master-server on port 443 (which provides the VNC service). The scripts starts a tcp-server, that your VNC-client can connect from outside, and forward the connection to the master.

The only tricky step is the initializing. First you need to send the initial http-header to authorize you, and on the response you must remove the http-header, because VNC-clients can't handle this.

## Usage with noVNC
With noVNC you can open a VNC-connection directly from all modern browsers. Because noVNC use a WebSocket to connect, we need a service that can handle this. For this you can use node.js [ws](https://www.npmjs.com/package/ws). You see it in the script vnc-websocket-example.js

With WebSockets, it's also easy possible to secure the connection. Use the [https](https://www.npmjs.com/package/https) as an optional paramtere in the WebSocket and a valid Certificate.

## References
* [Procedure](https://developer-docs.citrix.com/projects/citrix-hypervisor-sdk/en/latest/xs-api-extensions/)
* [API documentation](https://developer-docs.citrix.com/projects/citrix-hypervisor-sdk/en/latest/xs-api-extensions/)

