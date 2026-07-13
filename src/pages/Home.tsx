import NavBar from "@/components/NavBar";
import Background from "@/components/Background";
import Hero from "@/components/Hero";
import ProtocolFeatures from "@/components/ProtocolFeatures";
import DataPulse from "@/components/DataPulse";
import Manifesto from "@/components/Manifesto";
import AccessCTA from "@/components/AccessCTA";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <NavBar />
      <main className="relative z-10">
        <Hero />
        <ProtocolFeatures />
        <DataPulse />
        <Manifesto />
        <AccessCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
