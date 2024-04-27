import React, { Fragment, useEffect } from 'react';
import Navbar from '../components/Navbar';
import "../app/globals.css";
import Swal from 'sweetalert2';
import { getCacheFromPage } from '@/libs/userManager';
import { NextPageContext } from 'next';
import PasswordResetForm from '@/components/PasswordReset';

const Login = () => {
  const usernameRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();
  const loginBtnRef = React.createRef<HTMLButtonElement>();
  const [modalOpen, setModalOpen] = React.useState(false);

  function rfidHandler() {
    if (!usernameRef.current?.value)
      return Swal.fire('Error', 'Username is required to initiate RFID Auth request', 'error');
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // @todo: Another loading animation on the button plz
    loginBtnRef.current?.setAttribute('disabled', 'true');

    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: usernameRef.current?.value, password: passwordRef.current?.value })
    }).then(async res => {
      if (res.status === 401)
        return Swal.fire('Error', await res.text(), 'error').then(() => {
          // @todo: Remove the loading animation here
          loginBtnRef.current?.removeAttribute('disabled');
        });
      if (res.status === 200)
        return Swal.fire('Success', await res.text(), 'success').then(() => {
          // Redirect user to the main page
          window.location.replace('/dashboard');
        });

      Swal.fire('Error', 'An unknown error occurred while logging in', 'error').then(() => {
        //@todo: Some handling, maybe???
      });

    });
  };
  const togglePasswordVisibility = (ref: React.RefObject<HTMLInputElement>) => {
    const input = ref.current;
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  };

  // DEV Mode does not require credentials
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      usernameRef.current?.removeAttribute('required');
      passwordRef.current?.removeAttribute('required');
    }
  }, [usernameRef, passwordRef]);

  return (
    <Fragment>
      <div className="flex flex-col bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
        <Navbar isAuthed={false} />
        <div className="flex justify-center items-center flex-1">
          <div className="w-full max-w-xl bg-yellow-300 rounded-lg drop-shadow-lg">
            <form onSubmit={handleSubmit} className="p-12 mb-2 ">
              <h1 className="text-center text-gray-800 font-bold text-3xl mb-9">Login</h1>
              <div className="mb-4 ">
                <label htmlFor="username" className="block text-gray-800 text-sm font-bold mb-2">Username:</label>
                <input
                  type="text"
                  id="username"
                  ref={usernameRef}
                  className="shadow appearance-none border border-gray-300 bg-yellow-100 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-6 relative ">
                <label htmlFor="password" className="block text-gray-800 text-sm font-bold mb-2">Password:</label>
                <input
                  type={passwordRef.current?.type || 'password'}
                  id="password"
                  ref={passwordRef}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-yellow-100 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                <button
                  type="button"
                  className="absolute right-0 transform -translate-y-1/5 pr-2"
                  onClick={() => togglePasswordVisibility(passwordRef)}
                >
                  <img src='/icons/FishBowl.svg' alt={passwordRef.current?.type === 'password' ? 'Hide' : 'Show'} className="h-10 w-10" />
                </button>
                <a href="#" onClick={() => { setModalOpen(true) }} className="text-blue-600 hover:text-blue-800 text-sm font-bold mt-4">Forgot Password?</a>
              </div>
              <div className="flex items-center justify-center flex-col">
                <button type="submit" ref={loginBtnRef} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
                  Login
                </button>
                <a className="mt-4 text-blue-500 font-semibold  hover:text-blue-700 underline" href="/signup">New? Join the tank!</a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <PasswordResetForm display={[modalOpen, setModalOpen]} />
    </Fragment>
  );
};

export default Login;


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
    props: {

    }
  }
}