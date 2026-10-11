import { motion } from "framer-motion";
import maldivesImage from "./images/Maldives.jpg";
import type { EventDetails as EventDetailsType } from "../types/invitation";
import { FloralOverlay } from "./FloralOverlay";

interface EventDetailsProps { details: EventDetailsType; }

export const EventDetails = ({ details }: EventDetailsProps) => {
  const cards = [
    { label: "TANGGAL", value: details.date },
    { label: "WAKTU", value: details.time },
    { label: "LOKASI", value: details.location },
    { label: "ALAMAT", value: details.address },
  ];

  return (
    <section className="details-section section-shell" id="details">
      <FloralOverlay variant="details" />
      <div className="section-heading gsap-scroll-reveal">
        <span className="tiny-label">KAPAN & DI MANA</span>
        <h2>Simpan tanggal</h2>
        <p>Kami berharap dapat merayakannya bersama Anda.</p>
      </div>

      <div className="details-showcase">
        <motion.div
          className="details-visual"
          initial={{ scale: 0.985 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img className="gsap-scroll-visual" src={maldivesImage} alt="Four Seasons Resort Maldives" />
          <div className="details-badge">
            <span>Four Seasons Resort</span>
            <strong>Maldives</strong>
          </div>
        </motion.div>
      </div>

      <div className="details-grid">
        {cards.map(({ label, value }, index) => (
          <motion.article
            className="detail-card"
            key={label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -5 }}
          >
            <div>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
