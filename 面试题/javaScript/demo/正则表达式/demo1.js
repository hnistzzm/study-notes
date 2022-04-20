
var emailExp =  /^([a-zA-Z0-9]+[-_|.]?)+@[a-zA-Z0-9]+\.[a-z]+$/ //邮箱验证

var telExp = /^(1[0-9][0-9])\d{8}$/ //电话验证

var urlExp = /^((https?|ftp|file):\/\/)?(([a-z0-9]){2,12})\.(([a-z]){3})/


let emailStr = '957957209@qq.com'//邮箱
let telStr = '17261390609' //电话号码
let urlStr = 'http://yunsheng.com' //url验证


console.log(emailExp.test(emailStr)); 
console.log(telExp.test(telStr));
console.log(urlExp.test(urlStr));