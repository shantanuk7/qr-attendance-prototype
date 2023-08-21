import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    course: String
});

const Student = mongoose.models.students || mongoose.model("students", studentSchema);

export default Student;