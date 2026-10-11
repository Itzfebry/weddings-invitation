import lilyImage from "./images/lili-pink.png";
import lilySecondImage from "./images/lili2.png";
import roseBouquet from "./images/flower1.png";
import roseVine from "./images/flower2.png";
import whiteRoses from "./images/flower3.png";

const storyMotifs = [roseBouquet, roseVine, lilyImage, whiteRoses, lilySecondImage];
const galleryMotifs = [whiteRoses, lilySecondImage, roseBouquet, roseVine, lilyImage];

interface WeddingMotifsProps {
  variant: "story" | "gallery";
}

export const WeddingMotifs = ({ variant }: WeddingMotifsProps) => {
  const motifs = variant === "story" ? storyMotifs : galleryMotifs;

  return (
    <div className={`wedding-motifs wedding-motifs--${variant}`} aria-hidden="true">
      {motifs.map((src, index) => (
        <span className={`wedding-motif wedding-motif--${index + 1}`} key={`${variant}-${index}`}>
          <img src={src} alt="" />
        </span>
      ))}
    </div>
  );
};
