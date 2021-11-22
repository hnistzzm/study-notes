const fs = require('fs')
const http = require('http')
const server = http.createServer()

server.on('request',function(req,res){
    const wwwDir = 'E:/学习笔记/node学习/demo/完成目录列表渲染/www'
    const templateFileUrl = 'E:/学习笔记/node学习/demo/完成目录列表渲染/template.html'
    fs.readdir(wwwDir,function(err,files){
        res.setHeader('Content-Type','text/html; charset=utf-8')//解决中文乱码
        if(err){
            console.log(err.message);
            return res.end('404 Not Found.',err.message)
        }
        fs.readFile(templateFileUrl,function(err,data){
            if(err){
                return console.log("读取文件失败!",err.message);
                
            }
            console.log("读取文件成功");
            
        })
        res.end(files.toString())
    })

})
server.listen(3001,function(){
    var host = server.address().address
	var port = server.address().port
    console.log('Node.JS 服务器已启动，访问地址： http://%s:%s', host, port)
})