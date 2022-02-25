
//使用es5语法实现迭代器
function createIterator(items){
    let i = 0;
    return{
        next () {
            let result = null ;
            result = i < items.length ? {value:items[i],done:false} : {value:undefined,done:true}
            i++;
            return result;
        }
    }

}

const testArr = [1,2,3,4,5];
const arrIterator = createIterator(testArr);
console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());