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
      second: 0,
      minute: 0,
    },
  });

  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  // New states for Volume, Shuffle, and Loop
  const [volume, setVolume] = useState(1); // 0 to 1
  const [isShuffle, setIsShuffle] = useState(false);
  const [loop, setLoop] = useState("none"); // "none", "all", "one"

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current. pause();
    setPlayStatus(false);
  };

  const playWithId = (id) => {
    setTrack(songsData[id]);
    setShouldAutoPlay(true);
  };

  // Get next track index based on shuffle mode
  const getNextTrackIndex = () => {
    if (isShuffle) {
      // Get random index excluding current track
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * songsData.length);
      } while (randomIndex === track.id && songsData.length > 1);
      return randomIndex;
    }
    return track.id < songsData.length - 1 ? track.id + 1 : 0;
  };

  // Get previous track index based on shuffle mode
  const getPrevTrackIndex = () => {
    if (isShuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * songsData.length);
      } while (randomIndex === track.id && songsData.length > 1);
      return randomIndex;
    }
    return track.id > 0 ? track.id - 1 : songsData. length - 1;
  };

  const previous = () => {
    const prevIndex = getPrevTrackIndex();
    setTrack(songsData[prevIndex]);
    setShouldAutoPlay(true);
  };

  const next = () => {
    const nextIndex = getNextTrackIndex();
    setTrack(songsData[nextIndex]);
    setShouldAutoPlay(true);
  };

  const seekSong = (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  // Volume control function
  const changeVolume = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  // Toggle shuffle mode
  const toggleShuffle = () => {
    setIsShuffle((prev) => !prev);
  };

  // Cycle through loop modes:  none -> all -> one -> none
  const toggleLoop = () => {
    setLoop((prev) => {
      if (prev === "none") return "all";
      if (prev === "all") return "one";
      return "none";
    });
  };

  useEffect(() => {
    if (shouldAutoPlay && audioRef.current) {
      audioRef.current. play();
      setPlayStatus(true);
      setShouldAutoPlay(false);
    }
  }, [track, shouldAutoPlay]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio && seekBar.current && audio.duration && ! isNaN(audio.duration) && audio.duration > 0) {
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

    // Handle song ended event for loop functionality
    const handleSongEnd = () => {
      if (loop === "one") {
        // Repeat current song
        audio.currentTime = 0;
        audio.play();
      } else if (loop === "all") {
        // Play next song (will loop back to first song)
        next();
      } else {
        // No loop - play next if available, otherwise stop
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
  }, [loop, track. id]);

  useEffect(() => {
    if (seekBar.current) {
      seekBar.current.style. width = "0%";
    }
  }, [track]);

  // Set initial volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current. volume = volume;
    }
  }, []);

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
    // New exports
    volume,
    changeVolume,
    isShuffle,
    toggleShuffle,
    loop,
    toggleLoop,
  };

  return (
    <PlayerContext.Provider value={ContextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;