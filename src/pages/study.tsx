import React from "react";
import Navbar from "@/components/Navbar";
import "../app/globals.css";

const Study = () => {
    const handleBeforeSubmit = () => {
        console.log("Before Arrow was pressed.")
    }
    
    const handleCheckmarkSubmit = () => {
        console.log("Check Mark was pressed.")
    }

    const handleCrossmarkSubmit = () => {
        console.log("Cross Mark was pressed.")
    }

    const handleNextSubmit = () => {
        console.log("After Arrow was pressed.")
    }
    
    return(
        <main className="bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
            <Navbar isAuthed={true}/>
            <div className="flex flex-col items-center mt-6 ">
                <h1 className="text-yellow-200 text-5xl font-bold">Study Flashcards</h1>
            </div>
            <div className="flex flex-col items-center mt-6">
                <div className="bg-white rounded-lg shadow-lg p-6" style={{ width: '500px', height: '400px' }}>
                    <h2 className="text-black m-4 text-3xl text-center font-bold mb-4 ">Question</h2>
                </div>
                <div className="flex">
                    <button onClick={handleBeforeSubmit}>
                        <img src="icons/beforearrow.png" className="rounded-lg mt-8 mr-16" title="Cross Mark" style={{ width: '50px', height: '30px' }}/>
                    </button>
                    <button onClick={handleCheckmarkSubmit}>
                        <img src="icons/checkmark.jpg" className="rounded-lg mt-8 mr-16" title="Cross Mark" style={{ width: '50px', height: '50px' }}/>
                    </button>
                    <button onClick={handleCrossmarkSubmit}>
                        <img src="icons/crossmark.jpg" className="rounded-lg mt-8" title="Check Mark" style={{ width: '50px', height: '50px' }}/>
                    </button>
                    <button onClick={handleNextSubmit}>
                        <img src="icons/nextarrow.png" className="rounded-lg mt-8 ml-16" title="Cross Mark" style={{ width: '50px', height: '30px' }}/>
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Study;