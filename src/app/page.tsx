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
            
            <div className="w-48 h-48">
              <div className="max-w-fit max-h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg" src="https://www.the-sun.com/wp-content/uploads/sites/6/2023/10/www-instagram-com-monkeycatluna-hl-851711797.jpg" width = "256px" height = "256px" alt="" />
                <div className="p-3">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Memory</h5>
                </div>
              </div>
            </div>
            <div className="w-48 h-48">
              <div className="max-w-fit max-h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg" src="https://imgflip.com/s/meme/Cute-Cat.jpg" width = "256px" height = "256px" alt="" />
                <div className="p-3">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Mastery</h5>
                </div>
              </div>
            </div>
            <div className="w-48 h-48">
              <div className="max-w-fit max-h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg" src="https://i1.sndcdn.com/avatars-000703303372-k246pt-t240x240.jpg" width = "256px" height = "256px" alt="" />
                <div className="p-3">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Strategy</h5>
                </div>
              </div>
            </div>
            <div className="w-48 h-48">
              <div className="max-w-fit max-h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg" src="https://preview.redd.it/r3lcc7gf64791.png?width=540&format=png&auto=webp&s=9d32ec46f884486fd59dfd01453bf5d07bf30d75" width = "256px" height = "256px" alt="" />
                <div className="p-3">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Sprints & Breaks</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}