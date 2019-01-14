const mongoose = require("mongoose");
const Comment = require("./comment")

const imageSchema = new mongoose.Schema({
    title:{
      type: String,
      required: true
    },
    text:{
      type: String,
      required: true,
    },
    lat:Number,
    lng:Number,
    image:{
      type: String,
    },
    level:[String],
    red: {type: Number, default: 0},
    author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
    views: {type: Number, default: 0},
    location:{type: String},
  },
  {
    timestamps:true
  }
)

imageSchema.pre("remove", async function(next){
    try{
        await Comment.deleteMany({imageId: this.id});
    } catch (err){
        return next(err);
    }
})

const Image = mongoose.model("Image", imageSchema);

module.exports = Image
