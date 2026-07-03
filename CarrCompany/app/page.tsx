import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import Divisions from "@/components/Divisions";
import WhyCarr from "@/components/WhyCarr";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top">
      <ScrollProgress />
      <Nav />
      <Hero />
      <Marquee />
      <Intro />
      <Services />
      <WhyCarr />
      <Divisions />
      <Contact />
      <Footer />
    </main>
  );
}
