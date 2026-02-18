export default function About() {
  return (
    <section id="about" className="py-28 bg-[#140d06]">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>

          <span className="inline-block bg-orange-500/10 text-orange-500 px-4 py-1 rounded-full text-xs font-bold mb-4">
            ABOUT US
          </span>

          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Driving Comfort & <br />
            Reliability Across Ethiopia
          </h2>

          <p className="text-gray-400 mb-6 leading-relaxed">
            LuxDrive is Ethiopia’s leading digital car rental platform, offering
            luxury and economy vehicles with secure booking, transparent pricing,
            and 24/7 customer support.
          </p>

          <p className="text-gray-400 mb-8 leading-relaxed">
            Our mission is to make transportation simple, affordable, and
            accessible for everyone — whether for business, travel, or daily use.
          </p>

          <div className="flex gap-6">

            <div>
              <h3 className="text-2xl font-bold text-orange-500">10K+</h3>
              <p className="text-sm text-gray-400">Customers</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-orange-500">500+</h3>
              <p className="text-sm text-gray-400">Vehicles</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-orange-500">15+</h3>
              <p className="text-sm text-gray-400">Locations</p>
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="relative">

          <img
            src="https://images.unsplash.com/photo-1542362567-b07e54358753"
            alt="Car rental"
            className="rounded-3xl shadow-2xl"
          />

          <div className="absolute -bottom-6 -right-6 bg-orange-500 px-5 py-4 rounded-xl shadow-xl text-sm font-bold">
            Trusted Since 2020
          </div>

        </div>

      </div>

    </section>
  );
}
