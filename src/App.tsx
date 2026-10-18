import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FloatingBackground } from "./components/FloatingBackground";
import { MusicButton } from "./components/MusicButton";
import { OpeningScreen } from "./components/OpeningScreen";
import { Invitation } from "./pages/Invitation";
import { useMusic } from "./hooks/useMusic";

export default function App() {
  const [guestName, setGuestName] = useState<string | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const openingTimer = useRef<number | null>(null);
  const music = useMusic();

  useEffect(
    () => () => {
      if (openingTimer.current !== null) {
        window.clearTimeout(openingTimer.current);
      }
    },
    [],
  );

  const openInvitation = (name: string) => {
    void music.startMusic();
    window.scrollTo(0, 0);
    setIsOpening(true);
    if (openingTimer.current !== null) {
      window.clearTimeout(openingTimer.current);
    }
    openingTimer.current = window.setTimeout(() => {
      setGuestName(name);
      setIsOpening(false);
      openingTimer.current = null;
    }, 950);
  };

  return (
    <div className={`app-shell${guestName ? " is-invitation" : ""}`}>
      <FloatingBackground />
      <AnimatePresence mode="wait">
        {guestName ? (
          <Invitation guest={{ name: guestName }} />
        ) : (
          <OpeningScreen key="opening" onOpen={openInvitation} isOpening={isOpening} />
        )}
      </AnimatePresence>
      {guestName && <MusicButton isPlaying={music.isPlaying} onToggle={music.toggleMusic} />}
    </div>
  );
}
