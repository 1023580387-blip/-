import HeroSection from '@/components/home/HeroSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-havoc-black">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
}
