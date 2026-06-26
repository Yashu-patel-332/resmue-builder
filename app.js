const express = require('express')
const PDFDocument = require("pdfkit");
const path = require("path")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const connectDB = require("./database/db.js")
const indexRouter = require("./routes/index.js")
const authRouter = require("./routes/authRoutes.js")
const resumeRouter = require("./routes/resumeRoutes.js")
const cookieParser = require("cookie-parser")

require("dotenv").config()

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))



app.use("/", indexRouter)
app.use("/auth", authRouter)
app.use("/resume", resumeRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
    connectDB();
})