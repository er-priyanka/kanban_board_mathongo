const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    board:{},
    title:String,
    description:String,
    category:{
        type:String,
        enum:["Unassigned", "InDevelopment", "PendingReview", "Done" ]
    },
    assignedTo: {},
    deadline:Date,
}, {
    timestamps: true
})