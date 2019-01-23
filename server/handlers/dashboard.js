const db = require("../models");

exports.getDashboard = async function (req, res, next){
 try{
   let sort = { "createdAt": -1 }
   let user_id = req.params.user_id
   let comments = await db.Comment.find({"author.id": user_id}).sort(sort).populate({
         path    : 'imageId parentId', select:"title",
         populate: [
             { path: 'imageId', select: 'title' },
         ]
    })
   let level = await db.Image.find({"level": user_id}).sort(sort)  
   let images = await db.Image.find({"author": user_id}).sort(sort)
   return res.status(200).json({images:images, comments: comments, level: level})
 }
 catch(err){
        return next(err);
 }
}
