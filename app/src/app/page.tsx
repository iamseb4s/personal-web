import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollReveal delay={0.25}>
        <Stack />
      </ScrollReveal>
      <ScrollReveal delay={0.25}>
        <Projects />
      </ScrollReveal>
    </>
  );
}