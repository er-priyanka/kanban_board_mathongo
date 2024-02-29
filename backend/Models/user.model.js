const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
    googleId: {type:String},
    name: {type:String},
    email: {type:String},
    avatar: {type:String},
    recentlyVisitedBoards:{type:Array}
},{
    timestamps: true
});

const signupModel = mongoose.model("user", signupSchema);

module.exports = {
    signupModel
}