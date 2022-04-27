


function * iterEntries(obj) {

    let keys = Object.keys(obj);

    for(let i=0;i<keys.length;i++){

        let key = keys[i];
        yield [key,obj[key]];


    }


}

let myObj = {a:1,b:2};

for (const [key,value] of iterEntries(myObj)) {//for..of会调用对象的迭代器接口
    
    console.log(key,value);

}