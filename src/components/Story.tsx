import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { story } from "../data/wedding";
import lilyImage from "./images/lili-pink.png";
import roseBouquet from "./images/flower1.png";
import roseVine from "./images/flower2.png";
import { WeddingMotifs } from "./WeddingMotifs";

const chapterMotifs = [roseBouquet, lilyImage, roseVine];

export const Story = () => {
  const storyRef = useRef<HTMLElement>(null);
  const storyStageRef = useRef<HTMLDivElement>(null);
  const [flowerY, setFlowerY] = useState(0);
  const [progressHeight, setProgressHeight] = useState("8%");

  useEffect(() => {
    let animationFrame = 0;

    const updateScrollState = () => {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        const section = storyRef.current;
        if (!section) return;

        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = section.offsetHeight;
        const viewportHeight = window.innerHeight;
        const travelRange = Math.max((storyStageRef.current?.offsetHeight ?? 620) - 120, 260);
        const maxProgressDistance = Math.max(sectionHeight - viewportHeight, 1);
        const progress = Math.min(Math.max((window.scrollY - sectionTop) / maxProgressDistance, 0), 1);

        setFlowerY(progress * travelRange);
        setProgressHeight(`${8 + progress * 84}%`);
      });
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  return (
    <section className="story-page" ref={storyRef}>
      <div className="story-sticky">
        <div className="story-heading gsap-scroll-reveal">
          <span className="tiny-label">{story.eyebrow}</span>
          <h1>{story.heading}</h1>
        </div>
        <motion.div className="story-chapter-stage" ref={storyStageRef}>
          <WeddingMotifs variant="story" />
          <div className="story-rail" aria-hidden="true" />
          <motion.div
            className="story-progress"
            style={{ height: progressHeight }}
            aria-hidden="true"
          />
          <motion.div
            className="story-scroll-flower-wrap"
            animate={{ y: flowerY, rotate: flowerY * 0.012 }}
            transition={{ type: "spring", stiffness: 120, damping: 34, mass: 0.9 }}
            aria-hidden="true"
          >
            <img className="story-scroll-flower" src={lilyImage} alt="" />
          </motion.div>
          {story.chapters.map((chapter, index) => {
            const chapterMotif = chapterMotifs[index];
            return (
              <motion.article
                className={`story-chapter story-chapter-${index + 1}`}
                key={chapter.number}
                initial={{ opacity: 0, y: 32, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.5 }}
                transition={{ delay: index * 0.12, duration: 0.7, ease: "easeOut" }}
              >
                <span className="story-bloom" aria-hidden="true" />
                <span className="chapter-number">{chapter.number}</span>
                <h2>{chapter.title}</h2>
                {chapter.subtitle && <span className="chapter-subtitle">{chapter.subtitle}</span>}
                <p>{chapter.text}</p>
                <span className="chapter-mark" aria-hidden="true">
                  {chapterMotif && <img src={chapterMotif} alt="" />}
                </span>
              </motion.article>
            );
          })}
        </motion.div>
        <p className="story-caption">pelan-pelan, sampai di hari ini</p>
      </div>
    </section>
  );
};