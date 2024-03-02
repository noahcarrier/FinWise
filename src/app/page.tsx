import Image from "next/image";
import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <main className="bg-white h-screen">
      <Navbar />
      <div id="page-content">
        {/* welcome message */}
        <div className="place-content-center" id="welcome-message">
          <div>
            <p className="text-4xl font-bold h-48 flex items-center justify-center">
              Choose Your Learning Style...
            </p>
          </div>
        </div>
        <div className="h-20 flex justify-center items-center" id="learning-mode-cont">
          <div className="bg-sky-600 p-4 w-3/5 rounded-3xl" id="learning-mode-bar">
            {/* list of learning modes in a horizontal menu bar */}
            <div>
              <ul className="flex justify-evenly items-center space-x-8">
                <li className="text-lg md:text-xl lg:text-2xl xl:text-3xl">Pomodoro</li>
                <li className="text-lg md:text-xl lg:text-2xl xl:text-3xl">Feynman</li>
                <li className="text-lg md:text-xl lg:text-2xl xl:text-3xl">Visual</li>
                <li className="text-lg md:text-xl lg:text-2xl xl:text-3xl">Leitner</li>
                <li className="text-lg md:text-xl lg:text-2xl xl:text-3xl">Auditory</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-3/5 mx-auto" id="lesson-previews">
          <div id="lesson-message">
            <div>
              <p className="text-5xl font-bold h-48 flex items-center justify-center">
                Create Your Own Lessons
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-8" id="lesson-prev-boxes">
            <div className="w-48 h-48 bg-cyan-700 rounded-3xl"></div>
            <div className="w-48 h-48 bg-cyan-700 rounded-3xl"></div>
            <div className="w-48 h-48 bg-cyan-700 rounded-3xl"></div>
            <div className="w-48 h-48 bg-cyan-700 rounded-3xl"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
