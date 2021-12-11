
/*
    通过promise获取异步执行结果
*/
async function add(x,y){

    return  new Promise(function(resolve,reject){
        setTimeout(() => {
            resolve(x+y)
        }, 1000);
    })


}
add(1,2).then((resolve)=>{console.log(resolve);})

