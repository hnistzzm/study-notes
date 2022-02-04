/**
 * reduceLeft用法与reduce类似,唯一的区别是前者是从数组右往左遍历,不过多赘述
 */
const data = require('./data')
Array.prototype.cs_reduceRight = function(callback,...args){
    
    let start = this.length-1,pre
    if(args.length){
        
        pre = args[0]
    }else{
        start--;
        pre = this[this.length-1].num

    }
    for (let i = start; i >= 0 ; i--) {

        pre = callback(pre,this[i],i,this)
        
    }

    return pre
}

const sum =  data.cs_reduceRight((pre,next) => {
    return pre + next.num
})
console.log(sum);