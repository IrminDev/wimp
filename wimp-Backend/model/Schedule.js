const mongoose = require('mongoose');
const TeacherSchema = require('./Teacher');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    teacher: {
        type: TeacherSchema,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    classroom: {
        type: String,
        required: true
    }
})