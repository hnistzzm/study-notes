//unknown与any类似,否是顶级类型,所有类型也都可以赋值给 unknown
//与any的区别是,unknown 类型只能被赋值给 any 类型和 unknown 类型本身
let value: unknown;

value = true;
value = 123;

let value1: unknown = value;//ok
let value2: any = value;//ok
// let value3: number = value;//error   unknown类型值不能赋给非unknown与any类似或any类型

console.log(value1);
console.log(value2);

