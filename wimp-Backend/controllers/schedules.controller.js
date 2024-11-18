import Schedule from '../model/Schedule.js';

export const getSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find({});
        res.json(schedules);
    } catch (error) {
        console.error('Error fetching schedules:', error);
        res.status(500).json({ message: error });
    }
};

export const getScheduleByTeacher = async (req, res) => {
    try {
        const { teacher } = req.params;
        const schedule = await Schedule.find({ teacher });
        res.json(schedule);
    } catch (error) {
        console.error('Error fetching schedule by teacher:', error);
        res.status(500).json({ message: error });
    }
};

export const getScheduleByGroup = async (req, res) => {
    try {
        const { group } = req.params;
        const schedule = await Schedule.find({ group });
        if (schedule.length === 0) {
            return res.status(404).json({ message: 'No schedules found for the specified group.' });
        }
        res.json(schedule);
    } catch (error) {
        console.error('Error fetching schedule by group:', error);
        res.status(500).json({ message: error });
    }
};

export const createSchedule = async (req, res) => {
    try {
        const { id, group, subject, teacher, day, hour, classroom } = req.body;
        const schedule = new Schedule({ id, group, subject, teacher, day, hour, classroom });
        await schedule.save();
        res.status(201).json(schedule);
    } catch (error) {
        console.error('Error creating schedule:', error);
        res.status(400).json({ message: 'Error creating schedule.', error: error.message });
    }
};

export const updateSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { group, subject, teacher, day, hour, classroom } = req.body;
        const schedule = await Schedule.findByIdAndUpdate(
            id,
            { group, subject, teacher, day, hour, classroom },
            { new: true }
        );
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found.' });
        }
        res.json(schedule);
    } catch (error) {
        console.error('Error updating schedule:', error);
        res.status(400).json({ message: 'Error updating schedule.', error: error.message });
    }
};

export const deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const schedule = await Schedule.findByIdAndDelete(id);
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found.' });
        }
        res.json({ message: 'Schedule deleted successfully.' });
    } catch (error) {
        console.error('Error deleting schedule:', error);
        res.status(500).json({ message: 'Error deleting schedule.' });
    }
};
