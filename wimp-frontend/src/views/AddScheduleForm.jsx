import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import teacherService from '../services/teacher.service';
import scheduleService from '../services/schedule.service';

const AddScheduleForm = () => {
    const { id } = useParams(); // Obtén el id del parámetro de la URL
    const [professors, setProfessors] = useState([]);
    const [selectedProfessor, setSelectedProfessor] = useState('');
    const [day, setDay] = useState('');
    const [hour, setHour] = useState('');
    const [classroom, setClassroom] = useState('');
    const [group, setGroup] = useState('');
    const [subject, setSubject] = useState('');
    const [existingSchedule, setExistingSchedule] = useState(null); // Estado para el horario existente
    const [error, setError] = useState('');

    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const hours = [
        '7:00 - 8:30', '8:30 - 10:00', '10:30 - 12:00', '12:00 - 13:30',
        '13:30 - 15:00', '15:00 - 16:30', '16:30 - 18:00', '18:30 - 20:00', '20:00 - 21:30'
    ];

    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                const data = await teacherService.getTeachers();
                setProfessors(data);
                if (id && data.some(professor => professor.id === id)) {
                    setSelectedProfessor(id);
                }
            } catch (error) {
                console.error('Error fetching professors:', error);
            }
        };

        fetchProfessors();
    }, [id]);

    // Función para verificar si ya existe un horario para el profesor en el mismo día y hora
    const checkExistingSchedule = async () => {
        try {
            const schedules = await scheduleService.getScheduleByTeacher(selectedProfessor);
            const schedule = schedules.find(
                (schedule) => schedule.day === day && schedule.hour === hour
            );
            if (schedule) {
                setExistingSchedule(schedule);
                setGroup(schedule.group);
                setSubject(schedule.subject);
                setClassroom(schedule.classroom);
            } else {
                setExistingSchedule(null);
            }
        } catch (error) {
            console.error('Error checking existing schedule:', error);
        }
    };

    // Ejecutamos la verificación si se cambia el profesor, el día o la hora
    useEffect(() => {
        if (selectedProfessor && day && hour) {
            checkExistingSchedule();
        }
    }, [selectedProfessor, day, hour]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (existingSchedule) {
            console.log('Existing schedule:', existingSchedule);
            if (classroom === '' || subject === '') {
                try {
                    scheduleService.deleteSchedule(existingSchedule.id).catch((error) => {
                        console.error('Error deleting schedule:', error);
                    });
                    console.log('Schedule deleted successfully');
                    setExistingSchedule(null);
                    setClassroom('');
                    setGroup('');
                    setSubject('');
                    setError('');
                } catch (error) {
                    console.error('Error deleting schedule:', error);
                }
            } else {
                try {
                    const updatedSchedule = {
                        teacher: selectedProfessor,
                        day,
                        hour,
                        classroom,
                        group,
                        subject
                    };
                    scheduleService.updateSchedule(existingSchedule.id, updatedSchedule).then(() => {
                        console.log('Schedule updated successfully:', updatedSchedule);
                        setExistingSchedule(null);
                        setClassroom('');
                        setGroup('');
                        setSubject('');
                        setError('');
                    }).catch((error) => {
                        console.error('Error updating schedule:', error);
                    })
                } catch (error) {
                    console.error('Error updating schedule:', error);
                }
            }
        } else {
            // Si no existe, creamos el nuevo horario
            try {
                const newSchedule = {
                    teacher: selectedProfessor,
                    day,
                    hour,
                    classroom,
                    group,
                    subject
                };
                scheduleService.createSchedule(newSchedule).then(() => {
                    console.log('Schedule added successfully:', newSchedule);
                    setClassroom('');
                    setGroup('');
                    setSubject('');
                    setError('');
                }).catch((error) => {
                    console.error('Error adding schedule:', error);
                })
            } catch (error) {
                console.error('Error adding schedule:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminHeader />

            <div className="container mx-auto p-8">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Add Schedule</h2>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="professor" className="block text-gray-700 font-semibold mb-2">
                                Profesor
                            </label>
                            <select
                                id="professor"
                                value={selectedProfessor}
                                onChange={(e) => setSelectedProfessor(e.target.value)}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                            >
                                <option value="">Selecciona un profesor</option>
                                {professors.map((professor) => (
                                    <option key={professor.id} value={professor.id}>
                                        {professor.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="day" className="block text-gray-700 font-semibold mb-2">
                                Día
                            </label>
                            <select
                                id="day"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                            >
                                <option value="">Selecciona un día</option>
                                {daysOfWeek.map((dayOption) => (
                                    <option key={dayOption} value={dayOption}>
                                        {dayOption}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="hour" className="block text-gray-700 font-semibold mb-2">
                                Hora
                            </label>
                            <select
                                id="hour"
                                value={hour}
                                onChange={(e) => setHour(e.target.value)}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                            >
                                <option value="">Selecciona una hora</option>
                                {hours.map((hourOption) => (
                                    <option key={hourOption} value={hourOption}>
                                        {hourOption}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="classroom" className="block text-gray-700 font-semibold mb-2">
                                Salón
                            </label>
                            <input
                                type="text"
                                id="classroom"
                                value={classroom}
                                onChange={(e) => setClassroom(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                                placeholder="Ingresa un salón"
                            />
                        </div>

                        <div>
                            <label htmlFor="group" className="block text-gray-700 font-semibold mb-2">
                                Grupo
                            </label>
                            <input
                                type="text"
                                id="group"
                                value={group}
                                onChange={(e) => setGroup(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                                placeholder="Ingresa el grupo"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
                                Materia
                            </label>
                            <input
                                type="text"
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                                placeholder="Ingresa la materia"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 transition duration-300"
                        >
                            Agregar Horario
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddScheduleForm;
