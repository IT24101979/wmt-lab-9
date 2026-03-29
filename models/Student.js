const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        faculty: {
            type: String,
            trim: true
        },

        year: {
            type: Number,
            max: 4,
            min: 1
        }
    },

    {
        timestamps: true,
    }
);

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;