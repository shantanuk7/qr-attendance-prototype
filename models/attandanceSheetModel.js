import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    date: Date,
    course: String,
    subject: String,
    students: Array,
});

const Attendance = mongoose.models.attendances || mongoose.model("attendances", attendanceSchema);

export default Attendance;