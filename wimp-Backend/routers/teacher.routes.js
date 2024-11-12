import { Router } from "express";
import { getTeacher, getTeachers, updateTeacher, deleteTeacher, createTeacher } from "../controllers/teachers.controller.js";

const router = Router();

router.get('/', getTeachers);
router.get('/:id', getTeacher);
router.post('/', createTeacher);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

export default router;