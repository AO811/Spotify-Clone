import { useRef, useState, createContext, useEffect, useCallback } from "react";
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
  const [volume, setVolume] = useState(1);
  const [isShuffle, setIsShuffle] = useState(false);
  const [loop, setLoop] = useState("none");
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const play = useCallback(() => {
    audioRef.current.play();
    setPlayStatus(true);
  }, []);

  const pause = useCallback(() => {
    audioRef.current.pause();
    setPlayStatus(false);
  }, []);

  const playWithId = (id) => {
    setTrack(songsData[id]);
    setShouldAutoPlay(true);
  };

  const getNextTrackIndex = useCallback(() => {
    if (isShuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * songsData.length);
      } while (randomIndex === track.id && songsData.length > 1);
      return randomIndex;
    }
    return track.id < songsData.length - 1 ? track.id + 1 : 0;
  }, [isShuffle, track. id]);

  const getPrevTrackIndex = useCallback(() => {
    if (isShuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math. random() * songsData.length);
      } while (randomIndex === track.id && songsData.length > 1);
      return randomIndex;
    }
    return track.id > 0 ? track.id - 1 : songsData.length - 1;
  }, [isShuffle, track.id]);

  const previous = useCallback(() => {
    const prevIndex = getPrevTrackIndex();
    setTrack(songsData[prevIndex]);
    setShouldAutoPlay(true);
  }, [getPrevTrackIndex]);

  const next = useCallback(() => {
    const nextIndex = getNextTrackIndex();
    setTrack(songsData[nextIndex]);
    setShouldAutoPlay(true);
  }, [getNextTrackIndex]);

  const seekSong = (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const changeVolume = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setVolume(previousVolume);
      audioRef.current.volume = previousVolume;
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume, previousVolume]);

  const toggleShuffle = () => {
    setIsShuffle((prev) => !prev);
  };

  const toggleLoop = () => {
    setLoop((prev) => {
      if (prev === "none") return "all";
      if (prev === "all") return "one";
      return "none";
    });
  };

  const togglePlayPause = useCallback(() => {
    if (playStatus) {
      pause();
    } else {
      play();
    }
  }, [playStatus, play, pause]);

  const toggleFullScreen = useCallback(() => {
    setIsFullScreen((prev) => !prev);
  }, []);

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
      if (
        audio &&
        seekBar.current &&
        audio.duration &&
        ! isNaN(audio.duration) &&
        audio.duration > 0
      ) {
        seekBar.current.style.width =
          Math.floor((audio.currentTime / audio. duration) * 100) + "%";
        setTime({
          currentTime:  {
            second: Math.floor(audio.currentTime % 60),
            minute: Math.floor(audio.currentTime / 60),
          },
          totalTime: {
            second:  Math.floor(audio.duration % 60),
            minute: Math.floor(audio.duration / 60),
          },
        });
      }
    };

    const handleSongEnd = () => {
      if (loop === "one") {
        audio.currentTime = 0;
        audio.play();
      } else if (loop === "all") {
        next();
      } else {
        if (track.id < songsData.length - 1) {
          next();
        } else {
          setPlayStatus(false);
        }
      }
    };

    if (seekBar.current) {
      seekBar.current.style.width = "0%";
    }

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleSongEnd);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleSongEnd);
      }
    };
  }, [loop, track. id, next]);

  useEffect(() => {
    if (seekBar.current) {
      seekBar.current.style.width = "0%";
    }
  }, [track]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current. volume = volume;
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      switch (e.code) {
        case "Space": 
          e.preventDefault();
          togglePlayPause();
          break;
        case "ArrowRight":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft": 
          e.preventDefault();
          previous();
          break;
        case "ArrowUp":
          e.preventDefault();
          const newVolumeUp = Math.min(volume + 0.1, 1);
          setVolume(newVolumeUp);
          audioRef.current.volume = newVolumeUp;
          if (isMuted) setIsMuted(false);
          break;
        case "ArrowDown":
          e.preventDefault();
          const newVolumeDown = Math.max(volume - 0.1, 0);
          setVolume(newVolumeDown);
          audioRef. current.volume = newVolumeDown;
          break;
        case "KeyM":
          e.preventDefault();
          toggleMute();
          break;
        case "KeyF":
          e.preventDefault();
          toggleFullScreen();
          break;
        case "Escape":
          if (isFullScreen) {
            e.preventDefault();
            setIsFullScreen(false);
          }
          break;
        default:
          break;
      }
    };

    window. addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [togglePlayPause, next, previous, volume, isMuted, toggleMute, toggleFullScreen, isFullScreen]);

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
    volume,
    changeVolume,
    isShuffle,
    toggleShuffle,
    loop,
    toggleLoop,
    isMuted,
    toggleMute,
    isFullScreen,
    toggleFullScreen,
  };

  return (
    <PlayerContext.Provider value={ContextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;