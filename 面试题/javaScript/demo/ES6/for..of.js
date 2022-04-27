
//for...of可以自动遍历数据结构生成的遍历器Iterator,
//并且不需要手动的使用next()方法促使遍历器执行


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


//遍历Generator函数生成的迭代器

function * createGenerator(){
    
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;//如果此时调用next方法,返回的结果是{value:6,done:true}

}

for (const v of createGenerator()) {//当遇到done属性为true时,循环就会终止
    console.log(v);
}
let foo = createGenerator();
console.log(foo.next()); 
console.log(foo.next()); 
console.log(foo.next()); 
console.log(foo.next()); 
console.log(foo.next()); 
console.log(foo.next()); 