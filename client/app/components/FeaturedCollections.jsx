export default function FeaturedCollections() {
  const cars = [
    {
      name: "Tesla Model S Plaid",
      year: "2023",
      type: "Premium Performance",
      price: 180,
      tag: "ELECTRIC",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399",
      features: ["Auto", "5 Seats", "396 mi"],
    },
    {
      name: "BMW M5 Competition",
      year: "2022",
      type: "Sport Luxury",
      price: 210,
      tag: "LUXURY",
      image: "https://images.unsplash.com/photo-1614200179396-2bdb77ebf7b3",
      features: ["Auto", "5 Seats", "Petrol"],
    },
    {
      name: "Porsche 911 GT3",
      year: "2023",
      type: "Exotic Sport",
      price: 450,
      tag: "SPORT",
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
      features: ["PDK", "2 Seats", "Petrol"],
    },
  ];

  return (
    <section id="popular-sales" className="py-28">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-14">

          <div>
            <h2 className="text-4xl font-bold mb-2">
              Featured Collections
            </h2>
            <p className="text-gray-400">
              Our most popular vehicles selected for you
            </p>
          </div>

          <button className="text-orange-500 font-semibold flex items-center gap-2 mt-4 md:mt-0 hover:underline">
            View All Fleet →
          </button>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {cars.map((car, i) => (
            <div
              key={i}
              className="bg-[#1f160c] rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-56 object-cover"
                />
                <span className="absolute top-4 right-4 bg-black/70 text-orange-500 text-xs px-3 py-1 rounded-full font-bold">
                  {car.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{car.name}</h3>
                    <p className="text-sm text-gray-400">{car.year} • {car.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-500 text-xl font-bold">${car.price}</p>
                    <p className="text-xs text-gray-400">PER DAY</p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex justify-between text-sm text-gray-400 border-t border-gray-700 pt-4 mb-6">
                  {car.features.map((f, idx) => (
                    <span key={idx}>{f}</span>
                  ))}
                </div>

                {/* Button */}
                <button className="w-full bg-[#1c2c44] py-3 rounded-xl font-semibold hover:bg-orange-500 transition">
                  Book Now
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
