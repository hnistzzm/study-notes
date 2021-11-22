var http = require('http')
var fs = require('fs')
var url = require('url')
const dayjs = require('dayjs')
const template = require('art-template')

const serverUrl = 'http://localhost:5000/'
const comments = [
	{ name: '张三', message: '123', dateTime: '2021/11/21' },
	{ name: '李四', message: '1234', dateTime: '2021/11/21' },
]
const server = http
	.createServer(function (req, res) {
		console.log(req.url)
		const data = new URL(`${req.url}`, serverUrl)
		const pathName = data.pathname
		if (pathName == '/') {
			fs.readFile('./view/index.html', function (err, data) {
				if (err) {
					return res.end('404 Not Found..')
				}
				var content = template.render(data.toString(), {
					comments,
				})
				res.end(content)
			})
		} else if (pathName == '/post') {
			fs.readFile('./view/post.html', function (err, data) {
				if (err) {
					console.log('文件读取错误', err.message)
					return res.end('404 Not Found..')
				}
				res.end(data)
			})
		} else if (pathName.includes('/public/')) {
			fs.readFile('.' + pathName, function (err, data) {
				res.end(data)
			})
		} else if (pathName == '/pinglun') {
			var comment = {
				name: data.searchParams.get('name'),
				message: data.searchParams.get('message'),
			}
			comment.dateTime = dayjs().format('YYYY/MM/DD') //获取当前时间
			comments.unshift(comment)
			res.statusCode = 302
			res.setHeader('Location', '/')
			res.end()
		} else {
			fs.readFile('./view/404.html', function (err, data) {
				res.end(data)
			})
		}
	})
	.listen(3000, function () {
		var host = server.address().address
		var port = server.address().port
		console.log('Node.JS 服务器已启动，访问地址： http://%s:%s', host, port)
	})
