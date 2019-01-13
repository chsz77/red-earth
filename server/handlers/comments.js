const db = require("../models");

exports.getComments = async function (req, res, next){
  try{
    let comments = await db.Comment.find({imageId: req.params.image_id}).sort({createdAt: "desc"})
    return res.status(200).json(comments)
  } catch(err){
        return next(err);
  }
}

//replies
exports.getReplies = async function (req, res, next){
  try{
    let replies = await db.Comment.find({parentId:req.params.parent_id}).sort({createdAt: "desc"})
    return res.status(200).json(replies)
  } catch (err){
    return next(err)
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
      author: req.body.author,
      parentId: req.body.parentId,
      reply: req.body.reply
    })
    return res.status(200).json(newComment)
  } catch(err){
        return next(err);
  }
}

//votes helpful
exports.votes = async function(req, res, next){
  try{
    let comment_id = req.params.comment_id
    let user_id = req.params.user_id
    let comment = await db.Comment.findById(comment_id)
    if(!comment.nothelpful.includes(user_id)){
      if(comment.helpful.includes(user_id)){
        comment.helpful.pull(user_id)
        comment.points--
        await comment.save()
        return res.status(200).json(false)
      } else {
        comment.helpful.push(user_id)
        comment.points++
        await comment.save()
        return res.status(200).json(true)}  
    } else return res.status(200).json("failed")
  } catch (err){
    return next(err)    
  }
}

exports.hates = async function(req, res, next){
  try{
    let comment_id = req.params.comment_id
    let user_id = req.params.user_id
    let comment = await db.Comment.findById(comment_id)
     if(!comment.helpful.includes(user_id)){
      if( comment.nothelpful.includes(user_id)){
        comment.nothelpful.pull(user_id)
        comment.points++
        await comment.save()
        return res.status(200).json(false)
      } else {
        comment.nothelpful.push(user_id)
        comment.points--
        await comment.save()
        return res.status(200).json(true)}
     } else return res.status(200).json("failed")
  } catch (err){
    return next(err)    
  }
}
