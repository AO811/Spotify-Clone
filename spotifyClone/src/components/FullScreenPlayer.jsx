import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { assets } from "../assets/assets.js";

const FullScreenPlayer = () => {
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

  const { isDark } = useContext(ThemeContext);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-b from-gray-900 via-black to-black text-white"
          : "bg-gradient-to-b from-gray-100 via-white to-white text-gray-900"
      }`}
    >
      {/* Close Button */}
      <button
        onClick={toggleFullScreen}
        className={`absolute top-6 right-6 p-2 rounded-full transition-all duration-200 ${
          isDark ?  "hover:bg-white/10" : "hover:bg-black/10"
        }`}
        title="Close (Esc)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Album Art */}
      <div className="mb-8 shadow-2xl">
        <img
          src={track.image}
          alt={track.name}
          className="w-72 h-72 md:w-96 md:h-96 rounded-lg object-cover"
        />
      </div>

      {/* Song Info */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{track.name}</h1>
        <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {track.desc}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xl px-8 mb-6">
        <div
          onClick={seekSong}
          ref={seekBg}
          className={`w-full h-2 rounded-full cursor-pointer ${
            isDark ? "bg-gray-600" : "bg-gray-300"
          }`}
        >
          <div
            ref={seekBar}
            className="h-2 bg-green-500 rounded-full w-0"
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>
            {time.currentTime.minute}: 
            {time.currentTime. second.toString().padStart(2, "0")}
          </span>
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>
            {time. totalTime.minute}:
            {time.totalTime.second. toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8">
        {/* Shuffle */}
        <div
          onClick={toggleShuffle}
          className="relative cursor-pointer"
          title={isShuffle ? "Shuffle:  On" : "Shuffle: Off"}
        >
          <img
            className={`w-6 transition-all duration-200 ${
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
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1. 5 h-1.5 bg-green-500 rounded-full"></span>
          )}
        </div>

        {/* Previous */}
        <img
          onClick={previous}
          className="w-8 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          src={assets.prev_icon}
          alt="Previous"
          style={isDark ? {} : { filter: "invert(1)" }}
        />

        {/* Play/Pause */}
        <div
          onClick={playStatus ? pause : play}
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        >
          {playStatus ? (
            <img className="w-6" src={assets.pause_icon} alt="Pause" style={{ filter: "invert(1)" }} />
          ) : (
            <img className="w-6 ml-1" src={assets.play_icon} alt="Play" style={{ filter: "invert(1)" }} />
          )}
        </div>

        {/* Next */}
        <img
          onClick={next}
          className="w-8 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          src={assets.next_icon}
          alt="Next"
          style={isDark ? {} : { filter: "invert(1)" }}
        />

        {/* Loop */}
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
            className={`w-6 transition-all duration-200 ${
              loop !== "none" ? "opacity-100" : "opacity-50 hover:opacity-100"
            }`}
            src={assets.loop_icon}
            alt="Loop"
            style={
              loop !== "none"
                ?  {
                    filter:
                      "brightness(0) saturate(100%) invert(74%) sepia(79%) saturate(491%) hue-rotate(85deg) brightness(98%) contrast(87%)",
                  }
                : isDark
                ? {}
                : { filter: "invert(1)" }
            }
          />
          {loop === "one" && (
            <span className="absolute text-[9px] font-bold text-green-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              1
            </span>
          )}
          {loop !== "none" && (
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          )}
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3 mt-8">
        <div
          onClick={toggleMute}
          className="relative cursor-pointer"
          title={isMuted ? "Unmute (M)" : "Mute (M)"}
        >
          <img
            className={`w-5 transition-all duration-200 ${
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
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={changeVolume}
          className="w-32 h-1 rounded cursor-pointer accent-green-500"
        />
      </div>

      {/* Keyboard Shortcut Hint */}
      <p className={`absolute bottom-6 text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
        Press <kbd className="px-2 py-1 rounded bg-gray-700 text-gray-300 text-xs">Esc</kbd> to close or{" "}
        <kbd className="px-2 py-1 rounded bg-gray-700 text-gray-300 text-xs">F</kbd> to toggle
      </p>
    </div>
  );
};

export default FullScreenPlayer;