var  express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser')
const dayjs = require('dayjs')
var app =  express()


app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*') //允许所有不同源的地址访问
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization') //Content-Type必须要设置，Authorization是用户登录注册时存入的token值，可根据需求来设置，还有其他的都需要用逗号隔开
	res.header('Access-Control-Allow-Credentials', true) // 这个必须要设置，否则解决跨域无效，注意true是字符串
	next()
})

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
app.get('/login',function(req,res){
   console.log("收到login请求");
   let data = {ok:'1'}
   res.send(data)
})
app.post('/register',function(req,res){
    console.log("收到register请求");
    let data = {ok:'1'}
    res.send(data)
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