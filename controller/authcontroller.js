const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { generateToken } = require("../utils/generateToken.js")

module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;


        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.send("Email Already Exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create(
            {
                name,
                email,
                password: hashedPassword
            });

        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/dashboard");
    }
    catch (error) {
        console.log(error);
        res.send("Server Error");
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email: email });

        if (!user)
            return res.redirect("/login");

        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {

                let token = generateToken(user)
                res.cookie("token", token);
                res.redirect("/dashboard")
            } else {
                res.redirect("/login")
            }
        })
    } catch (error) {
        console.log(error);
        res.redirect("/login?error=An%20error%20occurred%20while%20logging%20in")
    }
}


