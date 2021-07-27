import SignupHeader from "../components/SignupHeader";
import styles from "../styles/SetupCard.module.css";
import useSignedInOnly from "../hooks/useSignedInOnly";
import { JSON_HEADER, MAIN } from "../constants";

import Head from "next/head";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCookies } from "react-cookie";

const stripePromise = loadStripe(
  "pk_test_51IqWoeJsYPVWfSRXUGgucGNsp7DkKcis89HjqiV6WhqHFd7AXCJBaQrBuntDYKlAMvae3IinpH6Fx6xt6Nv7iwiX00lVd7NgKs"
);

function CardForm() {
  // Ensure signed in
  useSignedInOnly();

  const stripe = useStripe();
  const elements = useElements();
  const [cookies] = useCookies(["x-token", "x-refresh-token"]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Retrieve clientSecret
    fetch(MAIN + "/setupCard", {
      method: "POST",
      headers: {
        ...JSON_HEADER,
        "x-token": cookies["x-token"],
        "x-refresh-token": cookies["x-refresh-token"],
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((clientSecret) => {
        stripe
          .confirmCardSetup(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          })
          .then((result) => {
            if (result.error) {
              console.log(result.error.message);
            } else {
              console.log("cardSetup success");
            }
          });
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-content font-raleway flex flex-col items-center"
    >
      <label className="w-96">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "15",
                color: "#424770",
                letterSpacing: "0.025em",
                fontFamily: "Raleway, monospace",
                "::placeholder": {
                  color: "#8c9eaf",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          onReady={() => {
            console.log("CardElement [ready]");
          }}
          onChange={(event) => {
            console.log("CardElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardElement [blur]");
          }}
          onFocus={() => {
            console.log("CardElement [focus]");
          }}
        />
      </label>
      <button
        type="submit"
        disabled={!stripe}
        className={`${styles.payButton} w-96`}
      >
        USE CARD
      </button>
    </form>
  );
}

export default function SetupCard() {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>About Us - Pod Plug</title>
      </Head>
      <SignupHeader />
      <main className="relative overflow-hidden">
        {/* Clouds */}
        <div className="absolute z-clouds w-full">
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds"
            style={{ top: "-2rem", left: "55vw" }}
          />
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds"
            style={{ top: "0rem", left: "-10vw" }}
          />
          <img
            src="/clouds_big.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds transform scale-75"
            style={{ top: "10rem", left: "-5vw" }}
          />
          <img
            src="/clouds_big.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds transform scale-50"
            style={{ top: "16rem", left: "55vw" }}
          />
        </div>
        {/* Skyline */}
        <div className="absolute h-80 w-full" style={{ top: "35rem" }}>
          <div
            className="absolute h-96 z-bg opacity-30 bottom-0 left-0 right-0"
            style={{
              backgroundImage: 'url("/skyline_full.png")',
              backgroundSize: "auto 100%",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "bottom left",
            }}
          />
        </div>
        <div className="outer-container flex flex-col items-center mt-36">
          <div className="font-raleway font-bold text-4xl text-center mb-8">
            Payment Method
          </div>
          <div className="container">
            <Elements stripe={stripePromise}>
              <CardForm />
            </Elements>
          </div>
        </div>
      </main>
    </>
  );
}
