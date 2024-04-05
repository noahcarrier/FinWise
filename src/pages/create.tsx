import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import "../app/globals.css";


export default function Create() {
    return (
        <main className="bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center mt-6 ">
                <h1 className="text-yellow-200 text-5xl font-bold">Create Your Lesson</h1>
            </div>
            <div className="flex flex-col items-center mt-6">
                <a href="/create-flashcards" className="bg-white rounded-lg shadow-lg p-6">
                    <img src="icons/flashcards.png" className="w-full mb-" title="Flashcards Icon" />
                    <h2 className="text-2xl text-center font-bold mb-4">Flashcards</h2>
                </a>
            </div>
        </main>
    );
}