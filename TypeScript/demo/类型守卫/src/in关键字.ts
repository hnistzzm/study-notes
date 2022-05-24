//类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内

interface Admin{
    name:string;
    privileges:string[];
}

interface Employee{
    name:string;
    startDate:Date;
}

type unknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: unknownEmployee){

    console.log("Name",emp.name);
    
    if("privileges" in emp){

        console.log("Privileges: " + emp.privileges);
        
    }
    if("startDate" in emp){
        console.log("startDate: " + emp.startDate);
    }

}

let emp:unknownEmployee = {
    name:'hello',
    privileges:['a','b','c']
}

printEmployeeInformation(emp)