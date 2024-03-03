const express = require('express');
const { connection } = require('./Configs/db');
require("dotenv").config();
const { userRoute } = require("./Routes/user.route");
const { authenticate } = require('./Middlewares/authenticate');
const { dashboardRoute } = require('./Routes/dashboard.route');

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/auth", userRoute);

// protected route
// app.get("/protected-route", authenticate, (req, res) =>{
//     res.json({message: "You have accessed the protected route"});
// })

app.use("/dashboard", dashboardRoute);

// home page route 
app.get('/', (req, res) => res.send('Hello, You are on Home page'));

// connect with port and make connection with db 
app.listen(PORT, async () => {
    try{
       await connection;
       console.log("Connected to Database");
    }
    catch(err){
        console.log(err);
    }
    console.log(`server started on http://localhost:${PORT}`)
});