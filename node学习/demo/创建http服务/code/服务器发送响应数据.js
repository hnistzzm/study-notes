const http = require('http')
const server = http.createServer()

server.on("request",function(req,res){
    console.log("收到客户端请求了,请求路径是",req.url);
    const reqUrl = req.url
    res.setHeader('Content-Type','text/plain; charset=utf-8')//解决中文乱码
    if(reqUrl === '/a'){
        const obj = [
            {name:'喜羊羊',age:18},
            {name:'美羊羊',age:14},
            {name:'懒羊羊',age:12}
        ]
        res.write(JSON.stringify( obj))
        res.end()
    }else if(reqUrl === '/b'){
        res.write('requestB')
        res.end()
    }else if(reqUrl === '/c'){
        res.write('requestC')
        res.end()
    }else{
        res.write('NormalRequest')
        res.end()
    }
})
server.listen(3001,function(){
    console.log("服务器开启成功");
})