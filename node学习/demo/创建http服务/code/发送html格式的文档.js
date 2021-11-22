const http = require("http");
const fs = require("fs");
const server = http.createServer();
server.on("request", function (req, res) {
  console.log("收到客户端请求了,请求路径是", req.url);
  const reqUrl = req.url;
  res.setHeader("Content-Type", "text/html; charset=utf-8"); //解决中文乱码
  if (reqUrl === "/") {
    fs.readFile("test.html", function (err, data) {
      if (err) {
        res.end("页面加载失败!");
        return;
      }
      res.end(data);
    });
  } else {
    // 获取到图片的url
    fs.readFile("." + reqUrl, function (err, data) {
      res.end(data);
    });
  }
});
server.listen(3002, function () {
  console.log("服务器开启成功");
});
