import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import "../app/globals.css";
import { NextPageContext } from 'next';
import { getCacheFromPage } from '@/libs/userManager';
import Scales from "../../public/icons/Scales.svg"

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const regBtnRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // this prevents the page from reloading after submitting the form
        
        // Check passwords match
        if(password !== confirmPassword)
            return Swal.fire('Form Validation', 'Passwords do not match', 'error');

        // Validate password security (Just 8 character and some number for now)
        if(password.length < 8 || !/\d/.test(password))
            return Swal.fire('Form Validation', 'Password must be at least 8 characters long and contain at least one number', 'error');

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
              return Swal.fire('Error', await res.text(), 'error').then(() => {
                // @TODO: Remove the loading animation here
                regBtnRef.current?.removeAttribute('disabled');
              });
            Swal.fire('Success', await res.text(), 'success').then(() => {
              // Redirect user to the main page
              window.location.replace('/dashboard');
            });
                
        })
    };
    const togglePasswordVisibility = (ref) => {
      const input = ref.current;
      if (input) {
          input.type = input.type === 'password' ? 'text' : 'password';
      }
  };
  
  return (
    <div className="flex flex-col bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
      <Navbar isAuthed={false}/>
      <div className="flex justify-center items-center flex-1">
        <div className="w-full max-w-xl">
          <form onSubmit={handleSubmit} className="p-8">
            <h1 className="text-center text-black font-bold text-2xl mb-6">Register</h1>
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
            <div className="mb-4 relative">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                <input
                    type={passwordRef.current?.type || 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ref={passwordRef}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
                <button
                    type="button"
                    className="absolute top-1/2 right-0 transform -translate-y-1/2"
                    onClick={() => togglePasswordVisibility(passwordRef)}
                >
                    {passwordRef.current?.type === 'password' ? 'Show' : 'Hide'}
                </button>
            </div>
            <div className="mb-4 relative">
                <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
                <input
                    type={confirmPasswordRef.current?.type || 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ref={confirmPasswordRef}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
                <button
                    type="button"
                    className="absolute top-1/2 right-0 transform -translate-y-1/2"
                    onClick={() => togglePasswordVisibility(confirmPasswordRef)}
                >
                    {confirmPasswordRef.current?.type === 'password' ? 'Show' : 'Hide'}
                </button>
            </div>
            <div className="flex items-center justify-center flex-col">
              <button type="submit" ref={regBtnRef} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
                Register
              </button>
              <a className="mt-4 text-gray-900 font-semibold hover:text-black" href="/login">Come here often? Log In!</a>
            </div>
          </form>
        </div>
      </div>
    </div>
);
};

export default Signup;

export const getServerSideProps = async (context: NextPageContext) => {
  const user = await getCacheFromPage(context);
  if (user) {
      return {
          redirect: {
              destination: '/dashboard',
              permanent: false,
          },
      };
  }

  return {
      props: {}
  }
}