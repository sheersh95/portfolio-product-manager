import About from "@/components/About";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Skills from "@/components/Skills";
import dynamic from "next/dynamic";

const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <section className="py-20 px-4" />,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <section className="py-20 px-4" />,
});

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="content" className="pt-16">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
