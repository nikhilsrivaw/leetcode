const User = require('../models/user')


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validate = require('../utils/validator')
const redisClient = require('../config/redis')
const Submission = require('../models/submissions')

const register = async (req, res) => {
    try {

        // validate the data 
        validate(req.body)
        const { firstName, password, emailId } = req.body;
        req.body.password = await bcrypt.hash(password, 10);
        req.body.role = 'user'



        const user = await User.create(req.body);

        const token = jwt.sign({ _id: user._id,role:'user', emailId: emailId }, process.env.JWT_KEY, { expiresIn: 60 * 60 });

        res.cookie('token', token, { maxAge: 60 * 60 * 1000 })
        res.status(201).send("user reguister succeded")




    } catch (error) {
        res.status(400).send("Error" + error.message)

    }
}
const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!emailId) {
            throw new Error("inavlid credentials")
        }
        if (!password) {
            throw new Error("inavlid credentials")

        }

        const user = await User.findOne({ emailId });

        const match = bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("inavlid crredentails")
        }
        const token = jwt.sign({ _id: user._id, emailId: emailId , role : user.role }, process.env.JWT_KEY, { expiresIn: 60 * 60 });

        res.cookie('token', token, { maxAge: 60 * 60 * 1000 })
        res.status(200).send("logged in succesfully")



    } catch (error) {
        res.status(401).send("error" + error)

    }

}
const logout = async (req, res) => {
    try {

        const { token } = req.cookies;
        console.log("Cookies:", req.cookies);


        const payload = jwt.decode(token);

        await redisClient.set(`token:${token}`, 'Blocled')
        await redisClient.expireAt(`token:${token}`, payload.exp)
        // t0ken add 
        // cookies clear 
        res.cookie("token", null, new Date(Date.now()))
        res.send("loggedout succesfully")
    } catch (error) {
        res.status(503).send("ERROR" + error.message)

    }
}

const adminRegisrter = async (req , res)=>{
    try {

        // validate the data 
        // if(req.result.role!='admin')
        //     throw new Error("invalid credentials ");
        validate(req.body)
        const { firstName, password, emailId } = req.body;
        req.body.password = await bcrypt.hash(password, 10);




        const user = await User.create(req.body);

        const token = jwt.sign({ _id: user._id,role:user.role, emailId: emailId }, process.env.JWT_KEY, { expiresIn: 60 * 60 });

        res.cookie('token', token, { maxAge: 60 * 60 * 1000 })
        res.status(201).send("user reguister succeded")




    } catch (error) {
        res.status(400).send("Error" + error.message)

    }


}

const deleteProfile = async (req,res)=>{
    try {
        const userId = req.result._id;
        await User.findByIdAndDelete(userId);

       

        res.status(200).send("Profile deleted successfully");
        
    } catch (error) {
        res.status(500).send("Error deleting profile: " + error.message);

        
    }
}

module.exports = { register, login, logout , adminRegisrter , deleteProfile }