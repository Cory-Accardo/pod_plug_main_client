import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import SignupHeader from "../components/SignupHeader";

export default function Signup() {
  const { query } = useRouter();
  const [firstForm, setFirstForm] = useState(true);
  const [agreeEmail, setAgreeEmail] = useState(false);
  const [agreeSendInfo, setAgreeSendInfo] = useState(false);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Sign Up - Pod Plug</title>
      </Head>
      {/* Header */}
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
          {!firstForm && (
            <>
              <img
                src="/clouds_blue.png"
                alt="Clouds"
                className="absolute opacity-80 z-clouds block lg:hidden"
                style={{ top: "38rem", left: "-10vw" }}
              />
              <img
                src="/clouds_big.png"
                alt="Clouds"
                className="absolute opacity-80 z-clouds transform scale-75 block lg:hidden"
                style={{ top: "47rem", left: "45vw" }}
              />
            </>
          )}
        </div>
        {/* First form */}
        <motion.div
          className="outer-container flex flex-col items-center relative z-content"
          initial={{ transform: "translateX(0vw)" }}
          animate={{
            transform: firstForm ? "translateX(0vw)" : "translateX(-100vw)",
          }}
        >
          <div className="container">
            <div className="relative transform left-1/2 -translate-x-1/2 flex flex-col w-112 max-w-full py-24">
              <div className="font-raleway font-bold text-4xl text-center">
                Create an Account
              </div>
              <div className="font-raleway font-bold text-subtitle-gray text-xl text-center mt-2">
                Join our rewards program today
              </div>
              <form className="flex flex-col">
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold font-raleway">
                    EMAIL
                  </label>
                  <input
                    className="p-1 border-black rounded-lg border-3"
                    type="email"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold font-raleway">
                    PASSWORD
                  </label>
                  <input
                    className="p-1 border-black rounded-lg border-3"
                    type="password"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold font-raleway">
                    RE-ENTER PASSWORD
                  </label>
                  <input
                    className="p-1 border-black rounded-lg border-3"
                    type="password"
                  />
                </div>
                <button
                  className="bg-white p-1 px-12 mt-4 text-sm font-bold border-black rounded-lg cursor-pointer font-raleway border-3 text-black self-end"
                  onClick={(e) => {
                    e.preventDefault();
                    setFirstForm(false);
                  }}
                >
                  Next
                </button>
              </form>
            </div>
          </div>
        </motion.div>
        {!firstForm && <div className="h-136 lg:h-32"></div>}
        <motion.div
          className="outer-container flex flex-col items-center absolute w-full top-0 z-content"
          initial={{ transform: "translateX(100vw)" }}
          animate={{
            transform: firstForm ? "translateX(100vw)" : "translateX(0vw)",
          }}
        >
          <div className="container max-w-full">
            <div className="relative transform left-1/2 -translate-x-1/2 flex flex-col py-24 w-112 max-w-full lg:w-auto">
              <div className="font-raleway font-bold text-4xl text-center">
                Billing Information
              </div>
              <div className="font-raleway font-bold text-subtitle-gray text-xl text-center mt-2">
                Enter your details below
              </div>
              <form className="flex flex-col lg:flex-row font-raleway justify-center items-center">
                <div className="flex flex-col w-112 max-w-full mr-0 lg:mr-16 mt-4">
                  <div className="font-bold mt-4 text-lg">
                    Billing Information
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-bold">FULL NAME</label>
                    <input
                      className="p-1 border-black rounded-lg border-3"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="text-sm font-bold">EMAIL</label>
                    <input
                      className="p-1 border-black rounded-lg border-3"
                      type="email"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="text-sm font-bold">ADDRESS</label>
                    <input
                      className="p-1 border-black rounded-lg border-3"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="text-sm font-bold">CITY</label>
                    <input
                      className="p-1 border-black rounded-lg border-3"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-row mt-4">
                    <div className="flex flex-col w-1/2 pr-1">
                      <label className="text-sm font-bold">STATE</label>
                      <input
                        className="p-1 border-black rounded-lg border-3"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col w-1/2 pl-1">
                      <label className="text-sm font-bold">ZIP</label>
                      <input
                        className="p-1 border-black rounded-lg border-3"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="text-sm font-bold">COUNTRY</label>
                    <input
                      className="p-1 border-black rounded-lg border-3"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-112 mt-4 max-w-full lg:w-auto">
                  <div className="font-bold mt-4 text-lg">
                    Payment Information
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-bold">CARD NUMBER</label>
                    <input
                      className="p-1 border-black rounded-lg border-3"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-row mt-4">
                    <div className="flex flex-col w-1/2 pr-1">
                      <label className="text-sm font-bold">EXPIRY</label>
                      <input
                        className="p-1 border-black rounded-lg border-3"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col w-1/2 pl-1">
                      <label className="text-sm font-bold">
                        CVV/CVC NUMBER
                      </label>
                      <input
                        className="p-1 border-black rounded-lg border-3"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row mt-8 md:mt-20 items-center">
                    <button
                      className="border-3 border-black rounded-md relative mr-4 min-w-5 max-w-5 min-h-5 max-h-5"
                      onClick={(e) => {
                        e.preventDefault();
                        setAgreeEmail((orig) => !orig);
                      }}
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
                      I agree to receiving future offers in my email or via
                      post.
                      <span className="text-red-600">*</span>
                    </div>
                  </div>
                  <div className="flex flex-row mt-4 items-center">
                    <button
                      className="border-3 border-black rounded-md relative mr-4 min-w-5 max-w-5 min-h-5 max-h-5"
                      onClick={(e) => {
                        e.preventDefault();
                        setAgreeSendInfo((orig) => !orig);
                      }}
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
                      I agree to allow my information to be sent to future
                      vendor and venue partners.
                      <span className="text-red-600">*</span>
                    </div>
                  </div>
                  <button
                    className="bg-white p-1 px-12 mt-8 lg:mt-16 text-sm font-bold border-black rounded-lg cursor-pointer font-raleway border-3 text-black self-end"
                    onClick={(e) => {
                      e.preventDefault();
                      setFirstForm(false);
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
        {/* Skyline */}
        <div className="relative h-80">
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
      </main>
    </>
  );
}
