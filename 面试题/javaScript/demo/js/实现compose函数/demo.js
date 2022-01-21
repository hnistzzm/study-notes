
/**
 * compose函数可以将需要嵌套执行的函数平铺，嵌套执行就是一个函数的返回值将作为另一个函数的参数。
 * 右边的函数先执行，然后往左边返回
 * @param  {...any} fn  函数数组
 * @returns 
 */

function compose(...fn){
    
    return function(x){
        //reduceRight:从右往左迭代
        return fn.reduceRight( (pre,next) =>{
            return next(pre)
        },x)
    }
}

function fn1(x){
    return x+1
}
function fn2(x){
    return x+2
}
function fn3(x){
    return x+3
}
console.log(compose(fn1,fn2,fn3)(1)); 