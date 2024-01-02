var BlogDo=require('../model/blog')

exports.alluserblog=async function(req, res, next) {
    try {
        var data=await BlogDo.find().populate(["category", "author"])
        res.status(200).json({
            status:"success",
            message:"your all data",
            data:data
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}

exports.singleblog=async function(req, res, next) {
    try {
        var data=await BlogDo.findById(req.params.id)
        res.status(200).json({
            status:"success",
            message:"your all data",
            data:data
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}

exports.blogall=async function(req, res, next) {
    try {
        var data=await BlogDo.find({author: req.userId}).populate(["category", "author"])
        console.log(req.userId);
        res.status(200).json({
            status:"success",
            message:"your all data",
            data:data
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}

exports.blogadd=async function(req, res, next) {
    try {
        req.body.image=req.file.filename
        var totaldata={title:req.body.title,description:req.body.description,image:req.body.image,category:req.body.category,author:req.userId}
        var data=await BlogDo.create(totaldata)
        res.status(201).json({
            status:"success",
            message:"your all data",
            data:data
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}

exports.blogupdate=async function(req, res, next) {
    try {
        const id=req.query.id
        req.body.image=req.file.filename
        var totaldata={title:req.body.title,description:req.body.description,image:req.body.image,category:req.body.category,author:req.userId}
        var data=await BlogDo.findByIdAndUpdate(id,totaldata)
        var user=await BlogDo.findByIdAndUpdate(id)
        res.status(200).json({
            status:"success",
            message:"your data added",
            data:user
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}

exports.blogdelete=async function(req, res, next) {
    try {
        const id=req.query.id
        var data=await BlogDo.findByIdAndDelete(id)
        res.status(200).json({
            status:"success",
            message:"your data deleted",
            data:data
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error.message       
        })
    }
}