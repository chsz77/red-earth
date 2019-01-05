const db = require("../models");

exports.getComments = async function (req, res, next){
  try{
    let comments = await db.Comment.find({imageId: req.params.image_id}).sort({createdAt: "desc"})
    return res.status(200).json(comments)
  } catch(err){
        return next(err);
  }
}

//delete comment
exports.deleteComment = async function (req, res, next) {
  try{
    let deleteComment = await db.Comment.findById(req.params.comment_id)
    await deleteComment.remove()
    return res.status(200).json(deleteComment)
  }
  catch(err){
        return next(err);
  }
}
//post new comment
exports.newComment = async function(req, res, next){
  try{
    let newComment = await db.Comment.create({
      text: req.body.text,
      imageId: req.body.imageId,
      author: req.body.author
    })
    return res.status(200).json(newComment)
  } catch(err){
        return next(err);
  }
}
