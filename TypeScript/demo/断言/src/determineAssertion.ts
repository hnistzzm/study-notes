
//允许在实例属性和变量声明后面放置一个 ! 号，从而告诉 TypeScript 该属性会被明确地赋值
//如下例 我们可以给x加上确定赋值断言告诉ts,再调用x之前,x会被成功的赋值

let x!: number ;

initialize();

console.log(x);



function initialize() {
    x = 10;
}