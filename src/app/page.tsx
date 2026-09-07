import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import UsecasesSection from "@/components/UsecasesSection";
import TiersSection from "@/components/TiersSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative w-full min-h-screen bg-[#1b1022] text-white flex flex-col items-center overflow-x-hidden">
        {/* Full-width sticky navigation */}
        <Navbar />

        {/* 5 Main Sections (All Full-Page Wide) */}
        <main className="w-full flex flex-col items-center">
          {/* 1. Hero Section */}
          <HeroSection />

          {/* 2. About Section */}
          <AboutSection />

          {/* 3. Capabilities Section */}
          <CapabilitiesSection />

          {/* 4. Usecases Section */}
          <UsecasesSection />

          {/* 5. Tiers Section */}
          <TiersSection />
        </main>

        {/* Full-width Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
