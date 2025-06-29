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
    },
    score: {
        type: Number,
        required: true
    },
    breakdown: {
        type: Object,
        required: true
    },
    missingSkills: {
        type: Object,
        required: true
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
        type: Object,
        required: true
    },
    mentorship: {
        type: Object,
        required: true
    },
    coverLetter: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            ret.createdAt = ret.createdAt ? new Date(ret.createdAt).toISOString() : null;
            ret.updatedAt = ret.updatedAt ? new Date(ret.updatedAt).toISOString() : null;
            ret.date = ret.date ? new Date(ret.date).toISOString() : null;
            return ret;
        }
    }
});

userSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
