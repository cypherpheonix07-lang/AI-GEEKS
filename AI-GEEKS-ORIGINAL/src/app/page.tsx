import React from "react";
import HeroSection from "@/components/home/HeroSection";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import CommunityExplorer from "@/components/home/CommunityExplorer";
import ContributionAndPartners from "@/components/home/ContributionAndPartners";
import MomentsGallery from "@/components/home/MomentsGallery";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#020813]">
      <HeroSection />
      <UpcomingEvents />
      <CommunityExplorer />
      <ContributionAndPartners />
      <MomentsGallery />
    </div>
  );
}
