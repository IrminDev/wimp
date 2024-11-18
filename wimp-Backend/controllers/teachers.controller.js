import Teacher from '../model/Teacher.js';
import Schedule from '../model/Schedule.js';

export const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({});
        res.json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ message: error});
    }
};

export const getTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findById(id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found.' });
        }
        res.json(teacher);
    } catch (error) {
        console.error('Error fetching teacher:', error);
        res.status(500).json({ message: error});

    }
};

export const getTeacherSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findById(id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found.' });
        }
        const schedule = await Schedule.find({ teacher: teacher._id });
        res.json(schedule);
    } catch (error) {
        console.error('Error fetching teacher schedule:', error);
        res.status(500).json({ message: error});

    }
};

export const createTeacher = async (req, res) => {
    try {
        const { name, email, cubicle, department, phone } = req.body;
        const teacher = new Teacher({ name, email, cubicle, department, phone });
        await teacher.save();
        res.status(201).json(teacher);
    } catch (error) {
        console.error('Error creating teacher:', error);
        res.status(500).json({ message: error});

    }
};

export const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, cubicle, department, phone } = req.body;
        const teacher = await Teacher.findByIdAndUpdate(id, { name, email, cubicle, department, phone }, { new: true });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found.' });
        }
        res.json(teacher);
    } catch (error) {
        console.error('Error updating teacher:', error);
        res.status(500).json({ message: error});

    }
};

export const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findByIdAndDelete(id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found.' });
        }
        res.json({ message: 'Teacher deleted successfully.' });
    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ message: error});

    }
};
