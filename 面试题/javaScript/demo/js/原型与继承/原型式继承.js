
function inheritObject(o){

    function F(){
        // console.log(this.name);
    }

    F.prototype = o;

    return new F();

}

var book = {
    name:'js book',
    likeBook:['css Book','html book']
}

const newBook = inheritObject(book);
newBook.name = 'ajax book';
console.log(newBook.name);