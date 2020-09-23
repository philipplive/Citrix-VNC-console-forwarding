# Citrix VNC console forwarding
To forward the VNC-Service that are provided by the Citrix Hypervisor, you can use a simple node.js script. The procedure is documentated under https://developer-docs.citrix.com/projects/citrix-hypervisor-sdk/en/latest/xs-api-extensions/

The node.js script must be hosted on a guest-system on your cluster and they must have access to the master-server on port 443 (which provides the VNC service). The scripts starts a TCP-server, that your VNC-client can connect from outside, and forward the connection to the master.

The only tricky step is the initializing. First you need to send the initial HTTP-header to authorize you, and on the response you must remove the HTTP-header, because VNC-clients can't handle this.

### Initial HTTP-header
To initialize the VNC connection on the master-server (port 443), you need to send a HTTP-header with a valid session-id as cookie and a console-uuid:
```
CONNECT /console?uuid=1234b76b-1234-1234-1234-12341e556adb HTTP/1.1
Host: 123.123.123.123'
Cookie: session_id=OpaqueRef:1234316e-1234-1234-1234-123415e85cee'
```
* The **session_id** you get with the API: https://xapi-project.github.io/xen-api/classes/session.html#login_with_password
* The **console_uuid** you get with the API: https://xapi-project.github.io/xen-api/classes/vm.html#get_consoles


## Usage with noVNC
NoVNC tool gives you an easy to use VNC-Client that runs on every modern webbrowser. Because noVNC use a WebSocket to connect, we need a service that can handle this. For this you can use node.js [ws](https://www.npmjs.com/package/ws). You see it in the script vnc-websocket-example.js

With WebSockets, it's also easy possible to secure the connection. Use the [https](https://www.npmjs.com/package/https) as an optional paramtere in the WebSocket and a valid Certificate.

## References
* [Procedure](https://developer-docs.citrix.com/projects/citrix-hypervisor-sdk/en/latest/xs-api-extensions/)
* [API documentation](https://developer-docs.citrix.com/projects/citrix-hypervisor-sdk/en/latest/xs-api-extensions/)

## Notes
* Check the HTTP-response if it contains a status code 200 
* To cut of the HTTP-header you can also use (partial-stream)[https://www.npmjs.com/package/partial-stream]