
const promise1 = new Promise((resolve, reject) =>{
        // resolve(1);
        setTimeout(() => {
            resolve(1);
        },1000)
    } 
)
const promise2 = new Promise((resolve, reject) =>{
    // resolve(2);
    setTimeout(() => {
        resolve(2);
    },2000)
})

promise1.then((res) => {

    console.log("promise1.0的响应",res);
    return promise2;

}
).then((res) => {
    console.log("promise1.1的响应",res);
})

promise2.then((res) => {

    console.log("promise2.0的响应",res);
    return 'promise2.1已执行';
}).then((res) => {
    console.log("promise2.1的响应",res);
})
/*
promise1.0的响应 1
promise2.0的响应 2
promise2.1的响应 promise2.1已执行
promise1.1的响应 2
*/