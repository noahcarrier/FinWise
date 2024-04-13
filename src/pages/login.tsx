import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import "../app/globals.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Submitting:', { email, password });
        setEmail('');
        setPassword('');
    };
    
    return (
        <div className="flex flex-col bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
            <Navbar />
            <div className="flex justify-center items-center flex-1">
                <div className="w-full max-w-xl">
                    <form onSubmit={handleSubmit} className="bg-gradient-to-b from-transparent to-white shadow-md rounded-full p-12 mb-2">
                        <h1 className="text-center text-black font-bold text-2xl mb-9">Login</h1>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;