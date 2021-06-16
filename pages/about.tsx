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
        {/* Clouds */}
        <div className="absolute z-clouds w-full page">
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
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds md:hidden transform scale-150"
            style={{ top: "40rem", left: "-25vw" }}
          />
        </div>
        <div className="outer-container flex flex-col items-center pt-8 md:pt-24 pb-12 relative z-content">
          <div className="container flex flex-col-reverse md:flex-row items-center">
            <div className="flex flex-col items-center md:items-start md:w-1/2">
              <div className="inline-block my-auto">
                <div className="font-raleway font-bold text-6xl md:text-4.9xl lg:text-6xl xl:text-7xl text-center md:text-left leading-tight">
                  Get to <br className="block sm:hidden"/> know us
                </div>
                <div className="px-4 md:px-0 font-raleway text-lg w-full lg:w-3/4 mt-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 max-w-32 md:max-w-none px-4 py-8 md:p-24 flex flex-row items-center">
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
        <div className="flex flex-col outer-container pb-24 md:pt-28 relative z-content">
          <div
            className="absolute w-full h-1/2 md:h-full left-0 top-1/2 md:top-0 z-bg opacity-30"
            style={{
              backgroundImage: 'url("skyline_full.png")',
              backgroundSize: "cover",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "bottom",
            }}
          />
          <div className="flex flex-col md:flex-row container justify-around relative z-content items-center">
            <div className="bg-white rounded-3xl w-72 h-64 p-8 flex flex-col shadow-xl justify-around mb-8 max-w-full">
              <div className="self-center font-raleway font-semibold text-xl">
                Our Mission
              </div>
              <div className="font-raleway text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </div>
            </div>
            <div className="bg-white rounded-3xl w-72 h-64 p-8 flex flex-col shadow-xl justify-around mb-8 max-w-full">
              <div className="self-center font-raleway font-semibold text-xl">
                Our Vision
              </div>
              <div className="font-raleway text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </div>
            </div>
            <div className="bg-white rounded-3xl w-72 h-64 p-8 flex flex-col shadow-xl justify-around max-w-full">
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
        <div className="pt-24" />
      </main>

      <Footer />
    </>
  );
}
