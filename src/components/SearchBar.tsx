
type SearchBarProps = {
  placeholderText: string
}

export default function SearchBar({placeholderText}:SearchBarProps) {
  return (
    <form className="max-w-md mx-auto">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        </div>
        <input type="search" id="default-search" className="block h-8 w-full p-4 ps-10 text-sm text-gray-900 border border-yellow-300 rounded-lg bg-yellow-300 placeholder-gray-700" placeholder={placeholderText} required />
        <button type="submit" className="absolute items-center ps-3 inset-y-0">
          <svg className="w-4 h-4 text-gray-700 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </button>
      </div>
    </form>

  );
}