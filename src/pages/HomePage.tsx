import HeroCarousel from "../components/home/HeroCarousel";
import LimitedNewArrivals from "../components/home/LimitedNewArrivals";
import FlagshipSeries from "../components/home/FlagshipSeries";
import StoreMapPreview from "../components/home/StoreMapPreview";
import BrandStory from "../components/home/BrandStory";

export default function HomePage() {
  return (
    <main className="bg-tracks">
      <HeroCarousel />
      <LimitedNewArrivals />
      <FlagshipSeries />
      <StoreMapPreview />
      <BrandStory />
    </main>
  );
}