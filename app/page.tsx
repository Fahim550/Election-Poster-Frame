import HeroSection from "./components/HeroSection";
import MainFeatureSection from "./components/MainFeatureSection";
import UpcomingFeaturesSection from "./components/UpComingFeature";
import ValuesSection from "./components/ValuesSection";

export default function Home() {
  return (
    <div className=" bg-zinc-50 font-sans ">
      {/* <CampaignFrame/> */}
      {/* <PhotoFrameUploader/> */}
      <div>

      <HeroSection/>
      <MainFeatureSection/>
      <UpcomingFeaturesSection/>
      <ValuesSection/>
      </div>
    </div>
  );
}
