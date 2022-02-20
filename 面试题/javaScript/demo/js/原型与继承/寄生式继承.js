/**
 * 其实寄生式继承就是对原型继承的拓展，一个二次封装的过程，这样新创建的对象不仅仅有父类的属性和方法，还新增了别的属性和方法。
 */

function inheritObject(o){

    function F(){
        // console.log(this.name);
    }

    F.prototype = o;

    return new F();

}

function createBook(obj){ 

    var o = new inheritObject(obj);

    o.setName = function(name){
        this.name = name;
    }

    return o;
}

var book = {
    name:'js book',
    likeBook:['html book','css book']
}

const newBook = createBook(book);
newBook.setName('node book')
console.log(newBook.name);