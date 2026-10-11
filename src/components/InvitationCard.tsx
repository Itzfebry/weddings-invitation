import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import type { Guest } from "../types/invitation";
import febryImage from "./images/Febry.png";
import flowerOne from "./images/flower1.png";
import flowerTwo from "./images/flower2.png";
import flowerThree from "./images/flower3.png";
import sashaImage from "./images/Sasha.jpeg";

interface InvitationCardProps {
  guest: Guest;
  onViewDetails: () => void;
}

export const InvitationCard = ({ guest, onViewDetails }: InvitationCardProps) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const context = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const copy = gsap.utils.toArray<HTMLElement>(".hero-reveal");
      const portraits = gsap.utils.toArray<HTMLElement>(".hero-portrait");

      if (reducedMotion) {
        gsap.set([...copy, ...portraits], { autoAlpha: 1, clearProps: "transform,filter" });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".hero-orbit",
          { autoAlpha: 0, scale: 0.84, rotate: -12 },
          { autoAlpha: 1, scale: 1, rotate: 0, duration: 1.6 },
        )
        .fromTo(
          copy,
          { autoAlpha: 0, y: 26, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.11, clearProps: "filter" },
          "-=1.1",
        )
        .fromTo(
          portraits,
          { autoAlpha: 0, y: 48, rotate: (index) => (index === 0 ? -5 : 5), scale: 0.92 },
          {
            autoAlpha: 1,
            y: 0,
            rotate: (index) => (index === 0 ? -2.5 : 2.5),
            scale: 1,
            duration: 1.15,
            stagger: 0.16,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .to(
          portraits,
          { y: (index) => (index === 0 ? -8 : 8), duration: 3.8, stagger: 0.2, ease: "sine.inOut", yoyo: true, repeat: -1 },
          "-=0.2",
        );
    }, hero);

    return () => context.revert();
  }, []);

  return (
    <motion.section
      className="hero-section section-shell"
      id="home"
      ref={heroRef}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="guest-card-florals" aria-hidden="true">
        <span className="guest-card-orbit guest-card-orbit--one" />
        <span className="guest-card-orbit guest-card-orbit--two" />
        <span className="guest-card-spark guest-card-spark--one">✦</span>
        <span className="guest-card-spark guest-card-spark--two">✧</span>
        <img className="guest-card-flower guest-card-flower--one" src={flowerTwo} alt="" />
        <img className="guest-card-flower guest-card-flower--two" src={flowerThree} alt="" />
        <img className="guest-card-flower guest-card-flower--three" src={flowerOne} alt="" />
      </div>
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="hero-orbit hero-orbit--one" />
        <span className="hero-orbit hero-orbit--two" />
        <span className="hero-orbit hero-orbit--three" />
      </div>

      <div className="home-composition">
        <div className="hero-copy">
          <span className="hero-eyebrow hero-reveal">UNDANGAN PERNIKAHAN <i /> 30 MEI 2030</span>
          <p className="hero-greeting hero-reveal">Untuk {guest.name},</p>
          <h1 className="hero-reveal">Febry <span>&amp;</span> Sasha</h1>
          <p className="hero-message hero-reveal">With hearts full of joy, we invite you to celebrate the beginning of our forever.</p>
          <div className="hero-event-line hero-reveal">
            <span>30 Mei 2030</span>
            <i />
            <span>Four Seasons Resort, Maldives</span>
          </div>
          <div className="hero-actions hero-reveal">
            <motion.button
              className="hero-details-link"
              type="button"
              onClick={onViewDetails}
              whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.025 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 360, damping: 24 }}
            >
              Lihat detail acara <span aria-hidden="true">→</span>
            </motion.button>
          </div>
        </div>

        <div className="hero-portraits" aria-label="Febry dan Sasha">
          <span className="portrait-overline hero-reveal">SEBUAH PERJALANAN, DUA HATI</span>
          <figure className="hero-portrait hero-portrait--groom">
            <img src={febryImage} alt="Febry" />
            <figcaption><strong>Febry</strong><span>MEMPELAI PRIA</span></figcaption>
          </figure>
          <figure className="hero-portrait hero-portrait--bride">
            <img src={sashaImage} alt="Sasha" />
            <figcaption><strong>Sasha</strong><span>MEMPELAI WANITA</span></figcaption>
          </figure>
          <span className="portrait-caption hero-reveal">FEBRY &amp; SASHA <i /> MALDIVES</span>
        </div>
      </div>
      <motion.span
        className="hero-scroll-cue"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={shouldReduceMotion ? undefined : { opacity: [0.65, 1, 0.65], y: [0, 4, 0] }}
        transition={shouldReduceMotion ? undefined : { delay: 1.8, duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <i /> GULIR UNTUK MENJELAJAH
      </motion.span>
    </motion.section>
  );
};
