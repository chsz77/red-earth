const db = require("../models");

exports.getDashboard = async function (req, res, next){
 try{
   let sort = { "createdAt": -1 }
//   let sortByViews = {"views": -1}
//   let sortByRed ={ "red": -1 }
//   let search = null
//   if (req.query.location){
//      search = {'location': new RegExp(req.query.location.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'gi')}
//   } 
//   if(req.query.sort && req.query.sort==="red"){
//      sort = sortByRed
//   } if(req.query.sort==="views"){
//       sort = sortByViews
//   } 
//   let limit =  parseInt(req.params.limit)
//   let skip = parseInt(req.params.skip)
   let user_id = req.params.user_id
   let comments = await db.Comment.find({"author.id": user_id}).sort(sort).populate({
         path    : 'imageId parentId', select:"title",
         populate: [
             { path: 'imageId', select: 'title' },
         ]
    })
//   .populate('imageId parentId', 'title imageId')
   let images = await db.Image.find({"author": user_id}).sort(sort)
   return res.status(200).json({images:images, comments: comments})
 }
 catch(err){
        return next(err);
 }
}

// exports.getUserComments =  async function (req, res, next){
//     try{
//         let sort = { "createdAt": -1 }
//         let user_id = req.params.user_id
//         let comments = await db.Comment.find({"author.id": user_id}).sort(sort)
//         return res.status(200).json(comments)
//     } catch (err){
//         return next(err)
//     }
// }