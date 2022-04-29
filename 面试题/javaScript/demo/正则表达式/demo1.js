
var emailExp =  /^([a-zA-Z0-9]+[-_|.]?)+@[a-zA-Z0-9]+\.[a-z]+$/ //邮箱验证

var telExp = /^(1[0-9][0-9])\d{8}$/ //电话验证

var urlExp = /^((https?|ftp|file):\/\/)?(([a-z0-9]){2,12})\.(([a-z]){3})/

var QQExp = /^[1-9][0-9]{4,11}$/;

var ipExp = /^[1-9]{3}\.[1-9]{3}\.[1-9]{1,3}\.[1-9]{0,3}$/

var _toTuo = /\_([a-zA-Z0-9_])/g; //下划线转驼峰

function toTuo (str) {

    return str.replace(_toTuo,function(match,letter){

        // console.log("match",match);
        console.log("letter",letter);
        return letter.toUpperCase();
    })
}

var TuoTo_ = /([A-Z])/g //驼峰转下划线

function to_fun (str){

    return str.replace(TuoTo_,function(match,letter){
        console.log("match",match);
        // console.log("letter",letter);
        return '_'+ match.toLowerCase()
    })
}



let emailStr = '957957209@qq.com'//邮箱
let telStr = '17261390609' //电话号码
let urlStr = 'http://yunsheng.com' //url验证
let qqStr = '957957209' //qq验证
let ipStr = '192.168.12.12'//ip地址验证
let _toTuoStr = 'zhang_zhen_ming';
let to_Str = 'zhangZhenMing';

console.log(emailExp.test(emailStr)); 
console.log(telExp.test(telStr));
console.log(urlExp.test(urlStr));
console.log(QQExp.test(qqStr));
console.log(ipExp.test(ipStr));
console.log(toTuo(_toTuoStr));
console.log(to_fun(to_Str));