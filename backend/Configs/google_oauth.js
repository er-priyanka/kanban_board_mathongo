const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
require("dotenv").config();
const {UserModel} = require("../Models/user.model");
const bcrypt = require("bcrypt");


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    const user = profile;
    // console.log(user);

    if(user){
        const googleId = user.id;
        const email = user.emails[0].value;
        const name = user.displayName;
        const avatar = user.photos[0].value;

        // if user is already present in the database 
        const isUserPresent = await UserModel.findOne({email});
        if(isUserPresent){
            console.log("Email already exists!");
            // console.log(user, accessToken);
            // res.send({Status: "Failed", Message: "Email already exists!"});
            return cb(null, user);
        }else{
            // create new user and add in database
            try{
                const password = String(Math.random()*43548 + "dkh");

                bcrypt.hash(password, 8, async(err, hash) =>{
                    const new_user = new UserModel({
                        googleId, 
                        email, 
                        name, 
                        avatar, 
                        password:hash
                    });
        

                    await new_user.save();
                    return cb(null, new_user);
                    // res.status(201).send("Signup Successfully!");
                });
    
            }catch(err){
                console.log(err.message);
                // res.send(401).send(err.message);
            }
            
        }
        // console.log(new_user);
        
    }else{
        console.log("not found");
    }
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     
    //   });
    
    // console.log(accessToken, profile);
    
  }
));

module.exports = passport;