import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { PlayerContext } from "../context/PlayerContext.jsx";

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
  } = useContext(PlayerContext);

  // Get volume icon based on volume level
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return assets.volume_icon; // You can use a muted icon if available
    }
    return assets. volume_icon;
  };

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track. image} alt="" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc. slice(0, 12)}</p>
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
                isShuffle ?  "opacity-100" : "opacity-50 hover:opacity-100"
              }`}
              src={assets.shuffle_icon}
              alt="Shuffle"
              style={isShuffle ? { filter:  "brightness(0) saturate(100%) invert(74%) sepia(79%) saturate(491%) hue-rotate(85deg) brightness(98%) contrast(87%)" } : {}}
            />
            {isShuffle && (
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
            )}
          </div>
          <img
            onClick={previous}
            className="w-4 cursor-pointer"
            src={assets. prev_icon}
            alt="Previous"
            title="Previous (←)"
          />
          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt="Pause"
              title="Pause (Space)"
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt="Play"
              title="Play (Space)"
            />
          )}
          <img
            onClick={next}
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt="Next"
            title="Next (→)"
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
              style={loop !== "none" ? { filter: "brightness(0) saturate(100%) invert(74%) sepia(79%) saturate(491%) hue-rotate(85deg) brightness(98%) contrast(87%)" } : {}}
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
          <p>
            {time.currentTime.minute}: 
            {time.currentTime. second.toString().padStart(2, "0")}
          </p>
          <div
            onClick={seekSong}
            ref={seekBg}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-500 rounded-full"
            />
          </div>
          <p>
            {time. totalTime.minute}:
            {time.totalTime.second. toString().padStart(2, "0")}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4 cursor-pointer" src={assets.plays_icon} alt="" />
        <img className="w-4 cursor-pointer" src={assets. mic_icon} alt="" />
        <img className="w-4 cursor-pointer" src={assets. queue_icon} alt="" />
        <img className="w-4 cursor-pointer" src={assets. speaker_icon} alt="" />
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
            src={getVolumeIcon()}
            alt="Volume"
          />
          {/* Strike-through line when muted */}
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
        <img
          className="w-4 cursor-pointer"
          src={assets.mini_player_icon}
          alt=""
        />
        <img className="w-4 cursor-pointer" src={assets.zoom_icon} alt="" />
      </div>
    </div>
  );
};

export default Player;