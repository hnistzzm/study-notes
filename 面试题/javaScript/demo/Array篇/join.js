/**
 * 
 */
Array.prototype.cs_join = function(separator){

    let str = ''
    for (let i = 0; i < this.length; i++) {
        str = i === 0 ?  str + this[i] :  str + `${separator}${this[i]}`
        
    }
    return str
}

console.log([1,2,3].cs_join('?'));

