import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Countdown } from "../components/Countdown";
import { ClosingBlessing } from "../components/ClosingBlessing";
import { EventDetails } from "../components/EventDetails";
import { HeroScene } from "../components/HeroScene";
import { InvitationCard } from "../components/InvitationCard";
import { Story } from "../components/Story";
import { WeddingGallery } from "../components/WeddingGallery";
import { eventDetails, wedding } from "../data/wedding";
import type { Guest } from "../types/invitation";

interface InvitationProps {
  guest: Guest;
}

gsap.registerPlugin(ScrollTrigger);

export const Invitation = ({ guest }: InvitationProps) => {
  const invitationRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const root = invitationRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      const revealItems = gsap.utils.toArray<HTMLElement>(".gsap-scroll-reveal");
      const visualItems = gsap.utils.toArray<HTMLElement>(".gsap-scroll-visual");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set([...revealItems, ...visualItems], { autoAlpha: 1, clearProps: "transform,filter,clipPath" });
        return;
      }

      revealItems.forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 26, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
            clearProps: "filter",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      visualItems.forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, clipPath: "inset(8% 0 8% 0)" },
          {
            autoAlpha: 1,
            clipPath: "inset(0% 0 0% 0)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });
    }, root);

    return () => {
      context.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  const scrollToDetails = () => {
    document.getElementById("details")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.main
      className="invitation-page"
      ref={invitationRef}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
    >
      <HeroScene />
      <div className="invitation-content">
        <InvitationCard guest={guest} onViewDetails={scrollToDetails} />
        <Story />
        <WeddingGallery />
        <Countdown targetDate={wedding.countdownTarget} />
        <EventDetails details={eventDetails} />
        <ClosingBlessing guest={guest} />
      </div>
    </motion.main>
  );
};
