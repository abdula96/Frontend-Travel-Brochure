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

  const getImageUrl = (place) => {
    // If the image path starts with '/', consider it a public image
    if (place.image.startsWith("/")) {
      return place.image;
    }
    // Otherwise, it's an uploaded image
    return `http://localhost:5000/${place.image}`;
  };

  return (
    randomPlace && (
      <div className="banner">
        <img src={getImageUrl(randomPlace)} alt={randomPlace.name} />
        <div className="banner-caption" onClick={handleCaptionClick}>
          <h2>{randomPlace.name}</h2>
        </div>
      </div>
    )
  );
};

export default Banner;
