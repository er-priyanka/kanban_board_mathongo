const express = require("express");
const { BoardModel } = require("../Models/board.model");
const { UserModel } = require("../Models/user.model");
const { authenticate } = require("../Middlewares/authenticate");

const dashboardRoute = express.Router();

// get dashboard data 
dashboardRoute.get("/", authenticate, async(req, res) =>{
    UserModel.findById(req.userId)
    .populate('recentlyVisitedBoards')
    .exec((err, user) =>{
        if(err){
            return res.status(500).json({message: 'Internal Server Error!'});
        }

        if(!user){
            return res.status(404).json({message: "user not found!"});
        }

        // send user's dashboard data as a response
        res.json({dashboardData: user.recentlyVisitedBoards});
    })
});

// create new board 
dashboardRoute.post("/boards", authenticate, async(req, res) =>{
    const { name } = req.body;

    // create new board 
    const newBoard = new BoardModel({
        name: name,
        createdBy:req.userId,
        members: [req.userId]
    });

    await newBoard.save((err, board) =>{
        if(err){
            return res.status(500).json({message: "Internal Server Error!"});
        }
    });

        
    // Add the new board to the user's recently visited boards
    UserModel.findByIdAndUpdate(req.userId, {$push: {recentlyVisitedBoards:board._id}}), {new:true}, (err, user) =>{
       if(user){
        return res.status(500).json({message: "Internal Server Error!"});
       } 

       res.status(201).json({board});
    };
  
});

// Update the board record in the database
dashboardRoute.put("/boards/:boardId", authenticate, async(req, res) =>{
    const boardId = req.params.boardId;

    const {name} = req.body;

    BoardModel.findByIdAndUpdate(boardId, {name:name}, {new:true}, (err, board) =>{
        if(err){
            return res.status(500).json({message: "Internal Server Error!"});
        }

        if(!board){
            return res.status(404).json({message: "Board not found!"});
        }

        // Send the updated board as response
        res.json({board});
    });
});


// Route to delete a board
dashboardRoute.delete("/boards/:boardId", authenticate, async(req, res) =>{
    const boardId = req.params.boardId;


    BoardModel.findByIdAndDelete(boardId, (err, board) =>{
        if(err){
            res.status(500).json({message: "Intenal Server Error!"});
        }

        if(!board){
            return res.status(404).json({message:"Board not found!"});
        }

        UserModel.findByIdAndUpdate(req.userId, {$pull: {recentlyVisitedBoards:boardId}}, {new:true}, (err, user)=>{
            if(err){
                return res.status(500).json({message: "Internal Server Error!"});
            }

            res.json({message: "Board deleted succefully!"});
        });
    });
});


// route to get user's profile 
dashboardRoute.get("/profile", authenticate, async(req, res) =>{
    UserModel.findById(req.userId, (err, user) =>{
        if(err){
            return res.status(500).json({message: "Internal Server Error"});
        }

        if(!user){
            return res.status(404).json({message: "User not found!"});
        }

        res.json({proflie: user});
    })
});

// update user's profile 
dashboardRoute.put("/profile", authenticate, async(req, res) =>{
    const {name, email} = req.body;

    UserModel.findByIdAndUpdate(req.userId, {name:name, email:email}, {new:true}, (err, user) =>{
        if(err){
            return res.status(500).json({message:"Internal Server Erro!"});
        }

        if(!user){
            return res.status(404).json({message: "User not found!"});
        }

        res.json({profile: user});
    });

});

module.exports = {dashboardRoute};