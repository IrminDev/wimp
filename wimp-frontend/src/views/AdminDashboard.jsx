import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import SearchBar from '../components/SearchBar';
import PaginationBar from '../components/PaginationBar';
import teacherService from '../services/teacher.service';
import loginService from '../services/login.service';

const AdminDashboard = () => {
    const [professors, setProfessors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProfessors, setFilteredProfessors] = useState([]);
    const navigate = useNavigate();
    const itemsPerPage = 10;

    // Fetch list of professors when component mounts
    useEffect(() => { 
        // Verify token
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            loginService.verifyToken(token)
                .then(() => console.log('Token verified'))
                .catch(() => navigate('/login'));
        }

        const fetchProfessors = async () => {
            try {
                const data = await teacherService.getTeachers();
                setProfessors(data);
                setFilteredProfessors(data);
            } catch (error) {
                console.error('Error fetching professors:', error);
            }
        };

        fetchProfessors();
    }, []);

    // Handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
        setFilteredProfessors(
            professors.filter(professor => 
                professor.name.toLowerCase().includes(query.toLowerCase())
            )
        );
        setCurrentPage(1); // Reset to first page
    };

    // Paginated professors
    const paginatedProfessors = filteredProfessors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle delete action
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this professor?")) {
            try {
                await teacherService.deleteTeacher(id);
                setProfessors(professors.filter(prof => prof.id !== id));
                setFilteredProfessors(filteredProfessors.filter(prof => prof.id !== id));
            } catch (error) {
                console.error('Error deleting professor:', error);
            }
        }
    };

    // Event handlers for navigation
    const handleViewSchedule = (id) => navigate(`../teacher/${id}`);
    const handleAddSchedule = (id) => navigate(`./add?id=${id}`);
    const handleUpdateProfessor = (id) => navigate(`./edit/${id}`);
    const handleAddProfessor = () => navigate('./addProfessor'); // New professor form

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminHeader />

            <div className="container mx-auto p-8">
                <div className=' flex flex-row justify-between mb-5'>
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Admin Dashboard</h2>
                <button
                    onClick={handleAddProfessor}
                    className="px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
                >
                    Agregar Profesor
                </button>
                </div>

                {/* Add Professor Button */}
                <div className="flex justify-between mb-4">
                    <SearchBar onSearch={handleSearch} />
                </div>
                
                {/* Table Header */}
                <div className="bg-white shadow-md rounded-t-lg flex py-4 px-6 font-semibold text-gray-600 uppercase">
                    <div className="flex-1">Profesor</div>
                    <div className="flex-2 text-center">Opciones</div>
                </div>

                {/* Table Rows */}
                <div className="bg-white shadow-md rounded-b-lg divide-y">
                    {paginatedProfessors.map((professor) => (
                        <div key={professor.id} className="flex items-center py-4 px-6 hover:bg-gray-50">
                            <div className="flex-1 text-gray-800">{professor.name}</div>
                            <div className="flex-2 flex justify-center space-x-3">
                                <button
                                    onClick={() => handleViewSchedule(professor.id)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                >
                                    Ver horario
                                </button>
                                <button
                                    onClick={() => handleAddSchedule(professor.id)}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                >
                                    Agregar horario
                                </button>
                                <button
                                    onClick={() => handleUpdateProfessor(professor.id)}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                                >
                                    Modificar
                                </button>
                                <button
                                    onClick={() => handleDelete(professor.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Bar */}
                <PaginationBar
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredProfessors.length / itemsPerPage)}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default AdminDashboard;
