+++
title = "std/net"
+++

# std/net

`std/net` 模組提供了一個全面的網路堆疊，包括 TCP、UDP、DNS 和 HTTP。

## 使用方法

```zc
import "std/net/tcp.zc"  // TcpStream, TcpListener
import "std/net/udp.zc"  // UdpSocket
import "std/net/http.zc" // HTTP 使用者端/伺服器端
import "std/net/dns.zc"  // DNS 解析
import "std/net/url.zc"  // URL 解析
import "std/net/websocket.zc" // WebSocket
```

## WebSocket (`std/net/websocket.zc`)

### 類型 `WebSocket`

提供伺服器端 WebSocket 握手（handshake）和影格（framing）處理。

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **handshake** | `WebSocket::handshake(stream: TcpStream, key: String) -> Result<WebSocket>` | 執行伺服器端握手。 |
| **recv** | `recv(self) -> Result<String>` | 接收文字影格（處理去遮罩 unmasking）。 |
| **send** | `send(self, msg: String) -> Result<int>` | 發送文字影格。 |

## HTTP 使用者端與伺服器端 (`std/net/http.zc`)

### 類型 `Server`

一個簡單的、支援多執行緒的 HTTP 伺服器。

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `Server::new(port: int, handler: fn(Request*, Response*)) -> Server` | 建立一個新的 HTTP 伺服器。 |
| **start** | `start(self)` | 啟動伺服器監聽迴圈。 |

### 使用者端 `fetch`

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **fetch** | `fetch(url: String) -> Response` | 執行一個 GET 請求。 |

## URL 解析 (`std/net/url.zc`)

### 類型 `Url`

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **parse** | `Url::parse(s: String) -> Option<Url>` | 解析一個 URL 字串。 |

## TCP (`std/net/tcp.zc`)

### 類型 `TcpListener`

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **bind** | `TcpListener::bind(host: char*, port: int) -> Result<TcpListener>` | 繫結（bind）到本地位址。 |
| **accept** | `accept(self) -> Result<TcpStream>` | 接受一個新連線。 |

### 類型 `TcpStream`

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **connect** | `TcpStream::connect(host: char*, port: int) -> Result<TcpStream>` | 連線到遠端主機。 |
| **read** | `read(self, buf: char*, len: usize) -> Result<usize>` | 從串流中讀取。 |
| **write** | `write(self, buf: u8*, len: usize) -> Result<usize>` | 寫入到串流中。 |

## UDP (`std/net/udp.zc`)

### 類型 `UdpSocket`

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **bind** | `UdpSocket::bind(host: char*, port: int) -> Result<UdpSocket>` | 繫結到本地位址。 |
| **recv_from** | `recv_from(self, buf: char*, len: usize) -> Result<UdpRecvResult>` | 接收數據及發送者資訊。 |
| **send_to** | `send_to(self, buf: char*, len: usize, host: char*, port: int) -> Result<usize>` | 將數據發送到特定目的地。 |

## DNS (`std/net/dns.zc`)

### 類型 `Dns`

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **resolve** | `Dns::resolve(host: char*) -> Result<String>` | 將主機名稱解析為 IP 位址。 |
