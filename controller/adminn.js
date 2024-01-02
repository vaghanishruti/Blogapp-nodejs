var AdminDo=require('../model/admin')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.middleware=async function(req, res, next) {
    try {
        var token=req.headers.token
        var decoded = jwt.verify(token, 'admin-name');
        var checkuser=await AdminDo.findById(decoded.id)
        if(!checkuser){
            throw new Error('user is not found')
        }
        req.adminId=decoded.id
        next()
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}


exports.adminsign=async function(req, res, next) {
    try {
        if(!req.body.username||!req.body.password){
            throw new Error('please check your field')
        }
        req.body.password=await bcrypt.hash(req.body.password,10)
        var data=await AdminDo.create(req.body)
        var token= jwt.sign({ id: data._id }, 'admin-name');
        res.status(201).json({
            status:"success",
            message:"your data added",
            data:data,
            token
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}

exports.adminlog=async function(req, res, next) {
    try {
        var user=await AdminDo.findOne({username:req.body.username})
        if(!user){
            throw new Error('user is not found')
        }
        var passcompare=await bcrypt.compare(req.body.password,user.password)
        console.log(passcompare);
        var token= jwt.sign({ id: user._id }, 'admin-name');
        res.status(200).json({
            status:"success",
            message:"your data login",
            data:user,
            token
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}

exports.userdelete=async function(req, res, next) {
    try {
        let id=req.query.id
        var data=await UserDo.findByIdAndDelete(id)
        res.status(200).json({
            status:"success",
            message:"user data is deleted",
            data:data
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}