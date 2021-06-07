import Header from "../components/Header";
import { Location } from "../types/types";
import Image from "../components/Image";
import styles from "../styles/Index.module.css";

import Head from "next/head";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState, useCallback, useEffect } from "react";
import Card from "../components/Card";

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
      <main className="bg-background-gray">
        <div className="outer-container flex flex-col items-center">
          <div className="absolute z-clouds w-full page">
            <img
              src="/clouds_blue.png"
              alt="Clouds"
              className="absolute opacity-60 z-clouds transform scale-60"
              style={{ top: "0rem", left: "75vw" }}
            />
            <img
              src="/clouds_big.png"
              alt="Clouds"
              className="absolute opacity-60 z-clouds"
              style={{ top: "2rem", left: "1vw" }}
            />
            <img
              src="/clouds_big.png"
              alt="Clouds"
              className="absolute hidden opacity-80 md:block z-clouds transform scale-75"
              style={{ top: "22rem", left: "47vw" }}
            />
            <img
              src="/clouds_blue.png"
              alt="Clouds"
              className="absolute opacity-80 z-clouds"
              style={{ top: "40rem", left: "10vw" }}
            />
          </div>
          <div className="page container relative z-content">
            <div className="w-full h-full flex flex-row items-center relative">
              <div className="flex flex-col font-raleway text-center flex-grow">
                <div className="text-8xl font-bold text-title-blue-dark">
                  Partner with us
                </div>
                <div className="text-3xl font-semibold text-title-blue-light mt-6">
                  <div>Convenience when out</div>
                  <div>Providing a WOW experience</div>
                </div>
              </div>
              <div className={styles.image_width}>
                <Image
                  src="/kiosk_2_full"
                  alt="Kiosk"
                  layout="responsive"
                  height={1945}
                  width={1185}
                />
              </div>
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

        {/* Third page: Did you know */}
        <div className="outer-container flex flex-col items-center py-32">
          <div className="container">
            <div className="font-raleway font-bold text-4xl text-center">
              Did you know?
            </div>
            <div className="flex flex-row justify-around mt-16">
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>

        {/* Third page: We facilitate everything */}
        <div className="outer-container flex flex-col items-center py-32">
          <div className="container">
            <div className="font-raleway font-bold text-4xl text-center">
              We Facilitate <span className="font-extrabold">EVERYTHING</span>
            </div>
            <div className="font-raleway text-xl text-center my-6">
              No need to break a sweat - we've got you sorted!
            </div>
            <div className="flex flex-row justify-around mt-16">
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
