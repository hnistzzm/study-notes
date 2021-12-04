/*
    moduleIntro:封装学生API
    information:此模块不处理错误信息,只关心业务
*/
var fs = require('fs')
const dbPath = './db.json'
/* 查找学生信息 */
exports.find = function(callback){
    fs.readFile(dbPath,'utf-8',function(err,data){
        if(err){
            return callback(err)
        }
        callback(null,JSON.parse(data).students)
    })  
}
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
exports.edit = function(student,callback){
    fs.readFile(dbPath,'urf-8',function(err,data){
        if(err) return callback(err)

        let students = JSON.parse(data).students
        //使用find方法后,stu与students对象指向同一个地址值,所以此时改变stu的值实际上也改变了students中对象的值
        let stu = students.find(function(item){
            return item.id === student.id
        })

        for(let p in student){
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