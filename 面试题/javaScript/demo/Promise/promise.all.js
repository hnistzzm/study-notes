
const promise1 = new Promise((resolve, reject) => {
    console.log("promise1");
    resolve(1);
});
const promise2 = new Promise((resolve, reject) => {
    resolve(2);
});
const promise3 = new Promise((resolve, reject) => {
    // reject(3);
    resolve(3);
});

let p = Promise.all([promise1,promise2,promise3])

p.then((res) => {
    console.log("res",res); //[1,2,3]
},(err) => {
    console.log("err",err);
})

var p1 = Promise.all([1,2,3])
.then((res) => {console.log(res);})
console.log(p1);