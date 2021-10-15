import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
  faCheckSquare,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";
import { io, Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import CheckoutHeader from "../components/CheckoutHeader";
import Footer from "../components/Footer";
import Image from "../components/Image";
import imageFromCardBrand from "../hooks/imageFromCardBrand";
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IqWoeJsYPVWfSRXUGgucGNsp7DkKcis89HjqiV6WhqHFd7AXCJBaQrBuntDYKlAMvae3IinpH6Fx6xt6Nv7iwiX00lVd7NgKs');

const SERVER = "https://payment.podplug.com:2000/";
// const SERVER = "http://localhost:2000";

enum PaymentStates {
  Waiting = 0,
  Connected,
  Success,
  ConnectionRetrying,
  ConnectionError,
  ConnectionLost,
  PaymentProcessing,
  PaymentSuccess,
  ThankYou,
  AuthorizationRequired,
  PaymentFailure,
}

const Checkout: React.FC = () => {
  const router = useRouter();

  const [state, setState] = useState(PaymentStates.Waiting);
  const [cookies] = useCookies(["x-token", "x-refresh-token"]);
  const [retryCount, setRetryCount] = useState(2);
  const [paymentAmount, setPaymentAmount] = useState(undefined);
  const [last4, setLast4] = useState(undefined);
  const [cardBrand, setCardBrand] = useState(undefined);
  const [paymentError, setPaymentError] = useState(undefined)

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const socket = io(SERVER, {
      transports: ["websocket"],
      reconnection: false,
      upgrade: false,
    });
    socket.on("connect", () => {
      console.log(socket.id);
      let retry = true;
      while (retry) {
        retry = false;
        socket.emit(
          "notify",
          {
            refreshToken: cookies["x-refresh-token"],
            terminalId: router.query["terminalId"],
          },
          (response) => {
            if(response.status === "no_default_payment"){ //user has no default payment enabled
              socket.disconnect();
              router.push("/cards");
              return;
            }
            if(response.status === "unauthorized"){ //user is not logged in, or has a bad session
              socket.disconnect();
              router.push("/login");
              return;
            }
            if (response.status === "success") {
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
                socket.disconnect();
              }
            }
          }
        );
      }
    });

    socket.on("disconnect", () => {
      console.log(state);
      console.log("DISCONNECTED"); // false
    });

    socket.on("connect_error", () => {
      setState(PaymentStates.ConnectionError);
      socket.disconnect();
    });

    socket.on("sale-obj", (data) => {
      const { paymentMethod, amount } = data;
      setPaymentAmount(amount * 100);
      setLast4(paymentMethod.card.last4);
      setCardBrand(paymentMethod.card.brand);
      setState(PaymentStates.PaymentProcessing);
    });

    socket.on("payment-error", async (data) => {
      const { error_code, error } = data;
      console.log(error_code);
      console.log(error);
      setPaymentError(error);

      // if(error_code === "authentication_required"){
      //   const { intent } = data;
      //   console.log(intent);
      //   const stripe = await stripePromise;
      //   stripe.confirmCardPayment(intent.client_secret, {
      //     payment_method: intent.last_payment_error.payment_method.id
      //   }).then((result) => {
      //     if (result.error) {
      //       setPaymentError(result.error.message)
      //       setState(PaymentStates.PaymentFailure)
      //       socket.disconnect();
      //     }
      //     // else {
      //     //   if (result.paymentIntent.status === 'succeeded') {
      //     //     setState(PaymentStates.PaymentSuccess);
      //     //     setTimeout(() => {
      //     //       setState(PaymentStates.ThankYou);
      //     //       socket.disconnect();
      //     //     }, 1000);
      //     //   }
      //     // }
      //   });
      // }
      // else{
        setState(PaymentStates.PaymentFailure);
        socket.disconnect();
      // }

    });

    socket.on("payment-success", () => {
      setState(PaymentStates.PaymentSuccess);
      setTimeout(() => {
        setState(PaymentStates.ThankYou);
        socket.disconnect();
      }, 3000);
    });
  }, [cookies, retryCount, router]);


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
        <div className={"h-140 relative bg-background-gray px-8"}>
          <div className="flex flex-col items-center z-content relative">
            <div
              className={
                "text-4xl font-black text-center " +
                ((state === PaymentStates.PaymentProcessing ||
                  state === PaymentStates.PaymentSuccess) &&
                  "transform -translate-y-6")
              }
            >
              {(state === PaymentStates.Waiting ||
                state === PaymentStates.Connected) &&
                "Contacting Machine..."}
              {state === PaymentStates.Success && "Success!"}
              {(state === PaymentStates.ConnectionRetrying ||
                state === PaymentStates.ConnectionError) &&
                "Oops!"}
              {state === PaymentStates.ConnectionLost && "Connection lost!"}
              {(state === PaymentStates.PaymentProcessing ||
                state === PaymentStates.PaymentSuccess) &&
                "Processing payment!"}
              {state === PaymentStates.ThankYou &&
                "Thank you for using Pod rewards!"}
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
                "Your connection to our servers was interrupted! It’s no big deal! Check the machine display instead for any issues!"}
            </div>
            {state === PaymentStates.ConnectionLost && (
              <div className="text-xl text-subtitle-gray text-center mt-4">
                Enjoy Pod Rewards!
              </div>
            )}
            {(state === PaymentStates.Waiting ||
              state === PaymentStates.PaymentProcessing) && (
              <FontAwesomeIcon
                icon={faSpinner}
                className={
                  "animate-spin-slow w-20 " +
                  (state === PaymentStates.Waiting ? "mt-16" : "mt-0")
                }
              />
            )}
            {(state === PaymentStates.Connected ||
              state === PaymentStates.PaymentSuccess ||
              state === PaymentStates.ThankYou) && (
              <FontAwesomeIcon
                icon={faCheckSquare}
                className={
                  "w-20 text-green-600 " +
                  (state === PaymentStates.PaymentSuccess ? "mt-0" : "mt-16")
                }
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
            {(state === PaymentStates.PaymentProcessing ||
              state === PaymentStates.PaymentSuccess) && (
              <div className="h-16 rounded-full shadow-xl bg-white flex flex-row items-center px-8 mt-6">
                <span className="font-bold mr-4 text-xl">Total:</span>
                <span className="text-green-700 text-xl">
                  ${paymentAmount / 100}
                </span>
              </div>
            )}
            {(state === PaymentStates.PaymentProcessing ||
              state === PaymentStates.PaymentSuccess) && (
              <div className="bg-white rounded-xl shadow-xl h-40 w-64 max-w-full mt-6">
                <img
                  src={imageFromCardBrand(cardBrand)}
                  alt="Card brand logo"
                  className="h-[48px] w-[48px] mt-4 ml-6"
                ></img>
                <div className="text-xl text-center tracking-wide mt-8">
                  **** **** **** {last4}
                </div>
              </div>
            )}
            {(state === PaymentStates.PaymentFailure) && (
              <div>
                <div className="text-xl font-bold text-center mr-4 text-red-700 w-64 max-w-full mt-6">
                  {paymentError}
                </div>
                <div className="bg-white rounded-xl shadow-xl h-40 w-64 max-w-full mt-6">
                  <img
                    src={imageFromCardBrand(cardBrand)}
                    alt="Card brand logo"
                    className="h-[48px] w-[48px] mt-4 ml-6"
                  ></img>
                  <div className="text-xl text-center tracking-wide mt-8">
                    **** **** **** {last4}
                  </div>
                </div>
                <button onClick={() =>{
                  router.push("/cards")
                  return
                }}className="shadow-xl bg-blue-700 hover:bg-blue-600 w-64 max-w-full mt-6 text-center text-white py-2 px-4 rounded">Resolve</button>
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
};

export default Checkout;