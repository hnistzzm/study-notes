const fs = require('fs')
var buf = new Buffer.alloc(1024);
fs.open('写入和读取文件/data/hello.txt','r+',function(err,fd){
    if(err){
        console.log("打开文件失败!",err.message);
        return
    }
    console.log("打开文件成功!");
    console.log("准备读取文件");
    fs.read(fd,buf,0,buf.length,0,function(err,bytes){
        if(err){
            console.log("读取文件失败",err.message);
        }
        console.log(bytes+"字节被读取");
        // 仅输出读取的字节，
        if(bytes > 0){
            console.log(buf.slice(0, bytes).toString());
        }

    })

})