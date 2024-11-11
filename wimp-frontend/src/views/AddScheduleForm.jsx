import React, { useState } from 'react';
import AdminHeader from '../components/AdminHeader';

const AddScheduleForm = () => {
    const [day, setDay] = useState('');
    const [hour, setHour] = useState('');
    const [classroom, setClassroom] = useState('');

    // Sample options for days and hours
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = [
        '7:00 - 8:30', '8:30 - 10:00', '10:30 - 12:00', '12:00 - 13:30',
        '13:30 - 15:00', '15:00 - 16:30', '16:30 - 18:00', '18:30 - 20:00', '20:00 - 21:30'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add schedule submission logic here
        console.log({ day, hour, classroom });
        // Clear the form fields after submission
        setDay('');
        setHour('');
        setClassroom('');
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
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                            >
                                <option value="">Selecciona un profesor</option>
                                {daysOfWeek.map((dayOption) => (
                                    <option key={dayOption} value={dayOption}>{dayOption}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="day" className="block text-gray-700 font-semibold mb-2">
                                Día
                            </label>
                            <select
                                id="day"
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                            >
                                <option value="">Selecciona un día</option>
                                {daysOfWeek.map((dayOption) => (
                                    <option key={dayOption} value={dayOption}>{dayOption}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="hour" className="block text-gray-700 font-semibold mb-2">
                                Hora
                            </label>
                            <select
                                id="hour"
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                            >
                                <option value="">Select Hour</option>
                                {hours.map((hourOption) => (
                                    <option key={hourOption} value={hourOption}>{hourOption}</option>
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
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                                placeholder="Ingresa un salón"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 transition duration-300"
                        >
                            Add Schedule
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddScheduleForm;