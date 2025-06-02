import { useState, useEffect, useRef } from "react";
import {
  ContactSection,
  Header,
  HeroSection,
  BuildingStep,
  ResultSection,
} from "./components";
import {
  ApartmentsSection,
  BuildingsSection,
  EnvironmentSection,
  WebsiteSection,
} from "./components/steppers";

function App() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [progress, setProgress] = useState<{
    from: string;
    ratio: number;
  } | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({
    buildings: null,
    apartments: null,
    environment: null,
    website: null,
  });

  const handleScrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const headerHeight = 80; 
      const stepperHeight = 48; 
      const offset = headerHeight + stepperHeight + 80;
      const sectionTop =
        section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: sectionTop, behavior: "smooth" });
      setActiveSection(sectionId);
      setProgress(null); 
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-150px 0px -50% 0px",
        threshold: 0.1,
      }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = Object.values(sectionRefs.current).filter(
        Boolean
      ) as HTMLElement[];

      const headerHeight = 80;
      const stepperHeight = 48;
      const offset = headerHeight + stepperHeight;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.getBoundingClientRect().top + scrollY;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (i === 0 && scrollY < sectionTop - offset) {
          setProgress(null);
          setActiveSection(null);
          return;
        }

        if (
          scrollY >= sectionTop - offset &&
          scrollY < sectionBottom - offset
        ) {
          setActiveSection(section.id);

          if (i < sections.length - 1) {
            const nextSection = sections[i + 1];
            const nextSectionTop =
              nextSection.getBoundingClientRect().top + scrollY;
            const distance = nextSectionTop - sectionTop;
            const scrolled = scrollY - (sectionTop - offset);
            const ratio = Math.min(1, Math.max(0, scrolled / distance));
            setProgress({ from: section.id, ratio });
          } else {
            setProgress(null);
          }
          return;
        }
      }

      if (sections.length > 0) {
        const lastSection = sections[sections.length - 1];
        const lastSectionBottom =
          lastSection.getBoundingClientRect().bottom + scrollY;
        if (scrollY >= lastSectionBottom - offset) {
          setActiveSection(lastSection.id);
          setProgress(null);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black/90">
      <Header />
      <HeroSection />
      <BuildingStep
        activeSection={activeSection}
        progress={progress}
        onStepClick={handleScrollToSection}
      />
      <main className="py-20 pt-32 space-y-0 px-5">
        <div
          id="buildings"
          ref={(el) => {
            sectionRefs.current.buildings = el;
          }}
          className="scroll-mt-32"
        >
          <BuildingsSection />
        </div>
        <div
          id="apartments"
          ref={(el) => {
            sectionRefs.current.apartments = el;
          }}
          className="scroll-mt-32 "
        >
          <ApartmentsSection />
        </div>
        <div
          id="environment"
          ref={(el) => {
            sectionRefs.current.environment = el;
          }}
          className="scroll-mt-32 "
        >
          <EnvironmentSection />
        </div>
        <div
          id="website"
          ref={(el) => {
            sectionRefs.current.website = el;
          }}
          className="scroll-mt-32 "
        >
          <WebsiteSection />
        </div>
      </main>
      <ResultSection />
      <ContactSection />
    </div>
  );
}

export default App;
