import SearchBar from "./SearchBar";
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Link from "next/link";
import { create } from "domain";

export type userProps = {
  lessonInfo: lessonInfo[] | undefined;
};

export type lessonInfo = {
  id: number;
  title: string;
  created_at: Date;
}

export const DashboardContent = ({ lessonInfo }: userProps) => {

  useEffect(() => {
    console.log(JSON.stringify(lessonInfo));
  }, [lessonInfo]);
  
  // console.log(userId);
  let [isCreateStudySetModalOpen, setIsCreateStudySetModalOpen] = useState(false);

  function openCreateStudySetModal() {
    setIsCreateStudySetModalOpen(true);
  }

  function closeCreateStudySetModal() {
    setIsCreateStudySetModalOpen(false);
  }

  function parseLessonCreationDate(created_at: Date) {
    let now = new Date();
    let createdTimeInMilli = new Date(created_at);
    let difference = now.getTime() - createdTimeInMilli.getTime();

    let differenceInDays = Math.round(difference / (1000 * 3600 * 24));

    if(differenceInDays == 0) {
      return "Today"
    }
    else {
      return differenceInDays.toString() + " days ago";
    }
  }

  return (
    <>


      <div className="mx-auto max-w-1xl px-2">
        <div className="flex h-16 items-center justify-between mx-[5rem]">
          <p className="text-5xl font-extrabold  mt-[5rem] ">Dashboard</p>
          <h1 className="text-2xl font-extrabold mt-[5rem] ">Study Sets Mastered 0/0</h1>

        </div>
        <hr className="mt-[2.5rem] mx-20 border-2"></hr>
        <div className="grid grid-cols-5 mt-[5rem] mx-[5rem]">
          <div className="flex col-span-3 ">
            <button onClick={openCreateStudySetModal} className="drop-shadow-lg bg-yellow-300 hover:bg-yellow-200 rounded-full self-center mx-2 px-1 py-1 my-1 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" className="fill-black w-8 h-8 ">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
              </svg>
            </button>
            <p className="text-2xl ms-2 font-bold col-span-3 self-center">Your Study Sets</p>
            <div className="ml-5 self-center">
              <SearchBar placeholderText={"Search Lessons"} />
            </div>
          </div>
          <p className="ms-7 col-span-2 text-2xl font-bold self-center">Your mastery</p>
        </div>
        <div className="grid grid-cols-5 mt-3 gap-7 mx-[5rem] text-black ">
          <div className="overflow-y-scroll col-span-3 bg-yellow-300 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.3)] drop-shadow-lg rounded-3xl min-h-[60vh] ">
            {lessonInfo.map((lesson) => (
              <>
              <div className="flex relative justify-between rounded-xl bg-gradient-to-b from-yellow-200 to-yellow-500">
                <div className="flex">
                  <p className="mx-5 my-8 font-bold text-4xl">{lesson.title}</p> 
                </div>
                <Link href={`/study/${lesson.id}`} className="flex items-center float-end bg-gradient-to-b from-cyan-400 to-blue-500 mx-4 my-5 px-3 rounded-lg text-xl text-white py-auto">
                  Study
                </Link>
                <p className="mb-2 mx-5 font-semibold absolute bottom-0">Created {parseLessonCreationDate(lesson.created_at)}</p>
              </div>
              </>
            ))

            }
            {/* <p className="mx-5"></p> */}
          </div>
          <div className="col-span-2 bg-yellow-300 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.3)] drop-shadow-lg rounded-3xl ">
            <p className="mx-5"></p>
          </div>
        </div>
      </div>

      <Transition appear show={isCreateStudySetModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => closeCreateStudySetModal()}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-b from-cyan-300 to-blue-600 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-4xl font-bold leading-6 text-black text-center">Create StudySet</Dialog.Title>
                  <div className="flex flex-col items-center mt-6">
                    <Link href="/create-flashcards" className="bg-yellow-300 hover:bg-yellow-200 rounded-lg shadow-lg p-6">
                      <img src="icons/flashcards.png" className="w-full mb-" title="Flashcards Icon" alt="Fashcard Icon" />
                      <h2 className="text-black m-4 text-3xl text-center font-bold mb-4">Flashcards</h2>
                    </Link>
                  </div>
                  <button onClick={closeCreateStudySetModal} className="bg-yellow-300 hover:bg-yellow-200 text-black rounded-lg px-2 py-1 font-semibold shadow-lg float-end">Close</button>
                </Dialog.Panel>

              </Transition.Child>
            </div>

          </div>
        </Dialog >
      </Transition>
    </>
  );
}