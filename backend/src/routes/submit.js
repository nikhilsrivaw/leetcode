
const express = require('express');
const submitRouter = express.Router();
const userMiddleware = require("../middleware/userMiddlware");
const submitCode = require("../controllers/userSubmission");

submitRouter.post("/submit/:id", userMiddleware, submitCode);

module.exports = submitRouter;