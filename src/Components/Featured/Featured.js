import React from "react";
import './featured.css';
import motorsport from "../../img/motorsport-migos-nickiminaj-cardib.png";
import Track from "../Track/Track";

const Featured = () => {
  return (
    <div className="Featured-wrap">
      <div className="number-one-track">
          <img className="number-one-track-img" src={motorsport} alt="" />
          <h4>Motorsport</h4>
          <h6>Migos, Nicki Minaj, Cardi B</h6>
      </div>
      <div className="featured-tracks"></div>
    </div>
  );
};

export default Featured;
