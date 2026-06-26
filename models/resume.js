const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fullname: String,
    email: String,
    phone: Number,
    address: String,
    summary: String,
    skills: [String],
    education: String,
    experience: String,
    projects: String
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Resume", resumeSchema);