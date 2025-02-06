// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//     StudentId: { type: Number, required: true, unique: true },
//     Name: { type: String, required: true },
//     Roll: { type: Number, required: true },
//     Birthday: { type: Date, required: true }
// });

// const model = mongoose.model('Student', studentSchema);
// module.exports = model;

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    StudentId: { type: Number, required: true, unique: true },
    Name: { type: String, required: true },
    Roll: { type: Number, required: true },
    Birthday: { type: Date, required: true }
});

// Export the model
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;