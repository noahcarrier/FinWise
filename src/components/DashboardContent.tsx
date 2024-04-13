import SearchBar from "./SearchBar";

export default function DashboardContent() {
  return (

    <div className="mx-auto max-w-1xl px-2">
      <div className="flex h-16 items-center justify-between mx-[5rem]">
          <p className="text-5xl font-extrabold  mt-[5rem] ">Dashboard</p>
          <h1 className="text-2xl font-extrabold mt-[5rem] ">Study Sets Mastered 0/0</h1>
          
      </div>
      <hr className="mt-[2.5rem] mx-20 border-2"></hr>
      <div className="grid grid-cols-5 mt-[5rem] mx-[5rem]">
        <div className="flex col-span-3 ">
          <button className="drop-shadow-lg bg-yellow-300 hover:bg-yellow-200 rounded-full self-center mx-2 px-1 py-1 my-1 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" className="fill-black w-8 h-8 ">
              <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
          </button>
          <p className="text-2xl ms-2 font-bold col-span-3 self-center">Your Study Sets</p>
          <div className="ml-5 self-center">
            <SearchBar placeholderText={"Search Lessons"}/>
          </div>
        </div>
        <p className="ms-7 col-span-2 text-2xl font-bold self-center">Your mastery</p>
      </div>
      <div className="grid grid-cols-5 mt-3 gap-7 mx-[5rem] text-black ">
        <div className="col-span-3 bg-yellow-300 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.3)] drop-shadow-lg rounded-3xl min-h-[60vh] ">
         <p className="mx-5"></p> 
        </div>
        <div className="col-span-2 bg-yellow-300 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.3)] drop-shadow-lg rounded-3xl ">
         <p className="mx-5"></p> 
        </div>
      </div>
    </div>
  );
}