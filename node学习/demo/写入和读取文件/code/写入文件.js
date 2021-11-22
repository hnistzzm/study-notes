const fs = require('fs')
fs.writeFile('写入和读取文件/data/hello.txt', 'hello,nodeJs', function (err) {
	if (err) {
		console.log('写入文件失败!', err.message)
		return
	}
	console.log('写入文件成功!')
})
