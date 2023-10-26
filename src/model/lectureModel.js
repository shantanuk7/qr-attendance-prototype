import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    date: Date,
    alive: Boolean,
    course: String,
    subject: String,
    attendees: { type: Array, default: [] } // Setting default as an empty array
  });
const Lecture = mongoose.models.lectures || mongoose.model("lectures", lectureSchema);

export default Lecture;