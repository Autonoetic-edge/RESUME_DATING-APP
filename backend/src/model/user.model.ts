import mongoose from "mongoose";

// const courseSchema = new mongoose.Schema({
//     platform: String,
//     title: String,
//     url: String,
// }, { _id: false });

// const skillSchema = new mongoose.Schema({
//     Skill: String,
//     courses: [courseSchema],
// }, { _id: false });

// const mentorShipSchema = new mongoose.Schema({
//     title: String,
//     explanation: String,
//     quote: String,
//     revised: String,
// }, { _id: false });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    score: {
        type: Number,
        required: true
    },
    breakdown: {
        keywordMatch: Number,
        semanticRelevance: Number,
        formattingStructure: Number,
        grammarReadability: Number,
        quantifiedImpact: Number,
        customizationTailoring: Number,
        atsCompliance: Number
    },
    missingSkills:{
         type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    job_Title:{
        type:String,
        required:true
    },
     company_name:{
        type:String,
        required:true
    },    

    jd: {
        type: String,
        required: true
    },
    evaluationOfResume: {
        type: String,
        required: true
    },
    mentorship: {
         type: String,
        required: true
    },
    coverLetter: {
        type: String
    }
}, {
    timestamps: true
});

export default mongoose.model("User", userSchema);
