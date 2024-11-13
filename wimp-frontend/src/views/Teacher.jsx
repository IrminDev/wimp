import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SecondHeader from '../components/SecondHeader';
import teacherService from '../services/teacher.service';
import scheduleService from '../services/schedule.service';

const ProfessorPage = () => {
  const { id } = useParams();
  const [professor, setProfessor] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  // Horas del horario (7:00 AM a 9:30 PM)
  const hours = Array.from({ length: 15 }, (_, i) => ({
    time: `${7 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'} ${7 + Math.floor(i / 2) < 12 ? 'AM' : 'PM'}`,
  }));

  // Días de la semana
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  useEffect(() => {
    // Cargar la información del profesor y su horario
    const fetchData = async () => {
      try {
        const professorData = await teacherService.getTeacherById(id);
        const scheduleData = await scheduleService.getScheduleByTeacher(id);
        setProfessor(professorData);
        console.log(professorData);
        setSchedule(scheduleData);
        console.log(scheduleData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <SecondHeader />

      <div className="min-h-screen bg-violet-100 flex flex-col items-center py-10">
        <div className="w-full max-w-5xl p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-violet-600 mb-4">Información del profesor</h1>
          <div className="text-gray-700 mb-6">
            <p><span className="font-semibold">Nombre:</span> {professor.name}</p>
            <p><span className="font-semibold">Cubículo:</span> {professor.cubicle}</p>
            <p><span className="font-semibold">Correo:</span> {professor.email}</p>
            <p><span className="font-semibold">Teléfono:</span> {professor.phone}</p>
          </div>

          <h2 className="text-2xl font-bold text-violet-600 mt-8 mb-4">Horario</h2>
          
          <div className="overflow-x-auto">
            <div className="flex">
              {/* Columna de Horarios */}
              <div className="flex flex-col w-24">
                <div className="font-bold text-center p-2 bg-violet-600 text-white">Hora</div>
                {hours.map((hour, index) => (
                  <div
                    key={index}
                    className={`p-2 text-center ${index % 2 === 0 ? 'bg-violet-100' : 'bg-white'}`}
                  >
                    {hour.time}
                  </div>
                ))}
              </div>

              {/* Columnas de Días de la Semana */}
              {days.map((day, dayIndex) => (
                <div key={dayIndex} className="flex flex-col flex-1">
                  <div className="font-bold text-center p-2 bg-violet-600 text-white">
                    {day}
                  </div>
                  {hours.map((hour, hourIndex) => {
                    // Buscar en el horario si el profesor tiene una clase en el día y hora actuales
                    const slot = schedule.find((entry) => 
                      entry.day === day &&
                      entry.startTime === hour.time // Compara el tiempo exacto
                    );

                    return (
                      <div
                        key={hourIndex}
                        className={`p-2 text-center border-l ${hourIndex % 2 === 0 ? 'bg-violet-100' : 'bg-white'}`}
                      >
                        {slot ? slot.room : '-'}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorPage;
