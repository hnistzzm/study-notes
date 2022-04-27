
class Person {

    constructor(name,age){
        this.name = name;
        this.age = age;
    }

    sayHello(){
        console.log("你好,我叫",this.name);
    }

    get gender(){
        return '女';
    }

    set gender(gender){

        console.log("set",gender);
    }

    get name(){
        return 'abc'
    }

    set name(name){

        console.log("set",name);
    }

   

}

let zzm = new Person('张振明',19);

zzm.sayHello()
zzm.gender = '男'
console.log(zzm.gender);
zzm.name = '张明'
console.log(zzm.name);