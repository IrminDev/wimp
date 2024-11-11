const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    cubicle: {
        type: String,
    },
    department: {
        type: String,
    },
    phone: {
        type: String,
    }
})