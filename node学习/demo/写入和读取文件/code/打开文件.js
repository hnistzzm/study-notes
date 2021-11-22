const fs = require('fs')
fs.open('写入和读取文件/data/hello.txt','r+',function(err,fd){
    console.log(fd);
})