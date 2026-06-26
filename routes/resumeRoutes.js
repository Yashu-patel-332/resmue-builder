const express = require('express')
const router = express.Router();
const resumeModel = require("../models/resume.js")
const userModel = require("../models/user.js")
const auth = require("../middleware/auth.js")

//dashboard


router.post("/create", auth, async (req, res) => {
    const { fullname, email, phone, address, summary, skills, education, experience, projects } = req.body;
    const newResume = await resumeModel.create({ userId: req.user.id, fullname, email, phone, address, summary, skills: skills.split(","), education, experience, projects });
    res.redirect("/Dashboard");
});


router.post("/edit/:id", auth, async (req, res) => {
    await resumeModel.findByIdAndUpdate(req.params.id,
        { ...req.body, skills: req.body.skills.split(",") });
    res.redirect("/Dashboard");
});




module.exports = router;