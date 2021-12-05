const { static } = require('express')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var router = require('./routes/index')

//加入这个配置后就可以直接通过req.body获取表单post请求中的数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.engine('html', require('express-art-template'))
app.use('/public/', express.static('./public'))
app.use('/node_modules/', express.static('./node_modules'))

app.use(router)

app.listen('3002', function () {
	console.log('服务器启动成功了...')
})
