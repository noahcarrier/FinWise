import React, { Fragment, useEffect } from 'react';
import Navbar from '../components/Navbar';
import "../app/globals.css";
import { cookies } from 'next/headers';
import { getUserFromCache } from '@/libs/userManager';

const NotFound = async () => {
    const session = cookies().get("session");
    const isAuth = session !== undefined && await getUserFromCache(session.value) !== undefined;
    
    return (
        <Fragment>
            <div className="flex flex-col bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
                <Navbar isAuthed={isAuth}/>
                <div className="flex justify-center items-center flex-1">
                    <div className="w-full max-w-xl">
                        <div className="bg-yellow-300 shadow-box rounded-2xl p-5 ">
                            <img src="/NotFound.png" alt="404 Not Found"/>
                            <h1 className='text-center text-black font-bold text-2xl mb-9'>404 - Page goes brrrr :(</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default NotFound;