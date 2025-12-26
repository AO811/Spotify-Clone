import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { PlayerContext } from "../context/PlayerContext.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";

const Player = () => {
  const {
    track,
    seekBg,
    seekBar,
    playStatus,
    play,
    pause,
    time,
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
    toggleFullScreen,
  } = useContext(PlayerContext);

  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`h-[10%] flex justify-between items-center px-4 ${
        isDark ? "bg-black text-white" : "bg-white text-gray-900 border-t border-gray-200"
      }`}
    >
      <div className="hidden lg:flex items-center gap-4">
        <img 
          className="w-12 rounded cursor-pointer" 
          src={track.image} 
          alt="" 
          onClick={toggleFullScreen}
          title="Open Full Screen (F)"
        />
        <div>
          <p className="font-medium">{track.name}</p>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {track.desc. slice(0, 12)}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4 items-center">
          {/* Shuffle Button */}
          <div
            onClick={toggleShuffle}
            className="relative cursor-pointer"
            title={isShuffle ? "Shuffle:  On" : "Shuffle: Off"}
          >
            <img
              className={`w-4 transition-all duration-200 ${
                isShuffle ? "opacity-100" : "opacity-50 hover:opacity-100"
              }`}
              src={assets.shuffle_icon}
              alt="Shuffle"
              style={
                isShuffle
                  ? {
                      filter: 
                        "brightness(0) saturate(100%) invert(74%) sepia(79%) saturate(491%) hue-rotate(85deg) brightness(98%) contrast(87%)",
                    }
                  : isDark
                  ? {}
                  : { filter: "invert(1)" }
              }
            />
            {isShuffle && (
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
            )}
          </div>
          <img
            onClick={previous}
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt="Previous"
            title="Previous (←)"
            style={isDark ? {} : { filter: "invert(1)" }}
          />
          {playStatus ?  (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt="Pause"
              title="Pause (Space)"
              style={isDark ? {} : { filter: "invert(1)" }}
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt="Play"
              title="Play (Space)"
              style={isDark ? {} :  { filter: "invert(1)" }}
            />
          )}
          <img
            onClick={next}
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt="Next"
            title="Next (→)"
            style={isDark ? {} : { filter: "invert(1)" }}
          />
          {/* Loop Button */}
          <div
            onClick={toggleLoop}
            className="relative cursor-pointer flex items-center justify-center"
            title={
              loop === "none"
                ? "Loop: Off"
                : loop === "all"
                ? "Loop: All"
                : "Loop: One"
            }
          >
            <img
              className={`w-4 transition-all duration-200 ${
                loop !== "none" ? "opacity-100" : "opacity-50 hover:opacity-100"
              }`}
              src={assets.loop_icon}
              alt="Loop"
              style={
                loop !== "none"
                  ? {
                      filter: 
                        "brightness(0) saturate(100%) invert(74%) sepia(79%) saturate(491%) hue-rotate(85deg) brightness(98%) contrast(87%)",
                    }
                  : isDark
                  ? {}
                  : { filter: "invert(1)" }
              }
            />
            {loop === "one" && (
              <span className="absolute text-[7px] font-bold text-green-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                1
              </span>
            )}
            {loop !== "none" && (
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5">
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {time.currentTime.minute}:
            {time.currentTime.second. toString().padStart(2, "0")}
          </p>
          <div
            onClick={seekSong}
            ref={seekBg}
            className={`w-[60vw] max-w-[500px] rounded-full cursor-pointer ${
              isDark ? "bg-gray-600" : "bg-gray-300"
            }`}
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-500 rounded-full"
            />
          </div>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {time.totalTime.minute}: 
            {time.totalTime. second.toString().padStart(2, "0")}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        {/* Theme Toggle Button */}
        <div
          onClick={toggleTheme}
          className="cursor-pointer p-1 rounded-full hover:bg-gray-700/30 transition-colors"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-. 707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </div>
        <img className="w-4 cursor-pointer" src={assets.plays_icon} alt="" style={isDark ? {} : { filter: "invert(1)" }} />
        <img className="w-4 cursor-pointer" src={assets.mic_icon} alt="" style={isDark ? {} : { filter: "invert(1)" }} />
        <img className="w-4 cursor-pointer" src={assets. queue_icon} alt="" style={isDark ? {} : { filter: "invert(1)" }} />
        <img className="w-4 cursor-pointer" src={assets. speaker_icon} alt="" style={isDark ? {} : { filter:  "invert(1)" }} />
        {/* Mute/Volume Button */}
        <div
          onClick={toggleMute}
          className="relative cursor-pointer"
          title={isMuted ?  "Unmute (M)" : "Mute (M)"}
        >
          <img
            className={`w-4 transition-all duration-200 ${
              isMuted ? "opacity-50" : "opacity-100"
            }`}
            src={assets.volume_icon}
            alt="Volume"
            style={isDark ? {} : { filter: "invert(1)" }}
          />
          {isMuted && (
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500 transform -rotate-45 -translate-y-1/2"></div>
          )}
        </div>
        {/* Volume Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={changeVolume}
          className="w-20 h-1 rounded cursor-pointer accent-green-500"
          title={`Volume: ${Math.round(volume * 100)}% (↑↓)`}
        />
        {/* Full Screen Button */}
        <div
          onClick={toggleFullScreen}
          className="cursor-pointer p-1 rounded-full hover:bg-gray-700/30 transition-colors"
          title="Full Screen (F)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </div>
        <img className="w-4 cursor-pointer" src={assets.zoom_icon} alt="" style={isDark ? {} : { filter: "invert(1)" }} />
      </div>
    </div>
  );
};

export default Player;