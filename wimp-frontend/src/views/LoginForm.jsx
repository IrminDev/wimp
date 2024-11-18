import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SecondHeader from '../components/SecondHeader';
import loginService from '../services/login.service';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginService.login(email, password);
            localStorage.setItem('token', data.token);
            navigate('/admin');
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid email or password');
        }
    };

    return (
        <div>
            <SecondHeader />

            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-violet-700 to-violet-500">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center text-violet-600">Login</h2>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white font-semibold bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 transition duration-300"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
