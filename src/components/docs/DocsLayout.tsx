import { useState, useEffect } from "react";
import { DocsSidebar } from "./DocsSidebar";
import { HeroSection } from "./sections/HeroSection";
import { IntroductionSection } from "./sections/IntroductionSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { TechStackSection } from "./sections/TechStackSection";
import { ApplicationsSection } from "./sections/ApplicationsSection";
import { GamesSection } from "./sections/GamesSection";
import { AIAssistantSection } from "./sections/AIAssistantSection";
import { HardwareSection } from "./sections/HardwareSection";
import { InstallationSection } from "./sections/InstallationSection";
import { ProjectStructureSection } from "./sections/ProjectStructureSection";
import { ChallengesSection } from "./sections/ChallengesSection";
import { RoadmapSection } from "./sections/RoadmapSection";
import { FooterSection } from "./sections/FooterSection";
import { BackToTop } from "./BackToTop";
import { ReadingProgress } from "./ReadingProgress";

export function DocsLayout() {
  const [activeSection, setActiveSection] = useState("introduction");

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex">
      <ReadingProgress />
      <DocsSidebar activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="flex-1 min-w-0 w-full md:ml-64 pt-16 md:pt-0">
        {/* Hero - Full width */}
        <HeroSection onNavigate={handleNavigate} />

        {/* Content sections */}
        <div className="max-w-4xl mx-auto px-4 md:px-6 pb-12">
          <IntroductionSection />
          <HowItWorksSection />
          <TechStackSection />
          <ApplicationsSection />
          <GamesSection />
          <AIAssistantSection />
          <HardwareSection />
          <InstallationSection />
          <ProjectStructureSection />
          <ChallengesSection />
          <RoadmapSection />
        </div>

        {/* Footer */}
        <FooterSection onNavigate={handleNavigate} />
      </main>
      <BackToTop />
    </div>
  );
}
