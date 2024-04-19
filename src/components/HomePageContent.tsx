import React from 'react';
import HomePageCards from './HomePageCards';

export default function HomePageContent() {
  return (
    <div id="page-content">
      {/* welcome message */}
      <div className="place-content-center" id="welcome-message">
        <div>
          <p className="text-4xl font-bold h-36 flex items-center justify-center">
            Choose Your Learning Style...
          </p>
        </div>
      </div>
      <div className="h-20 flex justify-center items-center" id="learning-mode-cont">
        <div className="bg-yellow-300 text-black p-4 w-3/5 rounded-3xl" id="learning-mode-bar">
          {/* list of learning modes in a horizontal menu bar */}
          <div>
            <ul className="flex justify-evenly items-center space-x-8">
              <li className="text-lg md:text-xl lg:text-2xl xl:text-3xl">Pomodoro</li>
              <li className="text-lg md:text-xl lg:text-2xl xl:text-3xl">Visual</li>
              <li className="text-lg md:text-xl lg:text-2xl xl:text-3xl">Leitner</li>
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
        <HomePageCards />
      </div>
    </div>
  );
}