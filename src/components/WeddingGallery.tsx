import ImageGallery, { type GalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { WeddingMotifs } from "./WeddingMotifs";
import portraitOne from "./images/potret1.png";
import portraitTwo from "./images/potret2.png";
import { couple } from "../data/wedding";

const images: GalleryItem[] = [
  {
    original: portraitOne,
    thumbnail: portraitOne,
    originalAlt: "Potret perjalanan Febry dan Sasha pertama",
    thumbnailAlt: "Potret perjalanan pertama",
    originalClass: "wedding-gallery-portrait",
  },
  {
    original: portraitTwo,
    thumbnail: portraitTwo,
    originalAlt: "Potret perjalanan Febry dan Sasha kedua",
    thumbnailAlt: "Potret perjalanan kedua",
    originalClass: "wedding-gallery-portrait",
  },
];

export const WeddingGallery = () => (
  <section className="wedding-gallery-section section-shell" aria-labelledby="wedding-gallery-title">
    <WeddingMotifs variant="gallery" />
    <header className="gallery-heading gsap-scroll-reveal">
      <span className="tiny-label">ALBUM {couple.displayName.toUpperCase()}</span>
      <h2 id="wedding-gallery-title">Potret perjalanan kami</h2>
      <p>Dua potret, banyak cerita</p>
    </header>
    <ImageGallery
      additionalClass="wedding-gallery"
      items={images}
      showFullscreenButton={false}
      showPlayButton={false}
      showThumbnails
      showNav
      lazyLoad
      useBrowserFullscreen={false}
      renderLeftNav={(onClick, disabled) => (
        <button
          className="image-gallery-icon wedding-gallery-nav wedding-gallery-nav--previous"
          type="button"
          onClick={onClick}
          disabled={disabled}
          aria-label="Foto sebelumnya"
        >
          <span aria-hidden="true">‹</span>
        </button>
      )}
      renderRightNav={(onClick, disabled) => (
        <button
          className="image-gallery-icon wedding-gallery-nav wedding-gallery-nav--next"
          type="button"
          onClick={onClick}
          disabled={disabled}
          aria-label="Foto berikutnya"
        >
          <span aria-hidden="true">›</span>
        </button>
      )}
    />
  </section>
);
