const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text:{
      type: String,
      required: true,
    },
  imageId: {
      type: String,
    },
  author: {
          id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
          username: String
        },
  reply: {
      type: Boolean,
      default: false
  },
  parentId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
  },
  helpful:[String],
  nothelpful: [String],
  points: {type: Number, default: 0}
  },
  {
    timestamps: true
  }
  
)

commentSchema.pre("remove", async function(next){
    try{
        await Comment.deleteMany({parentId: this.id});
    } catch (err){
        return next(err);
    }
})


const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment