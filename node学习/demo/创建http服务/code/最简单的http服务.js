const http = require('http')
const server = http.createServer()

server.on("request",function(){
    console.log("收到客户端请求了");
})
server.listen(3000,function(){
    console.log("服务器创建成功!");
})