import css from "./index.css";
import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { TextField } from "ui/text-field";
import { useSetLastPetToCreate } from "hooks";
import { ParagraphText } from "ui/texts";

export const mapboxToken = "pk.eyJ1IjoibHVjYXNjYWx2ZXR0aSIsImEiOiJja3lzYjFqbjAwMjZ2MnhwZHIxajNlMmo1In0.4HJSt33L3PDqtBmx5EopMQ";

mapboxgl.accessToken = mapboxToken;

type props = {
  lat?: number;
  lng?: number;
  location?: string;
};

export function Mapping(props?: props) {
  const [loc, setLoc] = useState(props.location ? props.location : "Obelisco");
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lngLat, setLngLat] = useState(props.lat && props.lng ? { lng: props.lng, lat: props.lat } : { lng: -58.38169020669707, lat: -34.60378077673 });
  const [zoom, setZoom] = useState(14);
  const setPet = useSetLastPetToCreate();
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: lngLat,
      zoom: zoom,
    });
  }, [mapContainer]);

  useEffect(() => {
    if (lngLat.lat != -34.60378077673 && lngLat.lng != -58.38169020669707 && loc != null) {
      setPet((previusPetData) => ({ ...previusPetData, location: loc, lat: lngLat.lat, lng: lngLat.lng }));
    }
  }, [loc, lngLat]);

  async function searchLocation() {
    const { features } = await (await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc}.json?access_token=${mapboxToken}`)).json();
    if (!map.current) return;
    await map.current.flyTo({ center: [features[0].geometry.coordinates[0], features[0].geometry.coordinates[1]], zoom: 15, speed: 0.8, curve: 2 });
    return { lng: features[0].geometry.coordinates[0], lat: features[0].geometry.coordinates[1] };
  }

  async function handleClick(e) {
    e.preventDefault();
    const lngLatFromApiMapbox = await searchLocation();
    setLngLat(lngLatFromApiMapbox);
  }

  return (
    <div className={css.container}>
      <link href="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css" rel="stylesheet" />
      <div ref={mapContainer} className={css["map-container"]} />
      <ParagraphText>¿Por qué zona se perdió?</ParagraphText>
      <TextField name="location" onChange={(event) => setLoc(event.target.value)} type="text" placeholder={"Barrio, ciudad, estación..."} children={props.location ? props.location : ""} />
      <div onClick={handleClick} className={css["div-button"]}>
        <ParagraphText>Marcar Ubicación </ParagraphText>
      </div>
    </div>
  );
}
