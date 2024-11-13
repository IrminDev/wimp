import Teacher from '../model/Teacher.js';
import Schedule from '../model/Schedule.js';

export const getTeachers = async (req, res) => {
    const teachers = await Teacher.find({});
    res.json(teachers);
}

export const getTeacher = async (req, res) => {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    res.json(teacher);
}

export const getTeacherSchedule = async (req, res) => {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    const schedule = await Schedule.find({ 'teacher.id': teacher.id });
    res.json(schedule);
}

export const createTeacher = async (req, res) => {
    const { name, email, cubicle, department, phone } = req.body;
    const teacher = new Teacher({ name, email, cubicle, department, phone });
    await teacher.save();
    res.json(teacher);
}

export const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { name, email, cubicle, department, phone } = req.body;
    const teacher = await Teacher.findOne({ id });
    teacher.name = name;
    teacher.email = email;
    teacher.cubicle = cubicle;
    teacher.department = department;
    teacher.phone = phone;
    await teacher.save();
    res.json(teacher);
}

export const deleteTeacher = async (req, res) => {
    const { id } = req.params;
    await Teacher.deleteOne({ id });
    res.json({ message: 'Teacher deleted' });
}