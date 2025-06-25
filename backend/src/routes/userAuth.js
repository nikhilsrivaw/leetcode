const express = require('express');
const { register, login, logout, adminRegisrter, deleteProfile } = require('../controllers/userAuthent');
const userMiddleware = require('../middleware/userMiddlware');
const adminMiddleware = require('../middleware/adminMiddleware')

const authRouter = express.Router();


// rregister
authRouter.post('/register', register);
authRouter.post('/login' , login);
authRouter.post('/logout', userMiddleware , logout);
authRouter.post('/admin/register', adminMiddleware, adminRegisrter)
authRouter.delete('/profile' , userMiddleware, deleteProfile)
authRouter.get('/check',userMiddleware,(req,res)=>{
    const reply ={
        firstName:req.result.firstName, 

        emailId:req.result.emailId,
        _id:req.result._id,
    }

    res.status(200).json({
        user:reply,
        message:"Valid User"
    })
})

module.exports = authRouter;