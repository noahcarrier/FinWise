import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import "../app/globals.css";


const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const regBtnRef = React.createRef<HTMLButtonElement>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // this prevents the page from reloading after submitting the form
        
        // Check passwords match
        if(password !== confirmPassword)
            return Swal.fire('Form Validation', 'Passwords do not match', 'error');

        // Send the form data to the server
        
        // @TODO: Frontend dev, plz add a little loading animation to register btn
        regBtnRef.current?.setAttribute('disabled', 'true');

        fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, password})
        }).then(async res => {
            if(res.status !== 200)
              return Swal.fire('Error', 'An error occurred while creating your account', 'error').then(() => {
                // @TODO: Remove the loading animation here
                regBtnRef.current?.removeAttribute('disabled');
              });
            Swal.fire('Success', 'Account created successfully', 'success').then(() => {
              // Redirect user to the main page
              window.location.replace('/');
            });
                
        })
    };
    
    return (
        <div className="flex flex-col bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
          <Navbar />
          <div className="flex justify-center items-center flex-1">
            <div className="w-full max-w-xl">
              <form onSubmit={handleSubmit} className="bg-gradient-to-b from-transparent to-white shadow-md rounded-full p-12 mb-2">
              <h1 className="text-center text-black font-bold text-2xl mb-9">Register</h1>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
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
                <div className="mb-4">
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
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button type="submit" ref={regBtnRef} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
};

export default Signup;
