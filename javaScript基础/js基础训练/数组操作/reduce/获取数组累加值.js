


//计算数组的和

const arr = [...new Array(100).keys()]

const sum = arr.reduce( (p , q) => p + q )

console.log( sum );