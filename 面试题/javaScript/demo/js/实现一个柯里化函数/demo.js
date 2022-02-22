  
  /**
   * 实现柯里化函数
   * 函数柯里化是指一个函数接收参数但不执行,知道所有参数都接到之后再执行
   * @param {Function} fn //函数
   * @param  {...any} args //参数
   * @returns 
   */
  function currying(fn,...args){

    const length = fn.length
    let argArray = [...args]

    const res = function(...args2){

        argArray = [...argArray,...args2]
        //长度相等或者大于fn所需参数就返回执行结果
        if(argArray.length >= length){
            return fn(...argArray)
        }else{
            //长度不相等继续返回函数
            return  res
        }
    }
    return res
  }
  
  
  const add = (a,b,c) =>  a+b+c
  const a = currying(add,1)
  // console.log(a);
  console.log(a(2,3));