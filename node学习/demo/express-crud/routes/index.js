/* 
    moduleIntro:项目路由组件
    information:此模块处理客户端发送的请求
*/
var express = require('express')
var router = express.Router()

var Students = require('./students')
var errlog = require('../public/js/errlog')

router.get('/students',function(req,res){
    Students.find(function(err,data){
        if(err){
            errlog.output(err)
            return res.status(500).send('server err')
        }
        res.render('index.html',{
            students:data
        })
    })
})

router.get('/students/new',function(req,res){
    res.render('addStudent.html')
})

router.post('/students/new',function(req,res){
    const newStudentInfo = req.body
    Students.add(newStudentInfo,function(err){
        if(err){
            errlog.output(err)
            return res.status(500).send('server err')
        }
        res.redirect('/students')
    })    
})

router.get('/students/edit',function(req,res){
    const studentId = Number(req.query.id) 
    Students.getStudent(studentId,function(err,data){
        if(err){
            errlog.output(err)
            return res.status(500).send('server err')
        }
        res.render('editStudent.html',{
            studentInfo:data
        })
    })
    
})

router.post('/students/edit',function(req,res){
    const editStudentInfo = req.body
    editStudentInfo.id = Number(editStudentInfo.id)
    console.log("req.body",req.body);
    Students.edit(editStudentInfo,function(err){
        if(err){
            errlog.output(err)
            return res.status(500).send('server err')
        }
        res.redirect('/students')
    })
})

router.get('/students/delete',function(req,res){
    console.log("即将被删除的学生的id为",req.query.id);
})

module.exports = router