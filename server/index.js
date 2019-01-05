require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")
const errorHandler = require("./handlers/error")
const authRoutes =  require("./routes/auth");
const imagesRoutes =  require("./routes/images");
const commentsRoutes =  require("./routes/comments");
const path = require('path');
const db = require("./models")

//intial config
const PORT = process.env.PORT;





app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes); 
app.use("/api/images", imagesRoutes); 
app.use("/api/comments", commentsRoutes); 


app.use(express.static(path.join(__dirname + '/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})
// const faker = require("faker")
    
// app.get("/faker", function(req, res, next){    
//     for (var i = 0; i < 30; i++) {
//         var image = new db.Image()
//         image.text = faker.lorem.paragraphs()
//         image.title = faker.lorem.words()
//         image.image = `https://dummyimage.com/${Math.floor(Math.random() * 600) + 680}x${Math.floor(Math.random() * 400) + 480}`
//         image.author = "5c2af5d9018db006cf2c904e"
//         image.red = Math.floor(Math.random() * 1000)
//         image.views = Math.floor(Math.random() * 10000)
//         image.save(function(err) {
//             if (err) throw err
//         })
//     }
//     return res.status(200).json("ok")
// })

app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);


app.listen(PORT, ()=>console.log(`connected ${PORT}`))