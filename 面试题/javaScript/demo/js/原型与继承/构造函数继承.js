/**
 * 
 * SuperClass.call(this,id)当然就是构造函数继承的核心语句了.由于父类中给this绑定属性，因此子类自然也就继承父类的共有属性。由于这种类型的继承没有涉及到原型prototype，所以父类的原型方法自然不会被子类继承，而如果想被子类继承，就必须放到构造函数中，这样创建出来的每一个实例都会单独的拥有一份而不能共用，这样就违背了代码复用的原则，所以综合上述两种，我们提出了组合式继承方法
 */

function SuperClass(id) {
    this.books = ['js','css'];
    this.id = id;
}
SuperClass.prototype.showBooks = function(){
    console.log(this.books);
}

function SubClass(id){

    SuperClass.call(this,id)

}

const instance1 = new SubClass(10);
const instance2 = new SubClass(10);

instance1.books.push('html');
console.log(instance1)
console.log(instance2)
instance1.showBooks();//TypeError