/**
 * Created by Haowen Liu in 2021
 * Pod Plug main page
 */

import Head from "next/head";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "../components/Image";
import Clouds from "../components/Clouds";
import { Location } from "../types/types";
import { GOOGLE_API_KEY, USER_MS } from "../constants";
import PartnersComponent from "../components/PartnersComponent";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useCallback, useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, AnimateSharedLayout } from "framer-motion";
import BezierEasing from "bezier-easing";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";

import styles from "../styles/Index.module.css";

const containerStyle = {
  height: "100%",
  width: "100%",
};

const mapOptions = {
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  scrollwheel: false,
};

const easing = BezierEasing(0.39, 0.08, 0.23, 1.07);

const libraries: Libraries = ["places", "geometry"];

export default function Home() {
  // begin: Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: libraries,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(_) {
    setMap(null);
  }, []);
  // end: Google Maps

  // begin: signup
  const [formInvalid, setFormInvalid] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const emailForm = useRef<HTMLInputElement>();

  const signup = useCallback(
    async function () {
      if (
        emailForm.current.value.match(
          /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
        )
      ) {
        fetch("https://" + USER_MS + "/signup", {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({ email: emailForm.current.value }),
        })
          .then(() => {
            setFormError(false);
            setFormSuccess(true);
          })
          .catch((_) => {
            setFormError(true);
            setFormSuccess(false);
          });
      } else {
        setFormInvalid(true);
      }
    },
    [emailForm]
  );
  // end: signup

  // begin: window resize
  const [lg, setLg] = useState(false);
  const [md, setMd] = useState(false);

  useEffect(() => {
    setLg(window.matchMedia("(min-width: 1024px)").matches);
    setMd(window.matchMedia("(min-width: 768px)").matches);
    const listener = () => {
      setLg(window.matchMedia("(min-width: 1024px)").matches);
      setMd(window.matchMedia("(min-width: 768px)").matches);
      console.log(window.matchMedia("(min-width: 768px)").matches);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);
  // end: window resize

  // begin: Kiosk scrolling effect
  const kioskContainer = useRef<HTMLDivElement>();
  const textContainer = useRef<HTMLDivElement>();

  const [kioskTransform, setKioskTransform] = useState("0rem");

  useEffect(() => {
    const listener = () => {
      if (!md) {
        setKioskTransform("0rem");
        return;
      }
      let end: number;
      if (lg) {
        end = 68;
      } else {
        end = 58;
      }
      const fontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      const x = Math.max(
        Math.min(
          (window.scrollY - kioskContainer.current.offsetTop + 40) /
            fontSize /
            end,
          1
        ),
        0
      );
      setKioskTransform(`${easing(x) * end}rem`);
    };

    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [kioskContainer, lg, md]);
  // end: Kiosk scrolling effect

  // begin: Venues
  const [locations, setLocations] = useState<Location[]>([]);
  const [currentLocation, setCurrentLocation] = useState<google.maps.LatLng>();
  const searchBox = useRef<HTMLInputElement>();
  const [coords, setCoords] = useState<google.maps.LatLng[]>([]);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();

  const submitSearch = useCallback(() => {
    if (searchBox.current.value === "") {
      setCurrentLocation(undefined);
      return;
    }
    const address = searchBox.current.value.split(" ").join("+");
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setCurrentLocation(
          new google.maps.LatLng(
            json.results[0].geometry.location.lat,
            json.results[0].geometry.location.lng
          )
        );
      });
  }, [searchBox]);

  useEffect(() => {
    if (!isLoaded) return;
    setAutocomplete(
      new google.maps.places.Autocomplete(searchBox.current, {
        types: ["(cities)"],
        componentRestrictions: { country: "us" },
      })
    );
  }, [isLoaded, searchBox]);

  useEffect(() => {
    fetch("https://" + USER_MS + "/venues/listall", {
      mode: "cors",
    })
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
        .map((location) => {
          return new google.maps.LatLng(
            location.coords.latitude,
            location.coords.longitude
          );
        })
        .filter((location) => {
          if (currentLocation !== undefined) {
            console.log(
              google.maps.geometry.spherical.computeDistanceBetween(
                location,
                currentLocation
              )
            );
          }
          return (
            currentLocation === undefined ||
            google.maps.geometry.spherical.computeDistanceBetween(
              location,
              currentLocation
            ) < 80000
          );
        })
    );
  }, [locations, isLoaded, currentLocation]);
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

  // begin: mobile search focus
  const [searchFocused, setSearchFocused] = useState(false);
  // end: mobile search focus

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
          className="relative flex flex-col items-center px-8 sm:px-16 md:px-0 page"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #FFF, #FFF 45%, #2D6EB7 100%)",
          }}
          ref={kioskContainer}
        >
          <div className="container relative flex flex-col items-center justify-around text-center md:items-start md:flex-row md:text-left">
            <div className="relative flex flex-col md:pl-16 z-content">
              <div
                className="mt-16 text-4xl font-bold sm:text-5xl md:mt-32 lg:text-6xl lg:mt-48 font-acumin xl:text-7xl text-title-black"
                style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
              >
                Join Pod Rewards
              </div>
              <div className="mt-4 text-lg font-semibold sm:text-xl lg:text-2xl xl:text-3xl font-raleway text-subtitle-gray">
                Get exclusive offers, discounts, and rebates
              </div>
              <input
                type="text"
                className="self-start w-full p-1 mt-2 mr-0 text-base bg-white rounded-lg lg:text-lg border-3 border-subtitle-gray text-subtitle-gray md:w-3/4 lg:w-3/5"
                ref={emailForm}
                onChange={() => {
                  setFormInvalid(false);
                  setFormSuccess(false);
                  setFormError(false);
                }}
              />
              {formInvalid && (
                <div className="text-red-800 font-raleway">
                  Please enter a valid email address!
                </div>
              )}
              {formError && (
                <div className="text-red-800 font-raleway">
                  Network error. Please try again later.
                </div>
              )}
              {formSuccess && (
                <div className="text-green-800 font-raleway">
                  Thank you for signing up!
                </div>
              )}
              <button
                className="self-start w-full px-8 py-1 mt-3 text-base font-semibold text-white rounded-lg bg-background-blue md:bg-white md:w-auto lg:text-lg border-3 border-background-blue md:border-subtitle-gray md:text-subtitle-gray font-raleway"
                onClick={() => {
                  signup();
                }}
              >
                Sign Up
              </button>
            </div>
            <div className={`relative h-full z-content ${styles.image_width}`}>
              <div
                className={` ${styles.image_width} transform scale-75 md:scale-100`}
                style={{ ["--tw-translate-y" as any]: kioskTransform }}
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
            className="absolute bottom-0 hidden w-full z-bg md:block"
            style={{
              backgroundImage: 'url("/skyline_full.png")',
              backgroundSize: "contain",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "bottom",
              height: "24rem",
            }}
          />
          <div
            className="absolute bottom-0 block w-full z-bg md:hidden"
            style={{
              backgroundImage: 'url("/skyline_half.png")',
              backgroundSize: "contain",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "bottom",
              height: "24rem",
            }}
          />
        </div>

        {/* Second page */}
        <div
          className="flex flex-col justify-center mt-40 md:mt-gap md:h-page_md lg:h-page outer-container"
          ref={textContainer}
        >
          <div className="container relative">
            <div
              className="relative flex flex-col py-16 bg-transparent md:px-16 md:mr-32 md:bg-white lg:mr-64 md:pr-44 lg:pr-60 font-raleway"
              style={{ borderRadius: "60px 0px 0px 60px" }}
            >
              <div className="text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl md:text-black md:text-left">
                Convenience When Out
              </div>
              <div className="mt-6 text-base font-normal leading-loose text-center text-white md:leading-normal lg:leading-loose xl:text-lg md:text-black md:text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>
            </div>
          </div>
        </div>

        {/* Third page */}
        <div className="flex flex-col justify-center mt-20 md:mt-gap md:h-page_md lg:h-page outer-container relative z-content">
          <div className="text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl">
            Convenient products we provide
          </div>
          <PartnersComponent />
        </div>

        {/* Google Maps */}
        <div className="pt-32 md:pt-64" />
        {isLoaded && (
          <div className="relative w-full page z-content">
            <div className="w-full h-full">
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
            </div>
            <div
              className={`absolute top-0 left-0 flex flex-col w-full h-full outer-container transition-colors z-content ${
                searchFocused ? styles.bg_focused : ""
              }`}
            >
              <div className="container relative h-full">
                <div className="absolute left-0 right-0 top-8 md:top-36 z-content md:right-auto">
                  <div
                    className={`text-4xl font-semibold text-center font-raleway md:text-left transition-opacity ${
                      searchFocused ? styles.title_focused : ""
                    }`}
                  >
                    Our Kiosk Locations
                  </div>
                  <div
                    className={`flex flex-col md:px-8 pt-4 mt-0 bg-transparent md:mt-8 md:bg-white rounded-xl max-h-96 transform transition-transform relative z-content w-76 lg:w-112 ${
                      searchFocused ? styles.search_focused : ""
                    }`}
                  >
                    <div className="hidden text-lg font-medium font-raleway md:block">
                      Your Location
                    </div>
                    <div className="flex flex-row mt-2">
                      <form
                        className="w-full md:w-auto"
                        onSubmit={(e) => {
                          e.preventDefault();
                          submitSearch();
                        }}
                      >
                        <input
                          ref={searchBox}
                          onFocus={() => {
                            setSearchFocused(true);
                          }}
                          onBlur={() => {
                            setSearchFocused(false);
                          }}
                          className="w-full px-2 py-1 border-2 rounded-lg border-subtitle-gray md:border-theme-light md:w-auto"
                        />
                      </form>
                      <button
                        className="hidden px-6 py-1 ml-4 text-white rounded-lg bg-theme-light md:block"
                        onClick={submitSearch}
                      >
                        Search
                      </button>
                    </div>
                    <div
                      className={`transition-opacity ${
                        searchFocused ? "" : styles.results_unfocused
                      } flex flex-col overflow-hidden flex-shrink`}
                    >
                      <div className="mt-4 text-xs font-medium font-raleway">
                        {coords.length} SEARCH RESULTS
                      </div>
                      <hr className="h-0 mx-3 mt-2 border-2 border-hr-gray" />
                      <div className="my-3 overflow-y-scroll flex-shrink">
                        <AnimateSharedLayout>
                          <motion.div layout className="relative z-content">
                            {locations
                              .filter((location) => {
                                if (currentLocation === undefined) return true;
                                const latlng = new google.maps.LatLng(
                                  location.coords.latitude,
                                  location.coords.longitude
                                );
                                return (
                                  google.maps.geometry.spherical.computeDistanceBetween(
                                    latlng,
                                    currentLocation
                                  ) < 80000
                                );
                              })
                              .sort((a, b) => {
                                if (currentLocation) {
                                  return (
                                    google.maps.geometry.spherical.computeDistanceBetween(
                                      currentLocation,
                                      new google.maps.LatLng(
                                        a.coords.latitude,
                                        b.coords.longitude
                                      )
                                    ) -
                                    google.maps.geometry.spherical.computeDistanceBetween(
                                      currentLocation,
                                      new google.maps.LatLng(
                                        a.coords.latitude,
                                        b.coords.longitude
                                      )
                                    )
                                  );
                                } else if (a.name > b.name) {
                                  return 1;
                                } else if (b.name > a.name) {
                                  return -1;
                                } else {
                                  return 0;
                                }
                              })
                              .map((location) => {
                                return (
                                  <AnimatePresence key={location.index}>
                                    <motion.div
                                      className="flex flex-row items-center py-3 relative z-content"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      key={location.index}
                                      layout
                                    >
                                      <img
                                        src="/marker.svg"
                                        alt="Marker"
                                        className="h-8 relative z-content"
                                      />
                                      <div className="flex flex-col ml-16">
                                        <div className="text-base font-normal font-raleway">
                                          {location.address.street}
                                        </div>
                                        <div className="text-sm font-medium font-raleway">
                                          {currentLocation &&
                                            `${(
                                              google.maps.geometry.spherical.computeDistanceBetween(
                                                new google.maps.LatLng(
                                                  location.coords.latitude,
                                                  location.coords.longitude
                                                ),
                                                currentLocation
                                              ) / 1600
                                            ).toFixed(1)} mi`}
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
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
