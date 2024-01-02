var UserDo=require('../model/userdata')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


exports.middeldata=async function(req, res, next) {
    try {
        var token=req.headers.token
        var decoded = jwt.verify(token, 'user-name');
        var checkuser=await UserDo.findById(decoded.id)
        if(!checkuser){
            throw new Error('user isnot found')
        }
        req.userId=decoded.id
        next()
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}



exports.signup=async function(req, res, next) {
    try {
        if(!req.body.username||!req.body.password){
            throw new Error('please check you field')
        }
        req.body.password=await bcrypt.hash(req.body.password,10)
        var data=await UserDo.create(req.body)
        var token = jwt.sign({  id: data._id  }, 'user-name');
        res.status(201).json({
            status:"success",
            message:"your data signin",     
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


exports.login=async function(req, res, next) {
    try {
        var user=await UserDo.findOne({username:req.body.username})
        if(!user){
            throw new Error('user is not found')
        }
        var passcompare=await bcrypt.compare(req.body.password,user.password)
        if(!passcompare){
            throw new Error('please check you password')
        }
        var token = jwt.sign({  id: user._id  }, 'user-name');
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

exports.alluser=async function(req, res, next) {
    try {
        let data=await UserDo.find()
        res.status(200).json({
            status:"success",
            message:"your data login",
            data:data
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}