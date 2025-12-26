import React from "react";
import Navbar from "./Navbar.jsx";
import { albumsData } from "../assets/assets.js";
import AlbumItem from "./AlbumItem.jsx";
import SongItem from "./songItem.jsx";
import { songsData } from "../assets/assets.js";

const displayHome = () => {
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item, index) => (
            <AlbumItem
              key={index}
              image={item.image}
              name={item.name}
              desc={item.desc}
              id={item.id}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto">
          {songsData.map((item, index) => (<SongItem key={index} name={item.name} image={item.image} desc={item.desc} />))}
        </div>
      </div>
    </>
  );
};

export default displayHome;
