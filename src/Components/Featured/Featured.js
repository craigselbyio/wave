import React from "react";
import "./featured.css";
import motorsport from "../../img/motorsport-migos-nickiminaj-cardib.png";
import Track from "../Track/Track";

const Featured = () => {
  return (
    <div className="featured-wrap">
      <div className="number-one-track">
        <img className="number-one-track-img" src={motorsport} alt="" />
        <h2 className="number-one-track-title">Motorsport</h2>
        <h4 className="number-one-track-artist">Migos, Nicki Minaj, Cardi B</h4>
      </div>
      <div className="featured-tracks">
        <Track trackType={"small"} />
        <Track trackType={"small"} />
        <Track trackType={"small"} />
        <Track trackType={"small"} />
      </div>
    </div>
  );
};

export default Featured;
