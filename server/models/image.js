const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    title:{
      type: String,
      required: true
    },
    text:{
      type: String,
      required: true,
    },
    image:{
      type: String,
    },
    level:[String],
    red: {type: Number, default: 0},
    author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
    views: {type: Number, default: 0}
  },
  {
    timestamps:true
  }
)
const Image = mongoose.model("Image", imageSchema);

module.exports = Image
