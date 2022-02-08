
/**
 * slice() 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。
 * str.slice(beginIndex[, endIndex])
 * beginIndex
    从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 strLength + beginIndex 看待，这里的strLength 是字符串的长度（例如， 如果 beginIndex 是 -3 则看作是：strLength - 3）
 * endIndex
    可选。在该索引（以 0 为基数）处结束提取字符串。如果省略该参数，slice() 会一直提取到字符串末尾。如果该参数为负数，则被看作是 strLength + endIndex，这里的 strLength 就是字符串的长度(例如，如果 endIndex 是 -3，则是, strLength - 3)。
 * 返回值: 返回一个从原字符串中提取出来的新字符串
 * 注意:当start > end 返回空字符串   
 */
String.prototype.cs_slice = function(start,end){

    let resStr = ''
    const strLength = this.length

    start = start >= 0 ? start : strLength + start
    end = end >= 0 ? end : strLength+end

    if(start >= end) return ''
    for (let i = start; i < end; i++) {
        resStr += this[i]
    }
    return resStr
}

const str = 'abcdefg'
const str1 = str.cs_slice(0,3)
console.log(str1); //abc