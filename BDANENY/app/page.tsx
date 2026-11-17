import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Lifeline from "@/components/Lifeline";
import Stats from "@/components/Stats";
import Pillars from "@/components/Pillars";
import EventSpotlight from "@/components/EventSpotlight";
import Advocacy from "@/components/Advocacy";
import Help from "@/components/Help";
import Involve from "@/components/Involve";
import Footer from "@/components/Footer";
import { AboutSection, ResearchSection, InformedCards, SupportAndTouch } from "@/components/HomeExtras";

export default function Home() {
  return (
    <>
      <Nav />
      <Lifeline />
      <main>
        <Hero />
        <Stats />
        <Pillars />
        <AboutSection />
        <EventSpotlight />
        <Advocacy />
        <ResearchSection />
        <Help />
        <InformedCards />
        <Involve />
        <SupportAndTouch />
      </main>
      <Footer />
    </>
  );
}
