import React, { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import teacherService from '../services/teacher.service'; // Asegúrate de tener el servicio que maneje la API de profesores

const AddTeacherForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cubicle, setCubicle] = useState('');
    const [department, setDepartment] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email) {
            setError('Por favor, ingresa el nombre y el correo del profesor.');
            return;
        }

        const newTeacher = {
            name,
            email,
            cubicle,
            department,
            phone
        };

        try {
            await teacherService.createTeacher(newTeacher);
            setSuccessMessage('Profesor agregado correctamente.');
            setName('');
            setEmail('');
            setCubicle('');
            setDepartment('');
            setPhone('');
            setError('');
        } catch (error) {
            console.error('Error adding teacher:', error);
            setError('Hubo un error al agregar al profesor. Intenta nuevamente.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminHeader />

            <div className="container mx-auto p-8">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Agregar Profesor</h2>

                {error && <div className="text-red-500 mb-4">{error}</div>}
                {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

                <div className="bg-white shadow-md rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                                placeholder="Ingresa el nombre del profesor"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                                placeholder="Ingresa el correo electrónico del profesor"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="cubicle" className="block text-gray-700 font-semibold mb-2">
                                Cubículo
                            </label>
                            <input
                                type="text"
                                id="cubicle"
                                value={cubicle}
                                onChange={(e) => setCubicle(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                                placeholder="Ingresa el cubículo del profesor"
                            />
                        </div>

                        <div>
                            <label htmlFor="department" className="block text-gray-700 font-semibold mb-2">
                                Departamento
                            </label>
                            <input
                                type="text"
                                id="department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                                placeholder="Ingresa el departamento del profesor"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                                Teléfono
                            </label>
                            <input
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                                placeholder="Ingresa el teléfono del profesor"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700"
                            >
                                Agregar Profesor
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTeacherForm;
