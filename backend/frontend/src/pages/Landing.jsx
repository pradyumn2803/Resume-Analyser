import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import CTA from "../components/landing/CTA"
import Footer from "../components/layout/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0B1020] text-white">
      <Navbar />

      <main className="pt-20">
        <Hero />
        <Features />
        <CTA/>
      </main>

      <Footer/>
    </div>
  );
}
