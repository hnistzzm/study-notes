var arr1 = [1,2,3,0,0,0]
var arr2 = [2,5,4]
// console.log((arr1.splice(0,3)).concat(arr2).sort());

function merge( A, m, B, n ) {
    // write code here
    console.log("A0",A);
    for (let i = 0; i < n; i++) {
      A.pop()
    }
    console.log("A1",A);
    (A.concat(B)).sort()
    console.log(A.concat(B).sort());

}

merge(arr1,3,arr2,3);

console.log(arr1); 
console.log(arr2);