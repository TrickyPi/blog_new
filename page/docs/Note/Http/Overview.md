# http && https


## http

### http1.1

http1.1之前的版本是http1，1.1版本相较于之前的版本，新增了`keep-alive`字段，有效的避免了每次http请求时都需要进行Tcp3次握手

### http2 

http2的版本相较于1.1版本解决了http阻塞的问题；
具体解决方案：


### http3

http3版本不再基于Tcp协议，而是基于Udp协议进行传输；那么我们都知道TCP协议可以保证传输的可靠性，那么切换到UDP后，http3是怎么保证传输的可靠性呢，并且http3只要进行1次的RRF


## https
