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