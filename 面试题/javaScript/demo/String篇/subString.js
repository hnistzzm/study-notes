/**
 * 功能与slice类似,区别在于当 start > end 时两者互换值
 */

String.prototype.cs_subString = function(start = 0 ,end){

    start = start < 0 ? this.length + start : start
    end = !end && end !== 0 ? this.length : end

    if (start >= end) [start, end] = [end, start]

    let str = ''

    for (let i = start; i < end; i++) {
        str += this[i]
    }

    return str

}