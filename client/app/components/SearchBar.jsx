export default function SearchBar() {
  return (
    <div className="max-w-6xl mx-auto mt-24 px-6">

      <div className="bg-[#1f160c] rounded-full p-6 shadow-xl border border-orange-500/10 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">

        <div className="px-4 border-r border-gray-700">
          <p className="text-xs text-orange-500 font-bold">LOCATION</p>

          <input
            className="bg-transparent outline-none text-sm w-full"
            placeholder="Pickup City"
          />
        </div>

        <div className="px-4 border-r border-gray-700">
          <p className="text-xs text-orange-500 font-bold">PICKUP</p>

          <input
            type="date"
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        <div className="px-4 border-r border-gray-700">
          <p className="text-xs text-orange-500 font-bold">RETURN</p>

          <input
            type="date"
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        <button className="bg-orange-500 py-4 rounded-full font-bold hover:bg-orange-400">
          🔍 Search Now
        </button>

      </div>

    </div>
  );
}
