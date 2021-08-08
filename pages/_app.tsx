import "../styles/globals.css";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const COOKIE_NAME = "age-confirmed";

function MyApp({ Component, pageProps }) {
  const [verified, setVerified] = useState(true);
  const [cookies, setCookie] = useCookies([COOKIE_NAME]);

  useEffect(() => {
    if (cookies[COOKIE_NAME]) {
      if (cookies[COOKIE_NAME] === "true") {
        setVerified(true);
      } else {
        setVerified(false);
      }
    } else {
      setVerified(false);
    }
  }, [cookies]);

  const verifyAge = useCallback(
    (old_enough) => {
      if (old_enough) {
        setVerified(true);
        setCookie(COOKIE_NAME, "true", { path: "/", sameSite: "strict" });
        document.cookie = `${COOKIE_NAME}=true`;
      } else {
        setVerified(false);
        setCookie(COOKIE_NAME, "false", { path: "/", sameSite: "strict" });
        location.href = "https://www.google.com";
      }
    },
    [setCookie]
  );

  return (
    <>
      {/* Age popover */}
      {!verified && (
        <>
          <div className="absolute h-full w-full bg-white opacity-50 z-overlay"></div>
          <div className="fixed top-44 bg-white rounded-2xl w-96 h-136 z-overlay left-1/2 transform -translate-x-1/2 shadow-2xl flex flex-col items-center overflow-hidden">
            <div className="absolute w-full h-full">
              <img
                src="/clouds_gray.png"
                alt="Clouds"
                className="absolute transform scale-75"
                style={{ left: "-10%" }}
              ></img>
              <img
                src="/clouds_gray.png"
                alt="Clouds"
                className="absolute transform scale-75"
                style={{
                  left: "35%",
                  top: "11rem",
                }}
              ></img>
              <img
                src="/clouds_gray.png"
                alt="Clouds"
                className="absolute"
                style={{
                  left: "30%",
                  top: "26rem",
                }}
              ></img>
            </div>
            <img
              src="/age.svg"
              alt="Age 21 warning"
              className="w-48 mt-16 pt-2 relative"
            />
            <div className="font-black font-raleway text-2xl mt-4 relative">
              Are you over 21?
            </div>
            <div className="flex flex-row mt-20 relative">
              <button
                className="font-raleway text-xl border-3 border-theme-dark rounded py-2 w-28 bg-button-emphasis hover:bg-button-hover relative"
                onClick={() => {
                  verifyAge(true);
                }}
              >
                Yes!
              </button>
              <button
                className="font-raleway text-xl border-3 border-theme-dark rounded py-2 w-28 ml-10 bg-white hover:bg-button-hover relative"
                onClick={() => {
                  verifyAge(false);
                }}
              >
                Nope!
              </button>
            </div>
          </div>
        </>
      )}
      <Component {...pageProps} />{" "}
    </>
  );
}

export default MyApp;
