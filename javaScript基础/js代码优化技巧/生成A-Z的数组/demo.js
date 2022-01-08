

const arr = [...Array(91).keys()].filter( i => i>64 ).map( i => String.fromCharCode(i))
console.log(arr);