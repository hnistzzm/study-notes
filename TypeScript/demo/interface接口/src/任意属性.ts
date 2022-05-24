
interface Person2{
    name: string;
    age?: number;
    [propName: string]: any;
}

let p1 = {name:'张三',fn(){console.log("123");
}}

p1.fn()