export default function Locations() {
  return (
    <section className="py-28 bg-[#140d06]">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>

          <span className="inline-block bg-orange-500/10 text-orange-500 px-4 py-1 rounded-full text-xs font-bold mb-4">
            OUR LOCATIONS
          </span>

          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Pick Up From 15+ <br />
            Locations Across The City
          </h2>

          <p className="text-gray-400 mb-8 leading-relaxed">
            With multiple pickup and drop-off points across Addis Ababa,
            LuxDrive ensures you’re always close to your next ride.
          </p>

          {/* List */}
          <ul className="space-y-4 text-gray-300 mb-10">

            <li className="flex items-center gap-3">
              <span className="text-orange-500">✔</span>
              Bole International Airport
            </li>

            <li className="flex items-center gap-3">
              <span className="text-orange-500">✔</span>
              Piassa Main Office
            </li>

            <li className="flex items-center gap-3">
              <span className="text-orange-500">✔</span>
              Meskel Square Branch
            </li>

            <li className="flex items-center gap-3">
              <span className="text-orange-500">✔</span>
              Kazanchis Service Hub
            </li>

          </ul>

          <button className="bg-orange-500 px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition">
            Find Nearest Location
          </button>

        </div>

        {/* RIGHT */}
        <div className="relative">

          {/* Laptop Frame */}
          <div className="bg-[#1f160c] p-5 rounded-3xl shadow-2xl">

            <img
              src="https://images.unsplash.com/photo-1587620962725-abab7fe55159"
              alt="Map"
              className="rounded-2xl"
            />

          </div>

          {/* Pins */}
          <div className="absolute top-10 left-10 bg-orange-500 p-2 rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-16 bg-orange-500 p-2 rounded-full animate-pulse" />
          <div className="absolute top-32 right-24 bg-orange-500 p-2 rounded-full animate-pulse" />

        </div>

      </div>

    </section>
  );
}
