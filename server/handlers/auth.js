const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next){
  try {
      let user = await db.User.findOne({
          email: req.body.email
      });
      let {id, username} = user;
      let isMatch = await user.comparePassword(req.body.password);
      if(isMatch){
          let token = jwt.sign({
              id,
              username
          }, process.env.SECRET_KEY);
          return res.status(200).json({
              id,
              username,
              token
          })
      } else {
          return next({
              status: 400,
              message: "Your Email/Password is wrong"
          })
      }    
  } catch (err){
      return next({
              status: 400,
              message: "Your Email/Password is wrong"
      })
  }
}


exports.signup = async function(req, res, next){
  try{
      let user = await db.User.create(req.body);
      let { id, username} = user;
      let token = jwt.sign({
              id,
              username
          },
          process.env.SECRET_KEY
      ); 
      return res.status(200).json({
          id,
          username,
          token
      })
  } catch(err){
      if(err.code === 11000){
          err.message = "You can't use that Username/Email."
          
      }
      return next({
          status: 400,
          message: err.message
      });
  }
}