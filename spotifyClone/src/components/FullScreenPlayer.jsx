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
      className={`fixed inset-0 z-50 flex flex-col transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-black text-white"
          : "bg-gradient-to-b from-[#e8e8e8] via-[#f5f5f5] to-white text-gray-900"
      }`}
    >
      {/* Close Button - Top Right */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <button
          onClick={toggleFullScreen}
          className={`p-3 rounded-full transition-all duration-200 ${
            isDark ? "hover:bg-white/10 text-white" : "hover:bg-black/10 text-gray-700"
          }`}
          title="Close (Esc)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-8 md: w-8"
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
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8">
        {/* Album Art with Shadow */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-2xl">
          <img
            src={track.image}
            alt={track.name}
            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover"
          />
        </div>

        {/* Song Info */}
        <div className="text-center mb-6 max-w-md">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 truncate">
            {track.name}
          </h1>
          <p className={`text-sm md:text-base lg:text-lg ${isDark ?  "text-gray-400" : "text-gray-600"}`}>
            {track.desc}
          </p>
        </div>

        {/* Progress Bar - Original Logic with Refs */}
        <div className="w-full max-w-md md:max-w-lg lg: max-w-xl px-4 mb-6">
          <div
            onClick={seekSong}
            ref={seekBg}
            className={`w-full h-1. 5 rounded-full cursor-pointer ${
              isDark ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            <hr
              ref={seekBar}
              className="h-1.5 border-none w-0 bg-green-500 rounded-full"
            />
          </div>
          <div className="flex justify-between mt-2 text-xs md:text-sm">
            <span className={isDark ? "text-gray-400" : "text-gray-600"}>
              {time.currentTime. minute}: 
              {time.currentTime. second. toString().padStart(2, "0")}
            </span>
            <span className={isDark ? "text-gray-400" : "text-gray-600"}>
              {time.totalTime.minute}:
              {time.totalTime.second.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-6 md:gap-8 mb-8">
          {/* Shuffle */}
          <button
            onClick={toggleShuffle}
            className={`relative p-2 rounded-full transition-all duration-200 ${
              isDark ? "hover:bg-white/10" : "hover:bg-black/10"
            }`}
            title={isShuffle ? "Shuffle:  On" : "Shuffle: Off"}
          >
            <img
              className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-200 ${
                isShuffle ? "opacity-100" : "opacity-50"
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
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
            )}
          </button>

          {/* Previous */}
          <button
            onClick={previous}
            className={`p-2 rounded-full transition-all duration-200 ${
              isDark ? "hover:bg-white/10" : "hover: bg-black/10"
            }`}
            title="Previous (←)"
          >
            <img
              className="w-6 h-6 md:w-8 md:h-8 opacity-80 hover:opacity-100 transition-opacity"
              src={assets.prev_icon}
              alt="Previous"
              style={isDark ? {} : { filter: "invert(1)" }}
            />
          </button>

          {/* Play/Pause - Large Center Button */}
          <button
            onClick={playStatus ?  pause : play}
            className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform shadow-lg"
            title={playStatus ? "Pause (Space)" : "Play (Space)"}
          >
            {playStatus ?  (
              <img
                className="w-5 md:w-6 lg:w-7"
                src={assets.pause_icon}
                alt="Pause"
                style={{ filter: "invert(1)" }}
              />
            ) : (
              <img
                className="w-5 md:w-6 lg:w-7 ml-1"
                src={assets.play_icon}
                alt="Play"
                style={{ filter: "invert(1)" }}
              />
            )}
          </button>

          {/* Next */}
          <button
            onClick={next}
            className={`p-2 rounded-full transition-all duration-200 ${
              isDark ? "hover:bg-white/10" : "hover: bg-black/10"
            }`}
            title="Next (→)"
          >
            <img
              className="w-6 h-6 md: w-8 md:h-8 opacity-80 hover: opacity-100 transition-opacity"
              src={assets.next_icon}
              alt="Next"
              style={isDark ? {} : { filter: "invert(1)" }}
            />
          </button>

          {/* Loop */}
          <button
            onClick={toggleLoop}
            className={`relative p-2 rounded-full transition-all duration-200 ${
              isDark ? "hover:bg-white/10" : "hover:bg-black/10"
            }`}
            title={
              loop === "none"
                ? "Loop: Off"
                : loop === "all"
                ? "Loop: All"
                : "Loop: One"
            }
          >
            <img
              className={`w-5 h-5 md:w-6 md: h-6 transition-all duration-200 ${
                loop !== "none" ? "opacity-100" : "opacity-50"
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
              <span className="absolute text-[8px] font-bold text-green-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[1px]">
                1
              </span>
            )}
            {loop !== "none" && (
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Volume Control - Restored */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className={`relative p-2 rounded-full transition-all duration-200 ${
              isDark ? "hover:bg-white/10" : "hover:bg-black/10"
            }`}
            title={isMuted ? "Unmute (M)" : "Mute (M)"}
          >
            <img
              className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-200 ${
                isMuted ? "opacity-50" : "opacity-100"
              }`}
              src={assets.volume_icon}
              alt="Volume"
              style={isDark ? {} : { filter: "invert(1)" }}
            />
            {isMuted && (
              <div className="absolute top-1/2 left-1/2 w-5 h-0.5 bg-red-500 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={changeVolume}
            className="w-24 md:w-32 h-1 rounded cursor-pointer accent-green-500"
            title={`Volume: ${Math.round(volume * 100)}%`}
          />
        </div>
      </div>

      {/* Keyboard Hints - Bottom */}
      <div className="pb-6 text-center">
        <p className={`text-xs md:text-sm ${isDark ? "text-gray-600" : "text-gray-400"}`}>
          <kbd className={`px-2 py-1 rounded text-xs ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-600"}`}>
            Space
          </kbd>
          {" "}Play/Pause{" · "}
          <kbd className={`px-2 py-1 rounded text-xs ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-600"}`}>
            ←
          </kbd>
          <kbd className={`px-2 py-1 rounded text-xs ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-600"}`}>
            →
          </kbd>
          {" "}Prev/Next{" · "}
          <kbd className={`px-2 py-1 rounded text-xs ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-600"}`}>
            Esc
          </kbd>
          {" "}Close
        </p>
      </div>
    </div>
  );
};

export default FullScreenPlayer;