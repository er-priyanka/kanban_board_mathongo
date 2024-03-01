const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: {
        type:String,
        required:true
    },
    name: {
        type:String, 
        required:true
    },
    email: {
        type:String, 
        required:true
    },
    avatar: {
        type:String,
        required:true
    },
    recentlyVisitedBoards:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }],
    
},{
    timestamps: true
});

const UserModel = mongoose.model("User", userSchema);

module.exports = {UserModel};