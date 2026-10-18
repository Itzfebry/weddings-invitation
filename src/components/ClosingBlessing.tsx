import { motion } from "framer-motion";
import type { Guest } from "../types/invitation";
import flowerThree from "./images/flower3.png";
import { couple, wedding } from "../data/wedding";

interface ClosingBlessingProps {
  guest: Guest;
}

export const ClosingBlessing = ({ guest }: ClosingBlessingProps) => (
  <section className="closing-section section-shell" id="closing" aria-labelledby="closing-title">
    <motion.article
      className="closing-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <img className="closing-flower" src={flowerThree} alt="" aria-hidden="true" />
      <span className="closing-overline">DARI HATI KAMI</span>
      <h2 id="closing-title">Dengan hangat, kami menantikan kehadiran Anda</h2>
      <p className="closing-greeting">Untuk {guest.name},</p>
      <p className="closing-message">
        Terima kasih telah menjadi bagian dari cerita dan kebahagiaan kami. Kehadiran Anda
        akan membuat hari istimewa ini terasa semakin berarti.
      </p>
      <span className="closing-divider" aria-hidden="true"><i /><span /><i /></span>
      <p className="closing-prayer">
        Semoga kasih dan sukacita senantiasa menyertai langkah kita, dan semoga rumah
        tangga yang kami bangun tumbuh dalam kelembutan, ketulusan, serta saling menguatkan.
      </p>
      <p className="closing-signoff">Sampai bertemu di hari bahagia</p>
      <p className="closing-couple">{couple.groom} <span>&amp;</span> {couple.bride}</p>
      <span className="closing-date">{wedding.dateLabel} <i /> {wedding.venue.toUpperCase()}</span>
    </motion.article>
    <footer className="site-footer">© 2026 Mochammad Ginata Febryansyah</footer>
  </section>
);
