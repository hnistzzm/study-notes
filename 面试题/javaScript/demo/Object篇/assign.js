
/**
 * Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
 * Object.assign(target, ...sources)
 * target
    目标对象。
 * sources
    源对象。
 * 返回值:目标对象
 * 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。
 * 
 */

Object.prototype.cs_assign = function(target,...args){

    if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object')
    }
    target = Object(target)
    for (const obj of args) {
        for (const key in obj) {
            obj.hasOwnProperty(key) && (target[key] = obj[key])
        }
    }
    return target
}
const target = { a: 1, b: 2 };
const source1 = { b: 4, c: 5 };
const source2 = { c: 6, d: 10 };
console.log(Object.cs_assign(target,source1,source2)); 
console.log(target);