const mongoose = require("mongoose");
const db = "mongodb://chsz77:123xx456@ds155097.mlab.com:55097/newproject";

// mongoose.set("debug", true)
mongoose.connect(db,  { useNewUrlParser: true, useCreateIndex: true, })
    .then(() => console.log('Database connected2'))
    .catch(err => console.log(err));
    
module.exports.User = require("./user");
module.exports.Image = require("./image");
module.exports.Comment = require("./comment");