import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    course: String,
    subject: String,
});

const Subject = mongoose.models.subjects || mongoose.model("subjects", subjectSchema);

export default Subject;