import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Banner = ({ places }) => {
  const [randomPlace, setRandomPlace] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (places.length > 0 && !randomPlace) {
      const randomIndex = Math.floor(Math.random() * places.length);
      setRandomPlace(places[randomIndex]);
    }
  }, [places, randomPlace]);

  const handleCaptionClick = () => {
    if (randomPlace) {
      navigate(`/locations?search=${randomPlace.name}`);
    }
  };

  return (
    randomPlace && (
      <div className="banner">
        <img src={randomPlace.image} alt={randomPlace.name} />
        <div className="banner-caption" onClick={handleCaptionClick}>
          <h2>{randomPlace.name}</h2>
        </div>
      </div>
    )
  );
};

export default Banner;
<s></s>;
