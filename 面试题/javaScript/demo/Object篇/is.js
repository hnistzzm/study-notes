/**
 * Object.is() 方法判断两个值是否为同一个值。
 * Object.is(value1, value2);
 * value1
    被比较的第一个值。
 * value2
    被比较的第二个值。
 * 返回值:一个 Boolean 类型标示两个参数是否是同一个值。
 */

Object.prototype.cs_is = function (x,y){
    if(x===y){
        //防止-0和+0 全等号会将+0和-0判断为相等
        return x!==0 || 1/x === 1/y
    }
    //防止NaN NaN == NaN
    return x !== x && y !== y
}