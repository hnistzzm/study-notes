const fs = require('fs')
fs.readFile('写入和读取文件/data/hello.txt', function (err, data) {
	if (err) {
		console.log('读取文件失败!', err.message)
		return
	}
	console.log(data.toString())
})
