import { motion } from "framer-motion";
import { useCountdown } from "../hooks/useCountdown";
import { FloralOverlay } from "./FloralOverlay";

interface CountdownProps { targetDate: number; }

export const Countdown = ({ targetDate }: CountdownProps) => {
  const countdown = useCountdown(targetDate);
  const units = [
    [countdown.days, "hari"],
    [countdown.hours, "jam"],
    [countdown.minutes, "menit"],
    [countdown.seconds, "detik"],
  ] as const;

  return (
    <div className="countdown-wrap">
      <FloralOverlay variant="countdown" />
      <p className="section-note gsap-scroll-reveal">Menghitung mundur menuju momen istimewa</p>
      {countdown.isComplete ? <p className="countdown-complete">Saatnya tiba! ♡</p> : <div className="countdown-grid">{units.map(([value, label], index) => <motion.div className="countdown-cell" key={label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></motion.div>)}</div>}
    </div>
  );
};
