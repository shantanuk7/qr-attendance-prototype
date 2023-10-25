import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    date: Date,
    alive: Boolean, //alive means lecture is going on and students can still mark attendance.
    course: String,
    subject: String,
    attendees: Array,
});

const Lecture = mongoose.models.lectures || mongoose.model("lectures", lectureSchema);

export default Lecture;