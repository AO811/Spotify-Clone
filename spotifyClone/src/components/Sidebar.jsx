import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ThemeContext } from "../context/ThemeContext.jsx";

const Sidebar = () => {
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);

  return (
    <div className="hidden lg:flex lg:flex-col w-[25%] h-full p-2 gap-2">
      <div
        className={`h-[15%] rounded flex flex-col justify-around ${
          isDark ? "bg-[#121212] text-white" : "bg-white text-gray-900"
        }`}
      >
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 pl-8 cursor-pointer"
        >
          <img
            className="w-6"
            src={assets.home_icon}
            alt=""
            style={isDark ? {} : { filter: "invert(1)" }}
          />
          <p className="font-bold">Home</p>
        </div>
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img
            className="w-6"
            src={assets.search_icon}
            alt=""
            style={isDark ? {} : { filter: "invert(1)" }}
          />
          <p className="font-bold">Search</p>
        </div>
      </div>
      <div
        className={`h-[85%] rounded ${
          isDark ? "bg-[#121212] text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              className="w-8"
              src={assets.stack_icon}
              alt=""
              style={isDark ? {} :  { filter: "invert(1)" }}
            />
            <p className="font-semibold">Your library</p>
          </div>
          <div className="flex items-center gap-3">
            <img
              className="w-6"
              src={assets.arrow_icon}
              alt=""
              style={isDark ? {} :  { filter: "invert(1)" }}
            />
            <img
              className="w-6"
              src={assets.plus_icon}
              alt=""
              style={isDark ? {} :  { filter: "invert(1)" }}
            />
          </div>
        </div>
        <div
          className={`p-4 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 ${
            isDark ? "bg-[#242424]" : "bg-gray-100"
          }`}
        >
          <h1>Create your first playlist</h1>
          <p className="font-light">It's easy, we'll help you</p>
          <button
            className={`px-4 py-1. 5 text-[15px] rounded-full mt-4 ${
              isDark
                ? "bg-white text-black"
                : "bg-gray-900 text-white"
            }`}
          >
            Create Playlist
          </button>
        </div>
        <div
          className={`p-4 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 ${
            isDark ? "bg-[#242424]" : "bg-gray-100"
          }`}
        >
          <h1>Let's find some podcast to follow</h1>
          <p className="font-light">We will keep you updated on new episodes</p>
          <button
            className={`px-4 py-1.5 text-[15px] rounded-full mt-4 ${
              isDark
                ? "bg-white text-black"
                :  "bg-gray-900 text-white"
            }`}
          >
            Browse podcasts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;