import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Metrics } from "@/components/sections/Metrics";
import { Research } from "@/components/sections/Research";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Teaching } from "@/components/sections/Teaching";
import { Training } from "@/components/sections/Training";
import { Credentials } from "@/components/sections/Credentials";
import { Speaking } from "@/components/sections/Speaking";
import { Recognition } from "@/components/sections/Recognition";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <div className="hairline h-px" />
        <About />
        <Metrics />
        <Research />
        <Experience />
        <Education />
        <Teaching />
        <Training />
        <Credentials />
        <Speaking />
        <Recognition />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
