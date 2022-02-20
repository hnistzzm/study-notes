
function SuperClass(name){
    this.name = name;
    this.books  = ['js','css'];
}
SuperClass.prototype.getBooks = function(){
  
    return this.books;
}

function SubClass(name,time){
    this.time = time;
    SuperClass.call(this,name);
}

SubClass.prototype = new SuperClass();
SubClass.prototype.constructor = SubClass;

SubClass.prototype.getTime = function(){
  
    return this.time;
}

const instance = new SubClass('张振明',15);
console.log(instance.getTime());
console.log(instance.getBooks());
