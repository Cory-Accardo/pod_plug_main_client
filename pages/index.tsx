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
import { API, GOOGLE_API_KEY, JSON_HEADER } from "../constants";
import PartnersComponent from "../components/PartnersComponent";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useCallback, useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, AnimateSharedLayout } from "framer-motion";
import BezierEasing from "bezier-easing";
import { Libraries } from '@react-google-maps/api/src/utils/make-load-script-url';
import { useRouter } from "next/router";

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

const Home: React.FC = () => {
  // begin: Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: libraries,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);
  // end: Google Maps

  // begin: signup
  const [formInvalid, setFormInvalid] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const emailForm = useRef<HTMLInputElement>();
  const router = useRouter();

  const signup = useCallback(
    async function () {
      if (
        emailForm.current.value.match(
          /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
        )
      ) {
        router.push({
          pathname: "/signup",
          query: { email: emailForm.current.value },
        });
      } else {
        setFormInvalid(true);
      }
    },
    [emailForm, router]
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
        setKioskTransform("-4rem");
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
    new google.maps.places.Autocomplete(searchBox.current, {
      types: ["(cities)"],
      componentRestrictions: { country: "us" },
    });
  }, [isLoaded, searchBox]);

  useEffect(() => {
    fetch(API + "/venues/listall", {
      method: "GET",
      headers: JSON_HEADER,
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
            location.coords.lat,
            location.coords.lon
          );
        })
        .filter((location) => {
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
      <div className="py-2 mb-4 text-sm text-center text-black shadow-md md:py-0 sm:text-base md:text-lg text-thin">
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
              "linear-gradient(to bottom, #FFF, #FFF 25%, #08457D 100%)",
          }}
          ref={kioskContainer}
        >
          <div className="container relative flex flex-col items-center justify-around text-center md:items-start md:flex-row md:text-left">
            <div className="relative flex flex-col md:pl-16 z-content">
              <div
                className="mt-16 text-4xl font-bold sm:text-5xl md:mt-32 lg:text-6xl lg:mt-48 font-acumin xl:text-7xl text-title-black"
                style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
              >
                Plug into Pod Rewards
              </div>
              <div className="mt-4 text-lg font-semibold sm:text-xl lg:text-2xl xl:text-3xl text-subtitle-gray">
                Exclusive discounts on products &amp; exclusive offers from
                venues
              </div>
              <input
                type="email"
                placeholder="youremail@example.com"
                className="self-start w-full p-1 mt-2 mr-0 text-base bg-white rounded-lg lg:text-lg border-3 border-subtitle-gray text-subtitle-gray md:w-3/4 lg:w-3/5"
                ref={emailForm}
                onChange={() => {
                  setFormInvalid(false);
                  setFormSuccess(false);
                  setFormError(false);
                }}
              />
              {formInvalid && (
                <div className="text-red-800">
                  Please enter a valid email address!
                </div>
              )}
              {formError && (
                <div className="text-red-800">
                  Network error. Please try again later.
                </div>
              )}
              {formSuccess && (
                <div className="text-green-800">Thank you for signing up!</div>
              )}
              <button
                className="self-start w-full mt-3 text-base font-semibold button-dark md:button-light px-6 py-1 md:bg-white md:w-auto lg:text-lg"
                onClick={() => {
                  signup();
                }}
              >
                Next
              </button>
            </div>
            <div className={`relative h-full z-content ${styles.image_width}`}>
              <div
                className={` ${styles.image_width} transform scale-75 md:scale-100`}
                style={{ ["--tw-translate-y" as never]: kioskTransform }}
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
              backgroundImage: 'url("/skyline_dark.png")',
              backgroundSize: "contain",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "bottom",
              height: "24rem",
            }}
          />
          <div
            className="absolute bottom-0 block w-full z-bg md:hidden"
            style={{
              backgroundImage: 'url("/skyline_dark_half.png")',
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
          <div className="container relative z-clouds">
            <div
              className="relative flex flex-col py-16 bg-transparent md:px-16 md:mr-32 md:bg-white lg:mr-64 md:pr-44 lg:pr-60"
              style={{ borderRadius: "60px 0px 0px 60px" }}
            >
              <div className="text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl md:text-black md:text-left">
                Convenience When Out
              </div>
              <div className="mt-6 text-base font-normal leading-loose text-center text-white md:leading-normal lg:leading-loose xl:text-lg md:text-black md:text-left">
                We started Pod Plug in 2019 to solve the two problems that
                inevitably happen when out with friends – dead phone batteries
                and dead vape products. We have since grown to provide those
                items and more to enhance your evening out through safe, limited
                contact, cashless kiosks. Our priority and mission is your
                convenience when out.
              </div>
              <div className="mt-12 text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl md:text-black md:text-left">
                Today
              </div>
              <div className="mt-6 text-base font-normal leading-loose text-center text-white md:leading-normal lg:leading-loose xl:text-lg md:text-black md:text-left">
                We are expanding our mission’s scope by enhancing your evening
                out with exclusive discounts on products and exclusive offers
                from your favorite venues. Plug into Pod Rewards to get
                exclusive offers for your evenings out with friends.
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
                    className={`text-4xl font-semibold text-center md:text-left transition-opacity ${
                      searchFocused ? styles.title_focused : ""
                    }`}
                  >
                    Our Venue Partners
                  </div>
                  <div
                    className={`flex flex-col md:px-8 pt-4 mt-0 bg-transparent md:mt-8 md:bg-white rounded-xl max-h-96 transform transition-transform relative z-content w-76 lg:w-112 ${
                      searchFocused ? styles.search_focused : ""
                    }`}
                  >
                    <div className="hidden text-lg font-medium md:block">
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
                          className="w-full px-2 py-1 border-3 rounded-lg border-subtitle-gray md:border-theme-dark md:w-auto"
                        />
                      </form>
                      <button
                        className="hidden button-dark px-6 py-1 ml-4 md:block"
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
                      <div className="mt-4 text-xs font-medium">
                        {coords.length} SEARCH RESULTS
                      </div>
                      <hr className="h-0 mx-3 mt-2 border-3 border-hr-gray" />
                      <div className="my-3 overflow-y-scroll flex-shrink">
                        <AnimateSharedLayout>
                          <motion.div layout className="relative z-content">
                            {locations
                              .filter((location) => {
                                if (currentLocation === undefined) return true;
                                const latlng = new google.maps.LatLng(
                                  location.coords.lat,
                                  location.coords.lon
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
                                        a.coords.lat,
                                        b.coords.lon
                                      )
                                    ) -
                                    google.maps.geometry.spherical.computeDistanceBetween(
                                      currentLocation,
                                      new google.maps.LatLng(
                                        a.coords.lat,
                                        b.coords.lon
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
                                        <div className="text-base font-normal">
                                          {location.address.street}
                                        </div>
                                        <div className="text-sm font-medium">
                                          {currentLocation &&
                                            `${(
                                              google.maps.geometry.spherical.computeDistanceBetween(
                                                new google.maps.LatLng(
                                                  location.coords.lat,
                                                  location.coords.lon
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
};

export default Home;
