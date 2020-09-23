# Citrix VNC console forwarding
To forward the VNC-Service that are provided by the Citrix Hypervisor, you can use a simple node.js script. The procedure is documentated under https://developer-docs.citrix.com/projects/citrix-hypervisor-sdk/en/latest/xs-api-extensions/

The node.js script must be hosted on a guest-system on your cluster and they must have access to the master-server on port 443 (which provides the VNC service). The scripts starts a tcp-server, that your VNC-client can connect from outside, and forward the connection to the master.

The only tricky step is the initializing. First you need to send the initial http-header to authorize you, and on the response you must remove the http-header, because VNC-clients can't handle this.

## References
* [Procedure](https://developer-docs.citrix.com/projects/citrix-hypervisor-sdk/en/latest/xs-api-extensions/)
* [API documentation](https://developer-docs.citrix.com/projects/citrix-hypervisor-sdk/en/latest/xs-api-extensions/)

