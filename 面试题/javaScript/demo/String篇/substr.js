
/**
 * substr() 方法返回一个字符串中从指定位置开始到指定字符数的字符
 * str.substr(start[, length])
 * start
    开始提取字符的位置。如果为负值，则被看作 strLength + start，其中 strLength 为字符串的长度（例如，如果 start 为 -3，则被看作 strLength + (-3)）。
 * length
    可选。提取的字符数。    
 */

String.prototype.cs_substr = function(start = 0,length){
    
    if(length < 0) return ''

    const strLength = this.length
    let resStr = ''

    start = start < 0 ? strLength+start : start
    if(start > strLength){
        start = 0
    }
    length = (!length && length !== 0) || length > strLength-start ? strLength : start+length
    
    for (let i = start; i < length; i++) {
        
        resStr += this[i]

    }
    return resStr
}

const str = 'abcdefg'
const str1 = str.cs_substr(0,3)
console.log(str1); //abc