const promise1 = new Promise(function(resolve, reject) {
    // resolve(1);
    reject(1);
})

const promise2 = new Promise(function(resolve, reject) {
    resolve(2);
})

const promise3 = new Promise(function(resolve, reject) {
    resolve(3);
})

const p = Promise.any([promise1,promise2,promise3])

p
.then((data) => {
    console.log("data",data);
})
.catch((err) => {
    console.log("err",err);
})