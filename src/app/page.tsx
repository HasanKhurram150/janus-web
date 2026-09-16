import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import POCBannerSection from "@/components/POCBannerSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ServicesSection from "@/components/ServicesSection";
import UsecasesSection from "@/components/UsecasesSection";
import FAQSection from "@/components/FAQSection";
import TiersSection from "@/components/TiersSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen text-white flex flex-col items-center overflow-x-clip">
        {/* Full-width sticky navigation */}
        <Navbar />

        {/* 5 Main Sections (All Full-Page Wide) */}
        <main className="w-full flex flex-col items-center">
          {/* 1. Hero Section */}
          <HeroSection />

          {/* 2. About Section */}
          <AboutSection />

          {/* POC Banner Section */}
          <POCBannerSection />

          {/* 3. Features Section */}
          <CapabilitiesSection />
          
          {/* 4. Capabilities Section */}
          <ServicesSection />

          {/* FAQ & Newsletter Section replacing Usecases */}
          {/* <UsecasesSection /> */}
          <FAQSection />

          {/* 5. Tiers Section (Pricing) */}
          {/* <TiersSection /> */}
        </main>

        {/* Full-width Footer */}
        <Footer />
      </div>
  );
}
