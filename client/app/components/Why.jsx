export default function Why() {
  return (
    <section className="py-28">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">

          <span className="inline-block bg-orange-500/10 text-orange-500 px-4 py-1 rounded-full text-xs font-bold mb-4">
            WHY LUXDRIVE
          </span>

          <h2 className="text-4xl font-bold mb-4">
            Why Choose Our Fleet?
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            We provide reliable, affordable, and premium vehicles backed by
            world-class customer service.
          </p>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              icon: "🛡️",
              title: "Premium Insurance",
              desc: "Full coverage for peace of mind on every journey.",
            },
            {
              icon: "📞",
              title: "24/7 Support",
              desc: "Our team is always ready to help you anytime.",
            },
            {
              icon: "💳",
              title: "Flexible Payments",
              desc: "Multiple payment options to fit your budget.",
            },
          ].map((item, i) => (

            <div
              key={i}
              className="bg-[#1f160c] p-8 rounded-2xl border border-orange-500/10 hover:border-orange-500/40 hover:scale-105 transition duration-300"
            >

              <div className="text-4xl mb-4">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
