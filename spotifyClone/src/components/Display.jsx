import React, { useRef, useEffect, useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome.jsx";
import DisplayAlbum from "./DisplayAlbum.jsx";
import { albumsData } from "../assets/assets.js";
import { ThemeContext } from "../context/ThemeContext.jsx";

const Display = () => {
  const displayRef = useRef(null);
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : null;
  const bgColor =
    isAlbum && albumId !== null && albumsData[Number(albumId)]
      ? albumsData[Number(albumId)].bgColor
      : null;

  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    if (isAlbum && albumsData[Number(albumId)]) {
      displayRef.current. style.background = `linear-gradient(${bgColor}, ${
        isDark ? "#121212" : "#f3f4f6"
      })`;
    } else {
      displayRef.current.style.background = isDark ? "#121212" : "#f3f4f6";
    }
  }, [isAlbum, albumId, bgColor, isDark]);

  return (
    <div
      ref={displayRef}
      className={`w-full m-2 px-6 pt-4 rounded overflow-auto lg:w-[75%] lg:ml-0 ${
        isDark ? "text-white" : "text-gray-900"
      }`}
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;