import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import About from "../components/About";
import Why from "../components/Why";
import Testimonials from "../components/Testimonials";
import FeaturedCollections from "../components/FeaturedCollections";
import Locations from "../components/Locations";
import Footer from "../components/Footer";


export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#120c05] via-[#1a1208] to-[#120c05] text-white font-sans">

<Navbar />
<Hero />
<SearchBar />
<About />
<Why />
<FeaturedCollections />
<Testimonials />
<Locations />
<Footer />
    </main>
  );
}
