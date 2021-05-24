/**
 * Created by Haowen Liu in 2021
 * Pod Plug main page
 */

import Head from "next/head";

import Header from "../components/Header";
import Image from "../components/Image";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Home - Pod Plug</title>
      </Head>
      {/* Header */}
      <Header current="/" />
      <div className="text-center text-black text-thin font-raleway text-lg shadow-md">
        Cashless Convenience in Age-gated Venues
      </div>

      {/* Main content */}
      <div
        className="flex flex-row justify-around relative"
        style={{ height: "52rem" }}
      >
        <div className="flex flex-col relative">
          <div
            className="font-acumin font-bold text-7xl text-title-black mt-48"
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
          >
            Join Pod Rewards
          </div>
          <div className="text-3xl font-raleway font-semibold mt-4 text-subtitle-gray">
            Get exclusive offers, discounts, and rebates
          </div>
          <input
            type="text"
            className="border-3 border-subtitle-gray rounded-lg mt-2 text-lg p-1 text-subtitle-gray w-3/4 self-start"
          ></input>
          <button className="border-3 border-subtitle-gray rounded-lg mt-3 text-lg py-1 text-subtitle-gray self-start px-8 font-raleway font-semibold">
            Sign Up
          </button>
        </div>
        <div
          className="w-full bottom-0 h-96 block absolute"
          style={{
            backgroundImage: 'url("skyline_full_1080p.png")',
            backgroundSize: "contain",
            backgroundRepeat: "repeat-x",
          }}
        ></div>
        <div
          className="relative"
          style={{ width: "calc(52rem / 2249 * 1315)" }}
        >
          <Image
            src="/kiosk_full"
            alt="Pod Plug kiosk"
            layout="responsive"
            height={2249}
            width={1315}
          />
        </div>
      </div>
    </>
  );
}
