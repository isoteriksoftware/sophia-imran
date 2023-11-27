"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

const BGMPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioStarted, setAudioStarted] = useState(false);

  const handleUserInteraction = useCallback(() => {
    if (!audioStarted && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setAudioStarted(true))
        .catch((error) => console.error("Audio playback failed:", error));
    }
  }, [audioStarted]);

  useEffect(() => {
    window.addEventListener("click", handleUserInteraction);
    return () => {
      window.removeEventListener("click", handleUserInteraction);
    };
  }, [audioStarted, handleUserInteraction]);

  return (
    <div>
      <audio
        ref={audioRef}
        src="./audio/bgm.mp3"
        loop
        style={{ display: "none" }}
      />
    </div>
  );
};

export default BGMPlayer;
