const db = require("../models");


exports.getImages = async function (req, res, next){
 try{
   let sort = { "createdAt": -1 }
   let sortByViews = {"views": -1}
   let sortByRed ={ "red": -1 }
   if(req.query.sort && req.query.sort==="red"){
     sort = sortByRed
   } if(req.query.sort==="views"){
      sort = sortByViews
   } 
   let limit =  parseInt(req.params.limit)
   let skip = parseInt(req.params.skip)
   let Images = await db.Image.find().limit(limit).skip(skip).sort(sort)
   return res.status(200).json(Images)
 }
 catch(err){
        return next(err);
 }
}

// Get single story
exports.getImage = async function(req, res, next){
  try{
    let story = await db.Image.findById(req.params.image_id).populate("author", {username: true})
    await story.views++
    await story.save()
    return res.status(200).json(story)
  }
  catch(err){
    return next(err)
  }
}

//new Image
exports.newImage =  async function (req, res, next) {
  try{
    let story = await db.Image.create({
      text: req.body.text,
      title: req.body.title,
      image: req.body.image,
      author: req.body.author
    });
    return res.status(200).json(story)
  }
  catch(err){
        return next(err);
  }
}

exports.deleteImage = async function(req, res, next){
  try{
    let deleteStory = await db.Image.findById(req.params.image_id)
    await deleteStory.remove();
    return res.status(200).json(deleteStory)
  }
  catch(err){
        return next(err);
  }
}

exports.editImage = async function(req, res, next){
  try{
    let foundStory = await db.Image.findById(req.params.image_id)
    await foundStory.set({
      text: req.body.text,
      title: req.body.title,
      image: req.body.image
    })
    await foundStory.save()
    let updatedStory = await db.Image.findById(req.params.id)
    return res.status(200).json(updatedStory)
  }
  catch(err){
        return next(err);
  }
}

//votes
exports.votes = async function (req, res, next){
  try{
    let foundStory = await db.Image.findById(req.params.image_id)
    if(!foundStory.level.includes(req.params.user_id)){
      await foundStory.level.push(req.params.user_id)
      await foundStory.red++
      await foundStory.save()
      return res.status(200).json(true)
    } else {
      await foundStory.level.pull(req.params.user_id)
      await foundStory.red--
      await foundStory.save()
      return res.status(200).json(false)
    }
  } 
  catch(err){
    return next(err)  
  }
}
