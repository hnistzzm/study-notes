
//遍历map 每次会返回一个键值对数组[key,value],可以使用解构赋值来获取
const map = new Map([['a',1],['b',2],['c',3]]);

for (const [key,value] of map) {
    console.log(key,value);
    
}

//遍历数组:只会遍历具有数字索引的值
let arr =[3,5,7];
arr.foo = 'hello'//不会被for..of遍历

for (const value of arr) {
    console.log(value); //3 5 7
}

//遍历set

let set = new Set([1,2,3,4,5])

for (const value of set) {
    console.log(value); //1,2,3,4,5
}

//遍历字符串

let str = '12345'
for (const value of str) {
    console.log(value); //1,2,3,4,5
}

//遍历arguments对象 arguments是一个类数组

function printArgs(){
    console.log(arguments);
    for (let x of arguments) {
        console.log(x);// a b
      }
}
printArgs('a', 'b');


//对于不含lterator的类数组对象,可以使用Array.from()方法将其转换为数组然后遍历
let arrayLike = { length: 2, 0: 'a', 1: 'b' };

// 正确
for (let x of Array.from(arrayLike)) {
  console.log(x);
}