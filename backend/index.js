const express = require('express');
const { connection } = require('./Configs/db');
require("dotenv").config();
const { userRoute } = require("./Routes/user.route");

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/auth", userRoute);

app.get('/', (req, res) => res.send('Hello, You are on Home page'));

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