import React from "react";
import Navbar from "@/components/Navbar";
import "../app/globals.css";

const Study = () => {
    return(
        <main className="bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
            <Navbar isAuthed={true}/>
            <div className="flex flex-col items-center mt-6 ">
                <h1 className="text-yellow-200 text-5xl font-bold">Study Flashcards</h1>
            </div>
            <div className="flex flex-col items-center mt-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-black m-4 text-3xl text-center font-bold mb-4 ">Question</h2>
                </div>
            </div>
        </main>
    );
}

export default Study;