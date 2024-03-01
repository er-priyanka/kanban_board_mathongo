const mongoose = require("mongoose");


const boardSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
    timestamps: true
});

const BoardModel = mongoose.model("Board", boardSchema);

module.exports = {BoardModel};