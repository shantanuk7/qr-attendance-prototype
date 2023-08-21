import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    date: Date,
    qrcode: String,
    subject: String,
    attendees: [String],
});

const Lecture = mongoose.models.lectures || mongoose.model("lectures", lectureSchema);

export default Lecture;