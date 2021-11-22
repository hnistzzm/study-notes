const fs = require('fs')
const http = require('http')

const server = http.createServer()

server.on('request', function (req, res) {
	const wwwDiv = 'E:/学习笔记/node学习/demo/通过服务器访问后台资源/www'
	const reqUrl = req.url
	if (reqUrl !== '/') {
		fs.readFile(wwwDiv + reqUrl, function (err, data) {
			console.log(wwwDiv + reqUrl)
			if (err) {
				return res.end('404 Not Found')
			}
			res.end(data)
		})
	} else {
		fs.readFile(wwwDiv + '/page/index.html', function (err, data) {
			console.log(wwwDiv + reqUrl)
			if (err) {
				return res.end('404 Not Found')
			}
			res.end(data)
		})
	}
})
server.listen(3001, function () {
	console.log('服务器开启成功!')
})
