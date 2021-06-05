import Header from "../components/Header";
import { Location } from "../types/types";

import Head from "next/head";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState, useCallback, useEffect } from "react";

const containerStyle = {
  height: "100%",
  width: "100%",
};

const mapOptions = {
  gestureHandling: "none",
  scrollwheel: false,
  disableDefaultUI: true,
};

export default function Partners() {
  // begin: Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCu5Vh4v5aQLJBSHVxzWeAOWHdy0_8pJaM",
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    var bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(27.82, -124.39),
      new google.maps.LatLng(49.38, -66.94)
    );
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(_) {
    setMap(null);
  }, []);
  // end: Google Maps

  // begin: Venues
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/venues/listall")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setLocations(
          json.map((location: Location, index: number) => {
            return { ...location, index: index };
          })
        );
      });
  }, []);
  // end: Venues

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Contact Us - Pod Plug</title>
      </Head>
      {/* Header */}
      <Header current="/partners" />

      {/* First page */}
      <main className="outer-container flex flex-col items-center">
        <div className="page flex flex-row items-center container">
          <div className="flex flex-col font-raleway text-center">
            <div className="text-8xl font-bold text-title-blue-dark">
              Partner with us
            </div>
            <div className="text-3xl font-semibold text-title-blue-light mt-6">
              <div>Convenience when out</div>
              <div>Providing a WOW experience</div>
            </div>
          </div>
        </div>

        {/* Second page: Map */}
        <div className="page">
          {isLoaded && (
            <GoogleMap
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={mapOptions}
              mapContainerStyle={containerStyle}
            >
              {locations.map((location, index) => (
                <Marker
                  position={{
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                  }}
                  key={index}
                  icon="/marker.svg"
                />
              ))}
            </GoogleMap>
          )}
        </div>
      </main>
    </>
  );
}
