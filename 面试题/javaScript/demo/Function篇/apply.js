/**
 * 该方法的语法和作用与 apply() 方法类似，只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。
 */
Function.prototype.cs_apply = function(obj,args){

    obj = obj || window

    const fn = Symbol()

    obj[fn] = this

    return obj[fn](...args)
}
function fn(age,hobby){
    console.log(`我叫${this.name}今年${age}岁了我喜欢${hobby}`);
}
const testobj2 = {
    name: 'zzm'
}
fn.cs_apply(testobj2,[18,'睡觉'])
