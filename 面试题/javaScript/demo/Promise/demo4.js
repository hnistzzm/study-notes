Promise.resolve(1)
.then(res =>{
    console.log(res);
    // return Promise.resolve(2)
    return Promise.reject(2);
    // return 1
})
.then(res =>{
    console.log('res',res);
    return 2
},err =>{
    console.log('err',err);
    return 2
})
.catch(err =>{
    console.log('catchErr',err);
})
.finally(()=>{
    console.log('finally');
})
.then(res =>{
    console.log('res',res);
})