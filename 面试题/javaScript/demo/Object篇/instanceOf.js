/**
 * instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。
 */

function instanceOf(child,father){

    const fp = father.prototype
    let cp = child.__proto__

    while(cp){
        if(cp === fp){
            return true
        }
        cp = cp.__proto__
    }
    return false
}


const obj = {}
console.log(instanceOf(obj,Object));