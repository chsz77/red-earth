const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text:{
      type: String,
      required: true,
    },
  imageId: {
      type: String,
      required: true,
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
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment