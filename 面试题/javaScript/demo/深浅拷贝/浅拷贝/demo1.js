
/**
 * 浅拷贝的意思就是只复制引用，而未复制真正的值。
 * 当我们浅拷贝一个数组或者对象后，改变这个新的数组或对象,那么被我们拷贝的数组和对象也会改变
 */
const originArray = [1,2,3,4,5];//数组是引用类型
const originObj = {a:'a',b:'b',c:[1,2,3],d:{dd:'dd'}};//对象是引用类型
let originType = [1,2,3];
let originNumber = 1; //基本值类型,不存在深浅拷贝之分

const clonedArray = originArray;
const clonedObj = originObj;
let cloneNumber = originNumber;
let cloneType = originType;

clonedArray.push(6);
clonedObj.a = 'aa';
cloneNumber = 2;
cloneType = {a:'a',b:'b',b:'c'}

console.log(originArray);//[ 1, 2, 3, 4, 5, 6 ]
console.log(originObj);//{ a: 'aa', b: 'b', c: [ 1, 2, 3 ], d: { dd: 'dd' } }
console.log(originNumber);//1
console.log(originType);//当我们改变了变量引用的类型时,这个新变量和被拷贝的变量就没有了任何联系(二者指向不同引用)