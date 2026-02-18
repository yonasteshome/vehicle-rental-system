export default function Testimonials() {
  return (
    <section id="testimonials" className="py-28 bg-[#140d06]">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">

          <span className="inline-block bg-orange-500/10 text-orange-500 px-4 py-1 rounded-full text-xs font-bold mb-4">
            TESTIMONIALS
          </span>

          <h2 className="text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Thousands of customers trust LuxDrive for their daily and business
            travel needs.
          </p>

        </div>

        {/* Reviews */}
        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              name: "Abel Tesfaye",
              role: "Business Owner",
              text: "LuxDrive made my business trips stress-free. Clean cars and great support!",
            },
            {
              name: "Sara Mekonnen",
              role: "Tourist",
              text: "Very easy booking process and affordable prices. Highly recommended!",
            },
            {
              name: "Dawit Alemu",
              role: "Software Engineer",
              text: "Best car rental experience in Addis. Professional and reliable service.",
            },
          ].map((item, i) => (

            <div
              key={i}
              className="bg-[#1f160c] p-8 rounded-2xl shadow-xl border border-orange-500/10 hover:border-orange-500/40 transition"
            >

              <p className="text-gray-300 mb-6 leading-relaxed">
                “{item.text}”
              </p>

              <div className="border-t border-gray-700 pt-4">

                <h4 className="font-bold text-orange-500">
                  {item.name}
                </h4>

                <p className="text-sm text-gray-400">
                  {item.role}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
