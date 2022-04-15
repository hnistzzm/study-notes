Promise.resolve(1)
.then(res=>{
    console.log(res)
    return 1;
})
.finally(()=>{
    console.log('finally');
    throw new TypeError('123')
    return 2;
})
.then((res)=>{
    console.log("finally的返回值",res);
})
.catch((err)=>{
    console.log('err',err);
})