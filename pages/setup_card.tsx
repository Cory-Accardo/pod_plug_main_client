import SignupHeader from "../components/SignupHeader";
import styles from "../styles/SetupCard.module.css";
import useSignedInOnly from "../hooks/useSignedInOnly";
import { API, JSON_HEADER } from "../constants";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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

  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [cookies] = useCookies(["x-token", "x-refresh-token"]);
  const [loading, setLoading] = useState(false);

  const removeCard = useCallback(
    (cardId) => {
      return new Promise<void>((resolve) => {
        fetch(API + "/auth/remove_card", {
          method: "DELETE",
          headers: {
            ...JSON_HEADER,
            "x-token": cookies["x-token"],
            "x-refresh-token": cookies["x-refresh-token"],
          },
          body: JSON.stringify({
            card: cardId,
          }),
        }).then(() => {
          resolve();
        });
      });
    },
    [cookies]
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);

      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

      // If editing, delete first
      if (router.query.edit) {
        await removeCard(router.query.edit);
      }

      // Retrieve clientSecret
      fetch(API + "/auth/setup_card", {
        method: "POST",
        headers: {
          "x-token": cookies["x-token"],
          "x-refresh-token": cookies["x-refresh-token"],
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else if (res.status === 406) {
            setGeneralError(
              "You can at most have 3 cards associated with your account."
            );
            setLoading(false);
            return null;
          }
        })
        .then((clientSecret) => {
          if (clientSecret) {
            stripe
              .confirmCardSetup(clientSecret, {
                payment_method: {
                  card: elements.getElement(CardElement),
                },
              })
              .then((result) => {
                if (result.error) {
                  setGeneralError(result.error.message);
                } else {
                  fetch(API + "/auth/check_duplicate_cards", {
                    method: "POST",
                    headers: {
                      "x-token": cookies["x-token"],
                      "x-refresh-token": cookies["x-refresh-token"],
                    },
                  }).then((res) => {
                    if (res.status === 200) {
                      fetch(API + "/auth/list_cards", {
                        method: "POST",
                        headers: {
                          "x-token": cookies["x-token"],
                          "x-refresh-token": cookies["x-refresh-token"],
                        },
                      })
                        .then((res) => {
                          return res.json();
                        })
                        .then((json) => {
                          if (json.data.length === 1) {
                            fetch(API + "/auth/update_default_payment", {
                              method: "PUT",
                              headers: {
                                ...JSON_HEADER,
                                "x-token": cookies["x-token"],
                                "x-refresh-token": cookies["x-refresh-token"],
                              },
                              body: JSON.stringify({
                                card: json.data[0].id,
                              }),
                            }).then(() => {
                              router.push("/cards");
                            });
                          } else {
                            router.push("/cards");
                          }
                        });
                    } else if (res.status === 202) {
                      setGeneralError(
                        "This card is already added to your account."
                      );
                    } else {
                      setGeneralError(
                        "An unknown error has occured. Please try again later."
                      );
                    }
                  });
                }
                setLoading(false);
              });
          }
        });
    },
    [cookies, elements, removeCard, router, stripe]
  );

  const [generalError, setGeneralError] = useState("");

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-content flex flex-col items-center"
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
        />
      </label>
      {generalError !== "" && (
        <div className="text-lg text-red-800">{generalError}</div>
      )}
      <button
        type="submit"
        disabled={!stripe}
        className={`${styles.payButton} w-96`}
      >
        {!loading ? (
          "USE CARD"
        ) : (
          <div className="flex flex-col items-center">
            <FontAwesomeIcon
              icon={faSpinner}
              className="w-5 h-5 animate-spin"
            ></FontAwesomeIcon>
          </div>
        )}
      </button>
    </form>
  );
}

const SetupCard: React.FC = () => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Edit Payment Method - Pod Plug</title>
      </Head>
      <SignupHeader text="my cards" link="/cards" />
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
          <div className="font-bold text-4xl text-center mb-8">
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
};

export default SetupCard;
