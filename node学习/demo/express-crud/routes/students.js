/*
    moduleIntro:封装学生API
    information:此模块不处理错误信息,只关心业务
*/
var fs = require('fs')
const dbPath = './db.json'
/* 获取所有学生信息API */
exports.find = function(callback){
    fs.readFile(dbPath,'utf-8',function(err,data){
        if(err){
            return callback(err)
        }
        callback(null,JSON.parse(data).students)
    })  
}
/*获取指定学生信息API*/
exports.getStudent = function(studentId,callback){
    fs.readFile(dbPath,'utf-8',function(err,data){
        if(err){
            return callback(err)
        }
        let students = JSON.parse(data).students
        let stu = students.find((item)=>{
            return item.id === studentId
        })
        let fileData =JSON.stringify({
            students:students
        }) 

        fs.writeFile(dbPath,fileData,function(err){
            if(err) return callback(err)
            callback(null,stu)
        })

    })  

}
/*添加学生信息API*/
exports.add = function(student,callback){
    fs.readFile(dbPath,'utf-8',function(err,data){
        if(err) return callback(err)

        let students = JSON.parse(data).students

        student.id = students[students.length-1].id+1 

        students.push(student)

        let fileData = JSON.stringify({
            students:students
        })

        fs.writeFile(dbPath,fileData,function(err){
            if(err) return callback(err)
            callback(null)
        })
        
    })  
}
/*编辑学生信息API*/
exports.edit = function(student,callback){
    fs.readFile(dbPath,'utf-8',function(err,data){
        if(err) return callback(err)

        let students = JSON.parse(data).students
        //使用find方法后,stu与students对象指向同一个地址值,所以此时改变stu的值实际上也改变了students中对象的值
        let stu = students.find(function(item){
            return item.id === student.id
        })
        console.log("student",student);
        console.log("stu",stu);
        for(let p in student){
            console.log("p",p);
            stu[p] = student[p]
        }

        let fileData = JSON.stringify({
            students:students
        })

        fs.writeFile(dbPath,fileData,function(err){
            if(err) return callback(err)
            callback(null)
        })
    })


}
/*删除学生信息API*/
exports.delete = function(studentId,callback){
    console.log("进入deleteAPI了");
    fs.readFile(dbPath,'utf-8',function(err,data){
        if(err) return callback(err)
        let students = JSON.parse(data).students
        console.log("studentsbefore",students);
        students.forEach((item,index)=>{
            if(item.id === studentId){
                students.splice(index,1)
            }
        })
        console.log("studentsafter",students);
        let fileData = JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,function(err){
            if(err) return callback(err)
            callback(null)
        })
    })

}