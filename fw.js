const http = require('http')
const httpProxy = require('http-proxy');

// 新建一个代理 Proxy Server 对象
const proxy = httpProxy.createProxyServer({});
// 捕获异常
proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('Something went wrong. And we are reporting a custom error message.');
});

// 在每次请求中，调用 proxy.web(req, res config) 方法进行请求分发
const server = require('http').createServer(function (req, res) {
    // 在这里可以自定义你的路由分发
    res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf8',
        'Access-Control-Allow-Origin': '*'
    });
    console.log('有请求接口');
    let host = req.headers.host, ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("client ip:" + ip + ", host:" + host);
    proxy.web(req, res, { target: 'http://29002-79.141.demo.healthan.com.cn' });
    /* switch (host) {
        // 这个是自己代理服务器的地址  
        // 到时候就让项目请求这个接口 然后这个接口转发到target的目标接口   然后在代理服务器上设置允许跨域 而服务器请求服务器是没有跨域一说的  就这样   就能实现跨域了
        case '127.0.0.1:9999':
            // proxy.web(req, res, { target: 'http://127.0.0.1:8888' });
            // target是接口服务器的地址
            proxy.web(req, res, { target: 'http://29002-79.141.demo.healthan.com.cn' });
            break;
        default:
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Welcome to my server!');
    } */
});

console.log("listening on port 80")
server.listen(9999);
