import React, { useEffect, useState } from "react";
import { MainSubtitleText, MainTitleText } from "ui/texts";
import { SendButton } from "ui/buttons";
import { useNavigate } from "react-router-dom";
import css from "./index.css";

type geolocType = {
  lat: string;
  lng: string;
};

function Home() {
  const [geoloc, setGeoloc] = useState<geolocType>({ lat: "", lng: "" });
  const navigate = useNavigate();

  function handleClick() {
    navigator.geolocation.getCurrentPosition(async (geo) => {
      const { latitude, longitude } = geo.coords;
      const latString = latitude.toString();
      const lngString = longitude.toString();
      const newGeoloc: geolocType = { lat: latString, lng: lngString };
      setGeoloc(newGeoloc);
    });
  }

  useEffect(() => {
    if (geoloc.lat !== "" || geoloc.lng !== "") {
      navigate(`/pets/search/lat=${geoloc.lat}&lng=${geoloc.lng}`);
    }
  }, [geoloc]);

  return (
    <div className={css.container}>
      <div className={css.textContainer}>
        <MainTitleText>¡Bienvenido/a al buscador de mascotas!</MainTitleText>
        <MainSubtitleText>Para ver las mascotas perdidas cerca tuyo, presioná el botón.</MainSubtitleText>
      </div>
      <SendButton onClick={handleClick}>Buscar Mascotas</SendButton>
    </div>
  );
}

export { Home };
