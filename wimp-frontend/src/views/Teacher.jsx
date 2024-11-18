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

  // Horas del horario
  const hours = [
    '7:00 - 8:30', '8:30 - 10:00', '10:30 - 12:00', '12:00 - 13:30',
    '13:30 - 15:00', '15:00 - 16:30', '16:30 - 18:00', '18:30 - 20:00', '20:00 - 21:30'
  ];

  // Días de la semana
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const professorData = await teacherService.getTeacherById(id);
        const scheduleData = await scheduleService.getScheduleByTeacher(id);
        setProfessor(professorData);
        setSchedule(scheduleData);
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

      <div className="min-h-screen bg-violet-100 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-5xl p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-violet-600 mb-4 text-center lg:text-left">
            Información del profesor
          </h1>
          <div className="text-gray-700 mb-6">
            <p><span className="font-semibold">Nombre:</span> {professor.name}</p>
            <p><span className="font-semibold">Cubículo:</span> {professor.cubicle}</p>
            <p><span className="font-semibold">Correo:</span> {professor.email}</p>
            <p><span className="font-semibold">Teléfono:</span> {professor.phone}</p>
          </div>

          <h2 className="text-2xl font-bold text-violet-600 mt-8 mb-4 text-center lg:text-left">
            Horario
          </h2>

          <div className="overflow-x-auto max-w-full">
            <div className="flex">
              {/* Columna de Horarios */}
              <div className="flex flex-col w-32 flex-shrink-0">
                <div className="font-bold text-center p-2 bg-violet-600 text-white">Hora</div>
                {hours.map((hour, index) => (
                  <div
                    key={index}
                    className={`p-2 text-center ${index % 2 === 0 ? 'bg-violet-100' : 'bg-white'}`}
                  >
                    {hour}
                  </div>
                ))}
              </div>

              {/* Columnas de Días de la Semana */}
              {days.map((day, dayIndex) => (
                <div key={dayIndex} className="flex flex-col flex-1 min-w-[120px]">
                  <div className="font-bold text-center p-2 bg-violet-600 text-white">
                    {day}
                  </div>
                  {hours.map((hour, hourIndex) => {
                    // Buscar en el horario si el profesor tiene una clase en el día y hora actuales
                    const slot = schedule.find((entry) => 
                      entry.day === day && entry.hour === hour
                    );

                    return (
                      <div
                        key={hourIndex}
                        className={`p-2 text-center border-l ${hourIndex % 2 === 0 ? 'bg-violet-100' : 'bg-white'}`}
                      >
                        {slot ? slot.classroom : '-'}
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
