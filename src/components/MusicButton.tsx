interface MusicButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicButton = ({ isPlaying, onToggle }: MusicButtonProps) => (
  <button
    className={`music-button ${isPlaying ? "is-playing" : ""}`}
    type="button"
    onClick={onToggle}
    aria-label={isPlaying ? "Matikan musik" : "Nyalakan musik"}
    title={isPlaying ? "Matikan musik" : "Nyalakan musik"}
  >
    <svg className="music-button-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  </button>
);
