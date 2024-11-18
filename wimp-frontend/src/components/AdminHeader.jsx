import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    return (
        <header className="w-full bg-gradient-to-r from-violet-700 to-violet-500 shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <div className="bg-white rounded-full p-3 shadow-md">
                        <span className="text-3xl font-semibold text-violet-600">W<span className="text-violet-800">i</span>MP</span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex space-x-8 text-lg font-medium text-white">
                    <Link to="/" className="hover:text-violet-100">Home</Link>
                    <Link to="/admin/" className="hover:text-violet-100">Dashboard</Link>
                    <Link to="/admin/add" className="hover:text-violet-100">Add</Link>
                </nav>
            </div>
        </header>
    );
};

export default AdminHeader;