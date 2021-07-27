import Header from "../components/Header";
import Footer from "../components/Footer";
import { GOOGLE_API_KEY, USER_MS } from "../constants";

import Head from "next/head";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagramSquare,
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBuilding,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";

const containerStyle = {
  height: "100%",
  width: "100%",
};

const mapOptions = {
  gestureHandling: "none",
  scrollwheel: false,
  center: { lat: 32.779167, lng: -96.808891 },
  disableDefaultUI: true,
  zoom: 10,
};

const libraries: Libraries = ["places", "geometry"];

export default function Contact() {
  // begin: Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: libraries,
  });

  const [, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(_) {
    setMap(null);
  }, []);
  // end: Google Maps

  // begin: form
  const emailForm = useRef<HTMLInputElement>();
  const nameForm = useRef<HTMLInputElement>();
  const msgForm = useRef<HTMLTextAreaElement>();
  const numberForm = useRef<HTMLInputElement>();
  const [formSuccess, setFormSuccess] = useState(false);

  const submitMessage = useCallback(() => {
    fetch("https://" + USER_MS + "/contact", {
      method: "POST",
      body: JSON.stringify({
        email: emailForm.current.value,
        name: nameForm.current.value,
        number: numberForm.current.value,
        msg: msgForm.current.value,
      }),
    }).then(() => {
      setFormSuccess(true);
    });
  }, [emailForm, nameForm, numberForm, msgForm]);
  // end: form
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Contact Us - Pod Plug</title>
      </Head>
      {/* Header */}
      <Header current="/contact" />

      {/* Main */}
      {/* Left page */}
      <main className="flex flex-col items-center pt-16 outer-container md:pt-36 bg-background-gray">
        <div className="container flex flex-col items-center md:flex-row">
          <div className="flex flex-col w-full md:pr-16 md:w-1/2">
            <div className="text-5xl font-bold font-raleway">
              Drop us a note
            </div>
            <div className="text-lg font-raleway">
              <div className="mt-6">
                Curious to learn more about our product?
              </div>
              <div className="mt-6">
                Reach out to us at our email or number, or find us at our
                headquarters in Dallas, TX.
              </div>
              <div className="mt-6">
                Alternatively, fill in the form, and we will aim to respond
                within two working days.
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitMessage();
              }}
              className="flex flex-col mt-4"
            >
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold font-raleway">NAME</label>
                <input
                  className="p-1 border-black rounded-lg border-3"
                  type="text"
                  ref={nameForm}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold font-raleway">EMAIL</label>
                <input
                  className="p-1 border-black rounded-lg border-3"
                  type="email"
                  ref={emailForm}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold font-raleway">NUMBER</label>
                <input
                  className="p-1 border-black rounded-lg border-3"
                  type="tel"
                  ref={numberForm}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold font-raleway">
                  MESSAGE
                </label>
                <textarea
                  className="p-1 border-black rounded-lg border-3"
                  ref={msgForm}
                />
              </div>
              {formSuccess && (
                <div className="font-raleway text-green-800">
                  Thanks for reaching out!
                </div>
              )}
              <input
                type="submit"
                value="Send"
                className="bg-white self-end p-1 px-12 mt-4 text-sm font-semibold border-black rounded-lg cursor-pointer font-raleway border-3"
              />
            </form>
          </div>
          {/* Right page */}
          <div className="h-full mt-16 w-full md:pl-16 md:w-1/2 md:mt-0">
            <div className="w-full h-96">
              {isLoaded && (
                <GoogleMap
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  mapContainerStyle={containerStyle}
                  clickableIcons={false}
                  options={mapOptions}
                />
              )}
            </div>
            <div className="flex-row justify-around hidden w-full mt-6 text-theme-dark md:flex">
              <div className="flex flex-col">
                <div className="flex flex-row justify-between h-full">
                  <FontAwesomeIcon icon={faBuilding} className="w-6 h-6 mr-8" />
                  <div className="text-black">
                    7411 Hines Pl
                    <br />
                    Suite 119, Dallas
                    <br />
                    TX 75235
                  </div>
                </div>
                <div className="flex flex-row">
                  <FontAwesomeIcon
                    icon={faFacebookSquare}
                    className="w-6 h-6 mr-8"
                  />
                  <div className="text-black">@podplug</div>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex flex-row">
                  <FontAwesomeIcon icon={faPhone} className="w-6 h-6 mr-8" />
                  <div className="text-black">+1 310-430-0031</div>
                </div>
                <div className="flex flex-row">
                  <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 mr-8" />
                  <div className="text-black">hi@podplug.com</div>
                </div>
                <div className="flex flex-row">
                  <FontAwesomeIcon
                    icon={faInstagramSquare}
                    className="w-6 h-6 mr-8"
                  />
                  <div className="text-black">@podplug</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:pt-48" />
      </main>
      <Footer />
    </>
  );
}
