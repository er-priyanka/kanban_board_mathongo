const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:["Unassigned", "InDevelopment", "PendingReview", "Done" ],
        default: 'Unassigned'
    },
    assignedTo: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    deadline:{
        type: Date
    },
    board:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Board',
        required:true
    },
}, {
    timestamps: true
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = {TaskModel};