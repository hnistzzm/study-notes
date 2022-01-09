/**手写new
 * 创建一个新的对象
 * 对象继承构造函数的原型链
 * 将构造函数的this指向这个对象
 * 根据构造函数的返回值类型返回结果
 * 
 */

function myNew(fn,...args) {

    console.log(args);
    let obj = {} //创建一个新的对象
    obj.__proto__ = fn.prototype //对象继承构造函数的原型链
    fn.apply(obj,args) //将构造函数的this指向这个对象
    return obj;

}

 function Person(name , age ,gender) {
    

    // this.name = arguments[0]
    // this.age = arguments[1]
    // this.gender = arguments[2]

    
    console.log(arguments);
    this.name = name
    this.age = age
    this.gender = gender
 } 
 Person.prototype.sayHello = function() {

    console.log("你好呀,我是",this.name);
 }

 let test = myNew(Person,'张三','18','男')
 test.sayHello()
 console.log(test.name);
 console.log(test.age);



  