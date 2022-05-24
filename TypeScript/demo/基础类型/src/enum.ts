
//数字枚举
//默认第一个值的初始值为0,其他的值依次递增1,也可以设置初始值
//数字枚举除了支持 从成员名称到成员值 的普通映射之外，它还支持 从成员值到成员名称 的反向映射：

console.log("**************数字枚举****************");
enum Direction1{
    a=3,
    b,//4
    c=6,
    d //7
}

let dirVal: Direction1 = Direction1.b;//4 因为此时值为4对应的属性名为b
let dirName = Direction1[4];//b 因为此时b的值为4

console.log(dirVal);
console.log(dirName);

//字符串枚举
//在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。
//Enum类型中的属性都是只读属性
console.log("**************字符串枚举****************");
enum Direction2{
    a = 'a',
    b = 'b',
    c = 'c',
    d = c
}

let dir2: Direction2 = Direction2.d;

dir2 = Direction2.a;

console.log(dir2);// 'a' 因为dir2已经被重新赋值了


//常量枚举
//使用const关键字修饰的枚举,常量枚举会使用内联语法，不会为枚举类型编译生成任何 JavaScript

console.log("**************常量枚举****************");
const enum Direction3{

    a,
    b,
    c,
    d

}
let dir3: Direction3 = Direction3.a;

console.log(dir3);

//异构枚举
//默认是数字枚举,如果设置了初始值为字符串,
//那么从这个属性名到下一个初始值为数字的属性名之间都是字符串枚举
console.log("**************异构枚举****************");

enum Enum{
    A,
    B,
    C = "C",
    D = "D",
    E = 8,
    F
}

console.log(Enum.A);
console.log(Enum.F);