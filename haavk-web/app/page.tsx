import HeroCgPlayer from '@/components/home/HeroCgPlayer';
import CoreTech from '@/components/home/CoreTech';
import GlobalBasesPreview from '@/components/home/GlobalBasesPreview';
import OriginStory from '@/components/home/OriginStory';

export default function HomePage() {
  return (
    <>
      <HeroCgPlayer />
      <CoreTech />
      <GlobalBasesPreview />
      <OriginStory />
    </>
  );
}