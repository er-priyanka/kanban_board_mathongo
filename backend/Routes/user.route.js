const express = require("express");
const passport = require("../Configs/google_oauth");
const { UserModel } = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRoute = express.Router();

// google oauth
userRoute.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));
 
userRoute.get('/google/callback',  
  passport.authenticate('google', { failureRedirect: '/auth/signin', session:false }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');

  });


// signup route
userRoute.post("/signup", async(req, res) =>{
    const {email, name, password, avatar} = req.body;
    const user = await UserModel.findOne({email});

    if(user){
        res.send({Status: "Failed", Message: "Email already exists!"});
    }else{
        try{
            bcrypt.hash(password, 8, async(err, hash) =>{
                const new_user = new UserModel({
                    name, email, avatar, password:hash
                });
    
                await new_user.save();
                res.status(201).send("Signup Successfully!");
            });

        }catch(err){
            res.send(401).send(err.message);
        }
        
    }
    
});

// signin route
userRoute.post("/signin", async (req, res) =>{
    const {email, password} = req.body;

    try{
        const user = await UserModel.findOne({email});

        if(user){
            bcrypt.compare(password, user.password, function (err, result){
                if(result){
                    const token = jwt.sign({userID:user._id}, "mathonGo");

                    res.send({
                        message:"Login Success",
                        token:token,
                        name:user.name,
                        email:user.email
                    });
                }else{
                   res.send({message:"wrong password!"});
                }


            })
        }else{
            res.send({message:"Wrong Credentials!"});
        }
    }catch(err){
        res.send(err.message);
    }
});

// signout route
userRoute.post("/signout" , async(req, res) =>{
    const token = req.headers.authorization;

    if(token){
        const decoded = jwt.verify(token, "mathonGo");

        if(decoded){
            const userID = decoded.userID;

            const user = await UserModel.findOneAndDelete({_id:userID});
            res.send("Logout Successful");
        }else{
            res.send("Invalid token!");
        }
    }else{
        res.redirect("/auth/signin");
        res.end();
    }
})




  module.exports = {userRoute};