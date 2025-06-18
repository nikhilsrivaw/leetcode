const express = require('express')
require('dotenv').config()
const app = express();

const main = require('./config/db')

const cookieParser = require("cookie-parser")
 
const authRouter =require('./routes/userAuth');
const redisClient = require('./config/redis');
const problemRouter = require("./routes/problemCreator")

app.use(express.json());
app.use(cookieParser());
app.use('/user' , authRouter);
app.use('/problem' , problemRouter);

const InitalizeConnection = async ()=>{
    try {
        await Promise.all([main() , redisClient.connect()]);
        console.log("db connected");

        app.listen(process.env.PORT , ()=>{
            console.log("Server listening at port number " + process.env.PORT)
        })
    } catch (error) {
        console.log("Error " + error)
    }
}

InitalizeConnection();


