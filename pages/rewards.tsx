import Head from "next/head";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";

import Header from "../components/Header";
import Footer from "../components/Footer";
import RewardsCard from "../components/RewardsCard";

export default function Rewards() {
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

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Pod Rewards - Pod Plug</title>
      </Head>
      {/* Header */}
      <Header current="/rewards" />

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
            style={{ top: "36rem", left: "47vw" }}
          />
          <img
            src="/clouds_big.png"
            alt="Clouds"
            className="absolute hidden opacity-80 md:block z-clouds transform scale-75"
            style={{ top: "60rem", left: "-15vw" }}
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
            style={{ top: "88rem", left: "65vw" }}
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
            style={{ top: "170rem", left: "40vw" }}
          />
        </div>
        {/* Top */}
        <div className="outer-container flex flex-col items-center md:h-page_md lg:h-page relative z-content">
          <div className="absolute right-0 bottom-32 top-32 2xl:right-16 flex-col items-end hidden lg:flex">
            <img
              src="/rewards.svg"
              alt="Rewards illustration"
              className="h-full"
            ></img>
          </div>
          <div className="container flex flex-col items-center md:items-start mt-24 mb-24 md:mb-0 md:mt-64 w-full">
            <div className="font-raleway font-bold text-4xl md:text-4.5xl xl:text-5xl mb-4 mt-auto text-center md:text-left">
              Enhance you evening out
            </div>
            <div className="flex flex-col w-full md:w-max">
              <div className="font-raleway font-bold text-xl sm:text-2xl tracking-wider mb-4 text-center md:text-left text-theme-dark md:text-black">
                Get exclusive product and venue offers
              </div>
              <input
                className="p-1 rounded-lg border-3 text-base border-subtitle-gray md:border-theme-dark w-full md:w-4/5"
                placeholder="youremail@example.com"
                ref={emailForm}
                onChange={() => {
                  setFormError(false);
                  setFormInvalid(false);
                  setFormSuccess(false);
                }}
              ></input>
              {formInvalid && (
                <div className="text-red-800 font-raleway">
                  Please enter a valid email address!
                </div>
              )}
              {formError && (
                <div className="text-red-800 font-raleway">
                  Network error. Please try again later.
                </div>
              )}
              {formSuccess && (
                <div className="text-green-800 font-raleway">
                  Thank you for signing up!
                </div>
              )}
            </div>
            <button
              className="button-dark py-1 px-4 w-full md:w-auto mt-4"
              onClick={() => {
                signup();
              }}
            >
              Get Offers Today
            </button>
          </div>
        </div>
        {/* Offers you could receive */}
        <div className="outer-container flex flex-col items-center pb-24 md:py-24 relative z-content">
          <div className="container">
            <div className="text-3xl font-semibold text-center lg:text-4xl xl:text-5xl">
              You could receive
            </div>
            <div className="flex flex-col md:flex-row justify-around mt-12 md:mt-16 items-center">
              <div className="rounded-3xl bg-white w-64 h-64 max-w-full md:w-52 lg:w-64 md:h-52 lg:h-64 shadow-xl font-raleway relative mb-6">
                <div
                  className="font-black text-theme-light text-3.9xl md:text-2.9xl lg:text-3.9xl text-center mt-11 lg:mt-16"
                  style={{ textShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)" }}
                >
                  Welcome to Pod Rewards!
                </div>
                <div className="text-theme-light text-center font-semibold text-lg md:text-base lg:text-lg absolute bottom-6 md:bottom-4 lg:bottom-6 px-2">
                  $10 off your first purchase of any nicotine product just for
                  signing up
                </div>
              </div>
              <div className="rounded-3xl bg-white w-64 h-64 max-w-full md:w-52 lg:w-64 md:h-52 lg:h-64 shadow-xl font-raleway relative mb-6">
                <img
                  src="/iphone_rewards.png"
                  alt="iPhone rewards"
                  className="relative transform left-1/2 -translate-x-1/2 h-28 md:h-24 lg:h-28 mt-8 md:mt-6 lg:mt-8"
                ></img>
                <div className="text-theme-light text-center font-semibold text-lg md:text-base lg:text-lg absolute bottom-6 md:bottom-4 lg:bottom-6 px-2">
                  $1 off any product when you use Pod Rewards
                </div>
              </div>
              <div className="rounded-3xl bg-white w-64 h-64 max-w-full md:w-52 lg:w-64 md:h-52 lg:h-64 shadow-xl font-raleway relative mb-6">
                <img
                  src="/rewards_tag.png"
                  alt="Reward tags"
                  className="relative transform left-1/2 -translate-x-1/2 h-44 md:h-36 lg:h-44"
                ></img>
                <div className="text-theme-light text-center font-semibold text-lg md:text-base lg:text-lg absolute bottom-6 md:bottom-4 lg:bottom-6 px-2">
                  Get exclusive discounts on brands and products
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Rewards as easy as */}
        <div className="outer-container flex flex-col items-center pb-24 md:py-24 relative z-content">
          <div className="container">
            <div className="text-3xl font-semibold text-center lg:text-4xl xl:text-5xl mb-8">
              Rewards as easy as 1 2 3
            </div>
            <div className="flex flex-col items-center">
              <RewardsCard
                index={1}
                title="Scan the QR code"
                image=""
              ></RewardsCard>
              <RewardsCard
                index={2}
                title="Sign up or sign in"
                image=""
              ></RewardsCard>
              <RewardsCard
                index={3}
                title="Buy items as you usually would with the machine"
                image=""
              ></RewardsCard>
              <RewardsCard
                index={4}
                title="Receive your confirmation email and enjoy!"
                image=""
              ></RewardsCard>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
}
