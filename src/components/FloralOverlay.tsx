import pinkLily from "./images/lili-pink.png";
import roseBouquet from "./images/flower1.png";
import roseVine from "./images/flower2.png";
import whiteRoses from "./images/flower3.png";

type FloralOverlayVariant = "hero" | "countdown" | "details";

const featuredFlowers = {
  hero: roseBouquet,
  countdown: roseVine,
  details: whiteRoses,
};

interface FloralOverlayProps {
  variant: FloralOverlayVariant;
}

export const FloralOverlay = ({ variant }: FloralOverlayProps) => (
  <div className={`floral-overlay floral-overlay--${variant}`} aria-hidden="true">
    <img className="floral-overlay__lily floral-overlay__lily--pink" src={pinkLily} alt="" />
    <img className="floral-overlay__featured" src={featuredFlowers[variant]} alt="" />
  </div>
);
