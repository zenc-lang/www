+++
title = "std/net"
+++

# std/net

`std/net` 模块提供了一个全面的网络协议栈，包括 TCP、UDP, DNS 和 HTTP。

## 使用方法

```zc
import "std/net/tcp.zc"  // TcpStream, TcpListener
import "std/net/udp.zc"  // UdpSocket
import "std/net/http.zc" // HTTP 客户端/服务器
import "std/net/dns.zc"  // DNS 解析
import "std/net/url.zc"  // URL 解析
import "std/net/websocket.zc" // WebSocket
```

## WebSocket (`std/net/websocket.zc`)

### 类型 `WebSocket`

提供服务器端 WebSocket 握手和帧处理。

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **handshake** | `WebSocket::handshake(stream: TcpStream, key: String) -> Result<WebSocket>` | 执行服务器端握手。 |
| **recv** | `recv(self) -> Result<String>` | 接收文本帧（处理掩码解码）。 |
| **send** | `send(self, msg: String) -> Result<int>` | 发送文本帧。 |

## HTTP 客户端与服务器 (`std/net/http.zc`)

### 类型 `Server`

一个简单的具备多线程能力的 HTTP 服务器。

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `Server::new(port: int, handler: fn(Request*, Response*)) -> Server` | 创建一个新的 HTTP 服务器。 |
| **start** | `start(self)` | 启动服务器监听循环。 |

### 客户端 `fetch`

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **fetch** | `fetch(url: String) -> Response` | 执行 GET 请求。 |

## URL 解析 (`std/net/url.zc`)

### 类型 `Url`

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **parse** | `Url::parse(s: String) -> Option<Url>` | 解析 URL 字符串。 |

## TCP (`std/net/tcp.zc`)

### 类型 `TcpListener`

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **bind** | `TcpListener::bind(host: char*, port: int) -> Result<TcpListener>` | 绑定到本地地址。 |
| **accept** | `accept(self) -> Result<TcpStream>` | 接受新连接。 |

### 类型 `TcpStream`

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **connect** | `TcpStream::connect(host: char*, port: int) -> Result<TcpStream>` | 连接到远程主机. |
| **read** | `read(self, buf: char*, len: usize) -> Result<usize>` | 从流中读取数据。 |
| **write** | `write(self, buf: u8*, len: usize) -> Result<usize>` | 向流中写入数据。 |

## UDP (`std/net/udp.zc`)

### 类型 `UdpSocket`

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **bind** | `UdpSocket::bind(host: char*, port: int) -> Result<UdpSocket>` | 绑定到本地地址。 |
| **recv_from** | `recv_from(self, buf: char*, len: usize) -> Result<UdpRecvResult>` | 接收数据及发送者信息。 |
| **send_to** | `send_to(self, buf: char*, len: usize, host: char*, port: int) -> Result<usize>` | 发送数据到指定目的地。 |

## DNS (`std/net/dns.zc`)

### 类型 `Dns`

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **resolve** | `Dns::resolve(host: char*) -> Result<String>` | 将主机名解析为 IP 地址。 |
