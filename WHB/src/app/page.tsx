import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { PipelineSpine } from "@/components/PipelineSpine";
import { Capabilities } from "@/components/Capabilities";
import { Territory } from "@/components/Territory";
import { Manufacturers } from "@/components/Manufacturers";
import { PullQuote } from "@/components/PullQuote";
import { Associations } from "@/components/Associations";
import { StatsAbout } from "@/components/StatsAbout";
import { ContactCta } from "@/components/ContactCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LogoMarquee />
        <PipelineSpine>
          <Capabilities />
          <Territory />
          <PullQuote />
          <Manufacturers />
          <Associations />
          <StatsAbout />
          <ContactCta />
        </PipelineSpine>
      </main>
      <Footer />
    </>
  );
}
