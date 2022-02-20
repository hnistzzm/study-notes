
function inheritObject(o){
    //声明一个过渡对象
    function F() { }
    //过渡对象的原型继承父对象
    F.prototype = o;
    //返回过渡对象的实例，该对象的原型继承了父对象
    return new F();
}

function inheritPrototype(subClass,superClass){
   // 复制一份父类的原型副本到变量中
  var p = inheritObject(superClass.prototype);
  // 修正因为重写子类的原型导致子类的constructor属性被修改
  p.constructor = subClass;
  // 设置子类原型
  subClass.prototype = p;
}


    function SuperClass(name) {
        this.name = name;
        this.books=['js book','css book'];
     }
    SuperClass.prototype.getName = function() {
        console.log(this.name);
    }
    function SubClass(name,time) {
        SuperClass.call(this,name);
        this.time = time;
    }
  
    inheritPrototype(SubClass,SuperClass);
    SubClass.prototype.getTime = function() {
        console.log(this.time);
    }
    var instance1 = new SubClass('React','2017/11/11')
    var instance2 = new SubClass('Js','2018/22/33');

    instance1.books.push('test book');

    console.log(instance1.books,instance2.books);
    instance2.getName();
    instance2.getTime();
