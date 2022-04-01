
 function fn1(){
    console.log(1);
    return new Promise(function(resolve, reject){
        console.log(123);
        resolve('123')
    })
}
 function fn2(){
    console.log(2);
    return new Promise(function(resolve, reject){
        console.log(456);
        resolve('456')
    })
}

async function main() {
    await fn1().then((res)=>{
        console.log("fn1Res",res);
    });
    console.log("main 1");
    await fn2().then((res)=>{
        console.log("fn2Res",res);
    });
    console.log("main 2");
}
main()
let p2 = new Promise(function(resolve,reject){
    console.log("新的promise");
})

