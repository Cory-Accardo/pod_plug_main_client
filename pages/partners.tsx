/**
 * Created by Haowen Liu in 2021
 * Pod Plug venues page
 */

import Header from "../components/Header";
import { Location } from "../types/types";
import Image from "../components/Image";
import styles from "../styles/Index.module.css";
import Card from "../components/Card";
import Procedure from "../components/Procedure";
import ResizableCard from "../components/ResizableCard";
import Footer from "../components/Footer";
import { GOOGLE_API_KEY, USER_MS } from "../constants";
import PartnersComponent from "../components/PartnersComponent";

import Head from "next/head";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";

const containerStyle = {
  height: "100%",
  width: "100%",
};

const mapOptions = {
  scrollwheel: false,
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries: Libraries = ["places", "geometry"];

export default function Partners() {
  // begin: Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: libraries,
  });

  const [, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new google.maps.LatLngBounds(
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
  // end: Venues

  // begin: form
  const [agreeEmail, setAgreeEmail] = useState(false);
  const [agreeSendInfo, setAgreeSendInfo] = useState(false);
  // end: form

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
        {/* Clouds */}
        <div className="absolute z-clouds w-full">
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
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds"
            style={{ top: "108rem", left: "55vw" }}
          />
          <img
            src="/clouds_big.png"
            alt="Clouds"
            className="absolute hidden opacity-80 md:block z-clouds transform scale-75"
            style={{ top: "120rem", left: "0vw" }}
          />
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds"
            style={{ top: "140rem", left: "65vw" }}
          />
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds transform scale-75"
            style={{ top: "155rem", left: "5vw" }}
          />
          <img
            src="/clouds_big.png"
            alt="Clouds"
            className="absolute hidden opacity-80 md:block z-clouds transform scale-75"
            style={{ top: "180rem", left: "40vw" }}
          />
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds"
            style={{ top: "230rem", left: "75vw" }}
          />
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds"
            style={{ top: "235rem", left: "15vw" }}
          />
          <img
            src="/clouds_big.png"
            alt="Clouds"
            className="absolute hidden opacity-80 md:block z-clouds transform scale-75"
            style={{ top: "255rem", left: "40vw" }}
          />
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds"
            style={{ top: "275rem", left: "-5vw" }}
          />
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds"
            style={{ top: "285rem", left: "65vw" }}
          />
          <img
            src="/clouds_big.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds transform scale-75"
            style={{ top: "290rem", left: "-5vw" }}
          />
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-50 z-clouds"
            style={{ top: "320rem", left: "55vw" }}
          />
        </div>
        <div className="outer-container flex flex-col items-center">
          <div className="page container relative z-content">
            <div className="w-full h-full flex flex-col md:flex-row items-center relative">
              <div className="flex flex-col font-raleway text-center flex-grow mt-24 sm:mt-32 md:mt-0">
                <div className="text-4xl sm:text-5xl md:text-5xl xl:text-7xl font-bold text-title-blue-dark">
                  Partner with us
                </div>
                <div className="text-xl md:text-2xl xl:text-3xl font-semibold text-title-blue-light mt-6">
                  <div>Convenience when out</div>
                  <div>Providing a WOW experience</div>
                </div>
              </div>
              <div
                className={`${styles.image_width} transform scale-75 -translate-y-8 md:translate-y-0 md:scale-90`}
              >
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
        <div className="page hidden md:block">
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
                />
              ))}
            </GoogleMap>
          )}
        </div>

        {/* Third page: Did you know */}
        <div className="outer-container flex flex-col items-center pt-32 md:py-32 relative z-content mt-12 sm:mt-24 md:mt-0">
          <div className="container">
            <div className="font-raleway font-bold text-4xl text-center">
              Did you know?
            </div>
            <div className="flex flex-col md:flex-row justify-around mt-16 items-center">
              <Card
                title="11%"
                content="of the US population uses nicotine products"
              />
              <Card
                title="40%"
                content="of nightlife participants use nicotine products"
              />
              <Card
                title="5%"
                content="of foot traffic at current venues buy from our kiosks"
              />
            </div>
          </div>
        </div>

        {/* Fourth page: We facilitate everything */}
        <div className="outer-container flex flex-col items-center pt-32 md:py-32 relative z-content">
          <div className="container">
            <div className="font-raleway font-bold text-4xl text-center">
              We Facilitate <span className="font-extrabold">EVERYTHING</span>
            </div>
            <div className="font-raleway text-xl text-center my-6">
              No need to break a sweat - we&apos;ve got you sorted!
            </div>
            <div className="flex flex-col md:flex-row justify-around mt-16 items-center">
              <Procedure svg="/trans.svg" caption="DELIVERY" />
              <img
                src="/arrow.svg"
                alt="Arrow"
                className="w-24 h-24 hidden xl:block"
              />
              <Procedure svg="/tool.svg" caption="SET UP &amp; MAINTENANCE" />
              <img
                src="/arrow.svg"
                alt="Arrow"
                className="w-24 h-24 hidden xl:block"
              />
              <Procedure svg="/box.svg" caption="REPLENISHMENT" />
              <img
                src="/arrow.svg"
                alt="Arrow"
                className="w-24 h-24 hidden xl:block"
              />
              <Procedure
                svg="/campaign.svg"
                caption="ADVERTISING &amp; MARKETING"
              />
              <img
                src="/arrow.svg"
                alt="Arrow"
                className="w-24 h-24 hidden xl:block"
              />
              <Procedure
                svg="/shield.svg"
                caption="LICENSING &amp; PERMITTING"
              />
            </div>
          </div>
        </div>

        {/* Fifth page: What we propose */}
        <div className="outer-container flex flex-col items-center pt-32 md:py-32 relative z-content">
          <div className="container">
            <div className="font-raleway font-bold text-4xl text-center">
              Here is what we propose
            </div>
            <div className="flex flex-col md:flex-row justify-around mt-16">
              <ResizableCard
                header="PAY"
                title="0%"
                content="Upfront Costs"
                footer=""
              />
              <ResizableCard
                header="EARN UP TO"
                title="$8,000<span>*</span>"
                content="Profit a Year"
                footer="*Based on the average of top 10 PodPlug accounts"
              />
              <ResizableCard
                header="PROFIT"
                title="10%"
                content="of Total Sales"
                footer=""
              />
              <div className="h-72 lg:min-w-48 xl:min-w-56 rounded-3xl bg-transparent md:bg-white flex-col items-center justify-center p-4 flex md:hidden lg:flex">
                <div className="font-raleway text-theme-light font-black text-xl mb-4">
                  WE ACCEPT
                </div>
                <div className="font-raleway text-theme-light text-center text-lg md:text-base xl:text-lg h-29 xl:h-38 flex flex-row items-center mt-4 md:mt-0">
                  <div>
                    Credit, Debit,
                    <br />
                    Apple Pay,
                    <br />
                    Samsung Pay,
                    <br />
                    and other Cashless
                    <br />
                    Payments
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sixth page: Convenient products */}
        <div className="flex flex-col pt-32 md:py-32 outer-container items-center">
          <div className="font-raleway font-bold text-4xl text-center">
            Convenient products we provide
          </div>
          <PartnersComponent />
        </div>

        {/* Will you partner with us */}
        <div className="relative z-content flex flex-col items-center outer-container py-32">
          <div className="container">
            <div className="font-raleway font-bold text-4xl text-center">
              Will you partner with us?
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex flex-col md:flex-row mt-24"
            >
              <div className="flex flex-col md:w-1/2 md:pr-4">
                <div className="flex flex-col">
                  <label className="text-sm font-bold font-raleway">
                    VENUE NAME<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="p-1 border-black rounded-lg border-2"
                    type="text"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold font-raleway">
                    GENERAL MANAGER NAME<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="p-1 border-black rounded-lg border-2"
                    type="text"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold font-raleway">
                    EMAIL<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="p-1 border-black rounded-lg border-2"
                    type="email"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold font-raleway">
                    NUMBER<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="p-1 border-black rounded-lg border-2"
                    type="tel"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold font-raleway">
                    SOCIAL MEDIA HANDLES<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="p-1 border-black rounded-lg border-2"
                    type="text"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold font-raleway">
                    Est. monthly alcohol revenue
                  </label>
                  <input
                    className="p-1 border-black rounded-lg border-2 md:w-48 md:ml-auto"
                    type="text"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold font-raleway">
                    Avg. daily foot traffic
                  </label>
                  <input
                    className="p-1 border-black rounded-lg border-2 md:w-48 md:ml-auto"
                    type="text"
                  />
                </div>
              </div>
              <div className="md:w-1/2 md:pl-4 mt-4 md:mt-0">
                <div className="flex flex-col">
                  <label className="text-sm font-bold font-raleway">
                    ADDRESS<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="p-1 border-black rounded-lg border-2"
                    type="text"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold font-raleway">
                    CITY<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="p-1 border-black rounded-lg border-2"
                    type="text"
                  />
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-col mt-4 w-1/2 pr-2">
                    <label className="text-sm font-bold font-raleway">
                      STATE<span className="text-red-600">*</span>
                    </label>
                    <input
                      className="p-1 border-black rounded-lg border-2"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col mt-4 w-1/2 pl-2">
                    <label className="text-sm font-bold font-raleway">
                      ZIP<span className="text-red-600">*</span>
                    </label>
                    <input
                      className="p-1 border-black rounded-lg border-2"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold font-raleway">
                    COUNTRY<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="p-1 border-black rounded-lg border-2"
                    type="text"
                  />
                </div>
                <div className="flex flex-row mt-8 md:mt-20 items-center">
                  <button
                    className="border-2 border-black rounded-md relative mr-4 min-w-5 max-w-5 min-h-5 max-h-5"
                    onClick={() => setAgreeEmail((orig) => !orig)}
                  >
                    {agreeEmail && (
                      <div className="absolute h-full w-full left-0 top-0 bg-black">
                        <FontAwesomeIcon
                          className="absolute text-white"
                          style={{
                            inset: "0.05rem",
                          }}
                          icon={faCheck}
                        />
                      </div>
                    )}
                  </button>
                  <div className="font-raleway">
                    I agree to receiving future offers in my email or via post.
                    <span className="text-red-600">*</span>
                  </div>
                </div>
                <div className="flex flex-row mt-4 items-center">
                  <button
                    className="border-2 border-black rounded-md relative mr-4 min-w-5 max-w-5 min-h-5 max-h-5"
                    onClick={() => setAgreeSendInfo((orig) => !orig)}
                  >
                    {agreeSendInfo && (
                      <div className="absolute h-full w-full left-0 top-0 bg-black">
                        <FontAwesomeIcon
                          className="absolute text-white"
                          style={{
                            inset: "0.05rem",
                          }}
                          icon={faCheck}
                        />
                      </div>
                    )}
                  </button>
                  <div className="font-raleway">
                    I agree to allow my information to be sent to future vendor
                    and venue partners.
                    <span className="text-red-600">*</span>
                  </div>
                </div>
                <div className="flex flex-row mt-4 items-center">
                  <div className="mr-auto">
                    <span className="text-red-600">*</span>Required
                  </div>
                  <button className="bg-black text-white rounded-lg px-12 py-1">
                    Yes!
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="relative h-16 md:h-32 lg:h-64">
          <div
            className="absolute bottom-0 -top-12 left-0 right-0 opacity-20"
            style={{
              backgroundImage: 'url("/skyline_full.png")',
              backgroundSize: "contain",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "bottom",
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
