const express = require("express")
const router = express.Router()
const PDFDocument = require("pdfkit")
const auth = require("../middleware/auth.js")
const userModel = require("../models/user.js")
const resumeModel = require("../models/resume.js")

router.get('/', (req, res) => {
    res.render('index', {
        error: req.query.error,
        success: req.query.success,
    })
})

router.get('/login', (req, res) => {
    res.render('login', {
        error: req.query.error,
        success: req.query.success,
    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        error: req.query.error,
        success: req.query.success,
    })
})


router.get('/dashboard', auth, async (req, res) => {

    const resumes = await resumeModel.find({ userId: req.user._id });

    res.render('Dash', { user: req.user, resumes });
});

router.get("/create", auth, (req, res) => {
    res.render("createresume")
})

router.get("/resume/delete/:id", auth, async (req, res) => {
    await resumeModel.findByIdAndDelete(req.params.id);
    res.redirect("/Dashboard");
});

router.get("/resume/edit/:id", auth, async (req, res) => {
    const resume = await resumeModel.findById(req.params.id);
    res.render("editResume", { resume });
});

router.get("/resume/preview/:id", async (req, res) => {
    const resume = await resumeModel.findById(req.params.id);
    res.render("preview", { resume });
});

router.get('/logout', auth, (req, res) => {
    res.clearCookie("token");
    res.redirect("/login?success=You%20have%20been%20logged%20out");
});

router.get("/download/:id", auth, async (req, res) => {
    const resume = await resumeModel.findById(req.params.id);
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; fileName=${resume.fullname}.pdf`);
    doc.pipe(res);
    doc.fontSize(24).text(resume.fullname, {
        align: "center"
    });
    doc.moveDown();
    doc.fontSize(14).text(`Email : ${resume.email}`);
    doc.text(`Phone : ${resume.phone}`);
    doc.text(`Address : ${resume.address}`);
    doc.moveDown();
    doc.text(`Summary`);
    doc.text(resume.summary);
    doc.moveDown();
    doc.text(`Skills`);
    doc.text(resume.skills.join(", "));
    doc.moveDown(); doc.text(`Education`);
    doc.text(resume.education);
    doc.moveDown(); doc.text(`Experience`);
    doc.text(resume.experience);
    doc.moveDown(); doc.text(`Projects`);
    doc.text(resume.projects);
    doc.end();
});

module.exports = router;