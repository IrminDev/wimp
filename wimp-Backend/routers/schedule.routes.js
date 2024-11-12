import { Router } from 'express';
import { getScheduleByGroup, getScheduleByTeacher, getSchedules, updateSchedule, deleteSchedule, createSchedule } from '../controllers/schedules.controller.js';

const router = Router();

router.get('/', getSchedules);
router.get('/group/:group', getScheduleByGroup);
router.get('/teacher/:teacher', getScheduleByTeacher);
router.post('/', createSchedule);
router.put('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);

export default router;
