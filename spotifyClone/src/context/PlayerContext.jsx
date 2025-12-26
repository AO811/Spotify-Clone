import { useRef, useState, createContext, useEffect } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute:  0,
    },
    totalTime: {
      second:  0,
      minute: 0,
    },
  });

  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = (id) => {
    setTrack(songsData[id]);
    setShouldAutoPlay(true);
  };

  const previous = () => {
    if (track.id > 0) {
      setTrack(songsData[track.id - 1]);
      setShouldAutoPlay(true);
    }
  };

  const next = () => {
    if (track. id < songsData.length - 1) {
      setTrack(songsData[track. id + 1]);
      setShouldAutoPlay(true);
    }
  };

  const seekSong = (e) => {
    audioRef.current. currentTime =
      (e. nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current. duration;
  };

  useEffect(() => {
    if (shouldAutoPlay && audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
      setShouldAutoPlay(false);
    }
  }, [track, shouldAutoPlay]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      // Fix: Only update if audio duration is valid (not NaN) and greater than 0
      if (audio && seekBar.current && audio.duration && ! isNaN(audio.duration) && audio.duration > 0) {
        seekBar.current.style.width =
          Math.floor((audio. currentTime / audio.duration) * 100) + "%";
        setTime({
          currentTime:  {
            second:  Math.floor(audio.currentTime % 60),
            minute:  Math.floor(audio.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audio.duration % 60),
            minute:  Math.floor(audio.duration / 60),
          },
        });
      }
    };

    // Fix: Reset seek bar width on initial load
    if (seekBar. current) {
      seekBar.current.style.width = "0%";
    }

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  // Fix: Reset seek bar when track changes
  useEffect(() => {
    if (seekBar.current) {
      seekBar.current.style.width = "0%";
    }
  }, [track]);

  const ContextValue = {
    audioRef,
    seekBg,
    seekBar,
    setTrack,
    track,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={ContextValue}>
      {props. children}
    </PlayerContext. Provider>
  );
};

export default PlayerContextProvider;