import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
  faCheckSquare,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import CheckoutHeader from "../components/CheckoutHeader";
import Footer from "../components/Footer";
import useSignedInOnly from "../hooks/useSignedInOnly";
import Image from "../components/Image";

const SERVER = "http://localhost:2000/";

const payment_ms_url = "http://localhost:8080"; //change as needed

enum PaymentStates {
  Waiting = 0,
  Connected,
  Success,
  ConnectionRetrying,
  ConnectionError,
  ConnectionLost,
}

export default function Checkout() {
  useSignedInOnly();
  const router = useRouter();

  const [state, setState] = useState(PaymentStates.Waiting);
  const [cookies] = useCookies(["x-token", "x-refresh-token"]);
  const [socket, setSocket] = useState(undefined);
  const [retryCount, setRetryCount] = useState(2);

  useEffect(() => {
    setSocket(io(SERVER, { transports: ["websocket"] }));
  }, []);

  useEffect(() => {
    if (socket) {
      if (router.isReady) {
        if (router.query["terminalId"] === undefined) {
          router.push("/");
          return;
        }
        socket.on("connect", () => {
          var retry = true;
          while (retry) {
            retry = false;
            fetch(payment_ms_url + "/payments/notify", {
              method: "POST",
              body: JSON.stringify({
                terminalId: router.query["terminalId"],
              }),
              headers: {
                "x-token": cookies["x-token"],
                "x-refresh-token": cookies["x-refresh-token"],
              },
            }).then((res) => {
              if (res.status === 200) {
                setState(PaymentStates.Connected);
                setTimeout(() => {
                  setState(PaymentStates.Success);
                }, 300);
              } else {
                if (retryCount > 0) {
                  setRetryCount(retryCount - 1);
                  setState(PaymentStates.ConnectionRetrying);
                  retry = true;
                } else {
                  setState(PaymentStates.ConnectionError);
                }
              }
            });
          }
        });
        socket.on("connect_error", () => {
          setState(PaymentStates.ConnectionError);
        });

        socket.on("sale-obj", (data) => {
          const { products, customer, amount } = data;
          console.log(products);
          console.log(customer);
          console.log(amount);
        });

        socket.on("payment-error", (data) => {
          const { error_code, error } = data;
          console.log(error_code);
          console.log(error);
        });

        socket.on("payment-success", () => {
          console.log("Payment success");
        });
      }
    }
  }, [router, socket, cookies, retryCount]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Checkout - Pod Plug</title>
      </Head>
      <CheckoutHeader />
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
          <div className="flex flex-col items-center z-content relative font-raleway">
            <div className="text-4xl font-black text-center">
              {(state === PaymentStates.Waiting ||
                state === PaymentStates.Connected) &&
                "Contacting Machine..."}
              {state === PaymentStates.Success && "Success!"}
              {(state === PaymentStates.ConnectionRetrying ||
                state === PaymentStates.ConnectionError) &&
                "Oops!"}
              {state === PaymentStates.ConnectionLost && "Connection lost!"}
            </div>
            <div className="text-xl text-subtitle-gray text-center mt-4">
              {(state === PaymentStates.Waiting ||
                state === PaymentStates.Connected) &&
                "Thanks for your patience!"}
              {state === PaymentStates.Success &&
                "Please select items from the machine!"}
              {state === PaymentStates.ConnectionRetrying &&
                "Something went wrong! Trying again..."}
              {state === PaymentStates.ConnectionError &&
                "We couldn't establish a connection. Please try again later."}
              {state === PaymentStates.ConnectionLost &&
                "It’s no big deal! Check the machine display instead for any issues!"}
            </div>
            {state === PaymentStates.ConnectionLost && (
              <div className="text-xl text-subtitle-gray text-center mt-4">
                Enjoy Pod Rewards!
              </div>
            )}
            {state === PaymentStates.Waiting && (
              <FontAwesomeIcon
                icon={faSpinner}
                className="animate-spin-slow w-20 mt-16"
              />
            )}
            {state === PaymentStates.Connected && (
              <FontAwesomeIcon
                icon={faCheckSquare}
                className="w-20 mt-16 text-green-600"
              />
            )}
            {(state === PaymentStates.ConnectionError ||
              state === PaymentStates.ConnectionRetrying) && (
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="w-20 mt-16 text-red-600"
              />
            )}
            {state === PaymentStates.Success && (
              <div className="relative w-56 mt-4">
                <Image
                  src="/kiosk_full"
                  alt="Kiosk"
                  layout="responsive"
                  height={2028}
                  width={1209}
                />
              </div>
            )}
          </div>
          <div
            className="absolute w-full h-56 left-0 bottom-0 z-bg opacity-30"
            style={{
              backgroundImage: 'url("/skyline_full.png")',
              backgroundSize: "auto 100%",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "bottom left",
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
