/**
 * Created by Haowen Liu in 2021
 * Pod Plug main page
 */

import Head from "next/head";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "../components/Image";
import Clouds from "../components/Clouds";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useCallback, useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, AnimateSharedLayout } from "framer-motion";

import styles from "../styles/Index.module.css";

interface Location {
  index: number;
  name: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: number;
  };
}

const containerStyle = {
  height: "52rem",
};

const mapOptions = {
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  scrollwheel: false,
};

export default function Home() {
  // begin: Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCu5Vh4v5aQLJBSHVxzWeAOWHdy0_8pJaM",
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(_) {
    setMap(null);
  }, []);
  // end: Google Maps

  // begin: Kiosk scrolling effect
  const kioskContainer = useRef<HTMLDivElement>();
  const textContainer = useRef<HTMLDivElement>();

  // 0: original position
  // 1: fixed to top of page
  // 2: final position
  const [kioskState, setKioskState] = useState(0);

  useEffect(() => {
    const listener = () => {
      if (window.scrollY >= textContainer.current.offsetTop) {
        setKioskState(2);
        return;
      }
      if (kioskContainer.current.offsetTop - window.scrollY <= 40) {
        setKioskState(1);
        return;
      }
      setKioskState(0);
    };

    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [kioskContainer]);
  // end: Kiosk scrolling effect

  // begin: Venues
  const [locations, setLocations] = useState<Location[]>([]);
  const [currentSearch, setCurrentSearch] = useState("");
  const searchBox = useRef<HTMLInputElement>();
  const [coords, setCoords] = useState<google.maps.LatLng[]>([]);

  const submitSearch = useCallback(() => {
    setCurrentSearch(searchBox.current.value.toLowerCase());
  }, [searchBox]);

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

  useEffect(() => {
    if (!isLoaded) return;
    setCoords(
      locations
        .filter(
          (location) =>
            currentSearch === "" ||
            location.name.toLowerCase().includes(currentSearch) ||
            location.address.street.toLowerCase().includes(currentSearch)
        )
        .map((location) => {
          return new google.maps.LatLng(
            location.coords.latitude,
            location.coords.longitude
          );
        })
    );
  }, [currentSearch, locations, isLoaded]);
  // end: Venues

  // begin: Google Map auto zoom
  useEffect(() => {
    if (!map) return;
    let bounds = new google.maps.LatLngBounds();
    for (const index in coords) {
      bounds = bounds.extend(coords[index]);
      map.fitBounds(bounds);
    }
  }, [map, coords]);
  // end: Google Map auto zoom

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Home - Pod Plug</title>
      </Head>
      {/* Header */}
      <Header current="/" />
      <div className="py-2 mb-4 text-sm text-center text-black shadow-md md:py-0 sm:text-base md:text-lg text-thin font-raleway">
        Cashless Convenience in Age-gated Venues
      </div>

      {/* Main */}
      <main className="bg-background-blue">
        <Clouds id={1} />
        <Clouds id={2} />
        {/* First page */}
        <div
          className="relative flex flex-col items-center pl-16 pr-16 md:pr-0 page"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #FFF, #FFF 45%, #2D6EB7 100%)",
          }}
          ref={kioskContainer}
        >
          <div className="container relative flex flex-col items-center justify-around md:items-start md:flex-row">
            <div className="relative flex flex-col z-content">
              <div
                className="mt-16 text-5xl font-bold md:mt-32 lg:text-6xl lg:mt-48 font-acumin xl:text-7xl text-title-black"
                style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
              >
                Join Pod Rewards
              </div>
              <div className="mt-4 text-xl font-semibold lg:text-2xl xl:text-3xl font-raleway text-subtitle-gray">
                Get exclusive offers, discounts, and rebates
              </div>
              <input
                type="text"
                className="self-start w-3/4 w-full p-1 mt-2 mr-0 text-base bg-white rounded-lg lg:text-lg border-3 border-subtitle-gray text-subtitle-gray md:w-3/4 lg:w-3/5"
              ></input>
              <button className="self-start w-full px-8 py-1 mt-3 text-base font-semibold text-white rounded-lg bg-background-blue md:bg-white md:w-auto lg:text-lg border-3 border-background-blue md:border-subtitle-gray md:text-subtitle-gray font-raleway">
                Sign Up
              </button>
            </div>
            <div className={`relative h-full z-content ${styles.image_width}`}>
              <div
                className={`${kioskState === 0 ? styles.image_start : ""} ${
                  kioskState === 1 ? styles.image_moving : ""
                } ${kioskState === 2 ? styles.image_end : ""} ${
                  styles.image_width
                }`}
              >
                <Image
                  src="/kiosk_full"
                  alt="Pod Plug kiosk"
                  layout="responsive"
                  height={2249}
                  width={1315}
                />
              </div>
            </div>
          </div>
          <div
            className="absolute bottom-0 hidden block w-full z-bg md:block"
            style={{
              backgroundImage: 'url("skyline_full.png")',
              backgroundSize: "contain",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "bottom",
              height: "24rem",
            }}
          ></div>
          <div
            className="absolute bottom-0 block w-full z-bg md:hidden"
            style={{
              backgroundImage: 'url("skyline_half.png")',
              backgroundSize: "contain",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "bottom",
              height: "24rem",
            }}
          ></div>
        </div>

        {/* Second page */}
        <div
          className="flex flex-col justify-center mt-gap h-page"
          ref={textContainer}
        >
          <div className="container relative">
            <div
              className="relative flex flex-col p-16 mr-64 bg-white pr-60 font-raleway"
              style={{ borderRadius: "60px 0px 0px 60px" }}
            >
              <div className="text-5xl font-semibold">Convenience When Out</div>
              <div className="mt-6 text-lg font-normal leading-loose">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>
            </div>
          </div>
        </div>

        {/* Third page */}
        {/*
        <div className="relative flex flex-col mt-gap h-page">
          <div className="w-full mt-16 text-5xl text-center text-white">
            Our Brand Partners
          </div>
          <div className="flex flex-col items-center mt-24">
            <div className="w-auto pr-2 overflow-x-hidden overflow-y-scroll h-136 z-content">
              <div className="grid grid-flow-row grid-cols-3 gap-8">
                <div
                  className="flex items-center justify-center w-64 h-64 bg-white"
                  style={{ borderRadius: "1.5rem" }}
                >
                  <div
                    className="w-32 h-32"
                    style={{
                      backgroundImage: 'url("/juul.png")',
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      backgroundPosition: "center center",
                    }}
                  ></div>
                </div>
                <div
                  className="flex items-center justify-center w-64 h-64 bg-white"
                  style={{ borderRadius: "1.5rem" }}
                >
                  <div
                    className="w-32 h-32"
                    style={{
                      backgroundImage: 'url("/juul.png")',
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      backgroundPosition: "center center",
                    }}
                  ></div>
                </div>
                <div
                  className="flex items-center justify-center w-64 h-64 bg-white"
                  style={{ borderRadius: "1.5rem" }}
                >
                  <div
                    className="w-32 h-32"
                    style={{
                      backgroundImage: 'url("/hqd.png")',
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      backgroundPosition: "center center",
                    }}
                  ></div>
                </div>
                <div
                  className="flex items-center justify-center w-64 h-64 bg-white"
                  style={{ borderRadius: "1.5rem" }}
                >
                  <div
                    className="w-32 h-32"
                    style={{
                      backgroundImage: 'url("/fume.png")',
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      backgroundPosition: "center center",
                    }}
                  ></div>
                </div>
                <div
                  className="flex items-center justify-center w-64 h-64 bg-white"
                  style={{ borderRadius: "1.5rem" }}
                >
                  <div
                    className="w-32 h-32"
                    style={{
                      backgroundImage: 'url("/fume.png")',
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      backgroundPosition: "center center",
                    }}
                  ></div>
                </div>
                <div
                  className="flex items-center justify-center w-64 h-64 bg-white"
                  style={{ borderRadius: "1.5rem" }}
                >
                  <div
                    className="w-40 h-40"
                    style={{
                      backgroundImage: 'url("/airbar.png")',
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      backgroundPosition: "center center",
                    }}
                  ></div>
                </div>
                <div
                  className="flex items-center justify-center w-64 h-64 bg-white"
                  style={{ borderRadius: "1.5rem" }}
                >
                  <div
                    className="h-36 w-36"
                    style={{
                      backgroundImage: 'url("/vuse.png")',
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      backgroundPosition: "center center",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}

        {/* Google Maps */}
        <div className="pt-64"></div>
        {isLoaded && (
          <div className="relative w-full z-content h-page">
            <GoogleMap
              onLoad={onLoad}
              onUnmount={onUnmount}
              mapContainerStyle={containerStyle}
              clickableIcons={false}
              options={mapOptions}
            >
              {coords.map((latlng, index) => (
                <Marker position={latlng} key={index} />
              ))}
            </GoogleMap>
            <div className="absolute top-0 left-0 flex flex-col w-full h-full">
              <div className="container relative h-full">
                <div className="absolute left-0 top-36 z-content">
                  <div className="text-4xl font-semibold font-raleway">
                    Our Kiosk Locations
                  </div>
                  <div className="flex flex-col px-8 pt-4 mt-8 bg-white rounded-xl max-h-96">
                    <div className="text-lg font-medium font-raleway">
                      Your Location
                    </div>
                    <div className="flex flex-row mt-2">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          submitSearch();
                        }}
                      >
                        <input
                          ref={searchBox}
                          className="px-2 py-1 border-2 rounded-lg border-theme-light"
                        ></input>
                      </form>
                      <button
                        className="px-6 py-1 ml-4 text-white rounded-lg bg-theme-light"
                        onClick={submitSearch}
                      >
                        Search
                      </button>
                    </div>
                    <div className="mt-4 text-xs font-medium font-raleway">
                      12 SEARCH RESULTS
                    </div>
                    <hr className="h-0 mx-3 mt-2 border-2 border-hr-gray"></hr>
                    <div className="flex-shrink my-3 overflow-y-scroll">
                      <AnimateSharedLayout>
                        <motion.div layout>
                          {locations
                            .filter(
                              (location) =>
                                currentSearch === "" ||
                                location.name
                                  .toLowerCase()
                                  .includes(currentSearch) ||
                                location.address.street
                                  .toLowerCase()
                                  .includes(currentSearch)
                            )
                            .map((location) => {
                              return (
                                <AnimatePresence key={location.index}>
                                  <motion.div
                                    className="flex flex-row items-center py-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    key={location.index}
                                    layout
                                  >
                                    <img
                                      src="/marker.svg"
                                      alt="Marker"
                                      className="h-8"
                                    />
                                    <div className="flex flex-col ml-16">
                                      <div className="text-base font-normal font-raleway">
                                        {location.address.street}
                                      </div>
                                      <div className="text-sm font-medium font-raleway">
                                        0.1 mi
                                      </div>
                                    </div>
                                  </motion.div>
                                </AnimatePresence>
                              );
                            })}
                        </motion.div>
                      </AnimateSharedLayout>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
