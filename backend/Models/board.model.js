const mongoose = require("mongoose");


const boardSchema = mongoose.Schema({
    name: String,
    createdBy: {},
    members: {type:Array}
},{
    timestamps: true
});

const boardModel = mongoose.model("board", boardSchema);

module.exports = {
    boardModel
}