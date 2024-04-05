import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import "../app/globals.css";


export default function Create() {
    return (
        <main className="bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center mt-6 ">
                <h1 className="text-yellow-200 text-5xl font-bold">Create Flashcards</h1>
            </div>
            <div className="flex justify-center mt-6 mb-6">
                <div className="bg-white rounded-lg p-4 mr-4">
                    <h2 className="text-gray-800 text-lg font-bold mb-2">Question</h2>
                    <input type="text" id="questionInput" className="border border-gray-300 rounded-md px-3 py-2 w-64" placeholder="Enter your question" />
                </div>
                <div className="bg-white rounded-lg p-4">
                    <h2 className="text-gray-800 text-lg font-bold mb-2">Answer</h2>
                    <input type="text" id="answerInput" className="border border-gray-300 rounded-md px-3 py-2 w-64" placeholder="Enter your answer" />
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <button className="text-yellow-200 text-lg font-bold bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Add Card</button>
            </div>
        </main>
    );
}