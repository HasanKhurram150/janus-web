import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <div className="relative w-full min-h-screen text-white flex flex-col items-center overflow-x-clip bg-janus-bg">
        <Navbar />
        
        <main className="w-full flex flex-col items-center pt-24">
          <ServicesSection showAll={true} />
        </main>

        <Footer />
      </div>
  );
}
