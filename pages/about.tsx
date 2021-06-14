import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "../components/Image";

import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>About Us - Pod Plug</title>
      </Head>
      {/* Header */}
      <Header current="/about" />

      <main className="bg-background-gray">
        <div className="outer-container flex flex-col items-center py-24">
          <div className="container flex flex-row">
            <div className="flex flex-col items-center w-1/2">
              <div className="inline-block my-auto">
                <div className="font-raleway font-bold text-7xl">
                  Get to know us
                </div>
                <div className="font-raleway text-lg w-3/4 mt-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </div>
              </div>
            </div>
            <div className="w-1/2 p-24 flex flex-row items-center">
              <div
                className="relative mx-auto w-full"
                style={{ maxWidth: "18rem" }}
              >
                <Image
                  src="/logo_dark_half"
                  alt="Pog plug logo"
                  layout="responsive"
                  height={1294}
                  width={2097}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col outer-container py-24 relative">
          <div
            className="absolute w-full h-full left-0 top-0 z-bg opacity-30"
            style={{
              backgroundImage: 'url("skyline_full.png")',
              backgroundSize: "contain",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "bottom",
            }}
          ></div>
          <div className="flex flex-row container justify-around relative z-content">
            <div className="bg-white rounded-3xl w-72 h-64 p-8 flex flex-col shadow-lg justify-around">
              <div className="self-center font-raleway font-semibold text-xl">
                Our Mission
              </div>
              <div className="font-raleway text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </div>
            </div>
            <div className="bg-white rounded-3xl w-72 h-64 p-8 flex flex-col shadow-lg justify-around">
              <div className="self-center font-raleway font-semibold text-xl">
                Our Vision
              </div>
              <div className="font-raleway text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </div>
            </div>
            <div className="bg-white rounded-3xl w-72 h-64 p-8 flex flex-col shadow-lg justify-around">
              <div className="self-center font-raleway font-semibold text-xl">
                Our Purpose
              </div>
              <div className="font-raleway text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </div>
            </div>
          </div>
        </div>
        <div className="pt-24"></div>
      </main>

      <Footer />
    </>
  );
}
