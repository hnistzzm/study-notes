var  express = require('express')
var app =  express()

app.use('/public/',express.static('./public/'))
app.get('/test',function(req,res){
    console.log("请求的参数是",req.query);
    res.send('您请求了te接口')
})
var server = app.listen(9001,function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Node.JS 服务器已启动，访问地址： http://%s:%s", host, port)
})