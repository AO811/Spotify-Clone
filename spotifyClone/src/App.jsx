import React, { useContext } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Player from "./components/Player.jsx";
import Display from "./components/Display.jsx";
import FullScreenPlayer from "./components/FullScreenPlayer.jsx";
import { PlayerContext } from "./context/PlayerContext.jsx";
import { ThemeContext } from "./context/ThemeContext.jsx";

const App = () => {
  const { audioRef, track, isFullScreen } = useContext(PlayerContext);
  const { isDark } = useContext(ThemeContext);

  return (
    <div className={`h-screen ${isDark ? "bg-black" : "bg-gray-100"}`}>
      {isFullScreen ? (
        <FullScreenPlayer />
      ) : (
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      )}
      <audio ref={audioRef} src={track.file} preload="auto"></audio>
    </div>
  );
};

export default App;