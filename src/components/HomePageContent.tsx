import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import HomePageCards from './HomePageCards';

export default function HomePageContent() {
  const [isPomodoroModalOpen, setIsPomodoroModalOpen] = useState(false);
  const [isVisualModalOpen, setIsVisualModalOpen] = useState(false);
  const [isLeitnerModalOpen, setIsLeitnerModalOpen] = useState(false);

  function openPomodoroModal() {
    setIsPomodoroModalOpen(true);
  }

  function closePomodoroModal() {
    setIsPomodoroModalOpen(false);
  }

  function openVisualModal() {
    setIsVisualModalOpen(true);
  }

  function closeVisualModal() {
    setIsVisualModalOpen(false);
  }

  function openLeitnerModal() {
    setIsLeitnerModalOpen(true);
  }

  function closeLeitnerModal() {
    setIsLeitnerModalOpen(false);
  }

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
        <div className="bg-gradient-to-b from-yellow-100 to-yellow-500  text-black font-bold p-4 w-3/5 rounded-3xl" id="learning-mode-bar">
          {/* list of learning modes in a horizontal menu bar */}
          <div>
            <ul className="flex justify-evenly items-center space-x-8">
              <li className="text-lg md:text-xl lg:text-2xl xl:text-3xl hover:text-blue-700"><button onClick={openPomodoroModal}>Pomodoro</button></li>
              <li className="text-lg md:text-xl lg:text-2xl xl:text-3xl hover:text-blue-700"><button onClick={openVisualModal}>Visual</button></li>
              <li className="text-lg md:text-xl lg:text-2xl xl:text-3xl hover:text-blue-700"><button onClick={openLeitnerModal}>Leitner</button></li>
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


      <Transition appear show={isPomodoroModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closePomodoroModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-b from-cyan-400 to-blue-600 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-4xl font-bold leading-6 text-white text-center">Pomodoro</Dialog.Title>
                  <div className="flex flex-col items-center mt-6">
                    <p className="text-xl">
                      The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s.
                      It uses a kitchen timer to break work into intervals, typically 25 minutes in length, separated by short breaks.
                      Each interval is known as a pomodoro, from the Italian word for tomato, after the tomato-shaped kitchen timer Cirillo used as a university student.
                    </p>
                  </div>
                  <button onClick={closePomodoroModal} className="bg-yellow-300 hover:bg-yellow-200 text-black rounded-lg px-2 py-1 font-semibold shadow-lg float-end">Close</button>
                </Dialog.Panel>

              </Transition.Child>
            </div>

          </div>
        </Dialog >
      </Transition>

      <Transition appear show={isVisualModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeVisualModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-b from-cyan-400 to-blue-600 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-4xl font-bold leading-6 text-white text-center">Visual</Dialog.Title>
                  <div className="flex flex-col items-center mt-6">
                    <p className="text-xl">
                      Visual learning is a learning style among the learning styles of Neil Fleming's VARK model in 
                      which information is presented to a learner in a visual format. Visual learners can utilize graphs, 
                      charts, maps, diagrams, and other forms of visual stimulation to effectively interpret information.
                    </p>
                  </div>
                  <button onClick={closeVisualModal} className="bg-yellow-300 hover:bg-yellow-200 text-black rounded-lg px-2 py-1 font-semibold shadow-lg float-end">Close</button>
                </Dialog.Panel>

              </Transition.Child>
            </div>

          </div>
        </Dialog >
      </Transition>

      <Transition appear show={isLeitnerModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeLeitnerModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-b from-cyan-400 to-blue-600 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-4xl font-bold leading-6 text-white text-center">Leitner</Dialog.Title>
                  <div className="flex flex-col items-center mt-6">
                    <p className="text-xl">
                      The Leitner system is a widely used method of efficiently using flashcards 
                      that was proposed by the German science journalist Sebastian Leitner in 1972. 
                      It is a simple implementation of the principle of spaced repetition, where cards are reviewed at increasing intervals. 
                    </p>
                  </div>
                  <button onClick={closeLeitnerModal} className="bg-yellow-300 hover:bg-yellow-200 text-black rounded-lg px-2 py-1 font-semibold shadow-lg float-end">Close</button>
                </Dialog.Panel>

              </Transition.Child>
            </div>

          </div>
        </Dialog >
      </Transition>
    </div>
  );
}