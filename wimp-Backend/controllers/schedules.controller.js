const Schedule = require('../model/Schedule');
const Admin = require('../model/Admin');
const jwt = require('jsonwebtoken');

const getSchedules = async (req, res) => {
    const schedules = await Schedule.find({});
    res.json(schedules);
}

const getScheduleByTeacher = async (req, res) => {
    const { id } = req.params;
    const schedule = await Schedule.find({ 'teacher.id': id });
    res.json(schedule);
}

const getScheduleByGroup = async (req, res) => {
    const { group } = req.params;
    const schedule = await Schedule.find({ group });
    res.json(schedule);
}

const createSchedule = async (req, res) => {
    const { id, group, subject, teacher, day, hour, classroom } = req.body;
    const schedule = new Schedule({ id, group, subject, teacher, day, hour, classroom });
    await schedule.save();
    res.json(schedule);
}

const updateSchedule = async (req, res) => {
    const { id } = req.params;
    const { group, subject, teacher, day, hour, classroom } = req.body;
    const schedule = await Schedule.findOne({ id });
    schedule.group = group;
    schedule.subject = subject;
    schedule.teacher = teacher;
    schedule.day = day;
    schedule.hour = hour;
    schedule.classroom = classroom;
    await schedule.save();
    res.json(schedule);
}

const deleteSchedule = async (req, res) => {
    const { id } = req.params;
    await Schedule.deleteOne({ id });
    res.json({ message: 'Schedule deleted' });
}

module.exports = {
    getSchedules,
    getScheduleByTeacher,
    getScheduleByGroup,
    createSchedule,
    updateSchedule,
    deleteSchedule
}