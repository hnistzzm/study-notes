
// const promise = new Promise((resolve, reject) => {
//     console.log(1)
//     resolve()
//     console.log(2)
//   })
//   promise.then(() => {
//     console.log(3)
//   })
//   console.log(4)
  

  setTimeout(function() {
    console.log('setTimeout');
})

new Promise(function(resolve) {
    console.log('promise');
    resolve(1);
}).then(function() {
    console.log('then');
})

console.log('console');

