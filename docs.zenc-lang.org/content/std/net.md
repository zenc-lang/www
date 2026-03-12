# Networking (`std/net/`)

The `std/net` module provides a comprehensive networking stack including TCP, UDP, DNS, and HTTP.

## Usage

```zc
import "std/net/tcp.zc"  // TcpStream, TcpListener
import "std/net/udp.zc"  // UdpSocket
import "std/net/http.zc" // HTTP Client/Server
import "std/net/dns.zc"  // DNS Resolution
import "std/net/url.zc"  // URL Parsing
import "std/net/websocket.zc" // WebSocket
```

## WebSocket (`std/net/websocket.zc`)

Provides server-side WebSocket handshake and framing.

### Type `WebSocket`

- **`fn handshake(stream: TcpStream, key: String) -> Result<WebSocket>`**
  Performs the server-side handshake. `key` is the `Sec-WebSocket-Key` header value from the client request.
  
- **`fn recv(self) -> Result<String>`**
  Receives a text frame. Handles unmasking automatically. Returns error on close or non-text frame.

- **`fn send(self, msg: String) -> Result<int>`**
  Sends a text frame (unmasked).

## HTTP Client & Server

### Type `Server` (`std/net/http.zc`)

A simple multithreaded-capable (blocking) HTTP server.

```zc
import "std/net/http.zc"

fn handler(req: Request*, res: Response*) {
    res.set_body_str("Hello World");
}

let server = Server::new(8080, handler);
server.start();
```

### Client `fetch`

```zc
let res = fetch(String::new("http://example.com/api"));
println "Status: {res.status}";
println "Body: {res.body.c_str()}";
```

### URL Parsing (`std/net/url.zc`)

```zc
import "std/net/url.zc"

let u = Url::parse(String::new("http://host:80/path?q=1")).unwrap();
println "Host: {u.host.c_str()}";
```

## TCP (`std/net/tcp.zc`)

### Type `TcpListener`

- **`fn bind(host: char*, port: int) -> Result<TcpListener>`**
- **`fn accept(self) -> Result<TcpStream>`**

### Type `TcpStream`

- **`fn connect(host: char*, port: int) -> Result<TcpStream>`**
  (Note: `host` must be an IP address literal currently, or use `Dns::resolve` first)
- **`fn read(self, buf: char*, len: usize) -> Result<usize>`**
- **`fn write(self, buf: u8*, len: usize) -> Result<usize>`**

## UDP (`std/net/udp.zc`)

### Type `UdpSocket`

- **`fn bind(host: char*, port: int) -> Result<UdpSocket>`**
- **`fn recv_from(self, buf: char*, len: usize) -> Result<UdpRecvResult>`**
- **`fn send_to(self, buf: char*, len: usize, host: char*, port: int) -> Result<usize>`**

## DNS (`std/net/dns.zc`)

### Type `Dns`

- **`fn resolve(host: char*) -> Result<String>`**
  Resolves a hostname (e.g., "google.com") to an IPv4 string (e.g., "142.250.1.100").
