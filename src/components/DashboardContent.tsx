import SearchBar from "./SearchBar";

export default function DashboardContent() {
  return (

    <div className="mx-auto max-w-1xl px-2">
      <div className="flex h-16 items-center justify-between mx-[5rem]">
          <p className="text-5xl font-extrabold  mt-[5rem] ">Dashboard</p>
          <h1 className="text-2xl font-extrabold mt-[5rem] ">Lessons Mastered 0/0</h1>
      </div>
      <div className="grid grid-cols-5 mt-[5rem] mx-[5rem]">
        <div className="flex col-span-3">
          <p className="flex text-2xl ms-2 font-bold justify-center self-center">Your Lessons</p>
          <div className="ml-5">
            <SearchBar placeholderText={"Search Lessons"}/>
          </div>
        </div>
        <p className="ms-7 col-span-2 text-2xl font-bold self-center">Your mastery</p>
      </div>
      <div className="grid grid-cols-5 mt-3 gap-7 mx-[5rem] text-black ">
        <div className="col-span-3 bg-yellow-300 rounded-3xl min-h-[70vh] ">
         <p className="mx-5">Content</p> 
        </div>
        <div className="col-span-2 bg-yellow-300 rounded-3xl ">
         <p className="mx-5">Content</p> 
        </div>
      </div>
    </div>
  );
}