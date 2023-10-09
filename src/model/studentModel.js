import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
},
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
},
  rollNo:{
    type: Number,
    required: [true, "Please provide a Number"],
    unique: true,
},
  password: {
    type: String,
    required: [true, "Please provide a password"],
},
  courseName: {
    type: String,
    required: [true, "Please provide a Course Name"],
},
isStudent: {
  type: Boolean,
  default: true,
},
});

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;
