import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Teacher from './views/Teacher';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './views/LoginForm';
import AdminDashboard from './views/AdminDashboard';
import AddScheduleForm from './views/AddScheduleForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/teacher/:id" element={<Teacher />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add" element={<AddScheduleForm />} />
        </Routes>
    </Router>
);