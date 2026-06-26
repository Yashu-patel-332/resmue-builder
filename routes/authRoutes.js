const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require("../models/user.js")
const router = express.Router();
const jwt = require("jsonwebtoken")
const { generateToken } = require('../utils/generateToken.js');
const { registerUser, loginUser } = require('../controller/authcontroller.js');


router.post("/login", loginUser);
router.post("/register", registerUser);




module.exports = router;