var CatDo=require('../model/category')


exports.alldata=async function(req, res, next) {
    try {
        var data=await CatDo.find()
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

exports.adddata=async function(req, res, next) {
    try {
        req.body.image=req.file.filename
        var totaldata={name:req.body.name,image:req.body.image}
        var data=await CatDo.create(totaldata)
        res.status(201).json({
            status:"success",
            message:"your data added",
            data:data
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}

exports.updatedata=async function(req, res, next) {
    try {
        let id=req.query.id
        req.body.image=req.file.filename
        totaldata={name:req.body.name,image:req.body.image}
        var data=await CatDo.findByIdAndUpdate(id,totaldata)
        var user=await CatDo.findByIdAndUpdate(id)
        res.status(200).json({
            status:"success",
            message:"your data updated",
            data:user
        })
        
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}

exports.deletedata=async function(req, res, next) {
    try {
        let id=req.query.id
        data=await  CatDo.findByIdAndDelete(id)
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