import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import "../app/globals.css";
import { NextPageContext } from 'next';
import ReactDOM from 'react-dom';
import { getCacheFromPage } from '@/libs/userManager';
import LoadingScreen from '../components/LoadingScreen';
import NavbarNoButtons from '@/components/NavbarNoButtons';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const regBtnRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return Swal.fire('Form Validation', 'Passwords do not match', 'error');
    }
    if (password.length < 8 || !/\d/.test(password)) {
      return Swal.fire('Form Validation', 'Password must be at least 8 characters long and contain at least one number', 'error');
    }
    
    Swal.fire({
      title: 'Registering...',
      html: '<div id="loading-screen-container"></div>',
      allowOutsideClick: false,
      showConfirmButton: false,
      width: '60%', 
      customClass: {
        popup: 'swal-height'
      },
      willOpen: () => {
        ReactDOM.render(<LoadingScreen />, document.getElementById('loading-screen-container'));
      },
      willClose: () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('loading-screen-container')!);
      },
      
      didOpen: () => {
        const modal = document.querySelector('.swal2-modal');
        if (modal) {
          modal.style.height = '100%'; 
        }
      }
    });
    
  

    // regBtnRef.current?.setAttribute('disabled', 'true');

    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
  
      if (res.status !== 200) {
        throw await res.text();
      }
  
      Swal.fire('Success', await res.text(), 'success').then(() => {
        window.location.replace('/dashboard');
      });
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);

      Swal.fire('Error', message, 'error');
    } finally {
      // Swal.close(); 
      // regBtnRef.current?.removeAttribute('disabled');
      // console.log('test');
      // regBtnRef.current?.setAttribute('disabled', 'false');
    }
  }
  
  const togglePasswordVisibility = (ref: React.RefObject<HTMLInputElement>) => {
    const input = ref.current;
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  };
    
  
  return (
    <div className="flex flex-col bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
      <NavbarNoButtons isAuthed={false}/>
      <div className="flex justify-center items-center flex-1">
      <div className="w-full max-w-xl bg-yellow-300 rounded-lg drop-shadow-lg" style={{ background: 'radial-gradient(circle, #FDE68A, #FFA100)' }}>
          <form onSubmit={handleSubmit} className="p-8">
            <h1 className="text-center text-black font-bold text-3xl mb-6">Register</h1>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-800 text-sm font-bold mb-2">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border border-gray-300 bg-yellow-100 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-800 text-sm font-bold mb-2">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full bg-yellow-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-gray-800 text-sm font-bold mb-2">Password:</label>
              <input
                type={passwordRef.current?.type || 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordRef}
                className="shadow appearance-none border rounded w-full bg-yellow-100 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <button
                type="button"
                className="absolute right-0 transform -translate-y-1/5 pr-2"
                onClick={() => togglePasswordVisibility(passwordRef)}
              >
                <img src='/icons/FishBowl.svg' alt={passwordRef.current?.type === 'password' ? 'Hide' : 'Show'} className="h-10 w-10"/>
              </button>
            </div>

            <div className="mb-4 relative">
              <label htmlFor="confirmPassword" className="block text-gray-800 text-sm font-bold mb-2">Confirm Password:</label>
              <input
                type={confirmPasswordRef.current?.type || 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                ref={confirmPasswordRef}
                className="shadow appearance-none border rounded w-full bg-yellow-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <button
                type="button"
                className="absolute right-0 transform -translate-y-1/5 pr-2"
                onClick={() => togglePasswordVisibility(confirmPasswordRef)}
              >
                <img src='/icons/FishBowl.svg' alt={confirmPasswordRef.current?.type === 'password' ? 'Hide' : 'Show'} className="h-10 w-10"/>
              </button>
            </div>

            <div className="flex items-center justify-center flex-col">
              <button type="submit" ref={regBtnRef} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
                Register
              </button>
              <a className="mt-4 text-blue-500 font-semibold hover:text-blue-700 underline" href="/login">Come here often? Log In!</a>
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
