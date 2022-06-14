

var a = {};
var b = {key:'b'};
var c = {key:'c'};

a[b] = 123;
a[c] = 456;
console.log(a[b]);

console.log(b.toString());