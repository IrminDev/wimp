import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import teacherService from '../services/teacher.service';
import AdminHeader from '../components/AdminHeader';

const EditTeacherForm = () => {
    const { id } = useParams(); // Obtener el ID del profesor desde la URL
    const navigate = useNavigate(); // Para redirigir después de la actualización
    const [teacher, setTeacher] = useState({
        name: '',
        email: '',
        cubicle: '',
        department: '',
        phone: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const data = await teacherService.getTeacherById(id);
                setTeacher(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching teacher:', err);
                setError('No se pudo cargar la información del profesor.');
                setLoading(false);
            }
        };

        fetchTeacher();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacher((prevTeacher) => ({
            ...prevTeacher,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await teacherService.updateTeacher(id, teacher);
            alert('Información del profesor actualizada con éxito.');
            navigate('/admin'); // Redirigir a la lista de profesores
        } catch (err) {
            console.error('Error updating teacher:', err);
            alert('Ocurrió un error al actualizar la información.');
        }
    };

    if (loading) return <p>Cargando información...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminHeader />
            <div className="container mx-auto p-8">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Editar Profesor</h2>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={teacher.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={teacher.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                            />
                        </div>

                        <div>
                            <label htmlFor="cubicle" className="block text-gray-700 font-semibold mb-2">
                                Cubículo
                            </label>
                            <input
                                type="text"
                                id="cubicle"
                                name="cubicle"
                                value={teacher.cubicle}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                            />
                        </div>

                        <div>
                            <label htmlFor="department" className="block text-gray-700 font-semibold mb-2">
                                Departamento
                            </label>
                            <input
                                type="text"
                                id="department"
                                name="department"
                                value={teacher.department}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                                Teléfono
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={teacher.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 transition duration-300"
                        >
                            Guardar Cambios
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditTeacherForm;
