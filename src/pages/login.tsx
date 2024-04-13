import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import "../app/globals.css";
import Swal from 'sweetalert2';
import { getUserFromCache } from '@/libs/userManager';
import { NextPageContext } from 'next';
import { getCookie } from 'cookies-next';

type props = {
    isRFIDAuthEnabled: boolean;
}

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loginBtnRef = React.createRef<HTMLButtonElement>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // @todo: Another loading animation on the button plz
        loginBtnRef.current?.setAttribute('disabled', 'true');

        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        }).then(async res => {
            if(res.status === 401)
                return Swal.fire('Error', 'Authentication Failed, bad username/password', 'error').then(()=> {
                    // @todo: Remove the loading animation here
                    loginBtnRef.current?.removeAttribute('disabled');
                });
            if(res.status === 200)
                return Swal.fire('Success', 'Authentication successful', 'success').then(() => {
                    // Redirect user to the main page
                    window.location.replace('/');
                });

            Swal.fire('Error', 'An unknown error occurred while logging in', 'error').then(() => {
                //@todo: Some handling, maybe???
            });
                
        });
    };
    
    return (
        <div className="flex flex-col bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
            <Navbar />
            <div className="flex justify-center items-center flex-1">
                <div className="w-full max-w-xl">
                    <form onSubmit={handleSubmit} className="bg-gradient-to-b from-transparent to-white shadow-md rounded-full p-12 mb-2">
                        <h1 className="text-center text-black font-bold text-2xl mb-9">Login</h1>
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
                            <button type="submit" ref={loginBtnRef} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
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


export const getServerSideProps = async (context: NextPageContext) => {
    const user = await getUserFromCache(getCookie('session', {
        req: context.req,
        res: context.res,
    }));
    if (user) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {}
    }
}