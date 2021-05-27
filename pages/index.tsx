/**
 * Created by Haowen Liu in 2021
 * Pod Plug main page
 */

import Head from "next/head";
import Footer from "../components/Footer";

import Header from "../components/Header";
import Image from "../components/Image";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState, useEffect, useRef } from "react";

const containerStyle = {
  height: "52rem",
};

const mapOptions = {
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
};

export default function Home() {
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

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Home - Pod Plug</title>
      </Head>
      {/* Header */}
      <Header current="/" />
      <div className="mb-4 text-lg text-center text-black shadow-md text-thin font-raleway">
        Cashless Convenience in Age-gated Venues
      </div>

      {/* Main */}
      <main className="bg-background-blue">
        {/* First page */}
        <div
          className="relative flex flex-row justify-around h-page"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #FFF, #FFF 45%, #2D6EB7 100%)",
          }}
          ref={kioskContainer}
        >
          <div className="relative flex flex-col">
            <div
              className="mt-48 font-bold font-acumin text-7xl text-title-black"
              style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            >
              Join Pod Rewards
            </div>
            <div className="mt-4 text-3xl font-semibold font-raleway text-subtitle-gray">
              Get exclusive offers, discounts, and rebates
            </div>
            <input
              type="text"
              className="self-start w-3/4 p-1 mt-2 text-lg rounded-lg border-3 border-subtitle-gray text-subtitle-gray"
            ></input>
            <button className="self-start px-8 py-1 mt-3 text-lg font-semibold rounded-lg border-3 border-subtitle-gray text-subtitle-gray font-raleway">
              Sign Up
            </button>
          </div>
          <div
            className="absolute bottom-0 block w-full"
            style={{
              backgroundImage: 'url("skyline_full_1080p.png")',
              backgroundSize: "contain",
              backgroundRepeat: "repeat-x",
              height: "24rem",
            }}
          ></div>
          <div
            className="h-full"
            style={{ width: "calc(52rem / 2249 * 1315)" }}
          >
            <div
              className={`${kioskState === 0 && "relative"} ${
                kioskState === 1 && "fixed top-40px"
              } ${kioskState === 2 && "relative top-240"}`}
              style={{ width: "calc(52rem / 2249 * 1315)" }}
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

        {/* Second page */}
        <div className="relative mt-32 h-page" ref={textContainer}>
          <div
            className="relative flex flex-col w-1/2 p-16 bg-white transform -translate-y-1/2 top-1/2 pr-60 font-raleway"
            style={{ borderRadius: "60px 0px 0px 60px", left: "15%" }}
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

        {/* Third page */}
        <div className="relative flex flex-col mt-16 h-page">
          <div className="w-full mt-16 text-5xl text-center text-white">
            Our Brand Partners
          </div>
          <div className="flex flex-col items-center mt-24">
            <div className="w-auto pr-2 overflow-x-hidden overflow-y-scroll h-136">
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
        <div className="pt-64"></div>
        {isLoaded && (
          <div className="w-full h-page">
            <GoogleMap
              onLoad={onLoad}
              onUnmount={onUnmount}
              mapContainerStyle={containerStyle}
              clickableIcons={false}
              options={mapOptions}
            ></GoogleMap>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
