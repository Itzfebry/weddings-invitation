import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GuestNameInput } from "./GuestNameInput";
import { LilyParallax } from "./LilyParallax";
import { couple, wedding } from "../data/wedding";
import febryImage from "./images/Febry.png";
import flowerOne from "./images/flower1.png";
import flowerTwo from "./images/flower2.png";
import flowerThree from "./images/flower3.png";
import lilyImage from "./images/lili-pink.png";
import sashaImage from "./images/Sasha.jpeg";

interface OpeningScreenProps {
  onOpen: (name: string) => void;
  isOpening: boolean;
}

export const OpeningScreen = ({ onOpen, isOpening }: OpeningScreenProps) => {
  const introRef = useRef<HTMLElement | null>(null);
  const [letterOpened, setLetterOpened] = useState(false);

  useEffect(() => {
    const root = introRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const images = gsap.utils.toArray<HTMLElement>(".intro-photo");
      const foregroundFlowers = gsap.utils.toArray<HTMLElement>(".opening-floral-foreground img");
      const openingContent = gsap.utils.toArray<HTMLElement>(".intro-enter");

      if (reducedMotion) {
        gsap.set([...images, ...foregroundFlowers, ...openingContent, ".opening-frame"], { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          [".intro-backdrop", ".opening-floral-foreground"],
          { scale: 1.14 },
          { scale: 1, duration: 3.4, ease: "power2.out" },
          0,
        )
        .fromTo(images, { autoAlpha: 0, scale: 1.05 }, { autoAlpha: 1, scale: 1, duration: 2.1 }, 0)
        .fromTo(
          foregroundFlowers,
          { autoAlpha: 0, y: 24, filter: "blur(7px)" },
          { autoAlpha: 0.9, y: 0, filter: "blur(0px)", duration: 1.6, stagger: 0.12, clearProps: "filter" },
          "-=2.2",
        )
        .fromTo(".opening-frame", { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 1.3 }, "-=1.4")
        .fromTo(
          ".intro-topline > *, .intro-kicker, .intro-title-line, .opening-trigger, .intro-footer > *",
          { autoAlpha: 0, y: 22, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.12, clearProps: "filter" },
          "-=1.15"
        );
    }, root);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!letterOpened || !introRef.current) return;

    const context = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = reducedMotion ? 0.01 : 0.85;

      gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(".intro-copy", { autoAlpha: 0, y: -24, duration: duration * 0.65 })
        .to(".intro-backdrop", { scale: 1.035, duration }, 0)
        .fromTo(
          ".guest-reveal",
          { autoAlpha: 0, clipPath: "inset(50% 0 50% 0)" },
          { autoAlpha: 1, clipPath: "inset(0% 0 0% 0)", duration: reducedMotion ? 0.01 : 0.9, ease: "power3.inOut" },
          "-=0.22"
        )
        .fromTo(
          ".reveal-overline, .reveal-script, .guest-reveal h2, .reveal-copy, .guest-form label, .guest-form input, .guest-form button, .reveal-date",
          { autoAlpha: 0, y: 18, filter: "blur(6px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: reducedMotion ? 0.01 : 0.62, stagger: reducedMotion ? 0 : 0.075, clearProps: "filter", ease: "power3.out" },
          "-=0.32"
        );
    }, introRef);

    return () => context.revert();
  }, [letterOpened]);

  useEffect(() => {
    if (!isOpening || !introRef.current) return;
    const root = introRef.current;

    const context = gsap.context(() => {
      const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.01 : 0.8;
      gsap.to(root, { autoAlpha: 0, scale: 1.035, duration, ease: "power2.inOut" });
    }, introRef);

    return () => context.revert();
  }, [isOpening]);

  return (
    <main className="opening-screen" ref={introRef}>
      <div className="intro-backdrop" aria-hidden="true">
        <div className="intro-photo intro-photo--groom">
          <img src={febryImage} alt="" fetchPriority="high" />
        </div>
        <div className="intro-photo intro-photo--bride">
          <img src={sashaImage} alt="" fetchPriority="high" />
        </div>
        <div className="intro-shade" />
        <LilyParallax />
      </div>

      <div className="opening-floral-foreground" aria-hidden="true">
        <img className="opening-flower opening-flower--one" src={flowerOne} alt="" />
        <img className="opening-flower opening-flower--two" src={flowerTwo} alt="" />
        <img className="opening-flower opening-flower--three" src={flowerThree} alt="" />
      </div>

      <div className="opening-frame">
        <div className="intro-topline intro-enter">
          <span className="intro-monogram">F<span>&amp;</span>S</span>
          <span className="intro-edition">UNDANGAN PERNIKAHAN <i /> {wedding.dateLabel}</span>
        </div>

        <div className="intro-copy">
          <p className="intro-kicker intro-enter"><img src={lilyImage} alt="" aria-hidden="true" /> you are invited to</p>
          <h1 className="intro-title">
            <span className="intro-title-line intro-title-line--invitation">the wedding of</span>
            <span className="intro-title-line">{couple.groom} <i>&amp;</i></span>
            <span className="intro-title-line intro-title-line--last"><em>{couple.bride}</em></span>
          </h1>
          <button className="opening-trigger intro-enter" type="button" onClick={() => setLetterOpened(true)}>
            <span>Get in</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="intro-footer intro-enter">
          <span>{couple.displayName.toUpperCase()}</span>
          <span>{wedding.venue.toUpperCase()} <i /> {wedding.dateLabel}</span>
        </div>
      </div>

      {letterOpened && (
        <section className="guest-reveal" aria-labelledby="guest-reveal-title">
          <img className="guest-reveal__flower" src={flowerThree} alt="" aria-hidden="true" />
          <span className="reveal-overline">SEBUAH HARI ISTIMEWA</span>
          <p className="script-kicker reveal-script">Dengan bahagia,</p>
          <h2 id="guest-reveal-title">Untuk siapa undangan ini kami siapkan?</h2>
          <p className="reveal-copy">Tuliskan nama Anda agar kami dapat menyapa Anda dengan hangat.</p>
          <GuestNameInput onSubmit={onOpen} />
          <span className="reveal-date">{couple.displayName.toUpperCase()} <i /> {wedding.dateLabel}</span>
        </section>
      )}
    </main>
  );
};
