import React from 'react';
import Navbar from '../components/Navbar';
import "../app/globals.css";
import { getCacheFromPage } from '@/libs/userManager';
import { NextPageContext } from 'next';
import Link from 'next/link';


export default function Create() {
    return (
        <main className="bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
            <Navbar isAuthed={true}/>
            <div className="flex flex-col items-center mt-6 ">
                <h1 className="text-white text-5xl font-bold">Create Your Lesson</h1>
            </div>
            <div className="flex flex-col items-center mt-6">
                <Link href="/create-flashcards" className="bg-yellow-300 hover:bg-yellow-200 rounded-lg shadow-lg p-6">
                    <img src="icons/flashcards.png" className="w-full mb-" title="Flashcards Icon" alt="Flashcard Icon"/>
                    <h2 className="text-black m-4 text-3xl text-center font-bold mb-4">Flashcards</h2>
                </Link>
            </div>
        </main>
    );
}


export const getServerSideProps = async (context: NextPageContext) => {
    /* USE THIS CODE TO TEST AUTHENTICATION (yes, just copy and paste this to page that needs authentication)*/
    const user = await getCacheFromPage(context);
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    /* Return anything you want from database query from here out */
    return {
        props: {}
    }
}