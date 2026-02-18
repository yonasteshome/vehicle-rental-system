export default function Hero() {
  return (
    <section className="pt-36 pb-24 relative min-h-[90vh]">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

        {/* LEFT SIDE */}
        <div>

          <span className="inline-block bg-orange-500/10 text-orange-500 px-4 py-1 rounded-full text-xs font-bold mb-6">
            PREMIUM CAR RENTAL SAAS
          </span>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
            Rent Your Perfect <br />
            <span className="text-orange-500">Car, Anytime.</span>
          </h1>

          <p className="text-gray-400 max-w-xl mb-10 leading-relaxed">
            Experience the ultimate freedom of movement with our premium fleet
            of luxury and economy vehicles tailored for every journey.
            Instant booking, no hidden fees.
          </p>

          {/* USERS */}
          <div className="flex items-center gap-4">

            <div className="flex -space-x-3">
              <img
                className="w-10 h-10 rounded-full border-2 border-[#120c05]"
                src="https://i.pravatar.cc/100?1"
                alt="user"
              />

              <img
                className="w-10 h-10 rounded-full border-2 border-[#120c05]"
                src="https://i.pravatar.cc/100?2"
                alt="user"
              />

              <img
                className="w-10 h-10 rounded-full border-2 border-[#120c05]"
                src="https://i.pravatar.cc/100?3"
                alt="user"
              />
            </div>

            <p className="text-sm text-gray-400">
              <span className="text-white font-bold">2,500+</span> Happy Renters
              this month
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center">

          {/* Image Card */}
          <div className="bg-[#1f160c] p-6 rounded-3xl shadow-2xl w-full max-w-xl">

            <img
              className="rounded-2xl w-full h-[360px] object-cover"
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
              alt="Luxury Car"
            />

          </div>

          {/* Rating Badge */}
          <div className="absolute -bottom-6 left-6 bg-orange-500 px-6 py-4 rounded-xl shadow-xl">

            <p className="font-bold text-3xl">4.9/5</p>

            <p className="text-xs opacity-90">
              Customer Rating
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
