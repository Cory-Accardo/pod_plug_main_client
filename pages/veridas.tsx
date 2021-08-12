import Head from "next/head";
import { useEffect, useState, useRef, useCallback } from "react";
import Footer from "../components/Footer";
import SignupHeader from "../components/SignupHeader";
import { API, VERIDAS_URL } from "../constants";

import { dlOptions } from "../veridasOptions";

export default function Veridas() {
  const [token, setToken] = useState(undefined);
  const veridasRef = useRef<HTMLIFrameElement>(null);
  const [licenseState, setLicenseState] = useState("Alaska");
  const stateRef = useRef<HTMLSelectElement>(undefined);
  const yearRef = useRef<HTMLSelectElement>(undefined);
  const [type, setType] = useState(undefined);
  const [completed, setCompleted] = useState(false);
  const [ocr, setOcr] = useState("");

  const start = useCallback(() => {
    if (stateRef && stateRef.current) {
      if (yearRef && yearRef.current) {
        setType(dlOptions[stateRef.current.value][yearRef.current.value]);
        fetch(API + "/auth/veridasToken", {
          method: "POST",
        })
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            setToken(json.access_token);
          });
      }
    }
  }, [stateRef, yearRef]);

  useEffect(() => {
    if (type) {
      const listener = (event) => {
        console.log(event.data);
        if (event.data.code === "ProcessStarted") {
          console.log(type);
          veridasRef.current.contentWindow.postMessage(
            {
              documentType: type,
              callbackData: {
                ocr: true,
              },
            },
            "*"
          );
        } else if (event.data.code === "ProcessCompleted") {
          setOcr(JSON.stringify(event.data));
          setCompleted(true);
        }
      };

      window.addEventListener("message", listener);

      return () => {
        window.removeEventListener("message", listener);
      };
    }
  }, [type]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Age Verification - Pod Plug</title>
      </Head>

      {!token && (
        <>
          <SignupHeader />
          <main className="relative">
            {/* Clouds */}
            <div className="absolute top-0 z-clouds w-full page">
              <img
                src="/clouds_blue.png"
                alt="Clouds"
                className="absolute opacity-80 z-clouds hidden md:block"
                style={{ top: "-4rem", left: "-10vw" }}
              />
              <img
                src="/clouds_blue.png"
                alt="Clouds"
                className="absolute opacity-80 z-clouds hidden md:block"
                style={{ top: "-2rem", left: "55vw" }}
              />
              <img
                src="/clouds_blue.png"
                alt="Clouds"
                className="absolute opacity-80 z-clouds md:hidden"
                style={{ top: "0rem", left: "-10vw" }}
              />
              <img
                src="/clouds_big.png"
                alt="Clouds"
                className="absolute opacity-80 z-clouds transform scale-75 hidden md:block"
                style={{ top: "6rem", left: "-5vw" }}
              />
              <img
                src="/clouds_big.png"
                alt="Clouds"
                className="absolute opacity-80 z-clouds transform scale-75 hidden xl:block"
                style={{ top: "10rem", left: "55vw" }}
              />
              <img
                src="/clouds_blue.png"
                alt="Clouds"
                className="absolute opacity-80 z-clouds transform md:hidden"
                style={{ top: "15rem", left: "60vw" }}
              />
            </div>
            <div className="pt-32 bg-background-gray"></div>
            <div className="h-140 relative bg-background-gray px-8">
              <div className="flex flex-col items-center z-content relative">
                <div className="text-4xl font-black text-center">
                  Age Verification
                </div>
                <div className="text-xl text-subtitle-gray text-center mt-4">
                  Please enter the details of your driver license.
                </div>
                <label className="mt-8 w-96 max-w-full font-semibold">
                  Issuing State
                  <select
                    className="w-full mt-2 border-3 border-subtitle-gray rounded-lg p-1"
                    value={licenseState}
                    onChange={(e) => {
                      setLicenseState(e.target.value);
                    }}
                    ref={stateRef}
                  >
                    {Object.keys(dlOptions).map((key) => (
                      <option key={key}>{key}</option>
                    ))}
                  </select>
                </label>
                <label className="mt-4 w-96 max-w-full font-semibold">
                  License Version
                  <select
                    className="w-full mt-2 border-3 border-subtitle-gray rounded-lg p-1"
                    ref={yearRef}
                  >
                    {Object.keys(dlOptions[licenseState]).map((year) => (
                      <option key={year}>{year}</option>
                    ))}
                  </select>
                </label>
                <button
                  className="text-white bg-header-black rounded-lg w-96 max-w-full mt-8 p-1"
                  onClick={() => start()}
                >
                  Next
                </button>
              </div>
            </div>
          </main>
          <Footer />
        </>
      )}
      {token && !completed && (
        <iframe
          ref={veridasRef}
          className="w-screen h-screen"
          allow="camera; microphone;"
          src={`https://${VERIDAS_URL}?access_token=${token}`}
          onLoad={(e) => {
            (e.target as HTMLIFrameElement).contentWindow.postMessage({}, "*");
          }}
        ></iframe>
      )}
      {completed && <div>{ocr}</div>}
    </>
  );
}
