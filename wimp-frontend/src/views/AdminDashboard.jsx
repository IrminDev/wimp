import React from 'react';
import AdminHeader from '../components/AdminHeader';

const AdminDashboard = () => {
    // Sample data for professors
    const professors = [
        { id: 1, name: 'Dr. John Doe' },
        { id: 2, name: 'Dr. Jane Smith' },
        { id: 3, name: 'Dr. Alan Turing' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminHeader />

            <div className="container mx-auto p-8">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Admin Dashboard</h2>
                
                {/* Table Header */}
                <div className="bg-white shadow-md rounded-t-lg flex py-4 px-6 font-semibold text-gray-600 uppercase">
                    <div className="flex-1">Profesor</div>
                    <div className="flex-2 text-center">Opciones</div>
                </div>

                {/* Table Rows */}
                <div className="bg-white shadow-md rounded-b-lg divide-y">
                    {professors.map((professor) => (
                        <div key={professor.id} className="flex items-center py-4 px-6 hover:bg-gray-50">
                            {/* Professor Name */}
                            <div className="flex-1 text-gray-800">{professor.name}</div>

                            {/* Action Buttons */}
                            <div className="flex-2 flex justify-center space-x-3">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Ver horario</button>
                                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">Agregar horario</button>
                                <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">Modifficar</button>
                                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;