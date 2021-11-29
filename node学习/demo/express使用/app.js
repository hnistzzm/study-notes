var  express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser')
const dayjs = require('dayjs')
var app =  express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/public',express.static('./public'))
app.engine('html',require('express-art-template'))

app.get('/index',function(req,res){
    var comments =JSON.parse(fs.readFileSync('public/json/comment.json')) 
    res.render('index.html',{
        comments:comments.content
    })
})
app.get('/post',function(req,res){
    res.render('post.html')})
    app.post('/post',function(req,res){
    var comments =JSON.parse(fs.readFileSync('public/json/comment.json')) //读取comment.json
    var submitQuery = req.body//获取请求参数
    var addData = {
        "name":submitQuery.name,
        "message":submitQuery.message,
        "dateTime":dayjs().format('YYYY:MM:DD')
    }
    comments.content.unshift(addData)//将新增的评论存入comments数组中
    fs.writeFileSync('public/json/comment.json',JSON.stringify(comments) )
    res.redirect('/index')//重定向到首页
 })
 
var server = app.listen(9001,function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Node.JS 服务器已启动，访问地址： http://%s:%s", host, port)
})