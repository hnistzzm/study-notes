



 const createPerson = (name)=>{
    let obj = {}
    obj.name = name
    obj.sex = '男'
    obj.sayName =()=>{
        console.log(obj.name);
    }
    return obj 
 }
 let wukong = createPerson('沙和尚')
 console.log(wukong);